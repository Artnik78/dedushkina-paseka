import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://artnik78.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

function reply(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function validPhone(value: unknown): value is string {
  return typeof value === "string" && /^\+[1-9]\d{7,14}$/.test(value);
}
function validPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= 8 && value.length <= 128 &&
    /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (origin && origin !== "https://artnik78.github.io") return reply(403, { error: "Origin not allowed" });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (!url || !serviceKey || !anonKey) return reply(500, { error: "Auth service is not configured" });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reply(400, { error: "Invalid request" });
  }
  const action = body.action;
  const phone = body.phone;
  const password = body.password;
  const displayName = typeof body.display_name === "string" ? body.display_name.trim().slice(0, 80) : "";
  if (action !== "login" && action !== "register") return reply(400, { error: "Invalid request" });
  if (!validPhone(phone) || !validPassword(password)) {
    return reply(400, { error: "Проверьте номер телефона и пароль. Пароль должен содержать 8–128 символов, заглавную и строчную латинские буквы, цифру и специальный символ." });
  }
  if (action === "register" && !displayName) return reply(400, { error: "Укажите имя." });

  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const phoneHash = await sha256(phone);
  const ipHash = await sha256(forwarded);
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const now = new Date();
  const windowStart = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
  const { error: ledgerError } = await admin.from("phone_auth_attempts").insert({
    phone_hash: phoneHash, ip_hash: ipHash, action, attempted_at: now.toISOString(),
  });
  if (ledgerError) return reply(503, { error: "Сервис авторизации временно недоступен. Используйте email или попробуйте позже." });

  const [{ count: phoneCount, error: phoneCountError }, { count: ipCount, error: ipCountError }] = await Promise.all([
    admin.from("phone_auth_attempts").select("id", { count: "exact", head: true }).eq("phone_hash", phoneHash).gte("attempted_at", windowStart),
    admin.from("phone_auth_attempts").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("attempted_at", windowStart),
  ]);
  if (phoneCountError || ipCountError) return reply(503, { error: "Сервис авторизации временно недоступен." });
  const phoneLimit = action === "register" ? 3 : 8;
  const ipLimit = action === "register" ? 10 : 25;
  if ((phoneCount ?? 0) > phoneLimit || (ipCount ?? 0) > ipLimit) {
    return reply(429, { error: "Слишком много попыток. Подождите 15 минут и попробуйте снова." });
  }

  // Synthetic email is an internal Auth identifier. It is never returned to the client.
  const internalEmail = `phone-${phone.slice(1)}@phone-login.invalid`;
  if (action === "register") {
    const { data, error } = await admin.auth.admin.createUser({
      email: internalEmail,
      password,
      email_confirm: true,
      user_metadata: { display_name: displayName, phone_auth: true },
    });
    if (error || !data.user) {
      // Do not reveal whether a phone number is already registered.
      return reply(400, { error: "Не удалось создать аккаунт. Возможно, номер уже зарегистрирован. Если аккаунт есть, выполните вход." });
    }
    const { error: profileError } = await admin.from("journal_users").update({
      phone, display_name: displayName,
    }).eq("user_id", data.user.id);
    if (profileError) {
      await admin.auth.admin.deleteUser(data.user.id);
      return reply(500, { error: "Не удалось завершить регистрацию. Попробуйте позже." });
    }
    return reply(200, { message: "Аккаунт создан. Теперь войдите по номеру телефона и паролю." });
  }

  const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.signInWithPassword({ email: internalEmail, password: password as string });
  if (error || !data.user || !data.session) return reply(401, { error: "Неверный номер телефона или пароль." });

  const { data: profile, error: profileError } = await admin.from("journal_users")
    .select("allowed, phone").eq("user_id", data.user.id).maybeSingle();
  if (profileError || !profile || !profile.allowed || profile.phone !== phone) {
    await client.auth.signOut();
    return reply(403, { error: "Доступ к журналу не разрешён. Обратитесь к владельцу." });
  }
  return reply(200, {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    token_type: "bearer",
    expires_in: data.session.expires_in,
  });
});

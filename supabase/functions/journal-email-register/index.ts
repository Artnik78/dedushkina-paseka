import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
function namedDefaultKey(variable: string): string | undefined {
  const raw = Deno.env.get(variable);
  if (!raw) return undefined;
  try {
    const value = (JSON.parse(raw) as Record<string, unknown>)?.default;
    return typeof value === "string" && value ? value : undefined;
  } catch { return undefined; }
}
Deno.serve(async (req: Request) => {
  const allowedOrigins = new Set([
    "https://artnik78.github.io",
    "https://production-upgrade.dedushkina-paseka.pages.dev",
    "https://dedushkina-paseka-dev-test.vercel.app",
    "https://dedushkina-paseka-dev-test-git-development-multitenant-artnik78.vercel.app",
  ]);
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });
  if (origin && !allowedOrigins.has(origin)) return reply(403, { error: "Origin not allowed" });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY") ?? namedDefaultKey("SUPABASE_SECRET_KEYS");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? namedDefaultKey("SUPABASE_PUBLISHABLE_KEYS");
  if (!url || !serviceKey || !anonKey) return reply(500, { error: "Auth service is not configured" });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return reply(400, { error: "Invalid request" }); }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 128 ||
      !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return reply(400, { error: "Проверьте email и пароль. Пароль должен содержать 8–128 символов, строчную и заглавную латинские буквы, цифру и специальный символ." });
  }
  const captchaToken = typeof body.captcha_token === "string" ? body.captcha_token : "";
  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!captchaToken || !turnstileSecret || !origin) return reply(403, { error: "Проверка безопасности не пройдена. Обновите CAPTCHA." });
  try {
    const verifyForm = new URLSearchParams({ secret: turnstileSecret, response: captchaToken });
    const remoteIp = req.headers.get("cf-connecting-ip");
    if (remoteIp) verifyForm.set("remoteip", remoteIp);
    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: verifyForm,
    });
    const result = await verifyResponse.json();
    if (!verifyResponse.ok || result.success !== true || result.hostname !== new URL(origin).hostname) {
      return reply(403, { error: "Проверка безопасности не пройдена. Обновите CAPTCHA." });
    }
  } catch { return reply(503, { error: "Проверка безопасности временно недоступна." }); }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const emailHash = await sha256(email);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await sha256(ip);
  const now = new Date();
  const since = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
  const { error: ledgerError } = await admin.from("phone_auth_attempts").insert({
    phone_hash: emailHash, ip_hash: ipHash, action: "register", attempted_at: now.toISOString(),
  });
  if (ledgerError) return reply(503, { error: "Сервис регистрации временно недоступен." });
  const [{ count: emailCount, error: emailCountError }, { count: ipCount, error: ipCountError }] = await Promise.all([
    admin.from("phone_auth_attempts").select("id", { count: "exact", head: true }).eq("phone_hash", emailHash).gte("attempted_at", since),
    admin.from("phone_auth_attempts").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("attempted_at", since),
  ]);
  if (emailCountError || ipCountError) return reply(503, { error: "Сервис регистрации временно недоступен." });
  if ((emailCount ?? 0) > 3 || (ipCount ?? 0) > 10) return reply(429, { error: "Слишком много попыток. Подождите 15 минут." });

  const { data, error } = await admin.auth.admin.createUser({
    email, password, email_confirm: true,
  });
  if (error || !data.user) {
    return reply(400, { error: "Не удалось создать аккаунт. Возможно, этот email уже зарегистрирован. Если аккаунт есть, выполните вход." });
  }
  const { error: profileError } = await admin.from("journal_users").update({ allowed: true }).eq("user_id", data.user.id);
  if (profileError) {
    await admin.auth.admin.deleteUser(data.user.id);
    return reply(500, { error: "Не удалось завершить регистрацию. Попробуйте позже." });
  }
  const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: loginData, error: loginError } = await client.auth.signInWithPassword({ email, password });
  if (loginError || !loginData.session) return reply(500, { error: "Аккаунт создан, но автоматический вход не удался. Попробуйте войти вручную." });
  return reply(200, {
    message: "Регистрация завершена. Добро пожаловать в журнал!",
    access_token: loginData.session.access_token,
    refresh_token: loginData.session.refresh_token,
    token_type: "bearer",
    expires_in: loginData.session.expires_in,
  });
});

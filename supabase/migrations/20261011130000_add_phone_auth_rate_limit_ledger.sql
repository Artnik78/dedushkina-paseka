-- Private rate-limit ledger for password-based phone auth.
-- Intentionally has RLS enabled and no client policies; only service_role uses it.
create table if not exists public.phone_auth_attempts (
  id bigint generated always as identity primary key,
  phone_hash text not null,
  ip_hash text not null,
  action text not null check (action in ('register','login')),
  attempted_at timestamptz not null default now()
);
create index if not exists phone_auth_attempts_phone_time_idx
  on public.phone_auth_attempts (phone_hash, attempted_at desc);
create index if not exists phone_auth_attempts_ip_time_idx
  on public.phone_auth_attempts (ip_hash, attempted_at desc);
alter table public.phone_auth_attempts enable row level security;
revoke all on table public.phone_auth_attempts from anon, authenticated;

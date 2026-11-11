-- Add control-hive weight readings.
-- Prepared on production-upgrade from main. Review against the production schema
-- before applying; this migration has NOT been run against production.

create table if not exists public.hive_weight_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  apiary_id uuid not null references public.apiaries(id) on delete cascade,
  hive_id uuid not null references public.hives(id) on delete cascade,
  measured_at timestamptz not null default now(),
  weight_kg numeric(10,2) not null check (weight_kg > 0 and weight_kg < 1000),
  scale_type text not null default 'mechanical'
    check (scale_type in ('mechanical', 'electronic', 'bluetooth')),
  reading_method text not null default 'manual'
    check (reading_method in ('manual', 'bluetooth', 'import')),
  event_type text not null default 'measurement'
    check (event_type in ('measurement', 'feeding', 'honey_harvest', 'equipment_change', 'other')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists hive_weight_readings_user_hive_time_idx
  on public.hive_weight_readings (user_id, hive_id, measured_at desc);

create index if not exists hive_weight_readings_user_apiary_time_idx
  on public.hive_weight_readings (user_id, apiary_id, measured_at desc);

alter table public.hive_weight_readings enable row level security;

drop policy if exists hive_weight_readings_select_own on public.hive_weight_readings;
create policy hive_weight_readings_select_own
  on public.hive_weight_readings for select to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.hives h
      where h.id = hive_weight_readings.hive_id
        and h.user_id = (select auth.uid())
    )
  );

drop policy if exists hive_weight_readings_insert_own on public.hive_weight_readings;
create policy hive_weight_readings_insert_own
  on public.hive_weight_readings for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.hives h
      where h.id = hive_weight_readings.hive_id
        and h.user_id = (select auth.uid())
        and h.apiary_id = hive_weight_readings.apiary_id
    )
    and exists (
      select 1 from public.apiaries a
      where a.id = hive_weight_readings.apiary_id
        and a.user_id = (select auth.uid())
    )
  );

drop policy if exists hive_weight_readings_update_own on public.hive_weight_readings;
create policy hive_weight_readings_update_own
  on public.hive_weight_readings for update to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.hives h
      where h.id = hive_weight_readings.hive_id
        and h.user_id = (select auth.uid())
    )
  )
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.hives h
      where h.id = hive_weight_readings.hive_id
        and h.user_id = (select auth.uid())
        and h.apiary_id = hive_weight_readings.apiary_id
    )
    and exists (
      select 1 from public.apiaries a
      where a.id = hive_weight_readings.apiary_id
        and a.user_id = (select auth.uid())
    )
  );

drop policy if exists hive_weight_readings_delete_own on public.hive_weight_readings;
create policy hive_weight_readings_delete_own
  on public.hive_weight_readings for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists hive_weight_readings_journal_access_gate on public.hive_weight_readings;
create policy hive_weight_readings_journal_access_gate
  on public.hive_weight_readings as restrictive for all to authenticated
  using ((select public.is_journal_user_allowed()))
  with check ((select public.is_journal_user_allowed()));

grant select, insert, update, delete on public.hive_weight_readings to authenticated;

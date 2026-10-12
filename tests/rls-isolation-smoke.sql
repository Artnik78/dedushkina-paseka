-- RLS isolation smoke test for DEVELOPMENT Supabase only.
-- Uses synthetic accounts and records, runs in one transaction, and rolls back.
-- Execute as a privileged SQL operator in the dev project.
begin;

create temporary table rls_smoke_ids (
  uid_a uuid not null, uid_b uuid not null,
  apiary_a uuid not null, apiary_b uuid not null,
  hive_a uuid not null, hive_b uuid not null,
  batch_a uuid not null, batch_b uuid not null,
  medicine_a uuid not null, medicine_b uuid not null,
  treatment_a uuid not null
) on commit drop;

insert into rls_smoke_ids values (
  gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid()
);

-- Create fixtures while running as the privileged SQL operator.
do $fixtures$
declare x rls_smoke_ids%rowtype;
begin
  select * into strict x from rls_smoke_ids;
  insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (x.uid_a, 'authenticated', 'authenticated', 'rls-a-'||x.uid_a||'@example.invalid',
     '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()),
    (x.uid_b, 'authenticated', 'authenticated', 'rls-b-'||x.uid_b||'@example.invalid',
     '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now());

  insert into public.apiaries(id,name,user_id) values
    (x.apiary_a,'RLS test apiary A',x.uid_a),
    (x.apiary_b,'RLS test apiary B',x.uid_b);
  insert into public.hives(id,apiary_id,hive_number,user_id) values
    (x.hive_a,x.apiary_a,'RLS-TEST-A',x.uid_a),
    (x.hive_b,x.apiary_b,'RLS-TEST-B',x.uid_b);
  insert into public.honey_batches(id,batch_number,honey_type,apiary_id,quantity_kg,price_per_kg,user_id) values
    (x.batch_a,'RLS-TEST-A','test',x.apiary_a,1,10,x.uid_a),
    (x.batch_b,'RLS-TEST-B','test',x.apiary_b,1,10,x.uid_b);
  insert into public.medicines(id,name,quantity,user_id) values
    (x.medicine_a,'RLS test medicine A',10,x.uid_a),
    (x.medicine_b,'RLS test medicine B',10,x.uid_b);
  insert into public.hive_treatments(id,user_id,hive_id,medicine_id,product_name) values
    (x.treatment_a,x.uid_a,x.hive_a,x.medicine_a,'RLS test treatment');
end
$fixtures$;

-- The authenticated role needs read access to this transaction-local fixture table.
grant select on rls_smoke_ids to authenticated;
-- Role switch must be a top-level SQL statement, not inside a DO/function.
set local role authenticated;
select set_config('request.jwt.claim.sub', (select uid_a::text from rls_smoke_ids), true);
select set_config('request.jwt.claims', json_build_object(
  'sub',(select uid_a::text from rls_smoke_ids),'role','authenticated'
)::text, true);

do $checks$
declare
  x rls_smoke_ids%rowtype;
  n integer;
  rejected boolean := false;
begin
  select * into strict x from rls_smoke_ids;

  select count(*) into n from public.apiaries where id=x.apiary_a;
  if n <> 1 then raise exception 'FAIL: user A cannot read own apiary'; end if;

  select count(*) into n from public.apiaries where id=x.apiary_b;
  if n <> 0 then raise exception 'FAIL: user A can read user B apiary'; end if;
  select count(*) into n from public.honey_batches where id=x.batch_b;
  if n <> 0 then raise exception 'FAIL: user A can read user B honey batch'; end if;

  update public.apiaries set name='TAMPERED BY A' where id=x.apiary_b;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL: user A updated user B apiary'; end if;
  delete from public.apiaries where id=x.apiary_b;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL: user A deleted user B apiary'; end if;

  -- The exception block only swallows the expected database rejection.
  begin
    insert into public.hive_treatments(user_id,hive_id,product_name)
    values (x.uid_a,x.hive_b,'must fail');
  exception when insufficient_privilege or check_violation or foreign_key_violation or not_null_violation then
    rejected := true;
  end;
  if not rejected then raise exception 'FAIL: cross-owner treatment insert unexpectedly succeeded'; end if;
end
$checks$;

reset role;

-- Verify user B's fixture is still intact, then roll back all synthetic rows.
do $verify$
declare x rls_smoke_ids%rowtype; n integer;
begin
  select * into strict x from rls_smoke_ids;
  select count(*) into n from public.apiaries where id=x.apiary_b and name='RLS test apiary B' and user_id=x.uid_b;
  if n <> 1 then raise exception 'FAIL: user B fixture changed'; end if;
  raise notice 'RLS checks passed: own read allowed, cross-owner read hidden, cross-owner update/delete blocked, cross-owner treatment insert rejected.';
end
$verify$;

rollback;

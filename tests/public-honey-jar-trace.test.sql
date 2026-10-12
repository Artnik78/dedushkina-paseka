-- Public QR honey-jar passport contract test for DEVELOPMENT Supabase only.
-- Synthetic fixture data only; all changes are rolled back.
begin;

create temporary table qr_smoke_ids (
  uid uuid not null, apiary_id uuid not null, batch_id uuid not null,
  run_id uuid not null, label_id uuid not null, code text not null
) on commit drop;

insert into qr_smoke_ids values (
  gen_random_uuid(), gen_random_uuid(), gen_random_uuid(),
  gen_random_uuid(), gen_random_uuid(), 'RLS-QR-'||gen_random_uuid()::text
);

do $fixtures$
declare x qr_smoke_ids%rowtype;
begin
  select * into strict x from qr_smoke_ids;
  insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values (x.uid, 'authenticated', 'authenticated', 'qr-test-'||x.uid||'@example.invalid',
          '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now());
  insert into public.apiaries(id,name,user_id) values (x.apiary_id,'QR test apiary',x.uid);
  insert into public.honey_batches
    (id,batch_number,honey_type,collection_period,apiary_id,quantity_kg,price_per_kg,user_id,collection_place)
  values (x.batch_id,'QR-TEST-BATCH','test honey','October 2026',x.apiary_id,1,12,x.uid,'QR test location');
  insert into public.honey_packaging_runs
    (id,user_id,honey_batch_id,packaging_date,jar_size_g,jar_count,label_code)
  values (x.run_id,x.uid,x.batch_id,current_date,100,1,'QR-TEST-LABEL');
  insert into public.honey_jar_labels(id,user_id,packaging_run_id,jar_number,public_code)
  values (x.label_id,x.uid,x.run_id,1,x.code);
end
$fixtures$;

-- Role switch occurs at top level, outside PL/pgSQL.
set local role anon;

do $checks$
declare x qr_smoke_ids%rowtype; result_json jsonb;
begin
  select * into strict x from qr_smoke_ids;
  select public.get_honey_jar_trace(x.code) into result_json;
  if result_json is null then raise exception 'FAIL: known QR code returned no passport'; end if;
  if result_json->>'jar_code' is distinct from x.code then raise exception 'FAIL: unexpected jar code'; end if;
  if result_json->>'batch_number' is distinct from 'QR-TEST-BATCH' then raise exception 'FAIL: wrong batch in QR response'; end if;
  if result_json ? 'jar_count' or result_json ? 'quantity_kg' or result_json ? 'user_id' or result_json ? 'email' then
    raise exception 'FAIL: QR response exposes a private field';
  end if;
  select public.get_honey_jar_trace('NO-SUCH-QR-'||gen_random_uuid()::text) into result_json;
  if result_json is not null then raise exception 'FAIL: unknown QR code returned data'; end if;
end
$checks$;

reset role;
do $done$
begin
  raise notice 'QR passport contract checks passed: known code works, unknown code returns null, private fields absent.';
end
$done$;

rollback;

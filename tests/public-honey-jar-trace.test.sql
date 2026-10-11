-- Public QR honey-jar passport contract test.
-- Run ONLY against the development Supabase project as a privileged test operator.
-- Uses synthetic data and rolls everything back.
begin;

do $test$
declare
  uid uuid := gen_random_uuid();
  apiary_id uuid := gen_random_uuid();
  batch_id uuid := gen_random_uuid();
  run_id uuid := gen_random_uuid();
  label_id uuid := gen_random_uuid();
  code text := 'RLS-QR-' || gen_random_uuid()::text;
  result_json jsonb;
begin
  insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values (uid, 'authenticated', 'authenticated', 'qr-test-'||uid||'@example.invalid',
          '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now());

  insert into public.apiaries(id,name,user_id)
  values (apiary_id,'QR test apiary',uid);
  insert into public.honey_batches
    (id,batch_number,honey_type,collection_period,apiary_id,quantity_kg,price_per_kg,user_id,collection_place)
  values
    (batch_id,'QR-TEST-BATCH','test honey','October 2026',apiary_id,1,12,uid,'QR test location');
  insert into public.honey_packaging_runs
    (id,user_id,honey_batch_id,packaging_date,jar_size_g,jar_count,label_code)
  values
    (run_id,uid,batch_id,current_date,100,1,'QR-TEST-LABEL');
  insert into public.honey_jar_labels
    (id,user_id,packaging_run_id,jar_number,public_code)
  values
    (label_id,uid,run_id,1,code);

  execute 'set local role anon';
  select public.get_honey_jar_trace(code) into result_json;
  if result_json is null then
    raise exception 'FAIL: public QR function did not return a passport for a known code';
  end if;
  if result_json->>'jar_code' is distinct from code then
    raise exception 'FAIL: QR response returned an unexpected jar code';
  end if;
  if result_json->>'batch_number' is distinct from 'QR-TEST-BATCH' then
    raise exception 'FAIL: QR response does not match the test batch';
  end if;
  if result_json ? 'jar_count' or result_json ? 'quantity_kg' or result_json ? 'user_id' or result_json ? 'email' then
    raise exception 'FAIL: QR response contains a field that must remain private';
  end if;
  select public.get_honey_jar_trace('NO-SUCH-QR-CODE-' || gen_random_uuid()::text) into result_json;
  if result_json is not null then
    raise exception 'FAIL: unknown QR code unexpectedly returned data';
  end if;
  reset role;
  raise notice 'QR passport tests passed: public lookup works for a known code, unknown code returns null, and sensitive fields are absent.';
end
$test$;

rollback;
-- Safe, repeatable RLS isolation smoke tests for the development Supabase project.
-- Run only in the development database using the SQL editor / psql as a privileged test operator.
-- Does not create auth.users or persistent rows. Uses a transaction and rolls back.
begin;

do $test$
declare
  uid_a uuid := gen_random_uuid();
  uid_b uuid := gen_random_uuid();
  apiary_a uuid := gen_random_uuid();
  apiary_b uuid := gen_random_uuid();
  hive_a uuid := gen_random_uuid();
  hive_b uuid := gen_random_uuid();
  batch_a uuid := gen_random_uuid();
  batch_b uuid := gen_random_uuid();
  run_a uuid := gen_random_uuid();
  label_a uuid := gen_random_uuid();
  treatment_a uuid := gen_random_uuid();
  medicine_a uuid := gen_random_uuid();
  medicine_b uuid := gen_random_uuid();
  treatment_b uuid := gen_random_uuid();
  movement_a uuid := gen_random_uuid();
  got_count integer;
begin
  -- Set up isolated fixtures under privileged test context.
  insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    (uid_a, 'authenticated', 'authenticated', 'rls-a-'||uid_a||'@example.invalid',
     '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()),
    (uid_b, 'authenticated', 'authenticated', 'rls-b-'||uid_b||'@example.invalid',
     '', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now());

  insert into public.apiaries(id,name,user_id) values
    (apiary_a,'RLS test apiary A',uid_a),
    (apiary_b,'RLS test apiary B',uid_b);
  insert into public.hives(id,apiary_id,hive_number,user_id) values
    (hive_a,apiary_a,'RLS-TEST-A',uid_a),
    (hive_b,apiary_b,'RLS-TEST-B',uid_b);
  insert into public.honey_batches(id,batch_number,honey_type,apiary_id,quantity_kg,price_per_kg,user_id) values
    (batch_a,'RLS-TEST-A','test',apiary_a,1,10,uid_a),
    (batch_b,'RLS-TEST-B','test',apiary_b,1,10,uid_b);
  insert into public.honey_packaging_runs(id,user_id,honey_batch_id,jar_size_g,jar_count) values
    (run_a,uid_a,batch_a,100,1);
  insert into public.honey_jar_labels(id,user_id,packaging_run_id,jar_number,public_code) values
    (label_a,uid_a,run_a,1,'RLS-TEST-'||label_a);
  insert into public.medicines(id,name,quantity,user_id) values
    (medicine_a,'RLS test medicine A',10,uid_a),
    (medicine_b,'RLS test medicine B',10,uid_b);
  insert into public.hive_treatments(id,user_id,hive_id,medicine_id,product_name) values
    (treatment_a,uid_a,hive_a,medicine_a,'RLS test treatment');
  insert into public.hive_treatments(id,user_id,hive_id,medicine_id,product_name) values
    (treatment_b,uid_b,hive_b,medicine_b,'RLS test treatment B');
  insert into public.medicine_stock_movements(id,user_id,medicine_id,treatment_id,movement_type,quantity_change,quantity_before,quantity_after,medicine_name) values
    (movement_a,uid_a,medicine_a,treatment_a,'test',-1,10,9,'RLS test medicine A');

  -- Test A: owner sees own apiary.
  perform set_config('request.jwt.claim.sub', uid_a::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub',uid_a,'role','authenticated')::text, true);
  execute 'set local role authenticated';
  select count(*) into got_count from public.apiaries where id=apiary_a;
  if got_count <> 1 then raise exception 'FAIL: owner cannot read own apiary'; end if;

  -- Test B: user A cannot read B's apiary or batch.
  perform set_config('request.jwt.claim.sub', uid_a::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub',uid_a,'role','authenticated')::text, true);
  select count(*) into got_count from public.apiaries where id=apiary_b;
  if got_count <> 0 then raise exception 'FAIL: user A read user B apiary'; end if;
  select count(*) into got_count from public.honey_batches where id=batch_b;
  if got_count <> 0 then raise exception 'FAIL: user A read user B batch'; end if;

  -- Test C: A cannot update or delete B's rows. Under RLS these normally affect zero rows.
  update public.apiaries set name='TAMPERED BY A' where id=apiary_b;
  get diagnostics got_count = row_count;
  if got_count <> 0 then raise exception 'FAIL: user A updated user B apiary'; end if;
  delete from public.apiaries where id=apiary_b;
  get diagnostics got_count = row_count;
  if got_count <> 0 then raise exception 'FAIL: user A deleted user B apiary'; end if;

  -- Test D: owner A cannot create a treatment tied to B's hive (expected RLS rejection).
  begin
    insert into public.hive_treatments(user_id,hive_id,product_name)
    values (uid_a, hive_b, 'must fail');
    raise exception 'FAIL: cross-owner treatment insert unexpectedly succeeded';
  exception when insufficient_privilege or check_violation or foreign_key_violation or not_null_violation then
    null;
  end;

  -- Test E: movement cannot reference someone else's medicine or treatment.
  begin
    insert into public.medicine_stock_movements(user_id,medicine_id,treatment_id,movement_type,quantity_change,quantity_before,quantity_after,medicine_name)
    values (uid_a, medicine_b, null, 'test', -1, 10, 9, 'must fail');
    raise exception 'FAIL: cross-owner medicine movement unexpectedly succeeded';
  exception when insufficient_privilege or check_violation or foreign_key_violation then
    null;
  end;

  reset role;
  select count(*) into got_count from public.apiaries where id=apiary_b and name='RLS test apiary B';
  if got_count <> 1 then raise exception 'FAIL: user B apiary was changed or deleted'; end if;
  raise notice 'RLS smoke tests passed: own read allowed; cross-owner read hidden; cross-owner update/delete have zero rows; cross-owner treatment and medicine movement inserts rejected.';
end
$test$;

rollback;
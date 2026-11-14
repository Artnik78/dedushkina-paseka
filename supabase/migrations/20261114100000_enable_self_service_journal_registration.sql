-- New self-service accounts are active immediately.
-- Existing accounts keep their current allowed flag, including administrator blocks.
create or replace function public.handle_dev_new_journal_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  insert into public.journal_users
    (user_id, email, phone, display_name, allowed, created_at)
  values
    (
      new.id,
      nullif(lower(new.email), ''),
      nullif(new.phone, ''),
      coalesce(
        nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
        nullif(trim(new.raw_user_meta_data ->> 'full_name'), '')
      ),
      true,
      now()
    )
  on conflict (user_id) do update
    set email = excluded.email,
        phone = excluded.phone,
        display_name = coalesce(public.journal_users.display_name, excluded.display_name);
  return new;
end;
$function$;

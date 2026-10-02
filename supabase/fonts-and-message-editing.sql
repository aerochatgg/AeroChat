-- Font choice + editing/deleting your own messages.
-- Run once in the Supabase SQL editor.

-- ---------- Font ----------
alter table public.profiles add column if not exists font text;


-- ---------- Edit / delete messages ----------
alter table public.messages       add column if not exists edited_at  timestamptz;
alter table public.messages       add column if not exists deleted_at timestamptz;
alter table public.group_messages add column if not exists edited_at  timestamptz;
alter table public.group_messages add column if not exists deleted_at timestamptz;

-- Only the sender can edit, and only text that hasn't been deleted.
create or replace function public.edit_message(is_group boolean, mid text, new_content text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  changed int;
begin
  new_content := trim(new_content);
  if new_content is null or new_content = '' then
    raise exception 'Message cannot be empty';
  end if;

  if is_group then
    update group_messages set content = new_content, edited_at = now()
     where id::text = mid and sender_id = auth.uid() and deleted_at is null;
  else
    update messages set content = new_content, edited_at = now()
     where id::text = mid and sender_id = auth.uid() and deleted_at is null;
  end if;

  get diagnostics changed = row_count;
  if changed = 0 then raise exception 'You can only edit your own messages'; end if;
end;
$$;

-- "Soft" delete: the row stays (so everyone's open chat hears about it
-- live) but the text is wiped for good.
create or replace function public.delete_message(is_group boolean, mid text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  changed int;
begin
  if is_group then
    update group_messages set content = '', deleted_at = now()
     where id::text = mid and sender_id = auth.uid() and deleted_at is null;
  else
    update messages set content = '', deleted_at = now(), read_at = coalesce(read_at, now())
     where id::text = mid and sender_id = auth.uid() and deleted_at is null;
  end if;

  get diagnostics changed = row_count;
  if changed = 0 then raise exception 'You can only delete your own messages'; end if;
end;
$$;

revoke execute on function public.edit_message(boolean, text, text) from public;
revoke execute on function public.delete_message(boolean, text) from public;
grant execute on function public.edit_message(boolean, text, text) to authenticated;
grant execute on function public.delete_message(boolean, text) to authenticated;

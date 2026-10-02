-- Group pictures, renaming, owners (who can remove members), and invite previews.
-- Run once in the Supabase SQL editor.

-- ---------- 1. Group picture ----------
alter table public.groups add column if not exists icon_url text;


-- ---------- 2. Join order ----------
-- The owner is whoever has been in the group longest. The creator joins
-- first, so they start as owner; if they leave, the next-oldest member
-- takes over automatically, and so on.
do $$
begin
  if not exists (select 1 from information_schema.columns
                 where table_schema = 'public' and table_name = 'group_members' and column_name = 'joined_at') then
    alter table public.group_members add column joined_at timestamptz;

    if exists (select 1 from information_schema.columns
               where table_schema = 'public' and table_name = 'group_members' and column_name = 'created_at') then
      execute 'update public.group_members set joined_at = created_at';
    else
      -- No record of when existing members joined: put each group's creator
      -- first, everyone else after them.
      update public.group_members gm
         set joined_at = now() - case when gm.user_id = g.created_by then interval '1 minute' else interval '0' end
        from public.groups g
       where g.id = gm.group_id;
    end if;

    update public.group_members set joined_at = now() where joined_at is null;
    alter table public.group_members alter column joined_at set default now();
    alter table public.group_members alter column joined_at set not null;
  end if;
end $$;

-- Nobody can fake an earlier join time to jump the queue.
create or replace function public.lock_group_joined_at()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    new.joined_at := now();
  else
    new.joined_at := old.joined_at;
  end if;
  return new;
end;
$$;

drop trigger if exists lock_group_joined_at on public.group_members;
create trigger lock_group_joined_at
  before insert or update on public.group_members
  for each row execute function public.lock_group_joined_at();

create or replace function public.group_owner(gid uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select user_id from group_members
   where group_id = gid
   order by joined_at, user_id
   limit 1;
$$;


-- ---------- 3. Rename / change picture (any member) ----------
-- Pass null for whichever one you're not changing.
create or replace function public.update_group(gid uuid, new_name text, new_icon_url text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from group_members where group_id = gid and user_id = auth.uid()) then
    raise exception 'You are not in this group';
  end if;

  if new_name is not null then
    new_name := trim(new_name);
    if new_name = '' then raise exception 'Group name cannot be empty'; end if;
    if length(new_name) > 50 then raise exception 'Group name is too long (50 characters max)'; end if;
    update groups set name = new_name where id = gid;
  end if;

  if new_icon_url is not null then
    -- Only pictures uploaded to our own storage, not random links
    if new_icon_url not like 'https://zckopyjykhxwlkljosud.supabase.co/storage/v1/object/public/chat-uploads/%' then
      raise exception 'Invalid picture';
    end if;
    update groups set icon_url = new_icon_url where id = gid;
  end if;
end;
$$;


-- ---------- 4. Remove a member (owner only) ----------
create or replace function public.remove_group_member(gid uuid, target uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.group_owner(gid) is distinct from auth.uid() then
    raise exception 'Only the group owner can remove members';
  end if;
  if target = auth.uid() then
    raise exception 'Use Leave Group to leave';
  end if;
  delete from group_members where group_id = gid and user_id = target;
end;
$$;


-- ---------- 5. Invite preview ----------
-- Lets someone with an invite link see the group's name, picture and who's
-- in it before joining (they aren't a member yet, so normal rules hide that).
create or replace function public.group_invite_preview(gid uuid)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'id', g.id,
    'name', g.name,
    'icon_url', g.icon_url,
    'member_ids', coalesce(
      (select json_agg(gm.user_id order by gm.joined_at, gm.user_id)
         from group_members gm where gm.group_id = g.id),
      '[]'::json)
  )
  from groups g
  where g.id = gid;
$$;


revoke execute on function public.group_owner(uuid) from public;
revoke execute on function public.update_group(uuid, text, text) from public;
revoke execute on function public.remove_group_member(uuid, uuid) from public;
revoke execute on function public.group_invite_preview(uuid) from public;
grant execute on function public.group_owner(uuid) to authenticated;
grant execute on function public.update_group(uuid, text, text) to authenticated;
grant execute on function public.remove_group_member(uuid, uuid) to authenticated;
grant execute on function public.group_invite_preview(uuid) to authenticated;

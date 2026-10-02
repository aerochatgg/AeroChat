-- Unread message tracking for DMs.
-- Run once in the Supabase SQL editor.

-- When the receiver has read a message. NULL = unread.
alter table public.messages add column if not exists read_at timestamptz;

-- Treat everything sent before this feature existed as already read,
-- so nobody logs in to a huge unread count.
update public.messages set read_at = now() where read_at is null;

-- Makes "how many unread messages do I have?" fast.
create index if not exists messages_unread_idx
  on public.messages (receiver_id)
  where read_at is null;

-- Marks every message from `other_user` to the current user as read.
-- SECURITY DEFINER so we don't need a general UPDATE policy on messages
-- (which would let people edit message content).
create or replace function public.mark_messages_read(other_user uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update messages
     set read_at = now()
   where receiver_id = auth.uid()
     and sender_id = other_user
     and read_at is null;
$$;

revoke execute on function public.mark_messages_read(uuid) from public;
grant execute on function public.mark_messages_read(uuid) to authenticated;

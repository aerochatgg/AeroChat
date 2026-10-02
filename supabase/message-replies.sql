-- Replies: each message can point at the message it's replying to.
-- Run once in the Supabase SQL editor.
-- (Stored as text so it works whatever type the message ids are.)

alter table public.messages       add column if not exists reply_to text;
alter table public.group_messages add column if not exists reply_to text;

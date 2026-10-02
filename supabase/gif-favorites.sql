-- Favorite GIFs/images for the emoji & GIF picker.
-- Run once in the Supabase SQL editor.

create table if not exists public.gif_favorites (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  url text not null check (length(url) <= 2000),
  created_at timestamptz not null default now(),
  primary key (user_id, url)
);

alter table public.gif_favorites enable row level security;

-- Everyone can only see and change their own favorites
drop policy if exists "read own favorites" on public.gif_favorites;
create policy "read own favorites" on public.gif_favorites
  for select using (auth.uid() = user_id);

drop policy if exists "add own favorites" on public.gif_favorites;
create policy "add own favorites" on public.gif_favorites
  for insert with check (auth.uid() = user_id);

drop policy if exists "remove own favorites" on public.gif_favorites;
create policy "remove own favorites" on public.gif_favorites
  for delete using (auth.uid() = user_id);

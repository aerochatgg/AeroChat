-- Theme editor extras: message density, corner roundness, effect intensity.
-- Stored together as one JSON object per user. Run once in the Supabase SQL editor.

alter table public.profiles add column if not exists appearance jsonb;

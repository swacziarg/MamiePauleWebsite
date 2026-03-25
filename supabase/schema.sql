create extension if not exists "pgcrypto";

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  description text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.artworks enable row level security;

create policy "Public read artworks"
on public.artworks
for select
to anon, authenticated
using (true);

create policy "Authenticated insert artworks"
on public.artworks
for insert
to authenticated
with check (true);

create policy "Authenticated update artworks"
on public.artworks
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated delete artworks"
on public.artworks
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', true)
on conflict (id) do nothing;

create policy "Public read artwork files"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'artworks');

create policy "Authenticated upload artwork files"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'artworks');

create policy "Authenticated update artwork files"
on storage.objects
for update
to authenticated
using (bucket_id = 'artworks')
with check (bucket_id = 'artworks');

create policy "Authenticated delete artwork files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'artworks');

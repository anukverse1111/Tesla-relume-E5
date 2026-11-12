-- Нүүр хуудасны машины картууд, тэдгээрийг засах админууд, зургийн сан

create schema if not exists private;
grant usage on schema private to anon, authenticated;

-- Админ эрхтэй имэйлүүд. Хэрэглэгч Supabase Auth-аар нэвтэрсэн үед энэ жагсаалтаар шалгана.
create table public.admin_users (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- Нэвтэрсэн хэрэглэгч зөвхөн өөрийн мөрийг харна (админ мөн эсэхээ шалгахад)
create policy "Admins can read own row" on public.admin_users
  for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  );
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create table public.car_models (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  description text not null default '' check (char_length(description) <= 200),
  -- Жишээ: "Сарын $499-өөс эхлэн лизингээр". Монгол нөхцөл тоо бүрт өөр тул бүтэн бичвэрээр хадгална.
  price_text text not null default '' check (char_length(price_text) <= 120),
  -- Байвал үнийн ард "(≈ 1.8 сая ₮)" гэж төгрөгөөр харуулна
  price_usd numeric(12, 2) check (price_usd >= 0),
  -- Нэр дээр дарахад очих хуудас: "/model-y" эсвэл "https://..."
  href text check (href is null or href ~ '^(/|https://)'),
  image_url text not null,
  logo text not null default 'a' check (logo in ('a', 'b')),
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index car_models_sort_order_idx on public.car_models (sort_order);
alter table public.car_models enable row level security;

create policy "Anyone can read published models" on public.car_models
  for select to anon, authenticated
  using (is_published or (select private.is_admin()));

create policy "Admins can insert models" on public.car_models
  for insert to authenticated
  with check ((select private.is_admin()));

create policy "Admins can update models" on public.car_models
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy "Admins can delete models" on public.car_models
  for delete to authenticated
  using ((select private.is_admin()));

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger car_models_set_updated_at
  before update on public.car_models
  for each row execute function private.set_updated_at();

-- Зургийн сан: хүн бүр үзнэ, зөвхөн админ байршуулна
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('car-images', 'car-images', true, 4194304, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

create policy "Admins can read car images" on storage.objects
  for select to authenticated
  using (bucket_id = 'car-images' and (select private.is_admin()));

create policy "Admins can upload car images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'car-images' and (select private.is_admin()));

create policy "Admins can update car images" on storage.objects
  for update to authenticated
  using (bucket_id = 'car-images' and (select private.is_admin()));

create policy "Admins can delete car images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'car-images' and (select private.is_admin()));

-- Одоогийн сайтын гурван карт
insert into public.car_models (name, description, price_text, price_usd, href, image_url, logo, sort_order) values
  ('Model Y L Premium', 'Урт тэнхлэг хоорондын зайтай дунд оврын SUV', '$61,990-аас эхэлнэ', 61990, null, '/assets/images/model-y-l-premium.png', 'a', 1),
  ('Model 3', 'Спорт седан', 'Сарын $439-өөс эхлэн лизингээр', 439, null, '/assets/images/model-3.png', 'b', 2),
  ('Model Y', 'Дунд оврын SUV', 'Сарын $499-өөс эхлэн лизингээр', 499, '/model-y', '/assets/images/model-y.jpg', 'a', 3);

insert into public.admin_users (email) values ('anukverse@gmail.com');

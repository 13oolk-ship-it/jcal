-- ============================================
-- NubCal - Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  tdee integer not null default 2000,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Foods table
create table if not exists public.foods (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  calories numeric not null default 0,
  protein numeric not null default 0,
  carbs numeric not null default 0,
  fat numeric not null default 0,
  created_at timestamptz default now()
);

alter table public.foods enable row level security;

create policy "Users can view all foods"
  on public.foods for select
  using (true);

create policy "Users can insert own foods"
  on public.foods for insert
  with check (auth.uid() = user_id);

create policy "Users can update own foods"
  on public.foods for update
  using (auth.uid() = user_id);

create policy "Users can delete own foods"
  on public.foods for delete
  using (auth.uid() = user_id);

-- 3. Meals table
create table if not exists public.meals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  date date not null default current_date,
  created_at timestamptz default now()
);

alter table public.meals enable row level security;

create policy "Users can view own meals"
  on public.meals for select
  using (auth.uid() = user_id);

create policy "Users can insert own meals"
  on public.meals for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own meals"
  on public.meals for delete
  using (auth.uid() = user_id);

-- 4. Meal Items table (junction table)
create table if not exists public.meal_items (
  id uuid default gen_random_uuid() primary key,
  meal_id uuid references public.meals(id) on delete cascade not null,
  food_id uuid references public.foods(id) on delete cascade not null,
  quantity numeric not null default 1 check (quantity > 0),
  created_at timestamptz default now()
);

alter table public.meal_items enable row level security;

create policy "Users can view own meal items"
  on public.meal_items for select
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

create policy "Users can insert own meal items"
  on public.meal_items for insert
  with check (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

create policy "Users can delete own meal items"
  on public.meal_items for delete
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

-- 5. Indexes for performance
create index if not exists idx_meals_user_date on public.meals(user_id, date);
create index if not exists idx_meal_items_meal on public.meal_items(meal_id);
create index if not exists idx_foods_user on public.foods(user_id);

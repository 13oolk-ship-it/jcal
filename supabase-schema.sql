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

-- 5. Add language preference to profiles
alter table public.profiles add column if not exists language text not null default 'en' check (language in ('en', 'th'));

-- 5b. Add theme preference to profiles
alter table public.profiles add column if not exists theme text not null default 'violet' check (theme in ('violet', 'dark', 'ocean', 'rose', 'forest'));

-- 6. Indexes for performance
create index if not exists idx_meals_user_date on public.meals(user_id, date);
create index if not exists idx_meal_items_meal on public.meal_items(meal_id);
create index if not exists idx_foods_user on public.foods(user_id);

-- 7. Exercises table (user custom exercise presets)
create table if not exists public.exercises (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  icon text not null default 'fitness_center',
  cal_per_min numeric not null default 5,
  category text not null check (category in ('cardio', 'strength', 'flexibility')),
  muscle text,
  created_at timestamptz default now()
);

alter table public.exercises enable row level security;

create policy "Users can view own exercises"
  on public.exercises for select
  using (auth.uid() = user_id);

create policy "Users can insert own exercises"
  on public.exercises for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exercises"
  on public.exercises for update
  using (auth.uid() = user_id);

create policy "Users can delete own exercises"
  on public.exercises for delete
  using (auth.uid() = user_id);

create index if not exists idx_exercises_user on public.exercises(user_id);

-- 8. Weight logs table (daily weight tracking)
create table if not exists public.weight_logs (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  weight numeric not null check (weight > 0 and weight < 500),
  date date not null default current_date,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.weight_logs enable row level security;

create policy "Users can view own weight logs"
  on public.weight_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own weight logs"
  on public.weight_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own weight logs"
  on public.weight_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete own weight logs"
  on public.weight_logs for delete
  using (auth.uid() = user_id);

create index if not exists idx_weight_logs_user_date on public.weight_logs(user_id, date);

-- 9. Gut Health Logs table (digestive health tracking)
create table if not exists public.gut_health_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  has_bowel_movement boolean not null default false,
  stool_type integer check (stool_type between 1 and 5),
  feeling text check (feeling in ('good', 'normal', 'bad')),
  notes text,
  date date not null default current_date,
  created_at timestamptz default now()
);

alter table public.gut_health_logs enable row level security;

create policy "Users can view own gut health logs"
  on public.gut_health_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own gut health logs"
  on public.gut_health_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own gut health logs"
  on public.gut_health_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete own gut health logs"
  on public.gut_health_logs for delete
  using (auth.uid() = user_id);

create index if not exists idx_gut_health_user_date on public.gut_health_logs(user_id, date);

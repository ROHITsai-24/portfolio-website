-- ============================================================
-- 001_initial_schema.sql
-- Portfolio + Workspace — full schema with RLS
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- Utility: updated_at trigger
-- ============================================================

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- profiles
-- ============================================================

create table if not exists profiles (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null default '',
  title         text not null default '',
  location      text not null default '',
  email         text not null default '',
  bio           text not null default '',
  avatar_url    text,
  hero_headline       text not null default '',
  hero_subtitle       text not null default '',
  hero_status_text    text not null default '',
  hero_status_visible boolean not null default true,
  social_links  jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id)
);

create trigger profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

alter table profiles enable row level security;

create policy "profiles: owner read"
  on profiles for select
  using (auth.uid() = user_id);

create policy "profiles: owner write"
  on profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Public read for the portfolio site
create policy "profiles: public read"
  on profiles for select
  using (true);


-- ============================================================
-- skills
-- ============================================================

create table if not exists skills (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  label         text not null,
  category      text not null default '',
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger skills_updated_at
  before update on skills
  for each row execute function set_updated_at();

alter table skills enable row level security;

create policy "skills: public read"   on skills for select using (true);
create policy "skills: owner write"   on skills for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ============================================================
-- experiences
-- ============================================================

create table if not exists experiences (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  company       text not null,
  role          text not null,
  start_date    text not null,
  end_date      text,           -- null = present
  location      text,
  bullets       text[] not null default '{}',
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger experiences_updated_at
  before update on experiences
  for each row execute function set_updated_at();

alter table experiences enable row level security;

create policy "experiences: public read"  on experiences for select using (true);
create policy "experiences: owner write"  on experiences for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ============================================================
-- education
-- ============================================================

create table if not exists education (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  institution   text not null,
  degree        text not null,
  field         text,
  start_year    integer,
  end_year      integer,
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger education_updated_at
  before update on education
  for each row execute function set_updated_at();

alter table education enable row level security;

create policy "education: public read"  on education for select using (true);
create policy "education: owner write"  on education for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ============================================================
-- projects
-- ============================================================

create table if not exists projects (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  slug          text not null,
  category      text not null default '',
  tagline       text not null default '',
  description   text not null default '',
  cover_url     text,
  status        text not null default 'draft'
                  check (status in ('draft','published','archived')),
  visibility    text not null default 'private'
                  check (visibility in ('public','private')),
  is_featured   boolean not null default false,
  tech_stack    text[] not null default '{}',
  links         jsonb not null default '[]'::jsonb,
  -- case study content
  problem       text,
  solution      text,
  features      jsonb default '[]'::jsonb,
  gallery       jsonb default '[]'::jsonb,
  dev_notes     jsonb default '[]'::jsonb,
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id, slug)
);

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

alter table projects enable row level security;

-- Public can read published+public projects
create policy "projects: public read published"
  on projects for select
  using (status = 'published' and visibility = 'public');

-- Owner can read all their own projects
create policy "projects: owner read all"
  on projects for select
  using (auth.uid() = user_id);

-- Owner can write
create policy "projects: owner write"
  on projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- workspace_projects  (kanban)
-- ============================================================

create table if not exists workspace_projects (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  description   text,
  status        text not null default 'idea'
                  check (status in ('idea','active','review','shipped','archived')),
  priority      text not null default 'med'
                  check (priority in ('high','med','low')),
  due_date      date,
  tags          text[] not null default '{}',
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger workspace_projects_updated_at
  before update on workspace_projects
  for each row execute function set_updated_at();

alter table workspace_projects enable row level security;

create policy "workspace_projects: owner only"
  on workspace_projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- notes
-- ============================================================

create table if not exists notes (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null default 'Untitled',
  content       text not null default '',     -- serialized Tiptap JSON or markdown
  folder        text not null default 'Inbox',
  tags          text[] not null default '{}',
  is_pinned     boolean not null default false,
  word_count    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger notes_updated_at
  before update on notes
  for each row execute function set_updated_at();

alter table notes enable row level security;

create policy "notes: owner only"
  on notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- tasks
-- ============================================================

create table if not exists tasks (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  due_date      date,
  priority      text not null default 'med'
                  check (priority in ('high','med','low')),
  is_done       boolean not null default false,
  project_id    uuid references projects(id) on delete set null,
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger tasks_updated_at
  before update on tasks
  for each row execute function set_updated_at();

alter table tasks enable row level security;

create policy "tasks: owner only"
  on tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- contact_messages
-- ============================================================

create table if not exists contact_messages (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  email         text not null,
  subject       text,
  message       text not null,
  is_read       boolean not null default false,
  is_archived   boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Anyone can insert (public contact form)
create policy "contact_messages: public insert"
  on contact_messages for insert
  with check (true);

-- Only authenticated owner can read — compare against profiles
create policy "contact_messages: owner read"
  on contact_messages for select
  using (
    exists (
      select 1 from profiles
      where profiles.user_id = auth.uid()
    )
  );

create policy "contact_messages: owner update"
  on contact_messages for update
  using (
    exists (
      select 1 from profiles
      where profiles.user_id = auth.uid()
    )
  );


-- ============================================================
-- settings
-- ============================================================

create table if not exists settings (
  id                        uuid primary key default uuid_generate_v4(),
  user_id                   uuid not null references auth.users(id) on delete cascade,
  -- Site
  site_title                text not null default 'Rohith Sai',
  site_description          text not null default '',
  site_url                  text not null default '',
  -- Appearance
  default_theme             text not null default 'system'
                              check (default_theme in ('light','dark','system')),
  accent_color              text not null default '#6366f1',
  -- Features
  show_resume_download      boolean not null default true,
  show_contact_form         boolean not null default true,
  show_project_views        boolean not null default false,
  enable_analytics          boolean not null default false,
  -- Notifications
  notify_contact_email      boolean not null default true,
  notify_contact_digest     boolean not null default false,
  -- Auth
  two_factor_enabled        boolean not null default false,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),
  unique(user_id)
);

create trigger settings_updated_at
  before update on settings
  for each row execute function set_updated_at();

alter table settings enable row level security;

create policy "settings: owner only"
  on settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- Storage buckets
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars',          'avatars',          true,  2097152,   array['image/jpeg','image/png','image/webp','image/gif']),
  ('project-covers',   'project-covers',   true,  5242880,   array['image/jpeg','image/png','image/webp']),
  ('project-gallery',  'project-gallery',  true,  10485760,  array['image/jpeg','image/png','image/webp','image/gif']),
  ('resume',           'resume',           false, 5242880,   array['application/pdf'])
on conflict (id) do nothing;

-- Public read for public buckets
create policy "avatars: public read"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "project-covers: public read"
  on storage.objects for select
  using (bucket_id = 'project-covers');

create policy "project-gallery: public read"
  on storage.objects for select
  using (bucket_id = 'project-gallery');

-- Owner write for all buckets
create policy "avatars: owner write"
  on storage.objects for all
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "project-covers: owner write"
  on storage.objects for all
  using (bucket_id = 'project-covers' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'project-covers' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "project-gallery: owner write"
  on storage.objects for all
  using (bucket_id = 'project-gallery' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'project-gallery' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "resume: owner read"
  on storage.objects for select
  using (bucket_id = 'resume' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "resume: owner write"
  on storage.objects for all
  using (bucket_id = 'resume' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'resume' and auth.uid()::text = (storage.foldername(name))[1]);


-- ============================================================
-- Seed: create profile row on first sign-up
-- ============================================================

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do nothing;

  insert into settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

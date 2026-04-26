# Portfolio + Workspace — Project Context

This document captures everything built in the initial implementation session. Paste it into any AI tool to give it full context.

---

## What this project is

A personal portfolio + private workspace for **Rohith Sai (Majji Rohith Sai)** — `rohith@majji.dev`.  
Full-stack app with a **public-facing portfolio site** and a **private CMS/dashboard** (admin).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 — App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties (design tokens) |
| Database + Auth | Supabase (PostgreSQL + Supabase Auth) |
| Supabase client | `@supabase/ssr` (server-side rendering safe) |
| Fonts | Instrument Serif (display), Inter (UI), JetBrains Mono (metadata) |
| Toasts | Sonner |
| Icons | Lucide React |
| Deployment | Vercel (target) |

---

## Design System

All design tokens are CSS custom properties in `app/globals.css`:

```css
--paper, --paper-2          /* backgrounds */
--ink, --ink-2, --ink-3, --ink-4  /* text hierarchy */
--rule, --rule-2            /* borders */
--accent, --accent-ink      /* highlight color */
--danger, --warn            /* status colors */
```

Key UI patterns:
- **Custom cursor**: 6px dot + 30px lerping ring with `mix-blend-mode: difference`
- **Hero animation**: `riseIn` keyframe, `0.9s cubic-bezier(.2,.7,.2,1)`, staggered delays
- **`.lift` class**: hover `translateY(-2px)` + soft shadow
- **Fallback data pattern**: every server component has hardcoded fallback data, wraps Supabase fetch in try/catch, falls back gracefully if DB not connected

---

## Route Structure

```
app/
├── (public)/               ← Nav + Footer + CustomCursor layout
│   ├── page.tsx            ← Home / hero
│   ├── projects/
│   │   ├── page.tsx        ← Projects index (server)
│   │   ├── project-filters.tsx  ← Client: category filter + search
│   │   └── [slug]/page.tsx ← Case study detail
│   ├── about/page.tsx
│   ├── resume/page.tsx
│   └── contact/
│       ├── page.tsx
│       └── contact-form.tsx  ← Client form → /api/contact
│
├── (auth)/                 ← Bare layout (no nav)
│   └── login/
│       ├── page.tsx
│       └── login-form.tsx  ← Email+password + magic link
│
├── (dashboard)/            ← Sidebar layout, auth-gated
│   └── dashboard/
│       ├── page.tsx        ← Overview (stats, activity, tasks)
│       ├── profile/
│       │   ├── page.tsx              ← Server: fetch profile
│       │   └── profile-editor-client.tsx  ← Client: edit + live preview
│       ├── projects/
│       │   ├── page.tsx              ← CMS table
│       │   └── [id]/edit/page.tsx    ← Project edit (tabs)
│       ├── notes/page.tsx            ← 4-pane notebook
│       ├── tasks/page.tsx            ← Grouped task list
│       ├── workspace/page.tsx        ← Kanban board
│       ├── messages/page.tsx         ← 2-pane inbox
│       └── settings/page.tsx        ← Site + appearance + danger zone
│
├── api/contact/route.ts    ← POST handler → Supabase contact_messages
└── layout.tsx              ← Root: fonts + Sonner Toaster
```

---

## Key Files

### Supabase
- `lib/supabase/client.ts` — browser client (`createBrowserClient`)
- `lib/supabase/server.ts` — server client (`createServerClient` with cookies)
- `middleware.ts` — redirects `/dashboard/*` → `/login` if not authed; `/login` → `/dashboard` if authed

### Utilities
- `lib/utils.ts` — `cn()`, `formatDate()`, `formatRelativeDate()`, `slugify()`
- `styles/fonts.ts` — Google Font loaders with CSS variable exports

### Components
```
components/
├── primitives/
│   ├── label.tsx       ← font-mono 10px uppercase tracking
│   ├── pill.tsx        ← status pill (7 variants) + statusToPillVariant()
│   ├── chip.tsx        ← filter chip (solid/accent/default variants)
│   └── section-head.tsx ← bordered section header with right slot
├── public/
│   ├── nav.tsx         ← sticky blur nav, active route detection
│   ├── footer.tsx
│   └── custom-cursor.tsx ← RAF loop, respects prefers-reduced-motion
└── dashboard/
    ├── sidebar.tsx     ← 240px sidebar, 3 nav groups, account card
    └── topbar.tsx      ← breadcrumbs + ⌘K search + action slot
```

### Database
- `supabase/migrations/001_initial_schema.sql` — full schema + RLS + storage buckets

---

## Database Schema

| Table | Purpose |
|---|---|
| `profiles` | Public identity: name, title, bio, hero text, social links |
| `skills` | Skills list for About page |
| `experiences` | Work history |
| `education` | Education + certs |
| `projects` | Portfolio projects (published/draft/archived) |
| `workspace_projects` | Kanban cards (idea/planning/in progress/shipped) |
| `notes` | Private notebook entries |
| `tasks` | To-do items |
| `contact_messages` | Inbound contact form submissions |
| `settings` | Site config, appearance, feature flags |

**RLS:** Public can read `published + public` projects and profiles. All other tables are owner-only. Contact form is public insert only.

**Storage buckets:** `avatars`, `project-covers`, `project-gallery` (public), `resume` (private).

**Auto-seed trigger:** `handle_new_user()` fires on `auth.users` insert → creates `profiles` + `settings` rows automatically.

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

File: `.env.local` (already created, needs real values filled in)

---

## What still needs to be done (your action, not code)

1. **Supabase** — create project at supabase.com, copy URL + anon key into `.env.local`, run `supabase/migrations/001_initial_schema.sql` in the SQL editor
2. **GitHub push** — SSH key setup for personal account (`ROHITsai-24`) alongside company account (`rohit24-creator`)  
   - Repo: `https://github.com/ROHITsai-24/portfolio-website.git`
   - Use SSH alias `github-personal` in `~/.ssh/config`
3. **Vercel** — import GitHub repo, add 2 env vars, deploy
4. **Supabase redirect URL** — add Vercel URL to Authentication → URL Configuration → Redirect URLs

---

## Known limitations / future work

- **Notes editor**: currently a rich textarea; Tiptap not fully wired up yet
- **Image upload**: cover images and gallery are placeholder divs (no upload UI yet)
- **PDF résumé**: download button exists but no file upload flow yet
- **Magic link**: works, but requires Supabase redirect URL to be set correctly for production
- **Profile save**: editor has live preview but "Publish changes" button is not yet wired to Supabase (client state only)

---

## GitHub repo

`https://github.com/ROHITsai-24/portfolio-website.git`

## Deployment target

Vercel (not yet deployed — pending SSH push)

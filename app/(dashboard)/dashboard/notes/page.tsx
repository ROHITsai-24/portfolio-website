'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { cn } from '@/lib/utils'

interface Folder {
  id: string
  label: string
  count: number
}

interface Note {
  id: string
  folderId: string
  title: string
  preview: string
  tags: string[]
  date: string
  pinned: boolean
  body: string
}

const FOLDERS: Folder[] = [
  { id: 'ideas', label: 'Ideas', count: 12 },
  { id: 'learning', label: 'Learning', count: 8 },
  { id: 'planning', label: 'Project planning', count: 9 },
  { id: 'personal', label: 'Personal', count: 6 },
  { id: 'drafts', label: 'Drafts', count: 4 },
]

const ALL_TAGS = ['#writing', '#product', '#ux', '#code', '#ideas', '#reading', '#tools', '#career', '#design']

const NOTES: Note[] = [
  {
    id: 'n1',
    folderId: 'ideas',
    title: 'Onboarding copy — second draft',
    preview:
      'The first screen a user sees should do exactly one thing: make them feel like they made the right choice.',
    tags: ['#writing', '#product', '#ux'],
    date: 'Today',
    pinned: true,
    body: `The first screen a user sees should do exactly one thing: make them feel like they made the right choice.

Everything else is noise.

---

**Draft 2 — Hero section**

"Your work, finally organised."

Not: "The all-in-one workspace for modern creators." (too generic)
Not: "Manage your portfolio, notes, and tasks in one place." (feature-list, not benefit)
Not: "Build your portfolio in minutes." (implies it's easy, not that it's *right*)

The right line should:
1. Name a feeling, not a feature
2. Be falsifiable — someone should be able to say "no, that's not me"
3. Read well at 56px serif

---

**Secondary copy**

Option A: "Loom brings your projects, writing, and workspace into a single quiet place. No clutter. No subscription tiers. Just your work."

Option B: "Built for the solo practitioner who ships slowly and deliberately. A private workspace that respects your attention."

Option C: "Portfolio + workspace, without the bloat. Publish what you're proud of. Build everything else in private."

I lean toward Option B — it signals *who* it's for clearly, which will self-select the right users.

---

**CTA copy**

Primary: "Start building →"
Secondary: "See an example"

Avoid: "Get started free" (free implies there are paid gates), "Sign up" (too transactional), "Try it" (implies risk).

---

**Notes from user interviews**

- 3 of 5 participants said the value prop wasn't clear until they saw the dashboard
- Everyone loved "quiet" as an adjective — it signals restraint
- The word "workspace" tested better than "dashboard" or "studio"

---

**Next steps**

- [ ] A/B test Option A vs B on landing
- [ ] Run copy by Aanya (designer, good instincts)
- [ ] Write email onboarding sequence draft`,
  },
  {
    id: 'n2',
    folderId: 'ideas',
    title: 'CLI portfolio renderer — concept',
    preview: 'What if majji.dev had a terminal version? ASCII art hero, project listing, contact.',
    tags: ['#ideas', '#code'],
    date: 'Yesterday',
    pinned: false,
    body: 'What if majji.dev had a terminal version? ASCII art hero, project listing, contact info rendered in Go.',
  },
  {
    id: 'n3',
    folderId: 'ideas',
    title: 'Ambient sound generator — notes',
    preview:
      'Oscillator-based ambient sound using Web Audio API. Brown noise + binaural beats at 40Hz.',
    tags: ['#ideas', '#tools'],
    date: '2 days ago',
    pinned: false,
    body: 'Oscillator-based ambient sound using Web Audio API. Brown noise + binaural beats at 40Hz gamma.',
  },
  {
    id: 'n4',
    folderId: 'learning',
    title: 'Incremental computation — reading notes',
    preview:
      'Adapton, Salsa, Incremental (Jane Street) — three approaches to incremental computation.',
    tags: ['#reading', '#code'],
    date: '3 days ago',
    pinned: true,
    body: 'Adapton, Salsa, Incremental (Jane Street) — three approaches to incremental computation in functional systems.',
  },
  {
    id: 'n5',
    folderId: 'planning',
    title: 'Daylog v2 — product spec',
    preview: 'Daily standup logger. Morning: 3 bullets. Evening: 1 reflection. Weekly digest email.',
    tags: ['#product', '#design'],
    date: '4 days ago',
    pinned: false,
    body: 'Daily standup logger. Morning: 3 bullets. Evening: 1 reflection. Weekly digest email.',
  },
  {
    id: 'n6',
    folderId: 'personal',
    title: 'Books to read — Q2 2026',
    preview: 'Thinking in Systems, The Staff Engineer\'s Path, Working in Public, A Pattern Language.',
    tags: ['#reading'],
    date: 'Last week',
    pinned: false,
    body: 'Thinking in Systems, The Staff Engineer\'s Path, Working in Public, A Pattern Language.',
  },
  {
    id: 'n7',
    folderId: 'drafts',
    title: 'Speaking at Design Week — draft post',
    preview: 'I\'ve been thinking about what it means for a design system to "disappear"…',
    tags: ['#writing', '#career'],
    date: 'Mon',
    pinned: false,
    body: 'I\'ve been thinking about what it means for a design system to "disappear" — to recede so far into the background that no one notices it at all.',
  },
]

export default function NotesPage() {
  const [activeFolderId, setActiveFolderId] = useState('ideas')
  const [selectedNoteId, setSelectedNoteId] = useState('n1')
  const [search, setSearch] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [noteBodies, setNoteBodies] = useState<Record<string, string>>(
    Object.fromEntries(NOTES.map((n) => [n.id, n.body])),
  )
  const [noteTitles, setNoteTitles] = useState<Record<string, string>>(
    Object.fromEntries(NOTES.map((n) => [n.id, n.title])),
  )

  const activeFolder = FOLDERS.find((f) => f.id === activeFolderId) ?? FOLDERS[0]
  const folderNotes = NOTES.filter((n) => {
    const inFolder = n.folderId === activeFolderId
    if (!search) return inFolder
    return inFolder && (n.title.toLowerCase().includes(search.toLowerCase()) || n.preview.toLowerCase().includes(search.toLowerCase()))
  })
  const selectedNote = NOTES.find((n) => n.id === selectedNoteId) ?? NOTES[0]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Personal', 'Notebook', activeFolder.label, noteTitles[selectedNoteId] ?? selectedNote.title]}
        actions={
          <>
            <span className="font-mono text-[11px] text-[var(--ink-3)]">
              Saved · 12s ago
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[var(--rule)] text-[var(--ink-2)] hover:bg-[var(--paper-2)] transition-colors bg-transparent cursor-pointer text-[18px] leading-none">
              ⋯
            </button>
          </>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Folder rail ────────────────────────────────────── */}
        <div
          className="flex flex-col border-r border-[var(--rule)] overflow-auto scroll-slim shrink-0"
          style={{ width: 200 }}
        >
          <div className="p-4 pb-2">
            <Label className="block mb-3">Folders</Label>
            <div className="flex flex-col gap-0.5">
              {FOLDERS.map((folder) => {
                const active = folder.id === activeFolderId
                return (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setActiveFolderId(folder.id)
                      const firstNote = NOTES.find((n) => n.folderId === folder.id)
                      if (firstNote) setSelectedNoteId(firstNote.id)
                    }}
                    className={cn(
                      'flex items-center justify-between w-full px-2.5 py-2 rounded-md text-[12px] text-left transition-colors border-0 cursor-pointer',
                      active
                        ? 'bg-[var(--ink)] text-[var(--paper)]'
                        : 'bg-transparent text-[var(--ink-2)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]',
                    )}
                  >
                    <span className="truncate">{folder.label}</span>
                    <span
                      className={cn(
                        'font-mono text-[10px] shrink-0',
                        active ? 'opacity-60' : 'text-[var(--ink-4)]',
                      )}
                    >
                      {folder.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="px-4 pt-4 pb-4 border-t border-[var(--rule)] mt-2">
            <Label className="block mb-2.5">Tags</Label>
            <div className="flex flex-wrap gap-1">
              {ALL_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] text-[var(--ink-4)] cursor-pointer hover:text-[var(--ink-2)] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Note list ──────────────────────────────────────── */}
        <div
          className="flex flex-col border-r border-[var(--rule)] overflow-hidden shrink-0"
          style={{ width: 340 }}
        >
          {/* List header */}
          <div className="px-4 pt-5 pb-3 border-b border-[var(--rule)]">
            <div className="flex items-baseline gap-2 mb-1">
              <h2
                className="font-serif text-[24px] leading-none m-0"
                style={{ letterSpacing: '-0.01em' }}
              >
                {activeFolder.label}
              </h2>
              <span className="font-mono text-[10px] text-[var(--ink-4)]">
                {folderNotes.length}
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[var(--rule)] rounded-md px-2.5 py-1.5 mt-3">
              <Search size={12} className="text-[var(--ink-4)] shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes…"
                className="font-mono text-[11px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)] flex-1"
              />
            </div>
          </div>

          {/* Note list */}
          <div className="flex-1 overflow-auto scroll-slim">
            {folderNotes.map((note) => {
              const isSelected = note.id === selectedNoteId
              return (
                <button
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={cn(
                    'w-full text-left px-4 py-3.5 border-b border-[var(--rule-2)] transition-colors block',
                    isSelected
                      ? 'bg-[var(--paper-2)] border-l-2 border-l-[var(--ink)]'
                      : 'hover:bg-[var(--paper-2)]',
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={cn(
                        'text-[13px] truncate flex-1',
                        isSelected ? 'font-semibold text-[var(--ink)]' : 'text-[var(--ink-2)]',
                      )}
                    >
                      {noteTitles[note.id] ?? note.title}
                    </span>
                    {note.pinned && (
                      <span style={{ color: 'var(--accent-ink)', fontSize: 12 }}>★</span>
                    )}
                  </div>
                  <div
                    className="text-[11px] text-[var(--ink-3)] leading-[1.5] mb-2"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {note.preview}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {note.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] text-[var(--ink-4)]">
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto font-mono text-[9px] text-[var(--ink-4)] shrink-0">
                      {note.date}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* New note */}
          <div className="p-3 border-t border-[var(--rule)]">
            <button className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              + New note
            </button>
          </div>
        </div>

        {/* ── Editor ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto scroll-slim">
            <div className="max-w-[680px] mx-auto px-12 pt-10 pb-16">
              {/* Title */}
              <input
                value={noteTitles[selectedNote.id] ?? selectedNote.title}
                onChange={(e) =>
                  setNoteTitles((prev) => ({ ...prev, [selectedNote.id]: e.target.value }))
                }
                className="w-full font-serif bg-transparent border-0 outline-none text-[var(--ink)] leading-[1.1] mb-3"
                style={{ fontSize: 48, letterSpacing: '-0.02em' }}
                placeholder="Note title"
              />

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] text-[var(--ink-3)]">
                  {activeFolder.label} ·
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-3)]">{selectedNote.date}</span>
                {selectedNote.pinned && (
                  <span style={{ color: 'var(--accent-ink)', fontSize: 12 }}>★ Pinned</span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[var(--rule-2)] mb-7" />

              {/* Body — static rich text for now */}
              {selectedNote.id === 'n1' ? (
                <div
                  className="text-[var(--ink)] leading-[1.75] prose-like"
                  style={{ fontSize: 15 }}
                >
                  <p>
                    The first screen a user sees should do exactly one thing: make them feel
                    like they made the right choice.
                  </p>
                  <p>Everything else is noise.</p>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '28px 0' }} />
                  <h2
                    className="font-serif"
                    style={{ fontSize: 22, letterSpacing: '-0.01em', marginBottom: 12 }}
                  >
                    Draft 2 — Hero section
                  </h2>
                  <blockquote
                    style={{
                      borderLeft: '2px solid var(--ink)',
                      paddingLeft: 16,
                      marginLeft: 0,
                      fontStyle: 'italic',
                      color: 'var(--ink-2)',
                    }}
                  >
                    "Your work, finally organised."
                  </blockquote>
                  <p className="text-[var(--ink-3)] text-[13px]">
                    Not: "The all-in-one workspace for modern creators." (too generic)<br />
                    Not: "Manage your portfolio, notes, and tasks in one place." (feature-list, not benefit)<br />
                    Not: "Build your portfolio in minutes." (implies it's easy, not that it's <em>right</em>)
                  </p>
                  <p>The right line should:</p>
                  <ol style={{ paddingLeft: 20 }}>
                    <li>Name a feeling, not a feature</li>
                    <li>Be falsifiable — someone should be able to say "no, that's not me"</li>
                    <li>Read well at 56px serif</li>
                  </ol>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '28px 0' }} />
                  <h2
                    className="font-serif"
                    style={{ fontSize: 22, letterSpacing: '-0.01em', marginBottom: 12 }}
                  >
                    Secondary copy
                  </h2>
                  <p>
                    <strong>Option A:</strong> "Loom brings your projects, writing, and workspace
                    into a single quiet place. No clutter. No subscription tiers. Just your work."
                  </p>
                  <p>
                    <strong>Option B:</strong> "Built for the solo practitioner who ships slowly
                    and deliberately. A private workspace that respects your attention."
                  </p>
                  <p>
                    <strong>Option C:</strong> "Portfolio + workspace, without the bloat. Publish
                    what you're proud of. Build everything else in private."
                  </p>
                  <p>
                    I lean toward Option B — it signals <em>who</em> it's for clearly, which will
                    self-select the right users.
                  </p>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '28px 0' }} />
                  <h2
                    className="font-serif"
                    style={{ fontSize: 22, letterSpacing: '-0.01em', marginBottom: 12 }}
                  >
                    CTA copy
                  </h2>
                  <p>
                    Primary: "Start building →"<br />
                    Secondary: "See an example"
                  </p>
                  <p className="text-[var(--ink-3)] text-[13px]">
                    Avoid: "Get started free" (free implies there are paid gates), "Sign up"
                    (too transactional), "Try it" (implies risk).
                  </p>
                </div>
              ) : (
                <textarea
                  value={noteBodies[selectedNote.id] ?? selectedNote.body}
                  onChange={(e) =>
                    setNoteBodies((prev) => ({ ...prev, [selectedNote.id]: e.target.value }))
                  }
                  className="w-full bg-transparent border-0 outline-none resize-none text-[var(--ink)] leading-[1.75]"
                  style={{ fontSize: 15, minHeight: 400 }}
                  placeholder="Start writing…"
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[var(--rule)] px-12 py-3 flex items-center gap-3 flex-wrap">
            {selectedNote.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-[var(--ink-4)]">
                {tag}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-4">
              <span className="font-mono text-[10px] text-[var(--ink-4)]">
                <kbd className="border border-[var(--rule)] rounded px-1 py-px">⌘</kbd>{' '}
                <kbd className="border border-[var(--rule)] rounded px-1 py-px">S</kbd> save
              </span>
              <span className="font-mono text-[10px] text-[var(--ink-4)]">
                <kbd className="border border-[var(--rule)] rounded px-1 py-px">⌘</kbd>{' '}
                <kbd className="border border-[var(--rule)] rounded px-1 py-px">K</kbd> jump
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

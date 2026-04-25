'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Pill } from '@/components/primitives/pill'
import { Chip } from '@/components/primitives/chip'
import { cn, formatRelativeDate } from '@/lib/utils'

type Filter = 'Inbox' | 'Unread' | 'Archived'

interface Message {
  id: string
  from: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  archived: boolean
  tag: string
}

const MESSAGES: Message[] = [
  {
    id: '01',
    from: 'Aanya R.',
    email: 'aanya@studio-r.co',
    subject: 'Studio collab — interested in working together',
    preview:
      'Hey Rohith — I came across your portfolio through a mutual friend and loved what you built with Loom Ledger. Would love to explore a collaboration…',
    body: `Hey Rohith,

I came across your portfolio through a mutual friend (Priya from Vercel) and absolutely loved what you built with Loom Ledger. The double-entry approach with a clean UI is exactly the kind of thoughtful engineering I admire.

I run a small design studio focused on fintech and productivity tools, and we're looking for an engineering partner for a few upcoming projects. The engagements are typically 6–10 weeks, fully async with weekly syncs.

Would love to set up a 30-minute call to explore whether there's a fit. Happy to share more details about the projects under NDA if you're interested.

Looking forward to hearing from you,
Aanya`,
    time: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    unread: true,
    archived: false,
    tag: 'Collab',
  },
  {
    id: '02',
    from: 'Dev Sharma',
    email: 'dev@layercake.io',
    subject: 'Feedback on Quietframe — WASM performance',
    preview:
      'Tried Quietframe this morning and the WASM perf is seriously impressive. One thing I noticed though: the first load is noticeably slower than…',
    body: `Hey,

Tried Quietframe this morning and the WASM perf is seriously impressive. One thing I noticed though: the first load is noticeably slower than subsequent ones — probably cold WASM init?

Have you considered shipping a small JS fallback for the initial render and then swapping in WASM after hydration? I did something similar for our canvas renderer and it cut perceived load time by ~40%.

Anyway, great work. Following the GitHub for updates.

— Dev`,
    time: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    unread: true,
    archived: false,
    tag: 'Feedback',
  },
  {
    id: '03',
    from: 'Mira Kowalski',
    email: 'mira@designweek.io',
    subject: 'Design Week 2026 — speaker invitation',
    preview:
      "We'd love to have you speak at Design Week this October. Your talk proposal on \"Design systems that disappear\" is exactly what our audience…",
    body: `Hi Rohith,

We'd love to have you speak at Design Week 2026 in Berlin this October. Your talk proposal on "Design systems that disappear" is exactly what our audience has been asking for -- practitioners who think deeply about the intersection of engineering and design.

The conference runs Oct 14-16. We cover travel, accommodation, and offer a speaking honorarium. If you're interested, I'd love to jump on a quick call this week.

Best,
Mira Kowalski
Programme Director, Design Week`,
    time: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    unread: true,
    archived: false,
    tag: 'Speaking',
  },
  {
    id: '04',
    from: 'Karan Mehta',
    email: 'karan@buildspace.so',
    subject: 'Open source contributor — Halftone',
    preview:
      "I've been using Halftone for my design system at work and would love to contribute. I have a PR in mind for improving the token diffing…",
    body: `Hey Rohith,

I've been using Halftone for my design system at work and it's been fantastic. I have a PR in mind for improving the token diffing algorithm -- right now it does a full re-parse on every change, but we could do incremental updates instead.

Would you be open to a contribution? Happy to write tests and docs too.

Karan`,
    time: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    unread: false,
    archived: false,
    tag: 'OSS',
  },
  {
    id: '05',
    from: 'Priya Nair',
    email: 'priya@vercel.com',
    subject: 'Vercel Ship — project showcase',
    preview:
      "We're featuring a curated set of projects built on Vercel at our annual Ship conference. Loom Ledger came up in our internal list…",
    body: `Hi Rohith,

We're featuring a curated set of projects built on Vercel at our annual Ship conference. Loom Ledger came up in our internal list -- the team loved the architecture write-up on your blog.

Would you be open to a 5-minute spotlight during the main stage? It would be live-streamed and recorded. No slides required — just a quick walkthrough.

Let me know!
Priya`,
    time: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    unread: false,
    archived: false,
    tag: 'Partnership',
  },
  {
    id: '06',
    from: 'Taichi Ono',
    email: 'taichi@monorepo.io',
    subject: 'North Star — iOS sync question',
    preview:
      "Quick question about North Star: does CloudKit sync work across iCloud Family Sharing accounts? I'm trying to use it for a shared task list…",
    body: `Hey,

Quick question about North Star: does CloudKit sync work across iCloud Family Sharing accounts? I'm trying to use it for a shared task list with my wife and the sync seems to be scoped per-account.

If this isn't supported currently, would it be feasible as a feature request?

Thanks,
Taichi`,
    time: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    unread: false,
    archived: false,
    tag: 'Support',
  },
]

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>('01')
  const [filter, setFilter] = useState<Filter>('Inbox')
  const [search, setSearch] = useState('')
  const [replyText, setReplyText] = useState('')

  const unreadCount = MESSAGES.filter((m) => m.unread).length
  const filteredMessages = MESSAGES.filter((m) => {
    if (filter === 'Unread') return m.unread
    if (filter === 'Archived') return m.archived
    const q = search.toLowerCase()
    if (q) return m.from.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)
    return !m.archived
  })

  const selected = MESSAGES.find((m) => m.id === selectedId) ?? MESSAGES[0]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Workspace', 'Messages', selected.subject]}
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              Mark unread
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              Archive
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              Reply
            </button>
          </>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Message list pane ────────────────────────────────── */}
        <div
          className="flex flex-col shrink-0 border-r border-[var(--rule)] overflow-hidden"
          style={{ width: 380 }}
        >
          {/* List header */}
          <div className="px-5 pt-6 pb-4 border-b border-[var(--rule)]">
            <div className="flex items-baseline gap-2 mb-1">
              <h2 className="font-serif text-[28px] leading-none m-0" style={{ letterSpacing: '-0.01em' }}>
                Messages
              </h2>
            </div>
            <p className="font-mono text-[10px] text-[var(--ink-3)] mb-4">
              {unreadCount} unread · {MESSAGES.length} total
            </p>

            {/* Search */}
            <div className="flex items-center gap-2 border border-[var(--rule)] rounded-md px-2.5 py-1.5 mb-3">
              <Search size={12} className="text-[var(--ink-4)] shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages…"
                className="font-mono text-[11px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)] flex-1"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-1.5">
              {(['Inbox', 'Unread', 'Archived'] as Filter[]).map((f) => (
                <Chip
                  key={f}
                  as="button"
                  solid={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Chip>
              ))}
            </div>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-auto scroll-slim">
            {filteredMessages.map((msg) => {
              const isSelected = msg.id === selectedId
              return (
                <button
                  key={msg.id}
                  onClick={() => setSelectedId(msg.id)}
                  className={cn(
                    'w-full text-left px-5 py-3.5 border-b border-[var(--rule-2)] transition-colors block',
                    isSelected
                      ? 'bg-[var(--paper-2)] border-l-2 border-l-[var(--ink)]'
                      : 'hover:bg-[var(--paper-2)]',
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {msg.unread && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                      <span
                        className={cn(
                          'text-[13px]',
                          msg.unread ? 'font-semibold text-[var(--ink)]' : 'text-[var(--ink-2)]',
                        )}
                      >
                        {msg.from}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--ink-4)]">
                      {formatRelativeDate(msg.time)}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--ink)] mb-1 truncate font-medium">
                    {msg.subject}
                  </div>
                  <div
                    className="text-[12px] text-[var(--ink-3)] leading-[1.5]"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {msg.preview}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Detail pane ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto scroll-slim">
            <div className="max-w-[780px] px-16 pt-10 pb-12 mx-auto">
              {/* Meta row */}
              <Label className="block mb-3">From inbox · {formatRelativeDate(selected.time)}</Label>

              {/* Subject */}
              <h1
                className="font-serif leading-[1.1] m-0 mb-6"
                style={{ fontSize: 40, letterSpacing: '-0.02em' }}
              >
                {selected.subject}
              </h1>

              {/* Sender row */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center font-mono text-[11px] text-[var(--ink-3)] shrink-0"
                >
                  {selected.from
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[var(--ink)]">{selected.from}</div>
                  <div className="font-mono text-[11px] text-[var(--ink-3)]">{selected.email}</div>
                </div>
                <Chip accent>New conversation</Chip>
              </div>

              {/* Divider */}
              <div className="border-t border-[var(--rule)] mb-8" />

              {/* Body */}
              <div
                className="text-[var(--ink)] leading-[1.7] whitespace-pre-wrap"
                style={{ fontSize: 15 }}
              >
                {selected.body}
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="border-t border-[var(--rule)] p-6">
            <div className="max-w-[780px] mx-auto">
              <div className="border border-[var(--rule)] rounded-md overflow-hidden bg-[var(--paper-2)]">
                <div className="px-4 pt-3 pb-1 border-b border-[var(--rule)]">
                  <Label>Quick reply</Label>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder={`Reply to ${selected.from}…`}
                  className="w-full px-4 py-3 text-[13px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)] resize-none leading-[1.6]"
                />
                <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
                  <Chip as="button">→ Schedule call</Chip>
                  <Chip as="button">→ Send press kit</Chip>
                  <div className="flex-1" />
                  <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

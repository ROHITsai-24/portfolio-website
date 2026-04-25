'use client'

import { useState } from 'react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Pill } from '@/components/primitives/pill'
import { Chip } from '@/components/primitives/chip'
import { cn } from '@/lib/utils'

type Priority = 'high' | 'med' | 'low'
type ColumnId = 'idea' | 'planning' | 'progress' | 'paused' | 'completed'
type ViewMode = 'Board' | 'List' | 'Timeline'

interface Card {
  id: string
  title: string
  description: string
  tags: string[]
  due: string | null
  priority: Priority
}

interface Column {
  id: ColumnId
  label: string
  pillVariant: 'idea' | 'draft' | 'progress' | 'paused' | 'completed'
  cards: Card[]
}

const priorityColor: Record<Priority, string> = {
  high: 'var(--danger)',
  med: 'var(--warn)',
  low: 'var(--ink-4)',
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'idea',
    label: 'Idea',
    pillVariant: 'idea',
    cards: [
      {
        id: 'c1',
        title: 'Daylog v2',
        description: 'Personal daily standup logger with mood tracking and weekly digest email.',
        tags: ['productivity', 'next.js'],
        due: null,
        priority: 'low',
      },
      {
        id: 'c2',
        title: 'Untitled audio toy',
        description: 'Browser-based ambient sound generator using Web Audio API oscillators.',
        tags: ['web-audio', 'react'],
        due: null,
        priority: 'low',
      },
      {
        id: 'c3',
        title: 'CLI portfolio renderer',
        description: 'Terminal art version of majji.dev — ASCII art, project list, and contact.',
        tags: ['cli', 'go'],
        due: null,
        priority: 'low',
      },
    ],
  },
  {
    id: 'planning',
    label: 'Planning',
    pillVariant: 'draft',
    cards: [
      {
        id: 'c4',
        title: 'Daylog v2 — schema design',
        description: 'Define Postgres schema, RLS policies, and daily entry data model.',
        tags: ['supabase', 'sql'],
        due: 'May 10',
        priority: 'med',
      },
      {
        id: 'c5',
        title: 'Halftone v2 — token diffing',
        description: 'Incremental design token diff algorithm for the Figma API sync.',
        tags: ['figma-api', 'typescript'],
        due: 'May 14',
        priority: 'med',
      },
    ],
  },
  {
    id: 'progress',
    label: 'In progress',
    pillVariant: 'progress',
    cards: [
      {
        id: 'c6',
        title: 'Loom Ledger — mobile layout',
        description: 'Responsive overhaul of the transaction list and P&L chart for mobile.',
        tags: ['tailwind', 'responsive'],
        due: 'Apr 29',
        priority: 'high',
      },
      {
        id: 'c7',
        title: 'Portfolio CMS — notes page',
        description: '4-pane notes editor with folder rail, list, and Tiptap rich text editor.',
        tags: ['next.js', 'tiptap'],
        due: 'Apr 27',
        priority: 'high',
      },
      {
        id: 'c8',
        title: 'Quietframe — dark mode',
        description: 'System-aware dark mode implementation for the landing and docs pages.',
        tags: ['css', 'quietframe'],
        due: 'May 1',
        priority: 'med',
      },
    ],
  },
  {
    id: 'paused',
    label: 'Paused',
    pillVariant: 'paused',
    cards: [
      {
        id: 'c9',
        title: 'Foglamp — OpenTelemetry exporter',
        description: 'Custom trace exporter for Honeycomb. Blocked on upstream API changes.',
        tags: ['go', 'otel'],
        due: null,
        priority: 'low',
      },
      {
        id: 'c10',
        title: 'Margin — reader mode',
        description: 'Distraction-free reading view for Margin blog posts. Design pending.',
        tags: ['astro', 'css'],
        due: null,
        priority: 'low',
      },
    ],
  },
  {
    id: 'completed',
    label: 'Completed',
    pillVariant: 'completed',
    cards: [
      {
        id: 'c11',
        title: 'Halftone — public launch',
        description: 'Published Halftone to the public portfolio and announced on Twitter.',
        tags: ['portfolio'],
        due: 'Apr 24',
        priority: 'high',
      },
      {
        id: 'c12',
        title: 'North Star — CloudKit sync',
        description: 'Implemented CloudKit sync for cross-device task sharing on iOS.',
        tags: ['swift', 'cloudkit'],
        due: 'Mar 15',
        priority: 'high',
      },
      {
        id: 'c13',
        title: 'Contact form — Turnstile CAPTCHA',
        description: 'Integrated Cloudflare Turnstile to protect the public contact form.',
        tags: ['cloudflare', 'security'],
        due: 'Apr 12',
        priority: 'med',
      },
    ],
  },
]

function KanbanCard({ card }: { card: Card }) {
  return (
    <div className="lift border border-[var(--rule)] rounded-md p-3 bg-[var(--paper)] cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-[13px] text-[var(--ink)] font-medium leading-[1.35]">
          {card.title}
        </div>
        <span
          className="w-2 h-2 rounded-full shrink-0 mt-0.5"
          style={{ background: priorityColor[card.priority] }}
          title={card.priority}
        />
      </div>
      <div className="text-[11px] text-[var(--ink-3)] leading-[1.5] mb-3">
        {card.description}
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {card.tags.map((tag) => (
          <span key={tag} className="font-mono text-[9px] text-[var(--ink-4)]">
            #{tag}
          </span>
        ))}
        {card.due && (
          <span className="ml-auto font-mono text-[9px] text-[var(--ink-3)] shrink-0">
            {card.due}
          </span>
        )}
      </div>
    </div>
  )
}

export default function WorkspacePage() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS)
  const [view, setView] = useState<ViewMode>('Board')

  const totalCards = columns.reduce((sum, col) => sum + col.cards.length, 0)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Personal', 'Workspace']}
        actions={
          <>
            <div className="flex items-center border border-[var(--rule)] rounded-full overflow-hidden">
              {(['Board', 'List', 'Timeline'] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    'font-mono text-[11px] px-3.5 py-1.5 transition-colors border-0 cursor-pointer',
                    view === v
                      ? 'bg-[var(--ink)] text-[var(--paper)]'
                      : 'bg-transparent text-[var(--ink-3)] hover:text-[var(--ink)]',
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              + New
            </button>
          </>
        }
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 flex items-baseline justify-between shrink-0">
          <div>
            <h1
              className="font-serif text-[48px] m-0 mb-1.5"
              style={{ letterSpacing: '-0.02em' }}
            >
              Workspace
            </h1>
            <p className="text-[14px] text-[var(--ink-2)] m-0">
              Personal projects tracked from idea to launch — {totalCards} cards across{' '}
              {columns.length} stages.
            </p>
          </div>
        </div>

        {/* Kanban board */}
        <div className="flex-1 overflow-auto scroll-slim px-8 pb-8">
          <div
            className="grid gap-4 h-full"
            style={{
              gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
              minWidth: 1200,
              alignItems: 'start',
            }}
          >
            {columns.map((col) => (
              <div key={col.id} className="flex flex-col gap-0">
                {/* Column header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Pill variant={col.pillVariant}>{col.label}</Pill>
                    <span className="font-mono text-[10px] text-[var(--ink-4)]">
                      {col.cards.length}
                    </span>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center rounded text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors border-0 bg-transparent cursor-pointer text-[16px]">
                    +
                  </button>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {col.cards.map((card) => (
                    <KanbanCard key={card.id} card={card} />
                  ))}

                  {/* Add card button */}
                  <button className="w-full border border-dashed border-[var(--rule)] rounded-md py-2.5 font-mono text-[10px] text-[var(--ink-4)] bg-transparent cursor-pointer hover:border-[var(--ink-3)] hover:text-[var(--ink-3)] transition-colors">
                    + add card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

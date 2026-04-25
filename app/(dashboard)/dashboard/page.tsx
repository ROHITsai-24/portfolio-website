import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'
import { Chip } from '@/components/primitives/chip'
import { SectionHead } from '@/components/primitives/section-head'
import Link from 'next/link'

const STATS = [
  ['Projects · published', '8', '+1 this month'],
  ['Featured', '3', 'Loom · Quietframe · Halftone'],
  ['Drafts', '2', 'last edit 2d ago'],
  ['Notes', '47', '12 in "Ideas"'],
  ['Tasks · open', '11', '3 due this week'],
  ['Messages', '3', '1 unread'],
]

const ACTIVITY = [
  ['12:42', 'Edited project', 'Loom Ledger — case study v3'],
  ['09:15', 'New note', 'Onboarding copy — second draft'],
  ['Yesterday', 'Published', 'Halftone — public'],
  ['Yesterday', 'Task done', 'Replace cover image — Quietframe'],
  ['Tue', 'Message', 'Inbound from Aanya R. (collab)'],
  ['Mon', 'Workspace', 'Started "Daylog v2" — status: Idea'],
]

const TASKS = [
  ['Write case study intro for Halftone', 'Today', 'high', false],
  ['Reply to Aanya re: studio collab', 'Today', 'med', false],
  ['Refactor projects RLS policy', 'Wed', 'med', false],
  ['Take new portrait — golden hour', 'Fri', 'low', true],
]

export default async function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Workspace', 'Overview']}
        actions={
          <>
            <Link href="/dashboard/notes/new" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              + New note
            </Link>
            <Link href="/dashboard/projects/new" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              + New project
            </Link>
          </>
        }
      />

      <div className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-7">
          <div>
            <Label className="block mb-2.5">Sunday · 26 April 2026</Label>
            <h1 className="font-serif leading-none m-0" style={{ fontSize: 56, letterSpacing: '-0.02em' }}>
              Good morning, <em style={{ color: 'var(--accent-ink)' }}>Rohith</em>.
            </h1>
            <p className="text-[14px] text-[var(--ink-2)] mt-3.5 max-w-[520px]">
              Three messages waiting, two drafts to finish, and Halftone is trending on the Show HN front page. A good Sunday.
            </p>
          </div>
          <div className="text-right">
            <Label className="block mb-1.5">Public site</Label>
            <div className="font-serif text-[24px]">
              1,284 <span className="font-mono text-[11px] text-[var(--ink-3)]">visits / 7d</span>
            </div>
            <div className="flex gap-0.5 items-end justify-end h-8 mt-1.5">
              {[12, 18, 9, 22, 14, 28, 32].map((h, i) => (
                <span
                  key={i}
                  className="w-2 inline-block"
                  style={{ height: `${h}px`, background: i === 6 ? 'var(--accent)' : 'var(--ink-2)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div
          className="mb-8 border border-[var(--rule)]"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--rule)' }}
        >
          {STATS.map(([k, v, hint]) => (
            <div key={k} className="p-5 bg-[var(--paper)]">
              <Label className="block mb-3.5">{k}</Label>
              <div className="font-serif text-[40px] leading-none mb-2" style={{ letterSpacing: '-0.02em' }}>{v}</div>
              <div className="font-mono text-[10px] text-[var(--ink-3)]">{hint}</div>
            </div>
          ))}
        </div>

        {/* Activity + Tasks */}
        <div className="grid gap-8" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
          {/* Activity */}
          <div>
            <SectionHead label="§ Activity" right={
              <a className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink-3)] link-hover">Full log →</a>
            } />
            <div>
              {ACTIVITY.map(([t, k, what], i) => (
                <div key={i} className="grid gap-4 py-3.5 border-b border-[var(--rule-2)] items-center" style={{ gridTemplateColumns: '80px 130px 1fr 24px' }}>
                  <span className="font-mono text-[11px] text-[var(--ink-3)]">{t}</span>
                  <Chip>{k}</Chip>
                  <span className="text-[13px] text-[var(--ink)]">{what}</span>
                  <span className="text-[var(--ink-4)] text-right">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Up next */}
          <div>
            <SectionHead label="§ Up next" right={<span className="font-mono text-[10px] text-[var(--ink-3)]">4 of 11</span>} />
            <div>
              {TASKS.map(([t, due, p, done], i) => (
                <label key={i} className="flex items-center gap-3 py-3.5 border-b border-[var(--rule-2)] cursor-pointer">
                  <span className={`flex w-3.5 h-3.5 rounded-sm border shrink-0 items-center justify-center text-[10px] ${done ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]' : 'border-[var(--ink-3)]'}`}>
                    {done ? '✓' : ''}
                  </span>
                  <span className={`flex-1 text-[13px] ${done ? 'text-[var(--ink-4)] line-through' : 'text-[var(--ink)]'}`}>{t}</span>
                  <span className="font-mono text-[10px] text-[var(--ink-3)]">{due as string}</span>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p === 'high' ? 'var(--danger)' : p === 'med' ? 'var(--warn)' : 'var(--ink-4)' }} />
                </label>
              ))}
            </div>

            {/* Quick capture */}
            <div className="mt-8 p-4.5 border border-dashed border-[var(--rule)] rounded">
              <Label className="block mb-2">Quick capture</Label>
              <input className="w-full text-[13px] bg-transparent border-0 border-b border-[var(--rule)] pb-2 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)]" placeholder="Idea, task, or thought…" />
              <div className="flex gap-2 mt-2.5">
                <Chip>→ Note</Chip>
                <Chip>→ Task</Chip>
                <Chip>→ Idea</Chip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

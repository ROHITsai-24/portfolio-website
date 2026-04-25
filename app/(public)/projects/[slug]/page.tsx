import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'
import { SectionHead } from '@/components/primitives/section-head'

const FALLBACK: Record<string, {
  title: string; slug: string; category: string; status: string; year: string;
  role: string; timeline: string; stack: string; users: string;
  problem_statement: string; solution: string; short_description: string;
  tech_stack: string[]; features: { title: string; description: string }[];
  dev_notes: { date: string; note: string }[]; live_url?: string; github_url?: string;
}> = {
  'loom-ledger': {
    title: 'Loom Ledger', slug: 'loom-ledger', category: 'Fintech', status: 'published', year: '2025',
    role: 'Solo · design + eng', timeline: 'Aug 2024 — present', stack: 'Next.js · Postgres · tRPC · Tailwind', users: 'Public beta · 340 users',
    short_description: 'Double-entry bookkeeping reimagined for indie founders. Replaces three spreadsheets and a tax-time prayer with a single, plain-language ledger.',
    problem_statement: 'Indie founders cobble together three spreadsheets, two SaaS tools, and a tax-time panic. Existing accounting software optimizes for accountants, not the people doing the work.',
    solution: 'A double-entry ledger that reads like a notebook. Every transaction has a story, every report fits on one page, and the export to your accountant is a single CSV they actually thank you for.',
    tech_stack: ['Next.js', 'Postgres', 'tRPC', 'Tailwind'],
    features: [
      { title: 'Plain-language entries', description: 'Type "$48 coffee with Aanya, marketing" — Loom infers the accounts.' },
      { title: 'Receipts on lines', description: 'Attach to transactions, not invoices. Searchable, exportable.' },
      { title: 'One-page reports', description: 'P&L, balance sheet, runway — each on a single readable page.' },
      { title: 'Multi-currency', description: 'Daily rates from ECB. Conversions are visible, never hidden.' },
      { title: 'Auditor share', description: 'Read-only link expires automatically. No new logins for your CPA.' },
      { title: 'Importers', description: 'Stripe, Wise, and a generic CSV that handles the messy stuff.' },
    ],
    dev_notes: [
      { date: 'Sep 2024', note: 'First prototype in a weekend. Postgres + a single React table. It was ugly and worked.' },
      { date: 'Dec 2024', note: 'Rewrote the entry parser three times. The third one was simple. The first two were clever.' },
      { date: 'Mar 2025', note: 'Closed beta with 12 founders. Three pieces of feedback changed the product. The other 200 didn\'t.' },
      { date: 'Apr 2026', note: 'Public beta. 340 users in three weeks. Most found us through one HN post and a single tweet.' },
    ],
    live_url: 'loomledger.app', github_url: 'github.com/rohithsai/loom',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = FALLBACK[slug]
  if (!project) return { title: 'Project' }
  return {
    title: `${project.title} — Rohith Sai`,
    description: project.short_description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let project = FALLBACK[slug] ?? null

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('visibility', 'public')
      .single()

    if (data) project = data
  } catch {}

  if (!project) notFound()

  return (
    <div className="bg-[var(--paper)]">
      {/* Breadcrumb + chips */}
      <section className="px-14 pt-10 flex justify-between items-baseline">
        <div className="font-mono text-[11px] text-[var(--ink-3)] tracking-[0.08em]">
          <Link href="/projects" className="link-hover">Projects</Link>
          {' '}<span className="text-[var(--ink-4)]">/</span>{' '}
          <span className="text-[var(--ink)]">{project.title}</span>
        </div>
        <div className="flex gap-2">
          <Pill variant={statusToPillVariant(project.status)}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Pill>
          <Chip>{project.year}</Chip>
          <Chip>{project.category}</Chip>
        </div>
      </section>

      {/* Hero */}
      <section className="px-14 py-12">
        <Label className="block mb-3.5">§ Case study · 01 / 12</Label>
        <h1 className="font-serif leading-[0.92] mb-6" style={{ fontSize: 112, letterSpacing: '-0.02em' }}>
          {project.title.split(' ').slice(0, -1).join(' ')}{' '}
          <em style={{ color: 'var(--accent-ink)' }}>{project.title.split(' ').slice(-1)[0]}.</em>
        </h1>
        <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-baseline">
          <p className="text-[20px] leading-[1.5] text-[var(--ink-2)] max-w-[640px] m-0">
            {project.short_description}
          </p>
          <div className="flex flex-col gap-3">
            {project.live_url && (
              <a href={`https://${project.live_url}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[13px] font-medium transition-all hover:-translate-y-px">
                Visit {project.live_url} →
              </a>
            )}
            {project.github_url && (
              <a href={`https://${project.github_url}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[13px] font-medium bg-transparent transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                Source on GitHub →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-14 pb-12">
        <div className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center" style={{ aspectRatio: '16/8' }}>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-3)]">HERO · 1920 × 960 — product shot</span>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-14 pb-12 border-b border-[var(--ink)] grid grid-cols-4 gap-8">
        {[
          ['Role', project.role],
          ['Timeline', project.timeline],
          ['Stack', project.stack ?? (project.tech_stack ?? []).join(' · ')],
          ['Status', project.users ?? project.status],
        ].map(([k, v]) => (
          <div key={k}>
            <Label className="block mb-2">{k}</Label>
            <div className="text-[14px] text-[var(--ink)] leading-[1.4]">{v}</div>
          </div>
        ))}
      </section>

      {/* Problem */}
      <section className="px-14 py-14 grid grid-cols-[200px_1fr] gap-12 border-b border-[var(--rule)]">
        <div>
          <Label className="block">§ 01</Label>
          <div className="font-serif text-[32px] mt-1.5">Problem</div>
        </div>
        <div className="max-w-[680px]">
          <p className="font-serif text-[28px] leading-[1.35] mb-4.5">{project.problem_statement}</p>
        </div>
      </section>

      {/* Solution */}
      <section className="px-14 py-14 grid grid-cols-[200px_1fr] gap-12 border-b border-[var(--rule)]">
        <div>
          <Label className="block">§ 02</Label>
          <div className="font-serif text-[32px] mt-1.5">Solution</div>
        </div>
        <div className="max-w-[680px]">
          <p className="font-serif text-[28px] leading-[1.35] mb-4.5">{project.solution}</p>
        </div>
      </section>

      {/* Features */}
      <section className="px-14 py-14 border-b border-[var(--rule)]">
        <SectionHead label="§ 03 · Features" />
        <div className="grid grid-cols-3 gap-8">
          {(project.features ?? []).map((f: { title: string; description: string }, i: number) => (
            <div key={f.title}>
              <div className="font-mono text-[11px] text-[var(--ink-4)] mb-2">0{i + 1}</div>
              <div className="font-serif text-[22px] mb-2">{f.title}</div>
              <div className="text-[13px] text-[var(--ink-2)] leading-[1.55]">{f.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-14 py-14 border-b border-[var(--rule)]">
        <SectionHead label="§ 04 · Gallery" />
        <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
          <div className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center" style={{ aspectRatio: '16/10' }}>
            <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">LEDGER VIEW — desktop</span>
          </div>
          <div className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center" style={{ aspectRatio: '4/5' }}>
            <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">MOBILE — txn entry</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['P&L REPORT', 'BALANCE SHEET', 'AUDITOR SHARE'].map((l) => (
            <div key={l} className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
              <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dev notes */}
      <section className="px-14 py-14 grid grid-cols-[200px_1fr] gap-12 border-b border-[var(--rule)]">
        <div>
          <Label className="block">§ 05</Label>
          <div className="font-serif text-[32px] mt-1.5">Notes</div>
        </div>
        <div className="flex flex-col gap-4 max-w-[680px]">
          {(project.dev_notes ?? []).map((n: { date: string; note: string }, i: number) => (
            <div key={i} className="grid grid-cols-[80px_1fr] gap-4.5 pb-3.5 border-b border-[var(--rule-2)]">
              <span className="font-mono text-[11px] text-[var(--ink-3)]">{n.date}</span>
              <span className="text-[14px] leading-[1.55] text-[var(--ink-2)]">{n.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-14 py-14 grid grid-cols-2 gap-8">
        <Link href="/projects" className="lift p-6 border border-[var(--rule)] rounded block no-underline text-inherit">
          <div className="font-mono text-[11px] text-[var(--ink-3)] mb-1.5">← Previous</div>
          <div className="font-serif text-[28px]">Margin</div>
          <div className="text-[13px] text-[var(--ink-3)]">A slow-blog about engineering taste.</div>
        </Link>
        <Link href="/projects" className="lift p-6 border border-[var(--rule)] rounded block no-underline text-inherit text-right">
          <div className="font-mono text-[11px] text-[var(--ink-3)] mb-1.5">Next →</div>
          <div className="font-serif text-[28px]">Quietframe</div>
          <div className="text-[13px] text-[var(--ink-3)]">Local-first screenshot annotator.</div>
        </Link>
      </section>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SectionHead } from '@/components/primitives/section-head'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'

const FALLBACK_PROJECTS = [
  { id: '1', num: '01', title: 'Loom Ledger', slug: 'loom-ledger', category: 'Fintech', tech_stack: ['Next.js', 'Postgres', 'tRPC'], year: '2025', status: 'published', blurb: 'Double-entry bookkeeping reimagined for indie founders. Replaces three spreadsheets and a prayer.', is_featured: true },
  { id: '2', num: '02', title: 'Quietframe', slug: 'quietframe', category: 'Developer Tools', tech_stack: ['Rust', 'WASM', 'React'], year: '2025', status: 'published', blurb: 'A local-first screenshot annotator. No cloud, no telemetry, no nag screens.', is_featured: true },
  { id: '3', num: '04', title: 'Halftone', slug: 'halftone', category: 'Design Systems', tech_stack: ['TypeScript', 'Figma API'], year: '2024', status: 'published', blurb: 'Audit Figma libraries for token drift. Ships a single PR with the diff.', is_featured: true },
  { id: '4', num: '03', title: 'North Star', slug: 'north-star', category: 'Productivity', tech_stack: ['Swift', 'CloudKit'], year: '2024', status: 'published', blurb: 'A weekly planner that asks one question on Monday morning and gets out of the way.', is_featured: true },
]

const SKILLS = ['TypeScript', 'Next.js', 'Postgres', 'Rust', 'Distributed systems', 'Design systems', 'tRPC', 'Tailwind', 'Supabase', 'Go']

const SOCIAL = [
  { key: 'GitHub',      value: '@rohithsai',      url: 'github.com/rohithsai' },
  { key: 'LinkedIn',    value: 'Rohith Sai Majji', url: 'in/rohithsai' },
  { key: 'Twitter / X', value: '@rohith_writes',   url: 'x.com/rohith_writes' },
  { key: 'Read.cv',     value: 'Rohith Sai',       url: 'read.cv/rohith' },
]

export default async function HomePage() {
  let projects = FALLBACK_PROJECTS

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('id,title,slug,short_description,category,tech_stack,status,is_featured,created_at')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .eq('is_featured', true)
      .order('display_order')
      .limit(4)

    if (data && data.length > 0) {
      projects = data.map((p, i) => ({
        ...p,
        num: String(i + 1).padStart(2, '0'),
        blurb: p.short_description ?? '',
        year: new Date(p.created_at).getFullYear().toString(),
      }))
    }
  } catch {}

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)]" style={{ cursor: 'none' }}>
      {/* HERO */}
      <section className="px-14 pt-20 pb-10 relative">
        <div className="grid grid-cols-2 gap-16 items-end">
          {/* Left */}
          <div>
            <div className="rise">
              <Label className="flex items-center gap-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] inline-block" />
                Available for select work — Q3 2026
              </Label>
            </div>
            <h1 className="font-serif rise" style={{ fontSize: 128, lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
              <span style={{ animationDelay: '.05s' }}>Majji</span><br />
              <span style={{ animationDelay: '.15s' }}>Rohith</span>{' '}
              <span style={{ animationDelay: '.25s', fontStyle: 'italic', color: 'var(--accent-ink)' }}>Sai.</span>
            </h1>
            <div className="rise" style={{ animationDelay: '.4s' }}>
              <p className="text-[17px] leading-[1.55] text-[var(--ink-2)] max-w-[520px] mt-9 mb-10">
                Software engineer building quiet, durable tools for the web. I care about the gap between a feature shipping and a feature feeling right — and most of my work happens there.
              </p>
            </div>
            <div className="rise flex gap-3 flex-wrap" style={{ animationDelay: '.55s' }}>
              <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[13px] font-medium transition-all hover:-translate-y-px hover:shadow-lg">
                View projects →
              </Link>
              <Link href="/resume" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[13px] font-medium bg-transparent transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                Download résumé
              </Link>
              <a href="mailto:rohith@majji.dev" className="inline-flex items-center gap-2 px-0 py-2.5 text-[var(--ink)] text-[13px] border-b border-[var(--ink-3)] link-hover">
                rohith@majji.dev
              </a>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="relative">
            <div
              className="w-full bg-[var(--paper-2)] border border-[var(--rule)]"
              style={{ aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-3)]">Portrait · 4:5</span>
            </div>
            <div className="absolute bottom-[-12px] right-[-8px] px-3 py-2 bg-[var(--paper)] border border-[var(--ink)]">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase">Hyderabad · IST +5:30</span>
            </div>
          </div>
        </div>

        {/* Skills marquee */}
        <div className="border-t border-[var(--ink)] border-b border-b-[var(--rule)] mt-20 py-4.5 flex gap-10 overflow-hidden">
          {SKILLS.map((skill, i) => (
            <span key={skill} className={`font-mono text-[12px] whitespace-nowrap ${i % 3 === 0 ? 'text-[var(--ink)]' : 'text-[var(--ink-3)]'}`}>
              <span className="text-[var(--ink-4)] mr-2">{String(i + 1).padStart(2, '0')}</span>{skill}
            </span>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-14 py-12 pb-20">
        <SectionHead
          label="§ 02 · Selected work"
          right={
            <Link href="/projects" className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink-3)] link-hover">
              All projects (12) →
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-8">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="lift block no-underline text-inherit">
              <div
                className="bg-[var(--paper-2)] border border-[var(--rule)] mb-4 flex items-center justify-center"
                style={{ aspectRatio: '16/10' }}
              >
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-3)]">
                  {p.title.toUpperCase()} — COVER
                </span>
              </div>
              <div className="flex items-baseline gap-3.5 mb-1.5">
                <span className="font-mono text-[11px] text-[var(--ink-4)]">{p.num}</span>
                <span className="font-serif text-[30px] leading-none">{p.title}</span>
                <span className="flex-1 border-b border-dotted border-[var(--rule)] mb-1.5" />
                <span className="font-mono text-[11px] text-[var(--ink-3)]">{p.year}</span>
              </div>
              <p className="text-[14px] text-[var(--ink-2)] leading-[1.5] mb-3 max-w-[480px]">{p.blurb}</p>
              <div className="flex gap-1.5 flex-wrap">
                <Chip>{p.category}</Chip>
                {(p.tech_stack as string[]).slice(0, 3).map((s) => <Chip key={s}>{s}</Chip>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NOW + ELSEWHERE */}
      <section className="px-14 py-12 border-t border-[var(--ink)] grid grid-cols-2 gap-16">
        <div>
          <Label className="block mb-4.5">§ 03 · Now</Label>
          <p className="font-serif text-[32px] leading-[1.25] max-w-[520px]" style={{ margin: 0 }}>
            Building <em style={{ color: 'var(--accent-ink)' }}>Loom Ledger</em> from a small studio in Hyderabad. Reading <em>The Soul of a New Machine</em>. Learning to brew a passable filter coffee.
          </p>
        </div>
        <div>
          <Label className="block mb-4.5">§ 04 · Elsewhere</Label>
          <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
            {SOCIAL.map(({ key, value, url }) => (
              <li key={key} className="flex items-baseline gap-3.5">
                <span className="font-mono text-[11px] text-[var(--ink-3)] min-w-[96px]">{key}</span>
                <span className="text-[15px] link-hover cursor-pointer">{value}</span>
                <span className="flex-1 border-b border-dotted border-[var(--rule)]" />
                <span className="font-mono text-[11px] text-[var(--ink-4)]">{url}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

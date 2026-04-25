import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'
import { ProjectFilters } from './project-filters'

const FALLBACK_PROJECTS = [
  { id: '1', num: '01', title: 'Loom Ledger', slug: 'loom-ledger', short_description: 'Double-entry bookkeeping reimagined for indie founders. Replaces three spreadsheets and a prayer.', category: 'Fintech', tech_stack: ['Next.js', 'Postgres', 'tRPC'], status: 'published', year: '2025' },
  { id: '2', num: '02', title: 'Quietframe', slug: 'quietframe', short_description: 'A local-first screenshot annotator. No cloud, no telemetry, no nag screens.', category: 'Developer Tools', tech_stack: ['Rust', 'WASM', 'React'], status: 'published', year: '2025' },
  { id: '3', num: '03', title: 'North Star', slug: 'north-star', short_description: 'A weekly planner that asks one question on Monday morning and gets out of the way.', category: 'Productivity', tech_stack: ['Swift', 'CloudKit'], status: 'published', year: '2024' },
  { id: '4', num: '04', title: 'Halftone', slug: 'halftone', short_description: 'Audit Figma libraries for token drift. Ships a single PR with the diff.', category: 'Design Systems', tech_stack: ['TypeScript', 'Figma API'], status: 'published', year: '2024' },
  { id: '5', num: '05', title: 'Foglamp', slug: 'foglamp', short_description: 'A pragmatic OTel collector for small teams. Sunset when the upstream caught up.', category: 'Infrastructure', tech_stack: ['Go', 'OpenTelemetry'], status: 'archived', year: '2023' },
  { id: '6', num: '06', title: 'Margin', slug: 'margin', short_description: 'My slow-blog. Essays on engineering taste, half-finished arguments.', category: 'Writing', tech_stack: ['Astro', 'MDX'], status: 'published', year: '2023' },
]

export default async function ProjectsPage() {
  let projects = FALLBACK_PROJECTS

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('id,title,slug,short_description,category,tech_stack,status,created_at,display_order')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .order('display_order')

    if (data && data.length > 0) {
      projects = data.map((p, i) => ({
        ...p,
        num: String(i + 1).padStart(2, '0'),
        year: new Date(p.created_at).getFullYear().toString(),
      }))
    }
  } catch {}

  return (
    <div className="bg-[var(--paper)]">
      {/* Hero */}
      <section className="px-14 pt-[72px] pb-10">
        <Label className="block mb-4.5">§ Projects · 2021–2026</Label>
        <h1 className="font-serif leading-[0.95] mb-6" style={{ fontSize: 88, letterSpacing: '-0.02em', maxWidth: 900 }}>
          Twelve things <em style={{ color: 'var(--accent-ink)' }}>shipped</em>, three quietly retired,
          and a handful still cooking.
        </h1>
        <p className="text-[15px] leading-[1.55] text-[var(--ink-2)] max-w-[560px]">
          Each entry is a real project I designed and built. Click through for the case study, code,
          or the post-mortem if it didn't make it.
        </p>
      </section>

      {/* Filter rail + list — client component handles filtering */}
      <ProjectFilters projects={projects} />
    </div>
  )
}

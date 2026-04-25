import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'
import { SectionHead } from '@/components/primitives/section-head'
import { MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const FALLBACK = [
  { id: '01', title: 'Loom Ledger', slug: 'loom-ledger', category: 'Fintech', status: 'published', visibility: 'public', is_featured: true, tech_stack: ['Next.js', 'Postgres', 'tRPC'], updated_at: '2025-04-12' },
  { id: '02', title: 'Quietframe', slug: 'quietframe', category: 'Developer Tools', status: 'published', visibility: 'public', is_featured: true, tech_stack: ['Rust', 'WASM', 'React'], updated_at: '2025-04-08' },
  { id: '03', title: 'North Star', slug: 'north-star', category: 'Productivity', status: 'published', visibility: 'public', is_featured: false, tech_stack: ['Swift', 'CloudKit'], updated_at: '2025-03-02' },
  { id: '04', title: 'Halftone', slug: 'halftone', category: 'Design Systems', status: 'published', visibility: 'public', is_featured: true, tech_stack: ['TypeScript', 'Figma API'], updated_at: '2025-04-24' },
  { id: '05', title: 'Foglamp', slug: 'foglamp', category: 'Infrastructure', status: 'archived', visibility: 'public', is_featured: false, tech_stack: ['Go', 'OpenTelemetry'], updated_at: '2023-11-11' },
  { id: '06', title: 'Margin', slug: 'margin', category: 'Writing', status: 'published', visibility: 'public', is_featured: false, tech_stack: ['Astro', 'MDX'], updated_at: '2025-02-19' },
  { id: '07', title: 'Daylog v2', slug: 'daylog-v2', category: '—', status: 'draft', visibility: 'private', is_featured: false, tech_stack: ['Next.js', 'Supabase'], updated_at: new Date().toISOString() },
  { id: '08', title: 'Untitled audio toy', slug: 'audio-toy', category: '—', status: 'draft', visibility: 'private', is_featured: false, tech_stack: ['Web Audio', 'React'], updated_at: new Date(Date.now() - 2 * 86400000).toISOString() },
]

export default async function CMSProjectsPage() {
  let projects = FALLBACK

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('id,title,slug,category,status,visibility,is_featured,tech_stack,updated_at')
      .order('display_order')
    if (data && data.length > 0) projects = data as typeof FALLBACK
  } catch {}

  const published = projects.filter((p) => p.status === 'published').length
  const drafts = projects.filter((p) => p.status === 'draft').length
  const archived = projects.filter((p) => p.status === 'archived').length
  const featured = projects.filter((p) => p.is_featured).length

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Workspace', 'Projects']}
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              Reorder
            </button>
            <Link href="/dashboard/projects/new" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              + New project
            </Link>
          </>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="px-8 py-8 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-[48px] m-0 mb-1.5" style={{ letterSpacing: '-0.02em' }}>Projects</h1>
            <p className="text-[14px] text-[var(--ink-2)] m-0">
              {projects.length} total · {published} published · {drafts} drafts · {archived} archived
            </p>
          </div>
          <div className="flex gap-2">
            <Chip solid>All · {projects.length}</Chip>
            <Chip>Published · {published}</Chip>
            <Chip>Drafts · {drafts}</Chip>
            <Chip>Archived · {archived}</Chip>
            <Chip>Featured · {featured}</Chip>
          </div>
        </div>

        {/* Table */}
        <div className="px-8 pb-8">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4 w-8"><span className="w-3.5 h-3.5 border border-[var(--rule)] rounded inline-block" /></th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4 w-10">#</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Title</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Category</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Stack</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Status</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Public</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Featured</th>
                <th className="text-left font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] font-medium py-3 px-4">Updated</th>
                <th className="py-3 px-4 w-8" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.id} className="border-b border-[var(--rule-2)] hover:bg-[var(--paper-2)] group">
                  <td className="py-4 px-4"><span className="w-3.5 h-3.5 border border-[var(--rule)] rounded inline-block" /></td>
                  <td className="py-4 px-4"><span className="font-mono text-[11px] text-[var(--ink-4)]">{String(i + 1).padStart(2, '0')}</span></td>
                  <td className="py-4 px-4">
                    <Link href={`/dashboard/projects/${p.id}/edit`} className="block no-underline text-inherit">
                      <div className="font-serif text-[18px] leading-[1.1]">{p.title}</div>
                      <div className="font-mono text-[10px] text-[var(--ink-4)] mt-0.5">/projects/{p.slug}</div>
                    </Link>
                  </td>
                  <td className="py-4 px-4"><span className="font-mono text-[11px] text-[var(--ink-2)]">{p.category}</span></td>
                  <td className="py-4 px-4"><span className="font-mono text-[10px] text-[var(--ink-3)]">{(p.tech_stack as string[]).slice(0, 3).join(' · ')}</span></td>
                  <td className="py-4 px-4"><Pill variant={statusToPillVariant(p.status)}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</Pill></td>
                  <td className="py-4 px-4"><span className="text-[13px]" style={{ color: p.visibility === 'public' ? 'var(--ink)' : 'var(--ink-4)' }}>{p.visibility === 'public' ? '●' : '○'}</span></td>
                  <td className="py-4 px-4"><span className="text-[13px]" style={{ color: p.is_featured ? 'var(--accent-ink)' : 'var(--ink-4)' }}>{p.is_featured ? '★' : '☆'}</span></td>
                  <td className="py-4 px-4"><span className="font-mono text-[11px] text-[var(--ink-3)]">{formatDate(p.updated_at)}</span></td>
                  <td className="py-4 px-4 text-right">
                    <Link href={`/dashboard/projects/${p.id}/edit`} className="text-[var(--ink-4)] hover:text-[var(--ink)]">
                      <MoreHorizontal size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

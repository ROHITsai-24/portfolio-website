'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { Pill, statusToPillVariant } from '@/components/primitives/pill'

interface Project {
  id: string
  num: string
  title: string
  slug: string
  short_description: string
  category: string
  tech_stack: string[]
  status: string
  year: string
}

const CATEGORIES = ['All', 'Fintech', 'Developer Tools', 'Productivity', 'Design Systems', 'Infrastructure', 'Writing']

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const visible = projects.filter((p) => {
    const matchCat = filter === 'All' || p.category === filter
    const q = query.toLowerCase()
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.tech_stack ?? []).some((t) => t.toLowerCase().includes(q))
    return matchCat && matchQ
  })

  return (
    <>
      {/* filter rail */}
      <section className="px-14 pb-5 flex items-center gap-2.5 border-b border-[var(--rule)] flex-wrap">
        <Label className="mr-3.5">Filter</Label>
        {CATEGORIES.map((cat) => (
          <Chip key={cat} solid={filter === cat} onClick={() => setFilter(cat)} as="button">
            {cat}
          </Chip>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-2 border border-[var(--rule)] rounded-full px-3.5 py-1.5 min-w-[280px]">
          <Search size={13} className="text-[var(--ink-4)]" />
          <input
            className="font-mono text-[12px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)] flex-1"
            placeholder="Search projects, tech, year…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="font-mono text-[10px] text-[var(--ink-4)] border border-[var(--rule)] px-1 py-px rounded">⌘ K</kbd>
        </div>
      </section>

      {/* index list */}
      <section className="px-14 pt-6 pb-20">
        {/* header row */}
        <div
          className="grid gap-5 py-2.5 border-b border-[var(--ink)]"
          style={{ gridTemplateColumns: '40px 1.4fr 0.9fr 1fr 80px 80px' }}
        >
          <Label>#</Label>
          <Label>Project</Label>
          <Label>Category</Label>
          <Label>Stack</Label>
          <Label>Year</Label>
          <Label className="text-right">Status</Label>
        </div>

        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="lift grid gap-5 py-5 border-b border-[var(--rule-2)] items-center no-underline text-inherit"
            style={{ gridTemplateColumns: '40px 1.4fr 0.9fr 1fr 80px 80px' }}
          >
            <span className="font-mono text-[12px] text-[var(--ink-4)]">{p.num}</span>
            <div>
              <div className="font-serif text-[28px] leading-[1.1]">{p.title}</div>
              <div className="text-[13px] text-[var(--ink-3)] mt-1 leading-[1.45] max-w-[520px] line-clamp-2">{p.short_description}</div>
            </div>
            <span className="font-mono text-[12px] text-[var(--ink-2)]">{p.category}</span>
            <div className="flex gap-1.5 flex-wrap">
              {(p.tech_stack ?? []).map((s) => (
                <span key={s} className="inline-block px-1.5 py-0.5 border border-[var(--rule)] rounded text-[var(--ink-3)] font-mono text-[10px]">
                  {s}
                </span>
              ))}
            </div>
            <span className="font-mono text-[12px] text-[var(--ink-3)]">{p.year}</span>
            <div className="flex justify-end">
              <Pill variant={statusToPillVariant(p.status)}>
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </Pill>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}

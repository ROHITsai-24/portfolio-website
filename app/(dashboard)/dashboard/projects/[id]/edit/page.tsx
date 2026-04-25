'use client'

import { useState } from 'react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Pill } from '@/components/primitives/pill'
import { Chip } from '@/components/primitives/chip'
import { SectionHead } from '@/components/primitives/section-head'
import { cn } from '@/lib/utils'

const TABS = ['Content', 'Media', 'Meta', 'Settings'] as const
type Tab = (typeof TABS)[number]

const FALLBACK_PROJECT = {
  id: '01',
  title: 'Loom Ledger',
  slug: 'loom-ledger',
  status: 'published' as const,
  visibility: 'public',
  is_featured: true,
  category: 'Fintech',
  tech_stack: ['Next.js', 'Postgres', 'tRPC', 'Tailwind', 'Stripe'],
  live_url: 'https://loomledger.app',
  github_url: 'https://github.com/rohithsai/loom-ledger',
  short_description:
    'A lightweight double-entry bookkeeping tool built for indie makers — no bloat, no subscription, no nonsense.',
  problem:
    'Every invoicing tool I tried was either too complex for a solo operator or buried crucial data behind paywalls. I needed a clean ledger that surfaced P&L at a glance without requiring an accountant.',
  solution:
    'Loom Ledger uses double-entry accounting under the hood but surfaces a simple transaction log, monthly P&L chart, and exportable CSV. The entire data model lives in Postgres with row-level security per workspace.',
  features: `- Double-entry ledger with automatic balancing\n- Real-time P&L chart (monthly/quarterly)\n- Invoice generation with Stripe payment links\n- CSV/PDF export\n- Multi-workspace support\n- Offline-first (IndexedDB sync)`,
}

type Status = 'draft' | 'published' | 'archived'
type Visibility = 'public' | 'private' | 'unlisted'

export default function ProjectEditPage() {
  const [title, setTitle] = useState(FALLBACK_PROJECT.title)
  const [slug, setSlug] = useState(FALLBACK_PROJECT.slug)
  const [tab, setTab] = useState<Tab>('Content')
  const [status, setStatus] = useState<Status>(FALLBACK_PROJECT.status)
  const [visibility, setVisibility] = useState<Visibility>(
    FALLBACK_PROJECT.visibility as Visibility,
  )
  const [isFeatured, setIsFeatured] = useState(FALLBACK_PROJECT.is_featured)
  const [category, setCategory] = useState(FALLBACK_PROJECT.category)
  const [techStack, setTechStack] = useState<string[]>(FALLBACK_PROJECT.tech_stack)
  const [liveUrl, setLiveUrl] = useState(FALLBACK_PROJECT.live_url)
  const [githubUrl, setGithubUrl] = useState(FALLBACK_PROJECT.github_url)
  const [shortDesc, setShortDesc] = useState(FALLBACK_PROJECT.short_description)
  const [problem, setProblem] = useState(FALLBACK_PROJECT.problem)
  const [solution, setSolution] = useState(FALLBACK_PROJECT.solution)
  const [features, setFeatures] = useState(FALLBACK_PROJECT.features)
  const [newTag, setNewTag] = useState('')

  const inputClass =
    'w-full px-3 py-2.5 text-[13px] bg-transparent border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none focus:border-[var(--ink)] transition-colors'

  const removeTag = (tag: string) => setTechStack((s) => s.filter((t) => t !== tag))
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTechStack((s) => [...s, newTag.trim()])
      setNewTag('')
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Projects', title]}
        actions={
          <>
            <span className="font-mono text-[11px] text-[var(--ink-3)] flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--good)' }}
              />
              Autosaved
            </span>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              Preview →
            </button>
            <button
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px"
              onClick={() => setStatus('published')}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--good)' }}
              />
              Publish
            </button>
          </>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="grid h-full" style={{ gridTemplateColumns: '1fr 320px' }}>
          {/* ── Left column ──────────────────────────────────────── */}
          <div className="overflow-auto p-10 border-r border-[var(--rule)]">
            {/* Inline title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full font-serif bg-transparent border-0 outline-none text-[var(--ink)] leading-none mb-3"
              style={{ fontSize: 48, letterSpacing: '-0.02em' }}
              placeholder="Project title"
            />

            {/* Slug editor */}
            <div className="flex items-center gap-2 mb-7">
              <span className="font-mono text-[11px] text-[var(--ink-3)]">/projects/</span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="font-mono text-[11px] text-[var(--ink-2)] bg-transparent border-0 border-b border-dashed border-[var(--rule)] outline-none focus:border-[var(--ink)] pb-px transition-colors"
                style={{ width: `${Math.max(slug.length, 8)}ch` }}
              />
              <button className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-4)] hover:text-[var(--ink)] transition-colors">
                Regenerate
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-0 border-b border-[var(--rule)] mb-8">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'font-mono text-[11px] tracking-[0.08em] px-4 py-2.5 bg-transparent border-0 cursor-pointer transition-colors',
                    tab === t
                      ? 'text-[var(--ink)] border-b-2 border-[var(--ink)] -mb-px'
                      : 'text-[var(--ink-3)] hover:text-[var(--ink)]',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab: Content */}
            {tab === 'Content' && (
              <div className="grid gap-8">
                {/* Cover image */}
                <div>
                  <Label className="block mb-2">Cover image</Label>
                  <div
                    className="relative rounded-md overflow-hidden bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center"
                    style={{ aspectRatio: '16/8' }}
                  >
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">
                      COVER IMAGE
                    </span>
                    <div className="absolute bottom-3 right-3">
                      <Chip as="button">Replace →</Chip>
                    </div>
                  </div>
                </div>

                {/* Short description */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    Short description · 160 chars
                  </label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="One-sentence description for listings and SEO"
                  />
                  <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1 text-right">
                    {shortDesc.length}/160
                  </div>
                </div>

                {/* Problem */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    Problem
                  </label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="What problem does this solve?"
                  />
                </div>

                {/* Solution */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    Solution
                  </label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How did you solve it?"
                  />
                </div>

                {/* Features — mono textarea */}
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    Features · markdown list
                  </label>
                  <textarea
                    className={cn(inputClass, 'font-mono text-[12px] leading-relaxed')}
                    rows={8}
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="- Feature one&#10;- Feature two"
                  />
                </div>
              </div>
            )}

            {/* Tab: Media */}
            {tab === 'Media' && (
              <div className="grid gap-6">
                <div>
                  <Label className="block mb-3">Gallery · 4 columns</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-video bg-[var(--paper-2)] border border-[var(--rule)] rounded flex items-center justify-center cursor-pointer hover:border-[var(--ink-3)] transition-colors group"
                      >
                        {i < 3 ? (
                          <span className="font-mono text-[9px] uppercase text-[var(--ink-3)]">
                            IMG {i + 1}
                          </span>
                        ) : (
                          <span className="font-mono text-[18px] text-[var(--rule)] group-hover:text-[var(--ink-3)] transition-colors">
                            +
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-[var(--ink-4)] mt-2">
                    Drop images or click + to add · JPG, PNG, WebP · max 4MB
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Meta */}
            {tab === 'Meta' && (
              <div className="grid gap-6">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    SEO title
                  </label>
                  <input className={inputClass} defaultValue={`${title} — Rohith Sai`} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    Meta description
                  </label>
                  <textarea className={inputClass} rows={3} defaultValue={shortDesc} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">
                    OG image
                  </label>
                  <div
                    className="relative rounded-md overflow-hidden bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center"
                    style={{ aspectRatio: '1200/630', maxWidth: 360 }}
                  >
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">
                      OG IMAGE · 1200×630
                    </span>
                    <div className="absolute bottom-2 right-2">
                      <Chip as="button">Replace →</Chip>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Settings */}
            {tab === 'Settings' && (
              <div className="grid gap-6">
                <div className="p-5 border border-[var(--rule)] rounded-md">
                  <Label className="block mb-3">Display order</Label>
                  <input className={cn(inputClass, 'w-24')} type="number" defaultValue={1} />
                </div>
                <div className="p-5 border border-[var(--rule)] rounded-md">
                  <Label className="block mb-3">Password protection</Label>
                  <input
                    className={inputClass}
                    type="password"
                    placeholder="Leave blank to disable"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar ─────────────────────────────────────── */}
          <div className="overflow-auto">
            <div className="sticky top-0 p-6 flex flex-col gap-6">
              {/* Status */}
              <div>
                <SectionHead label="§ Status" className="mb-4" />
                <div className="flex gap-2 flex-wrap">
                  {(['draft', 'published', 'archived'] as Status[]).map((s) => (
                    <Chip
                      key={s}
                      as="button"
                      solid={status === s}
                      onClick={() => setStatus(s)}
                      className="capitalize"
                    >
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div>
                <Label className="block mb-3">Visibility</Label>
                <div className="flex gap-2 flex-wrap">
                  {(['public', 'private', 'unlisted'] as Visibility[]).map((v) => (
                    <Chip
                      key={v}
                      as="button"
                      solid={visibility === v}
                      onClick={() => setVisibility(v)}
                      className="capitalize"
                    >
                      {v}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Featured */}
              <div>
                <Label className="block mb-3">Featured</Label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => setIsFeatured((f) => !f)}
                    className="relative shrink-0 cursor-pointer transition-colors"
                    style={{
                      width: 34,
                      height: 18,
                      borderRadius: 9999,
                      background: isFeatured ? 'var(--ink)' : 'transparent',
                      border: `1px solid ${isFeatured ? 'var(--ink)' : 'var(--rule)'}`,
                    }}
                  >
                    <span
                      className="absolute top-0.5 transition-transform"
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 9999,
                        background: isFeatured ? 'var(--paper)' : 'var(--ink-3)',
                        left: 1,
                        transform: isFeatured ? 'translateX(16px)' : 'translateX(0)',
                      }}
                    />
                  </div>
                  <span className="text-[13px] text-[var(--ink-2)]">
                    {isFeatured ? 'Featured on homepage' : 'Not featured'}
                  </span>
                </label>
              </div>

              {/* Category */}
              <div>
                <Label className="block mb-2">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                  style={{ appearance: 'none' }}
                >
                  {['Fintech', 'Developer Tools', 'Productivity', 'Design Systems', 'Infrastructure', 'Writing', 'Other'].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Tech stack */}
              <div>
                <Label className="block mb-2">Tech stack</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {techStack.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded border border-[var(--rule)] text-[var(--ink-2)]"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-[var(--ink-4)] hover:text-[var(--danger)] transition-colors bg-transparent border-0 cursor-pointer p-0 leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                  className="font-mono text-[11px] w-full bg-transparent border-b border-dashed border-[var(--rule)] outline-none py-1 text-[var(--ink)] placeholder:text-[var(--ink-4)]"
                  placeholder="Add tag, press ↵"
                />
              </div>

              {/* URLs */}
              <div>
                <Label className="block mb-2">Live URL</Label>
                <input
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className={cn(inputClass, 'font-mono text-[11px]')}
                  placeholder="https://"
                />
              </div>
              <div>
                <Label className="block mb-2">GitHub URL</Label>
                <input
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className={cn(inputClass, 'font-mono text-[11px]')}
                  placeholder="https://github.com/"
                />
              </div>

              {/* Danger zone */}
              <div className="pt-4 border-t border-[var(--rule)]">
                <Label className="block mb-3" style={{ color: 'var(--danger)' } as React.CSSProperties}>
                  Danger zone
                </Label>
                <div className="flex flex-col gap-2">
                  <button className="font-mono text-[11px] text-[var(--ink-3)] border border-[var(--rule)] rounded px-3 py-2 bg-transparent cursor-pointer hover:border-[var(--warn)] hover:text-[var(--warn)] transition-colors text-left">
                    Unpublish project
                  </button>
                  <button className="font-mono text-[11px] border rounded px-3 py-2 bg-transparent cursor-pointer text-left transition-colors" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                    Delete project permanently
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

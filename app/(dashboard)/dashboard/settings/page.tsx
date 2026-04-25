'use client'

import { useState } from 'react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Chip } from '@/components/primitives/chip'
import { SectionHead } from '@/components/primitives/section-head'

type Theme = 'Light' | 'Dark' | 'System'

const ACCENT_COLORS = [
  { label: 'Amber', value: 'oklch(0.62 0.12 45)' },
  { label: 'Sage', value: 'oklch(0.62 0.10 150)' },
  { label: 'Slate', value: 'oklch(0.55 0.06 250)' },
  { label: 'Rose', value: 'oklch(0.60 0.15 15)' },
  { label: 'Violet', value: 'oklch(0.55 0.15 290)' },
]

interface Toggle {
  key: string
  label: string
  description: string
  value: boolean
}

const inputClass =
  'w-full px-3 py-2.5 text-[13px] bg-transparent border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none focus:border-[var(--ink)] transition-colors'

function ToggleSwitch({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className="relative shrink-0 cursor-pointer transition-colors"
      style={{
        width: 34,
        height: 18,
        borderRadius: 9999,
        background: value ? 'var(--ink)' : 'transparent',
        border: `1px solid ${value ? 'var(--ink)' : 'var(--rule)'}`,
      }}
    >
      <span
        className="absolute top-0.5 transition-transform duration-200"
        style={{
          width: 14,
          height: 14,
          borderRadius: 9999,
          background: value ? 'var(--paper)' : 'var(--ink-3)',
          left: 1,
          transform: value ? 'translateX(16px)' : 'translateX(0)',
          display: 'block',
        }}
      />
    </div>
  )
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>('Light')
  const [accentIndex, setAccentIndex] = useState(0)
  const [siteTitle, setSiteTitle] = useState('Rohith Sai — Software Engineer')
  const [siteDesc, setSiteDesc] = useState(
    'Software engineer building quiet, durable tools for the web. Selected projects, essays, and a private workspace.',
  )
  const [seoKeywords, setSeoKeywords] = useState(
    'software engineer, portfolio, fintech, design systems, Next.js',
  )
  const [toggles, setToggles] = useState<Toggle[]>([
    {
      key: 'public_resume',
      label: 'Public résumé',
      description: 'Allow anyone to view your résumé at /resume without authentication',
      value: true,
    },
    {
      key: 'index_dashboard',
      label: 'Index dashboard',
      description: 'Allow search engines to crawl and index dashboard pages',
      value: false,
    },
    {
      key: 'analytics',
      label: 'Analytics collection',
      description: 'Collect anonymous page view and session data for your public site',
      value: true,
    },
    {
      key: 'turnstile',
      label: 'Turnstile on contact',
      description: 'Enable Cloudflare Turnstile CAPTCHA on the public contact form',
      value: true,
    },
  ])

  const flipToggle = (key: string) =>
    setToggles((prev) =>
      prev.map((t) => (t.key === key ? { ...t, value: !t.value } : t)),
    )

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['System', 'Settings']}
        actions={
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
            Save changes
          </button>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[880px] mx-auto p-8">
          {/* Page header */}
          <div className="mb-10">
            <h1
              className="font-serif text-[48px] m-0 mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              Settings
            </h1>
            <p className="text-[14px] text-[var(--ink-2)] m-0">
              Manage your workspace appearance, public site metadata, and privacy controls.
            </p>
          </div>

          {/* ── §01 Appearance ───────────────────────────────────── */}
          <section className="mb-8">
            <SectionHead label="§01 Appearance" />
            <div className="grid gap-6" style={{ gridTemplateColumns: '200px 1fr' }}>
              {/* Theme */}
              <div>
                <Label className="block mb-2">Theme</Label>
              </div>
              <div className="flex gap-2">
                {(['Light', 'Dark', 'System'] as Theme[]).map((t) => (
                  <Chip
                    key={t}
                    as="button"
                    solid={theme === t}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </Chip>
                ))}
              </div>

              {/* Accent color */}
              <div>
                <Label className="block mb-2">Accent color</Label>
              </div>
              <div className="flex items-center gap-3">
                {ACCENT_COLORS.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setAccentIndex(i)}
                    title={c.label}
                    className="transition-transform hover:scale-110"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 9999,
                      background: c.value,
                      border:
                        accentIndex === i
                          ? '2px solid var(--ink)'
                          : '2px solid transparent',
                      outline: accentIndex === i ? `3px solid var(--paper)` : 'none',
                      outlineOffset: -4,
                      cursor: 'pointer',
                    }}
                  />
                ))}
                <span className="font-mono text-[10px] text-[var(--ink-3)] ml-1">
                  {ACCENT_COLORS[accentIndex].label}
                </span>
              </div>
            </div>
          </section>

          <div className="border-t border-[var(--rule)] mb-8" />

          {/* ── §02 Public site metadata ─────────────────────────── */}
          <section className="mb-8">
            <SectionHead label="§02 Public site metadata" />
            <div className="grid gap-5" style={{ gridTemplateColumns: '200px 1fr' }}>
              {/* Site title */}
              <div className="pt-2">
                <Label>Site title</Label>
              </div>
              <div>
                <input
                  className={inputClass}
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="Your name — tagline"
                />
              </div>

              {/* Description */}
              <div className="pt-2">
                <Label>Description</Label>
              </div>
              <div>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={siteDesc}
                  onChange={(e) => setSiteDesc(e.target.value)}
                  placeholder="Short bio shown in search results and link previews"
                />
                <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1 text-right">
                  {siteDesc.length}/160
                </div>
              </div>

              {/* SEO keywords */}
              <div className="pt-2">
                <Label>SEO keywords</Label>
              </div>
              <div>
                <input
                  className={`${inputClass} font-mono text-[12px]`}
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  placeholder="comma, separated, keywords"
                />
                <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1">
                  Comma-separated · max 10 terms
                </div>
              </div>

              {/* OG Image */}
              <div className="pt-2">
                <Label>OG image</Label>
              </div>
              <div>
                <div
                  className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center rounded mb-2"
                  style={{ width: 160, height: 84 }}
                >
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-3)]">
                    OG IMAGE
                  </span>
                </div>
                <button className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 border border-[var(--rule)] rounded text-[var(--ink-2)] bg-transparent cursor-pointer hover:border-[var(--ink-3)] transition-colors">
                  Replace →
                </button>
                <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1">
                  Recommended: 1200×630 · max 2MB
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-[var(--rule)] mb-8" />

          {/* ── §03 Privacy ──────────────────────────────────────── */}
          <section className="mb-8">
            <SectionHead label="§03 Privacy" />
            <div className="flex flex-col gap-0">
              {toggles.map((toggle, i) => (
                <div
                  key={toggle.key}
                  className={`flex items-center gap-4 py-4 ${i < toggles.length - 1 ? 'border-b border-[var(--rule-2)]' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[var(--ink)] mb-0.5">
                      {toggle.label}
                    </div>
                    <div className="text-[12px] text-[var(--ink-3)] leading-[1.5]">
                      {toggle.description}
                    </div>
                  </div>
                  <ToggleSwitch
                    value={toggle.value}
                    onChange={() => flipToggle(toggle.key)}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-[var(--rule)] mb-8" />

          {/* ── §04 Danger ───────────────────────────────────────── */}
          <section className="mb-8">
            <SectionHead label="§04 Danger zone" />
            <div className="grid gap-5" style={{ gridTemplateColumns: '200px 1fr' }}>
              <div className="pt-2">
                <Label style={{ color: 'var(--danger)' } as React.CSSProperties}>
                  Export data
                </Label>
              </div>
              <div>
                <button
                  className="font-mono text-[12px] px-4 py-2.5 border rounded bg-transparent cursor-pointer transition-colors hover:bg-[var(--paper-2)]"
                  style={{ borderColor: 'var(--rule)', color: 'var(--ink-2)' }}
                >
                  export_workspace.zip →
                </button>
                <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1.5">
                  Downloads all projects, notes, and settings as a ZIP archive
                </div>
              </div>

              <div className="pt-2">
                <Label style={{ color: 'var(--danger)' } as React.CSSProperties}>
                  Delete account
                </Label>
              </div>
              <div>
                <button
                  className="font-mono text-[12px] px-4 py-2.5 border rounded bg-transparent cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
                >
                  delete_account_permanently →
                </button>
                <div className="font-mono text-[10px] text-[var(--ink-4)] mt-1.5">
                  Irreversible. All data will be deleted within 30 days.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

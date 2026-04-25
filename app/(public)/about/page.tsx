import { Label } from '@/components/primitives/label'
import { SectionHead } from '@/components/primitives/section-head'

const SKILLS = [
  { cat: 'Languages', items: ['TypeScript · 6y', 'Rust · 2y', 'Go · 3y', 'Python · 5y', 'Swift · 1y', 'SQL · 6y'] },
  { cat: 'Frontend', items: ['Next.js · App Router', 'React · since 16', 'Tailwind', 'shadcn/ui', 'Framer Motion', 'Astro / MDX'] },
  { cat: 'Backend & data', items: ['Postgres', 'Supabase', 'tRPC', 'Redis', 'OpenTelemetry', 'RLS / policies'] },
  { cat: 'Adjacent', items: ['Design systems', 'Product writing', 'Figma', 'Type & layout', 'Docs / DX', 'Interviewing users'] },
]

const EXPERIENCE = [
  { yr: '2024 —', co: 'Independent', role: 'Software engineer · solo studio', blurb: 'Loom Ledger, Quietframe, Halftone. Designing, building, and shipping software end-to-end.' },
  { yr: '2022 – 2024', co: 'Foglamp Labs', role: 'Senior engineer · platform', blurb: 'Built the OpenTelemetry collector for small teams. Owned the Postgres-backed query layer.' },
  { yr: '2020 – 2022', co: 'Helix Health', role: 'Engineer · clinical apps', blurb: 'Patient-facing scheduling and intake. Reduced no-shows 22% with a redesigned reminder flow.' },
  { yr: '2019 – 2020', co: 'Pad.io', role: 'Engineer · early team', blurb: 'Joined as employee #4. Wrote the first version of the realtime engine. Left when it was time.' },
]

const STATS = [
  ['6', 'Years building'],
  ['12', 'Projects shipped'],
  ['3', 'In production'],
  ['47', 'Essays drafted'],
]

export const metadata = {
  title: 'About — Rohith Sai',
  description: 'Software engineer based in Hyderabad. Building quiet, durable tools for the web.',
}

export default function AboutPage() {
  return (
    <div className="bg-[var(--paper)]">
      {/* Hero */}
      <section className="px-14 pt-[72px] pb-10">
        <Label className="block mb-4.5">§ About · in long form</Label>
        <h1 className="font-serif leading-[0.95] mb-8" style={{ fontSize: 96, letterSpacing: '-0.02em', maxWidth: 1100 }}>
          I build software the way I'd{' '}
          <em style={{ color: 'var(--accent-ink)' }}>build a chair</em>{' '}
          — slowly, with an eye on the joints.
        </h1>

        <div className="grid grid-cols-[1.3fr_1fr] gap-16">
          <div className="text-[17px] leading-[1.65] text-[var(--ink-2)]">
            <p className="mt-0">I'm a software engineer based in Hyderabad. I've spent the last six years writing code that ships — mostly in TypeScript and Postgres, occasionally in Rust when the problem deserves it, and always with the design as much my responsibility as the implementation.</p>
            <p>I care about the gap between a feature shipping and a feature feeling right. Most of my work happens there. The interesting bugs are usually in that gap, and the interesting decisions are too — what to leave out, what to make obvious, what to let the user discover.</p>
            <p>Outside of code: I write essays at <span className="link-hover cursor-pointer">Margin</span>, take long photo walks, and am slowly learning to brew a passable filter coffee.</p>
          </div>
          <div className="bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center" style={{ aspectRatio: '4/5' }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-3)]">WORKING SHOT</span>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="px-14 pb-0">
        <div className="grid grid-cols-4 border border-[var(--ink)]" style={{ gap: 1, background: 'var(--rule)' }}>
          {STATS.map(([n, l]) => (
            <div key={l} className="px-6 py-7 bg-[var(--paper)]">
              <div className="font-serif text-[64px] leading-none mb-1.5" style={{ letterSpacing: '-0.02em' }}>{n}</div>
              <Label>{l}</Label>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-14 py-[72px]">
        <SectionHead label="§ 02 · Skills" right={<span className="font-mono text-[11px] text-[var(--ink-3)]">By category</span>} />
        <div className="grid grid-cols-4 gap-12">
          {SKILLS.map(({ cat, items }) => (
            <div key={cat}>
              <div className="font-serif text-[24px] mb-3.5 pb-2.5 border-b border-[var(--ink)]">{cat}</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {items.map((s) => {
                  const [name, meta] = s.split(' · ')
                  return (
                    <li key={s} className="flex justify-between text-[13px] text-[var(--ink-2)]">
                      <span>{name}</span>
                      {meta && <span className="font-mono text-[10px] text-[var(--ink-4)]">{meta}</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="px-14 py-14 border-t border-[var(--ink)]">
        <SectionHead label="§ 03 · Experience" />
        {EXPERIENCE.map(({ yr, co, role, blurb }, i) => (
          <div key={i} className="grid grid-cols-[140px_1fr_2fr] gap-8 py-6 border-b border-[var(--rule-2)]">
            <span className="font-mono text-[12px] text-[var(--ink-3)]">{yr}</span>
            <div>
              <div className="font-serif text-[24px] leading-[1.1]">{co}</div>
              <div className="font-mono text-[11px] text-[var(--ink-3)] mt-1">{role}</div>
            </div>
            <div className="text-[14px] text-[var(--ink-2)] leading-[1.55]">{blurb}</div>
          </div>
        ))}
      </section>

      {/* Education + Certs */}
      <section className="px-14 py-14 border-t border-[var(--rule)] grid grid-cols-2 gap-12">
        <div>
          <SectionHead label="§ 04 · Education" />
          <div className="font-serif text-[24px]">BITS Pilani, Hyderabad</div>
          <div className="font-mono text-[11px] text-[var(--ink-3)] mt-1.5">B.E. Computer Science · 2015 – 2019</div>
          <div className="text-[13px] text-[var(--ink-2)] mt-3 leading-[1.55]">Thesis on lock-free data structures. Ran the campus reading group on systems papers.</div>
        </div>
        <div>
          <SectionHead label="§ 05 · Certifications" />
          <ul className="list-none p-0 m-0 flex flex-col gap-0">
            {[
              ['AWS Solutions Architect — Associate', '2023'],
              ['Stripe Climate · Practitioner', '2024'],
              ['NN/g Interaction Design Specialty', '2025'],
            ].map(([c, y]) => (
              <li key={c} className="flex justify-between py-2.5 border-b border-[var(--rule-2)] text-[13px]">
                <span>{c}</span>
                <span className="font-mono text-[var(--ink-3)]">{y}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

import { Label } from '@/components/primitives/label'

const EXPERIENCE = [
  {
    co: 'Independent · solo studio', role: 'Software engineer', yr: '2024 — present',
    bullets: [
      'Designed and shipped Loom Ledger (340 beta users), Quietframe, and Halftone.',
      'Owns design, engineering, and growth for three live products.',
      'Wrote and published 18 long-form essays on engineering taste.',
    ],
  },
  {
    co: 'Foglamp Labs', role: 'Senior engineer · platform', yr: '2022 – 2024',
    bullets: [
      'Built an OpenTelemetry collector tuned for sub-100-employee teams; 4.2k GitHub stars at sunset.',
      'Owned the Postgres-backed query layer; cut p95 from 1.4s to 220ms over six months.',
      'Mentored two junior engineers from L2 to L4.',
    ],
  },
  {
    co: 'Helix Health', role: 'Engineer · clinical apps', yr: '2020 – 2022',
    bullets: [
      'Redesigned patient reminder flow; reduced no-show rate 22% across 14 partner clinics.',
      'Migrated scheduling service from Rails to Next.js + tRPC.',
      'HIPAA + audit ownership.',
    ],
  },
  {
    co: 'Pad.io', role: 'Engineer · early team (#4)', yr: '2019 – 2020',
    bullets: [
      'Wrote the first version of the realtime collaboration engine.',
      'Built the design system and component library used through Series A.',
    ],
  },
]

export const metadata = {
  title: 'Résumé — Rohith Sai',
}

export default function ResumePage() {
  return (
    <div className="bg-[var(--paper)]">
      {/* Top bar */}
      <section className="px-14 py-14 flex justify-between items-end border-b border-[var(--ink)]">
        <div>
          <Label className="block mb-3.5">§ Résumé · last updated Apr 2026</Label>
          <h1 className="font-serif leading-[0.95] m-0" style={{ fontSize: 80, letterSpacing: '-0.02em' }}>Majji Rohith Sai</h1>
          <div className="font-mono text-[13px] text-[var(--ink-2)] mt-2">Software Engineer · Hyderabad, IN · rohith@majji.dev</div>
        </div>
        <div className="flex gap-2.5">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[13px] font-medium transition-all hover:-translate-y-px">
            Download PDF →
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[13px] font-medium bg-transparent transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]">
            Print
          </button>
        </div>
      </section>

      {/* Document body */}
      <div className="max-w-[880px] mx-auto px-14 py-14">
        {/* Summary */}
        <div className="mb-12">
          <div className="border-b border-[var(--ink)] pb-1.5 mb-4">
            <Label>Summary</Label>
          </div>
          <p className="font-serif text-[22px] leading-[1.5] m-0">
            Software engineer with six years of building and shipping product end-to-end. I write the code, design the surface, and stay until it feels right. Strongest in TypeScript / Postgres systems with a side practice in Rust and design tooling.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <div className="border-b border-[var(--ink)] pb-1.5 mb-4.5">
            <Label>Experience</Label>
          </div>
          {EXPERIENCE.map((job) => (
            <div key={job.co} className="mb-7">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="font-serif text-[22px]">{job.co}</div>
                <span className="font-mono text-[11px] text-[var(--ink-3)]">{job.yr}</span>
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-3)] mb-2.5">{job.role}</div>
              <ul className="m-0 pl-5 text-[14px] text-[var(--ink-2)] leading-[1.6]">
                {job.bullets.map((b) => <li key={b} className="mb-1">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Education + Achievements */}
        <div className="mb-12 grid grid-cols-2 gap-8">
          <div>
            <div className="border-b border-[var(--ink)] pb-1.5 mb-3.5">
              <Label>Education</Label>
            </div>
            <div className="font-serif text-[20px]">BITS Pilani, Hyderabad</div>
            <div className="font-mono text-[11px] text-[var(--ink-3)] mt-1">B.E. Computer Science · 2015 – 2019</div>
          </div>
          <div>
            <div className="border-b border-[var(--ink)] pb-1.5 mb-3.5">
              <Label>Achievements</Label>
            </div>
            <ul className="m-0 pl-5 text-[13px] text-[var(--ink-2)] leading-[1.65]">
              <li>Halftone — front page of HN, 2026</li>
              <li>Foglamp — top 50 OTel projects, 2023</li>
              <li>Speaker, ReactConf India, 2024</li>
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="border-b border-[var(--ink)] pb-1.5 mb-3.5">
            <Label>Skills</Label>
          </div>
          <div className="grid grid-cols-2 gap-6 text-[13px] text-[var(--ink-2)]">
            <div><strong className="text-[var(--ink)]">Languages —</strong> TypeScript, Rust, Go, Python, Swift, SQL</div>
            <div><strong className="text-[var(--ink)]">Frontend —</strong> Next.js, React, Tailwind, shadcn/ui, Framer Motion</div>
            <div><strong className="text-[var(--ink)]">Backend —</strong> Postgres, Supabase, tRPC, Redis, OpenTelemetry</div>
            <div><strong className="text-[var(--ink)]">Adjacent —</strong> Design systems, product writing, Figma, type & layout</div>
          </div>
        </div>
      </div>
    </div>
  )
}

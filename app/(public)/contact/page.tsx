import { Label } from '@/components/primitives/label'
import { ContactForm } from './contact-form'

export const metadata = {
  title: 'Contact — Rohith Sai',
}

const CHANNELS = [
  { key: 'Email', value: 'rohith@majji.dev', hint: 'Best for project work', href: 'mailto:rohith@majji.dev' },
  { key: 'Twitter / X', value: '@rohith_writes', hint: 'For shorter conversations', href: 'https://x.com/rohith_writes' },
  { key: 'Calendar', value: 'cal.com/rohith', hint: 'Book a 30-min chat', href: '#' },
]

export default function ContactPage() {
  return (
    <div className="bg-[var(--paper)] grid grid-cols-2 min-h-[calc(100vh-80px)]">
      {/* Left */}
      <div className="px-14 py-14 border-r border-[var(--rule)] flex flex-col">
        <div className="flex-1 pt-12">
          <Label className="flex items-center gap-1.5 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] inline-block" />
            Available — Q3 2026
          </Label>
          <h1 className="font-serif leading-[0.95] mb-6" style={{ fontSize: 88, letterSpacing: '-0.02em' }}>
            Let's <em style={{ color: 'var(--accent-ink)' }}>talk</em>.
          </h1>
          <p className="text-[17px] leading-[1.6] text-[var(--ink-2)] max-w-[460px] mb-10">
            Have a project, a half-formed idea, or just want to compare notes on engineering taste? Send a note. I read everything and reply within two days.
          </p>

          <div className="flex flex-col gap-3.5 max-w-[460px]">
            {CHANNELS.map(({ key, value, hint, href }) => (
              <a
                key={key}
                href={href}
                className="lift grid items-center border border-[var(--rule)] rounded p-5 no-underline text-inherit"
                style={{ gridTemplateColumns: '120px 1fr 24px' }}
              >
                <span className="font-mono text-[11px] text-[var(--ink-3)] uppercase tracking-[0.12em]">{key}</span>
                <div>
                  <div className="font-serif text-[20px]">{value}</div>
                  <div className="text-[12px] text-[var(--ink-3)] mt-0.5">{hint}</div>
                </div>
                <span className="text-[var(--ink-3)]">→</span>
              </a>
            ))}
          </div>
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-3)] uppercase tracking-[0.14em]">
          Hyderabad · IST · usually online 09:00 – 19:00
        </div>
      </div>

      {/* Right */}
      <div className="px-14 py-14 bg-[var(--paper-2)]">
        <Label className="block mb-3.5">§ Or send a note</Label>
        <div className="font-serif text-[36px] leading-[1.15] mb-8 max-w-[480px]" style={{ letterSpacing: '-0.02em' }}>
          I'll read it. I'll reply.
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

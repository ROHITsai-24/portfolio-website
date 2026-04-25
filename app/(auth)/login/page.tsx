import { LoginForm } from './login-form'

export const metadata = {
  title: 'Login — Rohith Sai',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-2 bg-[var(--paper)]">
      {/* Left — form */}
      <div className="px-14 py-16 flex flex-col">
        <div className="font-serif text-[22px] flex items-baseline gap-2">
          Rohith Sai
          <span className="font-mono text-[10px] text-[var(--ink-3)] ml-2 tracking-[0.14em]">— ADMIN</span>
        </div>

        <div className="my-auto w-full max-w-[380px]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] mb-5">
            § Restricted · single-user mode
          </div>
          <h1 className="font-serif leading-none mb-3" style={{ fontSize: 56, letterSpacing: '-0.02em' }}>
            Welcome <em style={{ color: 'var(--accent-ink)' }}>back</em>.
          </h1>
          <p className="text-[14px] leading-[1.55] text-[var(--ink-2)] mb-9 max-w-[320px]">
            The portfolio is public. Everything behind this door is yours — projects, notes, the half-baked ideas.
          </p>

          <LoginForm />

          <div className="mt-10 p-3.5 border border-[var(--rule)] rounded text-[12px] text-[var(--ink-3)] flex gap-2.5 items-start">
            <span className="font-mono text-[var(--accent-ink)] text-[11px]">ℹ</span>
            <span>Auth handled by Supabase. RLS protects every workspace row — even I can't query yours.</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-[var(--ink-3)] tracking-[0.14em] uppercase">
          ← Back to portfolio · majji.dev
        </div>
      </div>

      {/* Right — editorial panel */}
      <div className="border-l border-[var(--rule)] relative overflow-hidden bg-[var(--paper-2)]">
        <div className="absolute inset-8 border border-[var(--rule)] flex flex-col justify-between p-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] mb-4.5">Quote · selected</div>
            <p className="font-serif text-[36px] leading-[1.2] max-w-[380px]" style={{ margin: 0 }}>
              "Software is the closest thing we have to{' '}
              <em style={{ color: 'var(--accent-ink)' }}>practical magic</em>. Treat it that way."
            </p>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[11px] text-[var(--ink-3)]">— Notebook entry, 04 Mar 2026</span>
            <span className="font-mono text-[10px] text-[var(--ink-4)]">03 / 47</span>
          </div>
        </div>
      </div>
    </div>
  )
}

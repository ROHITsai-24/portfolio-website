'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('rohith@majji.dev')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  const inputClass = 'w-full px-3 py-2.5 text-[13px] bg-transparent border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none focus:border-[var(--ink)] transition-colors'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  const handleMagicLink = async () => {
    if (!email) { toast.error('Enter your email first.'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/dashboard` } })
    setLoading(false)
    if (error) { toast.error(error.message); return }
    setMagicSent(true)
    toast.success('Magic link sent — check your inbox.')
  }

  if (magicSent) {
    return (
      <div className="p-6 border border-[var(--rule)] rounded text-center">
        <div className="font-serif text-[24px] mb-2">Check your inbox.</div>
        <p className="text-[14px] text-[var(--ink-2)]">Magic link sent to <strong>{email}</strong>.</p>
        <button onClick={() => setMagicSent(false)} className="font-mono text-[10px] text-[var(--ink-3)] uppercase tracking-[0.12em] mt-4 underline">
          Back to login
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <div>
        <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Email</label>
        <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)]">Password</label>
          <button type="button" onClick={handleMagicLink} className="font-mono text-[10px] text-[var(--ink-3)] uppercase tracking-[0.12em] link-hover">
            Send magic link →
          </button>
        </div>
        <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" />
      </div>
      <label className="flex items-center gap-2 text-[12px] text-[var(--ink-2)] cursor-pointer mt-1">
        <span
          onClick={() => setRemember(!remember)}
          className={`flex w-3.5 h-3.5 rounded-sm border items-center justify-center text-[10px] cursor-pointer ${remember ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]' : 'border-[var(--ink-3)]'}`}
        >
          {remember ? '✓' : ''}
        </span>
        Keep me signed in for 30 days
      </label>
      <button
        type="submit"
        disabled={loading}
        className="flex justify-center items-center gap-2 px-4 py-3.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[13px] font-medium mt-3 transition-all hover:-translate-y-px disabled:opacity-50"
      >
        {loading ? 'Signing in…' : 'Sign in →'}
      </button>
    </form>
  )
}

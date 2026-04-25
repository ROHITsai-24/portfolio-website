'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Label } from '@/components/primitives/label'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', subject: 'Project work', message: '', sendCopy: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name || !values.email || !values.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      toast.success('Message sent. I'll reply within 48 hours.')
      setValues({ name: '', email: '', subject: 'Project work', message: '', sendCopy: true })
    } catch {
      toast.error('Something went wrong. Try emailing me directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 text-[13px] bg-[var(--paper)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none focus:border-[var(--ink)] focus:bg-[var(--paper)] transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 max-w-[480px]">
      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Your name</label>
          <input className={inputClass} placeholder="Aanya Raman" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Email</label>
          <input type="email" className={inputClass} placeholder="you@somewhere.com" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Subject</label>
        <select className={inputClass} value={values.subject} onChange={(e) => setValues({ ...values, subject: e.target.value })}>
          <option>Project work</option>
          <option>Collaboration</option>
          <option>Speaking / podcast</option>
          <option>Just saying hi</option>
        </select>
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Message</label>
        <textarea className={inputClass} rows={7} placeholder="Tell me what you're working on…" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </div>

      <label className="flex items-center gap-2 text-[12px] text-[var(--ink-2)] cursor-pointer">
        <span
          onClick={() => setValues({ ...values, sendCopy: !values.sendCopy })}
          className={`flex w-3.5 h-3.5 rounded-sm border items-center justify-center text-[10px] cursor-pointer ${values.sendCopy ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]' : 'border-[var(--ink-3)]'}`}
        >
          {values.sendCopy ? '✓' : ''}
        </span>
        Send a copy to my own inbox
      </label>

      <button
        type="submit"
        disabled={loading}
        className="flex justify-center items-center gap-2 px-4 py-3.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[13px] font-medium transition-all hover:-translate-y-px disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send message →'}
      </button>

      <p className="font-mono text-[10px] text-[var(--ink-4)] text-center m-0 tracking-[0.08em]">
        Replies usually within 48 hours. Submissions stored privately in Supabase.
      </p>
    </form>
  )
}

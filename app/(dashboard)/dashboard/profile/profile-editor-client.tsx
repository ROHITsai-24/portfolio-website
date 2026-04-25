'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Label } from '@/components/primitives/label'
import { SectionHead } from '@/components/primitives/section-head'
import { createClient } from '@/lib/supabase/client'

interface SocialLink { platform: string; label: string; url: string }

interface Profile {
  name: string; title: string; location: string; email: string; bio: string;
  hero_headline: string; hero_subtitle: string; hero_status_text: string;
  hero_status_visible: boolean; social_links: SocialLink[];
}

export function ProfileEditorClient({ initialProfile }: { initialProfile: Profile }) {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  const inputClass = 'w-full px-3 py-2.5 text-[13px] bg-transparent border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none focus:border-[var(--ink)] transition-colors'

  const set = (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }))

  const removeSocial = (i: number) =>
    setProfile((p) => ({ ...p, social_links: p.social_links.filter((_, idx) => idx !== i) }))

  const addSocial = () =>
    setProfile((p) => ({ ...p, social_links: [...p.social_links, { platform: '', label: '', url: '' }] }))

  return (
    <div className="flex-1 overflow-auto p-8 grid gap-12" style={{ gridTemplateColumns: '1fr 1fr' }}>
      {/* Left — editor */}
      <div>
        <h1 className="font-serif text-[48px] m-0 mb-2" style={{ letterSpacing: '-0.02em' }}>Profile</h1>
        <p className="text-[14px] text-[var(--ink-2)] mb-8 max-w-[480px]">
          What the public sees on the home, about, and contact pages. Saves automatically.
        </p>

        <SectionHead label="§ Identity" />
        <div className="grid gap-6 mb-9" style={{ gridTemplateColumns: '120px 1fr' }}>
          <div>
            <div className="w-[120px] h-[120px] rounded-full bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center font-mono text-[10px] text-[var(--ink-3)]">
              AVATAR
            </div>
            <button className="font-mono text-[10px] mt-2.5 text-[var(--ink-3)] bg-none border-0 p-0 uppercase tracking-[0.12em] cursor-pointer">Replace →</button>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div><label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Name</label><input className={inputClass} value={profile.name} onChange={set('name')} /></div>
            <div><label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Title</label><input className={inputClass} value={profile.title} onChange={set('title')} /></div>
            <div><label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Location</label><input className={inputClass} value={profile.location} onChange={set('location')} /></div>
            <div><label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Email</label><input className={inputClass} value={profile.email} onChange={set('email')} /></div>
            <div className="col-span-2">
              <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Short bio · 240 chars</label>
              <textarea className={inputClass} rows={3} value={profile.bio} onChange={set('bio')} />
            </div>
          </div>
        </div>

        <SectionHead label="§ Hero" />
        <div className="grid gap-3.5 mb-9">
          <div>
            <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Headline · serif display</label>
            <input className={`${inputClass} font-serif`} style={{ fontSize: 22 }} value={profile.hero_headline} onChange={set('hero_headline')} />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Subheadline</label>
            <textarea className={inputClass} rows={2} value={profile.hero_subtitle} onChange={set('hero_subtitle')} />
          </div>
          <div className="grid grid-cols-[1fr_140px] gap-3.5">
            <div>
              <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Status badge</label>
              <input className={inputClass} value={profile.hero_status_text} onChange={set('hero_status_text')} />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] block mb-1.5">Show?</label>
              <div className="py-2.5 flex items-center gap-2 cursor-pointer" onClick={() => setProfile((p) => ({ ...p, hero_status_visible: !p.hero_status_visible }))}>
                <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[10px] ${profile.hero_status_visible ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]' : 'border-[var(--ink-3)]'}`}>
                  {profile.hero_status_visible ? '✓' : ''}
                </span>
                <span className="text-[13px]">Yes</span>
              </div>
            </div>
          </div>
        </div>

        <SectionHead label="§ Social" />
        <div className="flex flex-col gap-2">
          {profile.social_links.map((link, i) => (
            <div key={i} className="grid items-center gap-2.5" style={{ gridTemplateColumns: '120px 1fr 24px' }}>
              <span className="font-mono text-[11px] text-[var(--ink-3)]">{link.platform || 'Platform'}</span>
              <input className={inputClass} value={link.url} onChange={(e) => {
                const updated = [...profile.social_links]
                updated[i] = { ...updated[i], url: e.target.value }
                setProfile((p) => ({ ...p, social_links: updated }))
              }} />
              <button onClick={() => removeSocial(i)} className="text-[var(--ink-4)] text-center cursor-pointer bg-none border-0 hover:text-[var(--danger)]">×</button>
            </div>
          ))}
          <button onClick={addSocial} className="self-start font-mono text-[10px] text-[var(--ink-3)] bg-none border border-dashed border-[var(--rule)] px-3 py-2 uppercase tracking-[0.12em] rounded cursor-pointer mt-1.5 hover:border-[var(--ink-3)]">
            + Add social link
          </button>
        </div>
      </div>

      {/* Right — live preview */}
      <div className="sticky top-0 self-start">
        <SectionHead label="§ Live preview · / index" />
        <div className="border border-[var(--rule)] rounded-md overflow-hidden bg-[var(--paper)]">
          <div className="px-3.5 py-2.5 border-b border-[var(--rule)] flex items-center gap-2 bg-[var(--paper-2)]">
            <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
            <span className="font-mono text-[10px] text-[var(--ink-3)] ml-2">majji.dev</span>
          </div>
          <div className="p-8">
            {profile.hero_status_visible && (
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] mb-4.5 flex items-center gap-1.5">
                <span className="text-[var(--accent-ink)]">→</span> {profile.hero_status_text}
              </div>
            )}
            <div className="font-serif leading-[0.95]" style={{ fontSize: 64, letterSpacing: '-0.02em' }}>
              {profile.hero_headline.split(' ').slice(0, -1).join(' ')}<br />
              <em style={{ color: 'var(--accent-ink)' }}>{profile.hero_headline.split(' ').slice(-1)[0]}</em>
            </div>
            <div className="text-[14px] text-[var(--ink-2)] leading-[1.55] mt-6">{profile.hero_subtitle}</div>
            <div className="flex gap-2 mt-5">
              <button className="px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[11px] font-medium">View projects →</button>
              <button className="px-3.5 py-2 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[11px] font-medium bg-transparent">Résumé</button>
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-3)] mt-2.5 uppercase tracking-[0.12em]">
          Updates as you type. Publish to push live.
        </div>
      </div>
    </div>
  )
}

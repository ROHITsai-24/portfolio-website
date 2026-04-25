import { Topbar } from '@/components/dashboard/topbar'
import { ProfileEditorClient } from './profile-editor-client'
import { createClient } from '@/lib/supabase/server'

const FALLBACK_PROFILE = {
  name: 'Majji Rohith Sai',
  title: 'Software Engineer',
  location: 'Hyderabad, IN',
  email: 'rohith@majji.dev',
  bio: 'Software engineer building quiet, durable tools for the web. I care about the gap between a feature shipping and a feature feeling right — and most of my work happens there.',
  hero_headline: 'Majji Rohith Sai.',
  hero_subtitle: 'Software engineer building quiet, durable tools for the web.',
  hero_status_text: 'Available for select work — Q3 2026',
  hero_status_visible: true,
  social_links: [
    { platform: 'GitHub', label: 'GitHub', url: 'github.com/rohithsai' },
    { platform: 'LinkedIn', label: 'LinkedIn', url: 'in/rohithsai' },
    { platform: 'Twitter / X', label: 'Twitter / X', url: 'x.com/rohith_writes' },
    { platform: 'Read.cv', label: 'Read.cv', url: 'read.cv/rohith' },
  ],
}

export default async function ProfilePage() {
  let profile = FALLBACK_PROFILE

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
      if (data) profile = { ...FALLBACK_PROFILE, ...data }
    }
  } catch {}

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Workspace', 'Profile']}
        actions={
          <>
            <span className="font-mono text-[10px] text-[var(--ink-3)] uppercase tracking-[0.12em]">● Saved · 12s ago</span>
            <a href="/" target="_blank" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--rule)] text-[var(--ink)] text-[12px] font-medium bg-transparent transition-all hover:bg-[var(--paper-2)]">
              Preview →
            </a>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
              Publish changes
            </button>
          </>
        }
      />
      <ProfileEditorClient initialProfile={profile} />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const groups = [
  {
    label: 'Workspace',
    items: [
      { href: '/dashboard',                label: 'Overview',          num: '01' },
      { href: '/dashboard/profile',        label: 'Profile',           num: '02' },
      { href: '/dashboard/projects',       label: 'Projects',          num: '03' },
      { href: '/dashboard/messages',       label: 'Messages',          num: '05', badge: '3' },
    ],
  },
  {
    label: 'Personal',
    items: [
      { href: '/dashboard/workspace',      label: 'Workspace projects',num: '06' },
      { href: '/dashboard/notes',          label: 'Notebook',          num: '07' },
      { href: '/dashboard/tasks',          label: 'Tasks',             num: '08' },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/dashboard/settings',       label: 'Settings',          num: '09' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col gap-6 px-4 py-6 border-r border-[var(--rule)] bg-[var(--paper)]">
      <div className="px-2 pb-3.5 border-b border-[var(--rule)]">
        <div className="font-serif text-[22px] leading-none">Rohith Sai</div>
        <div className="font-mono text-[10px] text-[var(--ink-3)] tracking-[0.14em] uppercase mt-1">
          Admin · majji.dev
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)] px-3 mb-2">
            {group.label}
          </div>
          <div className="flex flex-col gap-0.5">
            {group.items.map(({ href, label, num, badge }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors',
                    active
                      ? 'bg-[var(--ink)] text-[var(--paper)]'
                      : 'text-[var(--ink-2)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]',
                  )}
                >
                  <span className={cn('font-mono text-[10px] w-4.5', active ? 'opacity-50 text-[var(--paper)]' : 'text-[var(--ink-4)]')}>
                    {num}
                  </span>
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-[var(--rule)] text-[var(--ink-3)]">
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto p-3 border border-[var(--rule)] rounded-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--paper-2)] border border-[var(--rule)] flex items-center justify-center font-mono text-[10px] text-[var(--ink-3)] shrink-0">
            RS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium truncate">Rohith Sai</div>
            <div className="font-mono text-[10px] text-[var(--ink-3)] truncate">rohith@majji.dev</div>
          </div>
          <Link href="/dashboard/settings" className="text-[var(--ink-3)] text-[14px]">↗</Link>
        </div>
      </div>
    </aside>
  )
}

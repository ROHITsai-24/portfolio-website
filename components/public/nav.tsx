'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/',        label: 'index',    num: '01' },
  { href: '/projects', label: 'projects', num: '02' },
  { href: '/about',   label: 'about',    num: '03' },
  { href: '/resume',  label: 'resume',   num: '04' },
  { href: '/contact', label: 'contact',  num: '05' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex items-center justify-between px-14 py-5 border-b border-[var(--rule)] sticky top-0 z-10"
      style={{ background: 'color-mix(in oklch, var(--paper) 88%, transparent)', backdropFilter: 'blur(10px)' }}
    >
      <div className="flex items-baseline gap-3.5">
        <span className="font-serif text-[22px] leading-none">Rohith Sai</span>
        <span className="font-mono text-[10px] text-[var(--ink-3)] tracking-[0.14em]">— SOFTWARE ENGINEER</span>
      </div>

      <div className="flex items-center gap-8">
        {links.map(({ href, label, num }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-mono text-[11px] tracking-[0.14em] uppercase transition-colors link-hover',
                active ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-3)]',
              )}
            >
              <span className="text-[var(--ink-4)] mr-1.5">{num}</span>{label}
            </Link>
          )
        })}

        <span className="w-px h-3.5 bg-[var(--rule)]" />

        <Link
          href="/login"
          className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink-2)] link-hover"
        >
          Login →
        </Link>
      </div>
    </nav>
  )
}

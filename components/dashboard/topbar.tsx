import { Search } from 'lucide-react'

interface TopbarProps {
  crumbs: string[]
  actions?: React.ReactNode
}

export function Topbar({ crumbs, actions }: TopbarProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4.5 border-b border-[var(--rule)] gap-4 bg-[var(--paper)]">
      <div className="flex items-center gap-2">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-[var(--ink-4)]">/</span>}
            <span
              className={`font-mono text-[11px] tracking-[0.08em] ${
                i === crumbs.length - 1 ? 'text-[var(--ink)]' : 'text-[var(--ink-3)]'
              }`}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 border border-[var(--rule)] rounded-md px-2.5 py-1.5">
          <Search size={13} className="text-[var(--ink-4)]" />
          <input
            placeholder="Jump to…"
            className="font-mono text-[11px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)] w-40"
          />
          <kbd className="font-mono text-[9px] text-[var(--ink-4)] border border-[var(--rule)] px-1 py-px rounded">
            ⌘ K
          </kbd>
        </div>
        {actions}
      </div>
    </div>
  )
}

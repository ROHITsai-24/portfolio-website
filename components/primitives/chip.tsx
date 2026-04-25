import { cn } from '@/lib/utils'

interface ChipProps {
  children: React.ReactNode
  solid?: boolean
  accent?: boolean
  className?: string
  onClick?: () => void
  as?: 'button' | 'span'
}

export function Chip({ children, solid, accent, className, onClick, as: Tag = 'span' }: ChipProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[11px] cursor-default',
        solid
          ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
          : accent
          ? 'bg-[var(--accent-soft)] text-[var(--accent-ink)] border-transparent'
          : 'bg-transparent text-[var(--ink-2)] border-[var(--rule)]',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

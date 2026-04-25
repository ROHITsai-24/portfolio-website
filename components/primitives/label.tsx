import { cn } from '@/lib/utils'

interface LabelProps {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-3)]',
        className,
      )}
    >
      {children}
    </span>
  )
}

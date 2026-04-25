import { cn } from '@/lib/utils'

type PillVariant = 'published' | 'draft' | 'archived' | 'progress' | 'idea' | 'paused' | 'completed'

const variants: Record<PillVariant, string> = {
  published: 'bg-[color-mix(in_oklch,var(--good)_14%,transparent)] text-[var(--good)]',
  draft:     'bg-[var(--paper-2)] text-[var(--ink-3)] border border-[var(--rule)]',
  archived:  'bg-[var(--paper-2)] text-[var(--ink-4)]',
  progress:  'bg-[color-mix(in_oklch,var(--accent)_14%,transparent)] text-[var(--accent-ink)]',
  idea:      'bg-[color-mix(in_oklch,var(--warn)_16%,transparent)] text-[var(--ink-2)]',
  paused:    'bg-[var(--paper-2)] text-[var(--ink-3)]',
  completed: 'bg-[color-mix(in_oklch,var(--good)_14%,transparent)] text-[var(--good)]',
}

interface PillProps {
  variant: PillVariant
  children: React.ReactNode
  className?: string
}

export function Pill({ variant, children, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[11px]',
        variants[variant],
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export function statusToPillVariant(status: string): PillVariant {
  const map: Record<string, PillVariant> = {
    published: 'published',
    live: 'published',
    draft: 'draft',
    archived: 'archived',
    beta: 'progress',
    in_progress: 'progress',
    idea: 'idea',
    planning: 'draft',
    paused: 'paused',
    completed: 'completed',
    todo: 'draft',
    done: 'completed',
  }
  return map[status.toLowerCase()] ?? 'draft'
}

import { cn } from '@/lib/utils'
import { Label } from './label'

interface SectionHeadProps {
  label: string
  right?: React.ReactNode
  className?: string
}

export function SectionHead({ label, right, className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-4 border-t border-[var(--ink)] pt-3.5 mb-7',
        className,
      )}
    >
      <Label>{label}</Label>
      {right && <div className="flex-1" />}
      {right}
    </div>
  )
}

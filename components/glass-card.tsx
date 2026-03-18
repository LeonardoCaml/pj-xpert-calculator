import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface/60 backdrop-blur-xl border border-foreground/10 p-6',
        hover && 'transition-all duration-300 hover:bg-surface/80 hover:border-foreground/20 hover:shadow-lg hover:shadow-primary/5',
        className
      )}
    >
      {children}
    </div>
  )
}

interface GlassSectionProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function GlassSection({ title, description, icon, children, className }: GlassSectionProps) {
  return (
    <section className={cn('space-y-6', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  )
}

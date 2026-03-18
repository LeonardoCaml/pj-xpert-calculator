'use client'

import { TaxProfile, TaxRegime } from '@/lib/calculator-types'
import { cn } from '@/lib/utils'
import { Building2, User, Briefcase, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TaxRegimeSelectorProps {
  value: TaxRegime
  onChange: (value: TaxRegime) => void
  taxProfiles: TaxProfile[]
  className?: string
}

const icons: Record<TaxRegime, React.ReactNode> = {
  'mei': <User className="h-5 w-5" />,
  'simples-anexo-iii': <Briefcase className="h-5 w-5" />,
  'simples-anexo-v': <Building2 className="h-5 w-5" />,
}

export function TaxRegimeSelector({
  value,
  onChange,
  taxProfiles,
  className,
}: TaxRegimeSelectorProps) {
  const formatLimit = (limit: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(limit)

  const formatRate = (profile: TaxProfile) => {
    if (profile.fixedCost) {
      return `R$ ${profile.fixedCost.toFixed(2).replace('.', ',')}/mês`
    }
    return `${(profile.rate * 100).toFixed(1).replace('.', ',')}%`
  }

  return (
    <TooltipProvider>
      <div className={cn('grid gap-3', className)}>
        {taxProfiles.map((profile) => {
          const isSelected = value === profile.id
          
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onChange(profile.id)}
              className={cn(
                'relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                  : 'border-border bg-surface/40 hover:border-primary/50 hover:bg-surface/60'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                {icons[profile.id]}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'font-semibold',
                    isSelected ? 'text-primary' : 'text-foreground'
                  )}>
                    {profile.name}
                  </span>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    isSelected
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  )}>
                    {formatRate(profile)}
                  </span>
                  {profile.id === 'simples-anexo-iii' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="text-sm">
                          Cálculo baseado no Anexo III com Fator R (Pro-labore de 28% do faturamento).
                          Se o Fator R for menor que 28%, a alíquota sobe para 15,5% (Anexo V).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile.description}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Limite: {formatLimit(profile.monthlyLimit)}/mês
                </p>
              </div>

              {isSelected && (
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

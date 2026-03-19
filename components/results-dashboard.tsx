'use client'

import { CalculatorResult, TaxRegime, TAX_PROFILES } from '@/lib/calculator-types'
import { NumberTicker } from './number-ticker'
import { cn } from '@/lib/utils'
import { Clock, TrendingUp, Receipt, Wallet, Calendar, ShieldCheck, Building2, ArrowRight } from 'lucide-react'

interface ResultsDashboardProps {
  result: CalculatorResult
  taxRegime: TaxRegime
  formatCurrency: (value: number) => string
  className?: string
}

export function ResultsDashboard({
  result,
  taxRegime,
  formatCurrency,
  className,
}: ResultsDashboardProps) {
  const taxProfile = TAX_PROFILES.find(t => t.id === taxRegime)

  return (
    <div className={cn('space-y-6', className)}>
      {/* Main Result - Hourly Rate */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-5 sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-success/10 blur-2xl" />
        
        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Valor da Hora Técnica
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tighter text-success sm:text-5xl md:text-6xl lg:text-7xl">
              <NumberTicker
                value={result.hourlyRate}
                formatFn={formatCurrency}
              />
            </span>
            <span className="text-lg sm:text-xl text-muted-foreground">/hora</span>
          </div>
          
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4">
            <div className="flex items-center gap-2 rounded-full bg-surface/60 px-3 py-1.5 sm:px-4 sm:py-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm">
                <span className="text-muted-foreground">Com margem: </span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(result.projectRate)}/h
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-surface/60 px-3 py-1.5 sm:px-4 sm:py-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm">
                <span className="text-muted-foreground">{result.workableHoursPerMonth.toFixed(0)}h </span>
                <span className="font-semibold text-foreground">por mês</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Results Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Monthly Gross Revenue */}
        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Faturamento Bruto
              </p>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                <NumberTicker
                  value={result.monthlyGrossRevenue}
                  formatFn={formatCurrency}
                />
              </p>
              <p className="text-xs text-muted-foreground">mensal necessário</p>
            </div>
          </div>
        </div>

        {/* Taxes */}
        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Impostos ({taxProfile?.name})
              </p>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                <NumberTicker
                  value={result.monthlyTaxes}
                  formatFn={formatCurrency}
                />
              </p>
              <p className="text-xs text-muted-foreground">
                {taxProfile?.fixedCost ? 'valor fixo DAS' : `${((taxProfile?.rate || 0) * 100).toFixed(1)}% do faturamento`}
              </p>
            </div>
          </div>
        </div>

        {/* Vacation Reserve */}
        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Reserva de Férias
              </p>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                <NumberTicker
                  value={result.vacationReserve}
                  formatFn={formatCurrency}
                />
              </p>
              <p className="text-xs text-muted-foreground">guardar por mês</p>
            </div>
          </div>
        </div>

        {/* Emergency Reserve */}
        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Reserva Emergência
              </p>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                <NumberTicker
                  value={result.emergencyReserve}
                  formatFn={formatCurrency}
                />
              </p>
              <p className="text-xs text-muted-foreground">10% do faturamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* CLT Comparison */}
      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Equivalente CLT
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Se você fosse CLT, seu salário seria aproximadamente:
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right pl-13 sm:pl-0">
            <p className="text-2xl font-bold tabular-nums text-primary">
              <NumberTicker
                value={result.cltEquivalent}
                formatFn={formatCurrency}
              />
            </p>
            <p className="text-xs text-muted-foreground">bruto mensal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

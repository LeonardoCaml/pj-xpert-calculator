'use client'

import { useCalculator } from '@/hooks/use-calculator'
import { GlassCard, GlassSection } from './glass-card'
import { CurrencySlider, CustomSlider } from './custom-slider'
import { TaxRegimeSelector } from './tax-regime-selector'
import { CostInput } from './cost-input'
import { ResultsDashboard } from './results-dashboard'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Sparkles, Briefcase, Receipt, Calculator as CalcIcon, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Calculator() {
  const {
    inputs,
    result,
    isHydrated,
    updateInput,
    updateFixedCost,
    setTaxRegime,
    resetToDefaults,
    formatCurrency,
    taxProfiles,
  } = useCalculator()

  // Show skeleton while hydrating to prevent hydration mismatch
  if (!isHydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface/40" />
          ))}
        </div>
        <div className="lg:sticky lg:top-8">
          <div className="h-96 animate-pulse rounded-3xl bg-surface/40" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,420px]">
      {/* Input Sections */}
      <div className="space-y-8">
        {/* Section 1: Lifestyle */}
        <GlassSection
          title="Estilo de Vida"
          description="Quanto você quer ganhar e quanto quer trabalhar"
          icon={<Sparkles className="h-5 w-5" />}
        >
          <GlassCard className="space-y-6">
            <CurrencySlider
              label="Salário Líquido Desejado"
              value={inputs.desiredSalary}
              onChange={(v) => updateInput('desiredSalary', v)}
              min={1000}
              max={50000}
              step={500}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <CustomSlider
                label="Horas por Dia"
                value={inputs.hoursPerDay}
                onChange={(v) => updateInput('hoursPerDay', v)}
                min={1}
                max={12}
                step={1}
                formatValue={(v) => `${v}h`}
              />

              <CustomSlider
                label="Dias por Semana"
                value={inputs.daysPerWeek}
                onChange={(v) => updateInput('daysPerWeek', v)}
                min={1}
                max={7}
                step={1}
                formatValue={(v) => `${v} dias`}
              />
            </div>

            <CustomSlider
              label="Dias de Férias por Ano"
              value={inputs.vacationDays}
              onChange={(v) => updateInput('vacationDays', v)}
              min={0}
              max={60}
              step={5}
              formatValue={(v) => `${v} dias`}
            />
          </GlassCard>
        </GlassSection>

        {/* Section 2: Operating Costs */}
        <GlassSection
          title="Custos de Operação"
          description="Gastos diretos para manter sua empresa ativa"
          icon={<Briefcase className="h-5 w-5" />}
        >
          <GlassCard className="space-y-6">
            <CostInput
              fixedCosts={inputs.fixedCosts}
              onUpdateCost={updateFixedCost}
            />

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="accountant" className="text-base font-medium">
                    Contador mensal
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Inclui honorários do contador
                  </p>
                </div>
                <Switch
                  id="accountant"
                  checked={inputs.hasAccountant}
                  onCheckedChange={(v) => updateInput('hasAccountant', v)}
                />
              </div>

              {inputs.hasAccountant && (
                <div className="mt-4">
                  <CurrencySlider
                    label="Valor do Contador"
                    value={inputs.accountantCost}
                    onChange={(v) => updateInput('accountantCost', v)}
                    min={100}
                    max={1500}
                    step={50}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
              <span className="text-sm font-medium text-muted-foreground">
                Total de Custos Fixos
              </span>
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(result.totalFixedCosts)}
              </span>
            </div>
          </GlassCard>
        </GlassSection>

        {/* Section 3: Taxation */}
        <GlassSection
          title="Tributação"
          description="Selecione seu regime tributário"
          icon={<Receipt className="h-5 w-5" />}
        >
          <TaxRegimeSelector
            value={inputs.taxRegime}
            onChange={setTaxRegime}
            taxProfiles={taxProfiles}
          />
        </GlassSection>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={resetToDefaults}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar valores
          </Button>
        </div>
      </div>

      {/* Results Dashboard - Sticky on desktop */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
            <CalcIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Resultado
            </h2>
            <p className="text-sm text-muted-foreground">
              Atualizado em tempo real
            </p>
          </div>
        </div>
        
        <ResultsDashboard
          result={result}
          taxRegime={inputs.taxRegime}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  )
}

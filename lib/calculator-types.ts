// Model - TypeScript Interfaces for MVVM pattern

export type TaxRegime = 'mei' | 'simples-anexo-iii' | 'simples-anexo-v'

export interface TaxProfile {
  id: TaxRegime
  name: string
  description: string
  monthlyLimit: number
  rate: number // decimal (e.g., 0.06 for 6%)
  fixedCost?: number // for MEI
}

export interface FreelancerInputs {
  desiredSalary: number // Salário líquido desejado
  hoursPerDay: number
  daysPerWeek: number
  vacationDays: number // Dias de férias/folga por ano
  fixedCosts: FixedCosts
  taxRegime: TaxRegime
  hasAccountant: boolean
  accountantCost: number
}

export interface FixedCosts {
  internet: number
  electricity: number
  software: number // Adobe, Notion, etc.
  coworking: number
  other: number
}

export interface CalculatorResult {
  hourlyRate: number // Valor da hora técnica
  projectRate: number // Valor sugerido para projetos (com margem)
  monthlyGrossRevenue: number // Faturamento bruto mensal necessário
  monthlyTaxes: number // Impostos mensais
  vacationReserve: number // Reserva para férias
  emergencyReserve: number // Reserva de emergência (10-15%)
  totalFixedCosts: number // Total de custos fixos
  workableHoursPerMonth: number // Horas trabalhadas por mês
  cltEquivalent: number // Salário CLT equivalente
}

// Tax profiles configuration
export const TAX_PROFILES: TaxProfile[] = [
  {
    id: 'mei',
    name: 'MEI',
    description: 'Microempreendedor Individual',
    monthlyLimit: 6750,
    rate: 0,
    fixedCost: 82.60, // DAS fixo
  },
  {
    id: 'simples-anexo-iii',
    name: 'Simples Nacional (Anexo III)',
    description: 'Serviços de TI, Design, Redação (com Fator R)',
    monthlyLimit: 15000,
    rate: 0.06, // 6% com Fator R
  },
  {
    id: 'simples-anexo-v',
    name: 'Simples Nacional (Anexo V)',
    description: 'Serviços intelectuais sem Pro-labore estratégico',
    monthlyLimit: 15000,
    rate: 0.155, // 15.5%
  },
]

// Default values for initial state
export const DEFAULT_INPUTS: FreelancerInputs = {
  desiredSalary: 5000,
  hoursPerDay: 8,
  daysPerWeek: 5,
  vacationDays: 30,
  fixedCosts: {
    internet: 150,
    electricity: 200,
    software: 100,
    coworking: 0,
    other: 0,
  },
  taxRegime: 'simples-anexo-iii',
  hasAccountant: true,
  accountantCost: 300,
}

// Preset fixed costs for quick selection
export interface CostPreset {
  id: string
  name: string
  icon: string
  defaultValue: number
  category: keyof FixedCosts
}

export const COST_PRESETS: CostPreset[] = [
  { id: 'internet', name: 'Internet', icon: 'wifi', defaultValue: 150, category: 'internet' },
  { id: 'electricity', name: 'Energia', icon: 'zap', defaultValue: 200, category: 'electricity' },
  { id: 'adobe', name: 'Adobe CC', icon: 'palette', defaultValue: 290, category: 'software' },
  { id: 'notion', name: 'Notion', icon: 'layout', defaultValue: 48, category: 'software' },
  { id: 'figma', name: 'Figma', icon: 'figma', defaultValue: 75, category: 'software' },
  { id: 'coworking', name: 'Coworking', icon: 'building', defaultValue: 800, category: 'coworking' },
]

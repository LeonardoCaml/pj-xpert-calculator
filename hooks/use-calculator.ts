'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  FreelancerInputs,
  CalculatorResult,
  DEFAULT_INPUTS,
  TAX_PROFILES,
  TaxRegime,
  FixedCosts,
} from '@/lib/calculator-types'

const STORAGE_KEY = 'pj-xpert-calculator-data'
const EMERGENCY_RESERVE_RATE = 0.10 // 10% reserva de emergência

// ViewModel - Custom Hook following MVVM pattern
export function useCalculator() {
  const [inputs, setInputs] = useState<FreelancerInputs>(DEFAULT_INPUTS)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from sessionStorage on mount (Privacy by Design - volatile persistence)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as FreelancerInputs
        setInputs(parsed)
      }
    } catch {
      // Ignore errors, use defaults
    }
    setIsHydrated(true)
  }, [])

  // Save to sessionStorage on changes (with debounce built into effect)
  useEffect(() => {
    if (!isHydrated) return
    
    const timeout = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(inputs))
      } catch {
        // Ignore storage errors
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [inputs, isHydrated])

  // Calculate results based on inputs
  const result = useMemo<CalculatorResult>(() => {
    const taxProfile = TAX_PROFILES.find(t => t.id === inputs.taxRegime) || TAX_PROFILES[1]
    
    // Calculate total fixed costs
    const fixedCostsTotal = 
      inputs.fixedCosts.internet +
      inputs.fixedCosts.electricity +
      inputs.fixedCosts.software +
      inputs.fixedCosts.coworking +
      inputs.fixedCosts.other +
      (inputs.hasAccountant ? inputs.accountantCost : 0)

    // Calculate workable hours per month
    // (hours/day * days/week * 4.33 weeks/month) - vacation impact
    const weeksPerYear = 52
    const vacationWeeks = inputs.vacationDays / 7
    const workableWeeksPerYear = weeksPerYear - vacationWeeks
    const workableWeeksPerMonth = workableWeeksPerYear / 12
    const hoursPerMonth = inputs.hoursPerDay * inputs.daysPerWeek * workableWeeksPerMonth

    // Vacation reserve (distributed across 11 months)
    const monthlyVacationReserve = inputs.desiredSalary / 11

    // Calculate gross revenue needed using the formula:
    // faturamento_bruto = (custo_fixo + pro_labore) / (1 - (imposto + reserva))
    const proLabore = inputs.desiredSalary + monthlyVacationReserve
    const totalCosts = fixedCostsTotal + proLabore
    
    let monthlyGrossRevenue: number
    let monthlyTaxes: number

    if (taxProfile.id === 'mei') {
      // MEI has fixed cost, not percentage
      monthlyGrossRevenue = totalCosts + (taxProfile.fixedCost || 0) + (totalCosts * EMERGENCY_RESERVE_RATE)
      monthlyTaxes = taxProfile.fixedCost || 0
    } else {
      // Simples Nacional uses percentage
      const divisor = 1 - (taxProfile.rate + EMERGENCY_RESERVE_RATE)
      monthlyGrossRevenue = totalCosts / divisor
      monthlyTaxes = monthlyGrossRevenue * taxProfile.rate
    }

    // Emergency reserve
    const emergencyReserve = monthlyGrossRevenue * EMERGENCY_RESERVE_RATE

    // Hourly rate
    const hourlyRate = hoursPerMonth > 0 ? monthlyGrossRevenue / hoursPerMonth : 0

    // Project rate with 20% negotiation margin
    const projectRate = hourlyRate * 1.2

    // CLT equivalent calculation
    // CLT has ~30% deductions (INSS, FGTS, etc.) and company pays ~70% more
    // So PJ gross ≈ CLT gross * 1.4 approximately
    const cltEquivalent = inputs.desiredSalary * 1.35

    return {
      hourlyRate,
      projectRate,
      monthlyGrossRevenue,
      monthlyTaxes,
      vacationReserve: monthlyVacationReserve,
      emergencyReserve,
      totalFixedCosts: fixedCostsTotal,
      workableHoursPerMonth: hoursPerMonth,
      cltEquivalent,
    }
  }, [inputs])

  // Update functions
  const updateInput = useCallback(<K extends keyof FreelancerInputs>(
    key: K,
    value: FreelancerInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateFixedCost = useCallback(<K extends keyof FixedCosts>(
    key: K,
    value: number
  ) => {
    setInputs(prev => ({
      ...prev,
      fixedCosts: { ...prev.fixedCosts, [key]: value }
    }))
  }, [])

  const setTaxRegime = useCallback((regime: TaxRegime) => {
    setInputs(prev => ({ ...prev, taxRegime: regime }))
  }, [])

  const resetToDefaults = useCallback(() => {
    setInputs(DEFAULT_INPUTS)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore errors
    }
  }, [])

  // Currency formatting (ViewModel responsibility)
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }, [])

  const formatNumber = useCallback((value: number, decimals = 1): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }, [])

  return {
    inputs,
    result,
    isHydrated,
    updateInput,
    updateFixedCost,
    setTaxRegime,
    resetToDefaults,
    formatCurrency,
    formatNumber,
    taxProfiles: TAX_PROFILES,
  }
}

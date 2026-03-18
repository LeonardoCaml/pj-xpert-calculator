'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  formatFn?: (value: number) => string
  className?: string
  duration?: number
}

export function NumberTicker({
  value,
  formatFn = (v) => v.toFixed(2),
  className,
  duration = 500,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousValue = useRef(value)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (previousValue.current === value) return

    const startValue = previousValue.current
    const endValue = value
    const startTime = performance.now()

    setIsAnimating(true)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValue + (endValue - startValue) * easeOut
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
        setIsAnimating(false)
        previousValue.current = endValue
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, duration])

  return (
    <span
      className={cn(
        'tabular-nums transition-transform',
        isAnimating && 'animate-ticker',
        className
      )}
    >
      {formatFn(displayValue)}
    </span>
  )
}

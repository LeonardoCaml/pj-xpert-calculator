"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
  label: string;
  className?: string;
}

export function CustomSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue = (v) => v.toString(),
  label,
  className,
}: CustomSliderProps) {
  return (
    <div className={cn("space-y-2 sm:space-y-3", className)}>
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-2">
        <label className="text-xs sm:text-sm font-medium text-muted-foreground">
          {label}
        </label>

        <span className="text-base sm:text-lg font-semibold tabular-nums text-foreground">
          {formatValue(value)}
        </span>
      </div>

      {/* Slider */}
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center py-2"
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
      >
        <SliderPrimitive.Track className="relative h-2.5 sm:h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary to-primary/80" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb
          className="
            block h-6 w-6 sm:h-5 sm:w-5 
            rounded-full border-2 border-primary bg-background 
            shadow-md sm:shadow-lg sm:shadow-primary/20
            ring-offset-background 
            transition-all 
            focus-visible:outline-none 
            focus-visible:ring-2 
            focus-visible:ring-ring 
            focus-visible:ring-offset-2 
            disabled:pointer-events-none 
            disabled:opacity-50 
            cursor-grab active:cursor-grabbing
            sm:hover:scale-110 sm:hover:shadow-primary/40
          "
        />
      </SliderPrimitive.Root>

      {/* Min / Max */}
      <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

interface CurrencySliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  className?: string;
}

export function CurrencySlider({
  value,
  onChange,
  min,
  max,
  step = 100,
  label,
  className,
}: CurrencySliderProps) {
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <CustomSlider
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      formatValue={formatCurrency}
      label={label}
      className={className}
    />
  );
}

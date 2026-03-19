"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Wifi,
  Zap,
  Palette,
  Layout,
  Figma,
  Building2,
  Plus,
  X,
} from "lucide-react";
import { FixedCosts } from "@/lib/calculator-types";

interface CostInputProps {
  fixedCosts: FixedCosts;
  onUpdateCost: (key: keyof FixedCosts, value: number) => void;
  className?: string;
}

interface CostItem {
  key: keyof FixedCosts;
  label: string;
  icon: React.ReactNode;
  defaultValue: number;
}

interface OtherCostEntry {
  id: string;
  label: string;
  value: number;
}

const MAX_OTHER_COSTS = 8;

const COST_ITEMS: CostItem[] = [
  {
    key: "internet",
    label: "Internet",
    icon: <Wifi className="h-4 w-4" />,
    defaultValue: 150,
  },
  {
    key: "electricity",
    label: "Energia",
    icon: <Zap className="h-4 w-4" />,
    defaultValue: 200,
  },
  {
    key: "software",
    label: "Softwares",
    icon: <Palette className="h-4 w-4" />,
    defaultValue: 200,
  },
  {
    key: "coworking",
    label: "Coworking",
    icon: <Building2 className="h-4 w-4" />,
    defaultValue: 800,
  },
];

export function CostInput({
  fixedCosts,
  onUpdateCost,
  className,
}: CostInputProps) {
  const [editingKey, setEditingKey] = useState<keyof FixedCosts | null>(null);
  const [otherCosts, setOtherCosts] = useState<OtherCostEntry[]>([
    { id: crypto.randomUUID(), label: "", value: 0 },
  ]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const syncOtherCostsToParent = (entries: OtherCostEntry[]) => {
    const total = entries.reduce((sum, e) => sum + (e.value || 0), 0);
    onUpdateCost("other", total);
  };

  const handleToggleCost = (item: CostItem) => {
    const currentValue = fixedCosts[item.key];
    if (currentValue > 0) {
      onUpdateCost(item.key, 0);
    } else {
      onUpdateCost(item.key, item.defaultValue);
      setEditingKey(item.key);
    }
  };

  const handleInputChange = (key: keyof FixedCosts, inputValue: string) => {
    const numValue = parseInt(inputValue.replace(/\D/g, ""), 10) || 0;
    onUpdateCost(key, numValue);
  };

  const handleOtherLabelChange = (id: string, label: string) => {
    const updated = otherCosts.map((e) => (e.id === id ? { ...e, label } : e));
    setOtherCosts(updated);
  };

  const handleOtherValueChange = (id: string, inputValue: string) => {
    const numValue = parseInt(inputValue.replace(/\D/g, ""), 10) || 0;
    const updated = otherCosts.map((e) =>
      e.id === id ? { ...e, value: numValue } : e,
    );
    setOtherCosts(updated);
    syncOtherCostsToParent(updated);
  };

  const handleAddOtherCost = () => {
    if (otherCosts.length >= MAX_OTHER_COSTS) return;
    const updated = [
      ...otherCosts,
      { id: crypto.randomUUID(), label: "", value: 0 },
    ];
    setOtherCosts(updated);
  };

  const handleRemoveOtherCost = (id: string) => {
    if (otherCosts.length === 1) {
      const reset = [{ id: crypto.randomUUID(), label: "", value: 0 }];
      setOtherCosts(reset);
      syncOtherCostsToParent(reset);
      return;
    }
    const updated = otherCosts.filter((e) => e.id !== id);
    setOtherCosts(updated);
    syncOtherCostsToParent(updated);
  };

  const canAddMore = otherCosts.length < MAX_OTHER_COSTS;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COST_ITEMS.map((item) => {
          const isActive = fixedCosts[item.key] > 0;
          const isEditing = editingKey === item.key;

          return (
            <div key={item.key} className="relative">
              <button
                type="button"
                onClick={() => handleToggleCost(item)}
                className={cn(
                  "group relative flex w-full flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                  isActive
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                    : "border-border bg-surface/40 hover:border-primary/50 hover:bg-surface/60",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="text-xs font-semibold text-foreground">
                    {formatCurrency(fixedCosts[item.key])}
                  </span>
                )}
                {!isActive && (
                  <Plus className="absolute right-2 top-2 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>

              {isActive && isEditing && (
                <div className="absolute inset-x-0 top-full z-10 mt-2">
                  <div className="rounded-lg border border-border bg-popover p-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={fixedCosts[item.key]}
                        onChange={(e) =>
                          handleInputChange(item.key, e.target.value)
                        }
                        onBlur={() => setEditingKey(null)}
                        autoFocus
                        className="w-full rounded border-none bg-transparent text-sm font-medium text-foreground outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingKey(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isActive && !isEditing && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingKey(item.key);
                  }}
                  className="absolute bottom-1 right-1 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                >
                  <span className="text-xs">Editar</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Other costs input */}
      {/* <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/40 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          <Plus className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground">
            Outros custos
          </label>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">R$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fixedCosts.other || ''}
              onChange={(e) => handleInputChange('other', e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div> */}

      <div className="rounded-xl border border-border bg-surface/40 p-4 space-y-3">
        {/* Section header */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
            <Plus className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Outros custos
          </span>
        </div>

        {/* Cost entries */}
        <div className="space-y-2">
          {otherCosts.map((entry, index) => (
            <div
              key={entry.id}
              className="group flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 transition-colors hover:border-border"
            >
              {/* Label input */}
              <input
                type="text"
                value={entry.label}
                onChange={(e) =>
                  handleOtherLabelChange(entry.id, e.target.value)
                }
                placeholder={`Custo ${index + 1}`}
                maxLength={32}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              />

              {/* Divider */}
              <span className="shrink-0 text-border">|</span>

              {/* Currency prefix */}
              <span className="shrink-0 text-sm text-muted-foreground">R$</span>

              {/* Value input */}
              <input
                type="text"
                inputMode="numeric"
                value={entry.value || ""}
                onChange={(e) =>
                  handleOtherValueChange(entry.id, e.target.value)
                }
                placeholder="0"
                className="w-20 bg-transparent text-right text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveOtherCost(entry.id)}
                aria-label="Remover custo"
                className="ml-1 shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add more / limit hint */}
        {canAddMore ? (
          <button
            type="button"
            onClick={handleAddOtherCost}
            className="flex items-center gap-1.5 rounded-md px-1 py-0.5 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar outro custo
          </button>
        ) : (
          <p className="px-1 text-xs text-muted-foreground/60">
            Limite de {MAX_OTHER_COSTS} custos atingido.
          </p>
        )}
      </div>
    </div>
  );
}

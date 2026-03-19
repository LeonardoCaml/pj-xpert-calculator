import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        // ↓ padding e radius mais equilibrados no mobile
        "rounded-xl sm:rounded-2xl bg-surface/60 backdrop-blur-xl border border-foreground/10 p-4 sm:p-6",

        // ↓ hover só relevante em devices com hover (evita custo inútil em mobile)
        hover &&
          "sm:transition-all sm:duration-300 sm:hover:bg-surface/80 sm:hover:border-foreground/20 sm:hover:shadow-lg sm:hover:shadow-primary/5",

        className,
      )}
    >
      {children}
    </div>
  );
}

interface GlassSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function GlassSection({
  title,
  description,
  icon,
  children,
  className,
}: GlassSectionProps) {
  return (
    <section className={cn("space-y-4 sm:space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3">
        {icon && (
          <div
            className="
              flex h-9 w-9 sm:h-10 sm:w-10 
              items-center justify-center 
              rounded-lg sm:rounded-xl 
              bg-primary/10 text-primary 
              shrink-0
            "
          >
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground leading-tight">
            {title}
          </h2>

          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

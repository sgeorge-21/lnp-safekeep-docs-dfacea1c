import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent";
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 shadow-card transition-all hover:shadow-card-hover animate-fade-in",
        variant === "primary" && "bg-gradient-navy text-primary-foreground",
        variant === "accent" && "bg-gold text-navy-dark",
        variant === "default" && "bg-card text-card-foreground border border-border"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-sm",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && (variant === "default" ? "text-muted-foreground" : "opacity-70")
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            variant === "primary" && "bg-primary-foreground/10",
            variant === "accent" && "bg-navy-dark/10",
            variant === "default" && "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              variant === "primary" && "text-gold",
              variant === "accent" && "text-navy-dark",
              variant === "default" && "text-primary"
            )}
          />
        </div>
      </div>
    </div>
  );
}

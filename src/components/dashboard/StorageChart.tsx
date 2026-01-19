import { HardDrive } from "lucide-react";

export function StorageChart() {
  const usedStorage = 45.2;
  const totalStorage = 100;
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="bg-card rounded-lg border border-border shadow-card animate-fade-in p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Storage Usage</h3>
          <p className="text-sm text-muted-foreground">System capacity overview</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <HardDrive className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--gold))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 4.4} 440`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-card-foreground">{percentage.toFixed(0)}%</span>
            <span className="text-sm text-muted-foreground">Used</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-card-foreground">{usedStorage} GB</p>
          <p className="text-xs text-muted-foreground">Used</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-card-foreground">{(totalStorage - usedStorage).toFixed(1)} GB</p>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Strategy } from "@/lib/generators/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  History, 
  LineChart, 
  Target, 
  BarChart4,
  Check,
  Repeat,
  RotateCcw,
  Binary,
  TrendingDown,
  Trophy,
  Sparkles
} from "lucide-react";

interface StrategyGridProps {
  selectedId: string;
  onSelect: (strategyId: string) => void;
  strategies: Strategy[];
}

// Map strategies to icons for more professional look
const ICON_MAP: Record<string, any> = {
  // Toto
  "hot-numbers": LineChart,
  "cold-numbers": History,
  "balanced-mix": Zap,
  "odd-even": Target,
  "high-low": BarChart4,
  // 4D
  "4d-quick-pick": Zap,
  "4d-hot": LineChart,
  "4d-cold": History,
  "4d-pattern": Target,
  "4d-digit-freq": Binary,
  "4d-sum-target": BarChart4,
  "4d-mirror": RotateCcw,
  "4d-repeating": Repeat,
  "4d-consecutive": TrendingDown,
  "4d-trend": TrendingDown,
  "4d-gap": History,
  "4d-lucky": Trophy,
};

export const StrategyGrid = ({ selectedId, onSelect, strategies }: StrategyGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {strategies.map((s) => {

        const Icon = ICON_MAP[s.id] || Zap;
        const isSelected = selectedId === s.id;
        
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "group relative flex flex-col items-center p-4 rounded-3xl border transition-all duration-300 text-center min-h-[140px] justify-center overflow-hidden",
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-[0_10px_30px_rgba(255,0,0,0.3)] scale-[1.05] -rotate-1 z-10"
                : "bg-white/80 backdrop-blur-sm border-slate-100 hover:border-primary/40 hover:bg-white hover:scale-105 hover:rotate-1 hover:shadow-xl"
            )}
          >
            {/* Background Decoration */}
            <div className={cn(
              "absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-700",
              isSelected ? "text-white" : "text-primary"
            )}>
              <Icon className="w-20 h-20" />
            </div>

            {/* Sparkles for selected */}
            {isSelected && (
              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-2 left-2 w-3 h-3 text-orange-300 animate-pulse" />
                <Sparkles className="absolute bottom-3 right-4 w-4 h-4 text-orange-200 animate-bounce" />
              </div>
            )}

            <div className={cn(
              "mb-3 p-3 rounded-2xl transition-all duration-500 shadow-sm",
              isSelected ? "bg-white/20 scale-110" : "bg-primary/5 group-hover:bg-primary/10"
            )}>
              {isSelected ? (
                <Check className="w-6 h-6 animate-in zoom-in spin-in-12 duration-500" />
              ) : (
                <Icon className={cn("w-6 h-6", isSelected ? "text-white" : "text-primary")} />
              )}
            </div>
            
            <h3 className={cn(
              "font-black text-xs leading-tight tracking-tight uppercase px-2",
              isSelected ? "text-white" : "text-slate-700"
            )}>
              {s.name}
            </h3>

            <div className="mt-3">
              <Badge 
                variant={isSelected ? "secondary" : "outline"} 
                className={cn(
                  "text-[8px] px-2 h-5 uppercase tracking-[0.15em] font-black",
                  isSelected 
                    ? "bg-white/20 border-white/30 text-white" 
                    : s.complexity === "Statistical" ? "text-blue-500 border-blue-100 bg-blue-50/50"
                    : s.complexity === "Pattern" ? "text-orange-500 border-orange-100 bg-orange-50/50"
                    : s.complexity === "History" ? "text-purple-500 border-purple-100 bg-purple-50/50"
                    : "text-emerald-500 border-emerald-100 bg-emerald-50/50"
                )}
              >
                {s.complexity}
              </Badge>
            </div>
          </button>
        );
      })}
    </div>
  );
};

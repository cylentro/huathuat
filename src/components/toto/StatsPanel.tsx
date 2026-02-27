"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface DrawRecord {
  drawNo?: number | null;
  date: string;
  numbers: number[];
  additional?: number;
}

interface StatsPanelProps {
  history: DrawRecord[];
  gameType?: "toto" | "4d";
}

export const StatsPanel = ({ history, gameType = "toto" }: StatsPanelProps) => {
  const stats = useMemo(() => {
    const isToto = gameType === "toto";
    const freq: Record<number, number> = {};
    const maxRange = isToto ? 49 : 9;
    const minRange = isToto ? 1 : 0;
    
    for (let i = minRange; i <= maxRange; i++) freq[i] = 0;
    
    history.slice(0, 500).forEach(draw => {
      draw.numbers.forEach(n => {
        if (isToto) {
          freq[n] = (freq[n] || 0) + 1;
        } else {
          // For 4D, count each digit
          const digits = n.toString().padStart(4, '0').split('');
          digits.forEach(d => {
            const digit = parseInt(d);
            freq[digit] = (freq[digit] || 0) + 1;
          });
        }
      });
    });

    const sorted = Object.entries(freq)
      .sort(([, a], [, b]) => b - a)
      .map(([n, f]) => ({ number: parseInt(n), count: f }));

    if (!isToto) {
      return {
        hot: sorted, // For 4D, return full list in hot
        cold: []     // Cold isn't used separately for 4D Spectrum
      };
    }

    return {
      hot: sorted.slice(0, 10),
      cold: [...sorted].reverse().slice(0, 10)
    };
  }, [history, gameType]);




  const isToto = gameType === "toto";

  return (
    <div className="space-y-6">
      {isToto ? (
        <>
          <div className="space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600 flex items-center justify-between px-1">
              <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                 Burning Hot 🔥
              </span>
            </h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-1.5">
              {stats.hot.map((s) => (
                <div key={s.number} className="group flex flex-col items-center">
                  <div className="w-full aspect-square rounded-xl sm:rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-[10px] sm:text-[11px] font-black text-white shadow-md shadow-orange-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    {String(s.number).padStart(2, "0")}
                  </div>
                  <span className="text-[8px] font-bold text-orange-600/60 mt-1 tabular-nums italic">{s.count}x HUAT</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center justify-between px-1">
              <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 Freezing Cold ❄️
              </span>
            </h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-1.5">
              {stats.cold.map((s) => (
                <div key={s.number} className="group flex flex-col items-center">
                  <div className="w-full aspect-square rounded-xl sm:rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-[10px] sm:text-[11px] font-black text-white shadow-md shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {String(s.number).padStart(2, "0")}
                  </div>
                  <span className="text-[8px] font-bold text-blue-600/60 mt-1 tabular-nums italic">{s.count}x HUAT</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
              Digit Power Meter ⚡
            </h3>
          </div>

          <div className="space-y-2.5">
            {stats.hot.map((s, idx) => {
              const isHot = idx < 3;
              const isCold = idx > 6;
              const maxCount = stats.hot[0].count;
              const minCount = stats.hot[stats.hot.length - 1].count;
              
              // Amplify difference for visualization: 
              // Map the range [min, max] to [20%, 100%] bar width
              const range = maxCount - minCount;
              const barWidth = range > 0 
                ? `${((s.count - minCount) / range) * 80 + 20}%`
                : "100%";

              return (
                <div key={s.number} className="group flex items-center gap-3">
                  {/* Rank */}
                  <span className={cn(
                    "text-[8px] font-black w-4 shrink-0 px-2",
                    isHot ? "text-orange-500" : isCold ? "text-blue-500" : "text-slate-300"
                  )}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Digit Box */}
                  <div className={cn(
                    "w-8 h-8 rounded-xl border flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6",
                    isHot ? "bg-gradient-to-br from-orange-400 to-red-500 border-orange-100 text-white shadow-orange-500/20" :
                    isCold ? "bg-gradient-to-br from-blue-400 to-indigo-600 border-blue-100 text-white shadow-blue-500/20" :
                    "bg-white border-slate-100 text-slate-700 shadow-sm"
                  )}>
                    {s.number}
                  </div>

                  {/* Frequency Bar Track */}
                  <div className="flex-1 h-2.5 bg-slate-50 rounded-full border border-slate-100/50 relative overflow-hidden group-hover:h-3 transition-all">
                    <div 
                      className={cn(
                        "absolute top-0 left-0 h-full transition-all duration-1000 ease-out",
                        isHot ? "bg-gradient-to-r from-orange-400 to-red-500" :
                        isCold ? "bg-gradient-to-r from-blue-400 to-indigo-500" :
                        "bg-slate-300"
                      )}
                      style={{ width: barWidth }}
                    />
                  </div>

                  {/* Count */}
                  <span className="text-[9px] font-black text-slate-400 w-10 text-right tabular-nums italic">
                    {s.count}x
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>


  );
};

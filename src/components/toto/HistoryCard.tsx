"use client";

import { useState } from "react";
import { Zap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryCardProps {
  strategy: string;
  timestamp: number;
  sets: number[][];
  huatScore?: number;
  huatLevel?: string;
  gameType: "toto" | "4d";
}

export function HistoryCard({ strategy, timestamp, sets, huatScore, huatLevel, gameType }: HistoryCardProps) {
  const [open, setOpen] = useState(false);

  const previewNums = gameType === "4d"
    ? null
    : sets[0]?.slice(0, 3);

  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition-all duration-300 overflow-hidden",
        open
          ? "border-primary/20 shadow-md shadow-primary/5"
          : "border-slate-100 hover:border-slate-200 hover:shadow-md"
      )}
    >
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          "w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-300",
          open ? "bg-gradient-to-r from-primary/[0.05] to-transparent" : "hover:bg-slate-50/60"
        )}
      >
        {/* Icon */}
        <div className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500",
          open
            ? "bg-gradient-to-br from-primary to-orange-500 shadow-lg shadow-primary/30 scale-110"
            : "bg-primary/5"
        )}>
          <Zap className={cn("h-4 w-4 transition-colors duration-500", open ? "text-white" : "text-primary/60")} />
        </div>

        {/* Text */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-bold text-sm text-slate-900 truncate leading-tight">{strategy}</span>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">
              {sets.length} SET{sets.length > 1 ? "S" : ""}
            </span>
            {huatScore && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                  huatLevel === "legendary"
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm shadow-amber-500/20"
                    : huatLevel === "high"
                    ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-sm shadow-primary/20"
                    : "bg-slate-100 text-slate-500"
                )}>
                  Score: {huatScore}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Preview balls (hidden when open) */}
        {!open && previewNums && (
          <div className="hidden sm:flex items-center gap-1 shrink-0 opacity-40">
            {previewNums.map((n, i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-[7px] font-black text-slate-400 bg-slate-50">
                {String(n).padStart(2, "0")}
              </div>
            ))}
            <span className="text-[7px] font-black text-slate-300 ml-0.5">...</span>
          </div>
        )}

        {/* Chevron */}
        <ChevronDown className={cn(
          "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300",
          open && "rotate-180"
        )} />
      </button>

      {/* Expandable body — full control, no hidden wrappers */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}>
        <div className="overflow-hidden">
          <div className="border-t border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100/50">
              {sets.map((set, sIdx) => (
                <div key={sIdx} className="flex gap-3 items-center px-4 py-3 bg-white">
                  <span className="text-[10px] font-black text-slate-300 w-5 shrink-0">#{sIdx + 1}</span>
                  <div className="flex gap-2 flex-wrap flex-1 justify-center">
                    {gameType === "4d" ? (
                      <div className="text-2xl font-black text-slate-700 font-mono tracking-[0.2em]">
                        {String(set[0]).padStart(4, "0")}
                      </div>
                    ) : (
                      set.map((n, nIdx) => (
                        <div
                          key={`${sIdx}-${nIdx}`}
                          className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-xs font-black text-slate-500 bg-white shadow-sm hover:scale-125 hover:text-primary transition-all duration-300 animate-in zoom-in-50 fill-mode-both"
                          style={{
                            animationDelay: `${sIdx * 60 + nIdx * 30}ms`,
                            animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                          }}
                        >
                          {String(n).padStart(2, "0")}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

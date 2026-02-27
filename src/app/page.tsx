"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { STRATEGIES } from "@/lib/generators/registry";
import { FOUR_D_STRATEGIES } from "@/lib/generators/four-d-registry";
import { SINGAPORE_TOTO } from "@/lib/generators/singapore-toto";
import { SINGAPORE_4D } from "@/lib/generators/singapore-4d";
import { SG_TOTO_HISTORY } from "@/data/sg-toto-history";
import { SG_4D_HISTORY } from "@/data/sg-4d-history";
import { calculateHuatScore } from "@/lib/toto/huat-math";
import { StrategyGrid } from "@/components/toto/StrategyGrid";
import { SetCounter } from "@/components/toto/SetCounter";
import { ResultSet } from "@/components/toto/ResultSet";
import { FourDResultSet } from "@/components/toto/FourDResultSet";
import { HuatMeter } from "@/components/toto/HuatMeter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Settings2, Zap, ArrowRight, Dices, PartyPopper, ShieldAlert } from "lucide-react";

export default function HuatHuatPage() {
  const { addHistory, activeGameId } = useGame();
  
  // Game-aware data selection
  const { config, history, strategies } = useMemo(() => {
    if (activeGameId === "sg-4d") {
      return { config: SINGAPORE_4D, history: SG_4D_HISTORY, strategies: FOUR_D_STRATEGIES };
    }
    return { config: SINGAPORE_TOTO, history: SG_TOTO_HISTORY, strategies: STRATEGIES };
  }, [activeGameId]);

  const [strategyId, setStrategyId] = useState<string>("");
  const [setCount, setSetCount] = useState(1);
  const [results, setResults] = useState<{ numbers: number[]; timestamp: number }[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Reset on game change
  useEffect(() => {
    setStrategyId("");
    setResults([]);
  }, [activeGameId]);

  const handleGenerate = () => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    const count = setCount;
    const newSets: number[][] = [];
    const newResults: { numbers: number[]; timestamp: number }[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const nums = strategy.generate(config, history);
      newSets.push(nums);
      newResults.push({ numbers: nums, timestamp: now + i });
    }

    setResults(newResults);

    const score = calculateHuatScore(newSets, history, activeGameId === "sg-4d" ? "4d" : "toto");
    let tier = "low";
    if (score >= 80) tier = "legendary";
    else if (score >= 60) tier = "high";
    else if (score >= 40) tier = "medium";

    addHistory({
      strategy: strategy.name,
      sets: newSets,
      timestamp: now,
      huatScore: score,
      huatLevel: tier,
    });
    
    // Auto-scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const selectedStrategy = strategies.find(s => s.id === strategyId);

  return (
    <>
      {/* Page content — animated wrapper. NOTE: fixed elements must NOT be children of this div
          because CSS transforms on ancestors break position:fixed (they create a new stacking context) */}
      <div className="mx-auto max-w-4xl px-4 pb-[72px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center text-center space-y-4 mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">
            <Zap className="h-3 w-3" />
            Confirm Plus Chop AI Luck
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Want to <span className="text-primary">HUAT</span>? Pick Numbers Now!
          </h1>
          <p className="max-w-xl text-slate-500 font-medium md:text-lg">
            Don't blur lah! Just pick one logical strategy below and generate your HUAT numbers. Our prediction engine steady one!
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">

            {/* Legal Disclaimer — Premium Glass Badge */}
            <div className="mx-auto w-full max-w-2xl p-6 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] animate-[shimmer_3s_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldAlert className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">
                  Disclaimer First Ah!
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We cannot guarantee confirm strike one. <br className="hidden sm:block" />
                  <span className="font-black text-primary/80">HUAT</span> is possible, but not guaranteed. Guard your wallet and don't siao siao! 🧧
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900">
                <Settings2 className="h-4 w-4" />
                1. Select Strategy
              </h2>
            </div>

            <StrategyGrid selectedId={strategyId} onSelect={setStrategyId} strategies={strategies} />

            {selectedStrategy ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl animate-in zoom-in duration-300">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Dices className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900">{selectedStrategy.name} Logic</h3>
                    <p className="text-sm text-slate-500 leading-relaxed italic">
                      {selectedStrategy.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-2 text-primary/40">
                  <Settings2 className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-widest">No Strategy Selected</h3>
                </div>
                <p className="text-[11px] text-slate-400 max-w-[200px]">
                  Select a statistical engine above to begin generating your lucky numbers.
                </p>
              </div>
            )}


          </section>
        </div>
      </div>

      {/* Action Bar — MUST be outside the animated div above.
          A CSS transform on any ancestor breaks position:fixed by creating a new containing block. */}
      <section className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-50 px-2 sm:px-4 max-w-3xl mx-auto pointer-events-none">
        <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200 p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 pointer-events-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-4">
              <div className="space-y-0.5 hidden md:block">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Sets</p>
                <p className="text-[11px] font-bold text-slate-900">How many rows?</p>
              </div>
              <div className="h-6 w-px bg-slate-200 hidden md:block" />
              <div className="scale-[0.85] sm:scale-90 origin-left">
                <SetCounter value={setCount} onChange={setSetCount} />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              size="sm"
              disabled={!selectedStrategy}
              className={cn(
                "h-10 sm:h-12 rounded-xl sm:rounded-full px-4 sm:px-6 gap-2 text-xs sm:text-base font-black transition-all flex-1 sm:flex-none",
                selectedStrategy
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgba(255,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-primary/5 text-primary/20 cursor-not-allowed opacity-50 border border-primary/10"
              )}
            >
              {!selectedStrategy ? (
                <>
                  <Settings2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden xs:block" />
                  <span className="text-[10px] xs:text-xs">SELECT STRATEGY</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline text-xs sm:text-sm">GENERATE NOW</span>
                  <span className="xs:hidden text-[10px]">GENERATE</span>
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 hidden sm:block" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Results — also outside the animated div */}
      {results.length > 0 && (
        <section ref={resultsRef} className="mx-auto max-w-4xl px-4 space-y-6 py-6 pb-24 sm:pb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-sm transition-transform hover:scale-110">
              <Sparkles className="h-3 w-3" />
              Your Luck Is Here Lah!
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Your <span className="text-primary">HUAT</span> Picks
              <PartyPopper className="h-8 w-8 text-primary/20 animate-bounce hidden sm:block" />
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
              Click one row once you buy already!
            </p>
          </div>

          <HuatMeter
            numbers={results.map(r => r.numbers)}
            history={history}
            gameType={activeGameId === "sg-4d" ? "4d" : "toto"}
          />

          <div className="grid grid-cols-1 gap-4">
            {results.map((r, idx) => (
              <div
                key={r.timestamp}
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {activeGameId === "sg-4d" ? (
                  <FourDResultSet number={r.numbers[0]} />
                ) : (
                  <ResultSet numbers={r.numbers} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

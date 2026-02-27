"use client";

import { useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { StatsPanel } from "@/components/toto/StatsPanel";
import { SG_TOTO_HISTORY } from "@/data/sg-toto-history";
import { SG_4D_HISTORY } from "@/data/sg-4d-history";
import { 
  BarChart3, 
  History as HistoryIcon, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Clock,
  LayoutDashboard,
  Sparkles,
  Zap
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AnalyticsPage() {
  const { history, activeGameId, currentGame } = useGame();

  const marketHistory = useMemo(() => {
    return activeGameId === "sg-4d" ? SG_4D_HISTORY : SG_TOTO_HISTORY;
  }, [activeGameId]);

  const gameType = activeGameId === "sg-4d" ? "4d" : "toto";

  // Filter history for current game
  const gameHistory = history.filter(h => h.gameId === activeGameId);

  return (
    <div className="mx-auto max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <LayoutDashboard className="h-3 w-3" />
            Confirm Plus Chop Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Market <span className="text-primary">Got Pattern</span> One
          </h1>
          <p className="text-slate-500 font-medium md:text-lg">
            Everything you need is here lah! Check out the {currentGame.name} patterns and your own winning history.
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">

        {/* Left Column: Recent Logs (Now Larger) */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
          <div className="flex items-center gap-2 px-2">
            <HistoryIcon className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Generation Timeline</h2>
          </div>

          {gameHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl border border-dashed border-primary/10 space-y-3 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/20">
                <Calendar className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest leading-none">No History Found</p>
              <p className="text-[11px] text-slate-400">Your generation history for this game will appear here once you start using the Huat Engine.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {gameHistory.map((item, idx) => (
                <Card key={item.timestamp} className="rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 overflow-hidden group">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 px-3">
                        <div className="flex items-center gap-3 w-full text-left">
                          {/* Rich Icon */}
                          <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                            <Zap className="h-3.5 w-3.5 text-primary/60" />
                          </div>

                          <div className="flex flex-1 items-center justify-between min-w-0 gap-4">
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-[12px] text-slate-700 truncate leading-tight">
                                {item.strategy}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">
                                  {item.sets.length} SET{item.sets.length > 1 ? 'S' : ''}
                                </span>
                              </div>
                            </div>

                            {/* Mini Preview (First Set) */}
                            <div className="hidden sm:flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                              {gameType === "4d" ? (
                                <div className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                  {String(item.sets[0][0]).padStart(4, '0')}
                                </div>
                              ) : (
                                <>
                                  {item.sets[0].slice(0, 3).map((n, i) => (
                                    <div key={i} className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-[7px] font-black text-slate-400 bg-slate-50">
                                      {String(n).padStart(2, '0')}
                                    </div>
                                  ))}
                                  <span className="text-[7px] font-black text-slate-300 ml-0.5">...</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-0 pb-0 pt-0 border-t border-slate-50 bg-slate-50/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100/30">
                          {item.sets.map((set, sIdx) => (
                            <div key={sIdx} className="flex gap-2 sm:gap-4 items-center py-4 px-4 sm:px-6 bg-white">
                              <span className="text-[10px] font-black text-slate-300 w-5 shrink-0">#{sIdx + 1}</span>
                              <div className="flex gap-2 flex-wrap flex-1 justify-center">
                                {gameType === "4d" ? (
                                  <div className="text-2xl font-black text-slate-700 font-mono tracking-[0.2em]">
                                    {String(set[0]).padStart(4, '0')}
                                  </div>
                                ) : (
                                  set.map((n, nIdx) => (
                                    <div 
                                      key={`${sIdx}-${nIdx}`} 
                                      className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-slate-100 flex items-center justify-center text-xs font-black text-slate-500 bg-white shadow-sm hover:scale-125 hover:text-primary transition-all duration-300 animate-in zoom-in-50 slide-in-from-bottom-2 fill-mode-both"
                                      style={{ 
                                        animationDelay: `${(sIdx * 80) + (nIdx * 40)}ms`,
                                        animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                                      }}
                                    >
                                      {String(n).padStart(2, '0')}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>

                    </AccordionItem>
                  </Accordion>
                </Card>
              ))}
            </div>
          )}




        </div>

        {/* Right Column: Analytics (Now Smaller) */}
        <div className="space-y-8 order-1 lg:order-2">
          <Card className="rounded-3xl border border-primary/10 bg-white shadow-2xl overflow-hidden relative group transition-all duration-500 hover:shadow-primary/5 p-0 gap-0">
            {/* Decorative background circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
            
            <CardHeader className="pt-8 pb-6 px-7 bg-gradient-to-br from-primary to-orange-500 relative overflow-hidden">
               {/* Shine effect for header */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30" />
               <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                 <BarChart3 className="w-16 h-16 text-white" />
               </div>

              <CardTitle className="text-[12px] font-black flex items-center gap-2.5 uppercase tracking-[0.25em] text-white relative z-10">
                <div className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
                Market Stats
              </CardTitle>
            </CardHeader>

            <CardContent className="p-7 relative z-10">
              <StatsPanel history={marketHistory} gameType={gameType} />
              
              <div className="mt-8 relative p-5 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl border border-primary/10 overflow-hidden group/tip transition-all hover:border-primary/20">
                {/* Decorative dots for tip box */}
                <div className="absolute top-2 right-4 flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                </div>

                <p className="text-[11px] font-black text-primary mb-2 flex items-center gap-2 uppercase tracking-widest">
                  <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center group-hover/tip:scale-110 transition-transform">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  Lucky Tip
                </p>
                <p className="text-[12px] text-slate-600 leading-relaxed font-medium italic">
                  "Numbers that haven't appeared for a while (Cold) often balance out over time. Steady observation is key!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>

  );
}

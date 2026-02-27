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
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HistoryCard } from "@/components/toto/HistoryCard";

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


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">

        {/* Left Column: Recent Logs (Now Larger) */}
        <div className="md:col-span-2 space-y-8 order-2 md:order-1">
          <div className="flex items-center gap-2 px-2">
            <HistoryIcon className="w-5 h-5 text-primary" />
            <h2 className="text-base font-black uppercase tracking-widest text-slate-900">Generation Timeline</h2>
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
              {gameHistory.map((item) => (
                <HistoryCard
                  key={item.timestamp}
                  strategy={item.strategy}
                  timestamp={item.timestamp}
                  sets={item.sets}
                  huatScore={item.huatScore}
                  huatLevel={item.huatLevel}
                  gameType={gameType}
                />
              ))}
            </div>
          )}




        </div>

        {/* Right Column: Analytics (Now Smaller) */}
        <div className="md:col-span-1 space-y-8 order-1 md:order-2">
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

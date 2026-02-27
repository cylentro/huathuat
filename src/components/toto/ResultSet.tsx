"use client";

import { useState } from "react";
import { NumberBall } from "./NumberBall";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultSetProps {
  numbers: number[];
  additional?: number;
}


export const ResultSet = ({ numbers, additional }: ResultSetProps) => {
  const [isProcessed, setIsProcessed] = useState(false);

  return (
    <Card 
      onClick={() => setIsProcessed(!isProcessed)}
      className={cn(
        "group cursor-pointer relative overflow-hidden transition-all duration-700 rounded-2xl sm:rounded-3xl p-0 gap-0",
        isProcessed 
          ? "bg-slate-100/40 border border-slate-200 opacity-50 grayscale scale-[0.98] blur-[0.3px]" 
          : "bg-white border border-slate-200 hover:border-primary/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-2px]"
      )}
    >
      <CardContent className="py-2.5 px-3 sm:px-14 flex flex-wrap gap-1.5 sm:gap-3 items-center justify-center relative min-h-[60px] sm:min-h-[70px]">
        {/* Status indicator - Hidden on very small mobile to save space, or transformed */}
        <div className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          {isProcessed ? (
            <div className="flex flex-col items-center gap-0.5 animate-in zoom-in spin-in-12 duration-500">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5 group-hover:scale-110 transition-transform">
              <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200 group-hover:text-primary transition-colors" />
            </div>
          )}
        </div>

        {/* The Numbers */}
        <div className={cn(
          "flex flex-wrap gap-1.5 sm:gap-3 items-center justify-center transition-all duration-700 ml-4 sm:ml-0",
          isProcessed ? "translate-x-2 sm:translate-x-4 skew-x-[-2deg]" : ""
        )}>
          {numbers.map((n, i) => (
            <div 
              key={`${n}-${i}`}
              className={cn(
                "transition-all duration-500",
                isProcessed ? "scale-90" : "hover:scale-110"
              )}
            >
              <NumberBall number={n} delay={i * 60} size="sm" />
            </div>
          ))}
          {additional !== undefined && (
            <>
              <div className="w-px h-6 sm:h-8 bg-slate-100 mx-0.5 sm:mx-1" />
              <div className={cn(
                "transition-all duration-500",
                isProcessed ? "scale-90" : "hover:scale-110"
              )}>
                <NumberBall number={additional} delay={500} highlight size="sm" />
              </div>
            </>
          )}
        </div>

        {/* Professional Stamped Effect */}
        {isProcessed && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
             <div className="rotate-[-12deg] border-2 sm:border-4 border-green-500/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-lg sm:rounded-xl animate-in zoom-in-50 duration-700 ease-out flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-500/20" />
                <span className="text-sm sm:text-xl font-black text-green-500/20 uppercase tracking-[0.1em] sm:tracking-[0.2em]">USED</span>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};



"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FourDResultSetProps {
  number: number;
}

export const FourDResultSet = ({ number }: FourDResultSetProps) => {
  const [isProcessed, setIsProcessed] = useState(false);
  
  // Format as 4 digits
  const digits = number.toString().padStart(4, '0').split('');

  return (
    <Card 
      onClick={() => setIsProcessed(!isProcessed)}
      className={cn(
        "group cursor-pointer relative overflow-hidden transition-all duration-700 rounded-2xl sm:rounded-3xl",
        isProcessed 
          ? "bg-slate-100/40 border border-slate-200 opacity-50 grayscale scale-[0.98] blur-[0.3px]" 
          : "bg-white border border-slate-200 hover:border-primary/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-2px]"
      )}
    >
      <CardContent className="py-4 px-6 sm:px-14 flex items-center justify-center relative min-h-[80px] sm:min-h-[100px]">
        {/* Status indicator */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
          {isProcessed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in duration-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-200 group-hover:text-primary transition-colors" />
          )}
        </div>

        <div className={cn(
          "flex gap-2 sm:gap-4 items-center justify-center transition-all duration-700",
          isProcessed ? "translate-x-4 skew-x-[-2deg]" : ""
        )}>
          {digits.map((digit, i) => (
            <div 
              key={i}
              className={cn(
                "w-12 h-16 sm:w-16 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-5xl font-black transition-all duration-500 animate-in zoom-in-50",
                isProcessed 
                  ? "bg-slate-50 border-slate-100 text-slate-300" 
                  : "bg-gradient-to-br from-white to-slate-50 border-primary/20 text-primary shadow-lg shadow-primary/5 group-hover:border-primary/40 group-hover:scale-110 group-hover:-rotate-2",
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative">
                {digit}
                {/* Subtle shine */}
                {!isProcessed && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full opacity-50 blur-[1px]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Used Stamp */}
        {isProcessed && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
             <div className="rotate-[-12deg] border-4 border-green-500/20 px-6 py-2 rounded-2xl animate-in zoom-in-50 duration-700 ease-out flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-green-500/20" />
                <span className="text-2xl sm:text-4xl font-black text-green-500/20 uppercase tracking-[0.2em]">USED</span>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


interface NumberBallProps {
  number: number;
  delay?: number;
  highlight?: boolean;
  size?: "sm" | "md";
}

export const NumberBall = ({ number, delay = 0, highlight = false, size = "md" }: NumberBallProps) => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);


  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center font-black transition-all duration-700 ease-out",
        size === "sm" ? "w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs" : "w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-base",
        visible ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-4",
        highlight 
          ? "bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 text-white shadow-[0_4px_15px_rgba(245,158,11,0.5)] border-2 border-amber-200/50" 
          : "bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-[0_4px_12px_rgba(220,38,38,0.3)] border border-red-400/30"
      )}
    >

      {/* Inner Glossy Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
      
      {/* Top Highlight/Reflection */}
      <div className="absolute top-1 left-2 right-2 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
      
      {/* Number with subtle text shadow */}
      <span className="relative z-10 drop-shadow-sm">{String(number).padStart(2, "0")}</span>
      
      {/* Reflection Spot */}
      <div className="absolute top-1.5 left-2.5 w-2 h-2 bg-white/40 rounded-full blur-[0.5px]" />
    </div>
  );
};

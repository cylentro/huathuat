"use client";

import { useEffect, useState } from "react";
import { Sparkles, Dices, Coins, CircleDollarSign, Gem } from "lucide-react";

export function FunBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Dynamic Ambient Glows following Mouse */}
      <div 
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px] md:blur-[140px] transition-transform duration-700 ease-out mix-blend-multiply"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px))`
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/15 blur-[80px] md:blur-[120px] transition-transform duration-1000 ease-out mix-blend-multiply delay-75"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * -30}px), calc(-50% + ${mousePos.y * -30}px))`
        }}
      />
      <div 
        className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full bg-amber-400/10 blur-[80px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
        }}
      />
      
      {/* Static Background Gradients (Huat colors) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Floating Abstract Icons instead of Emojis */}
      <div className="absolute top-[15%] left-[5%] animate-float opacity-20 hidden md:block">
        <div 
          className="transition-transform duration-500 ease-out"
          style={{ transform: `scale(${1 + Math.abs(mousePos.x) * 0.4})` }}
        >
          <Gem className="w-16 h-16 text-primary rotate-12" strokeWidth={1} />
        </div>
      </div>
      <div className="absolute top-[25%] right-[8%] animate-float-delayed opacity-20 hidden md:block">
        <div 
          className="transition-transform duration-700 ease-out"
          style={{ transform: `scale(${1 + Math.abs(mousePos.y) * 0.5})` }}
        >
          <Coins className="w-20 h-20 text-orange-500 -rotate-12" strokeWidth={1} />
        </div>
      </div>
      <div className="absolute bottom-[20%] left-[10%] animate-sway opacity-20 hidden md:block">
        <div 
          className="transition-transform duration-500 ease-out"
          style={{ transform: `scale(${1 + (Math.abs(mousePos.x) + Math.abs(mousePos.y)) * 0.25})` }}
        >
          <CircleDollarSign className="w-14 h-14 text-amber-500 rotate-6" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute bottom-[30%] right-[10%] animate-pulse opacity-20 hidden md:block">
        <div 
          className="transition-transform duration-1000 ease-out"
          style={{ transform: `scale(${1 + Math.abs(mousePos.x) * 0.6})` }}
        >
          <Sparkles className="w-12 h-12 text-yellow-500 animate-[spin_8s_linear_infinite]" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-[40%] left-[12%] animate-sway opacity-15 hidden lg:block">
        <div 
          className="transition-transform duration-700 ease-out"
          style={{ transform: `scale(${1 + Math.abs(mousePos.y) * 0.4})` }}
        >
          <Dices className="w-16 h-16 text-primary -rotate-45" strokeWidth={1} />
        </div>
      </div>
      <div className="absolute bottom-[45%] right-[15%] animate-float-delayed opacity-15 hidden lg:block">
        <div 
          className="transition-transform duration-500 ease-out"
          style={{ transform: `scale(${1 + Math.abs(mousePos.x) * 0.3})` }}
        >
          <Gem className="w-10 h-10 text-orange-400 rotate-45" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute top-[10%] right-[30%] animate-sway opacity-15 hidden lg:block">
        <div 
          className="transition-transform duration-1000 ease-out"
          style={{ transform: `scale(${1 + (Math.abs(mousePos.x) + Math.abs(mousePos.y)) * 0.3})` }}
        >
          <Sparkles className="w-8 h-8 text-amber-500 animate-[spin_10s_linear_infinite] opacity-60" strokeWidth={1} />
        </div>
      </div>

      {/* Floating Particles/Dust (Interactive multiple parallax layers) */}
      
      {/* Front Layer (moves opposite to mouse fast) */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x * -80}px, ${mousePos.y * -80}px)` }}
      >
        <div className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-primary/30 blur-[1px] animate-pulse" />
        <div className="absolute top-[60%] right-[15%] w-4 h-4 rounded-full bg-orange-400/30 blur-[1px] animate-pulse delay-75" />
        <div className="absolute bottom-[20%] left-[30%] w-2 h-2 rounded-full bg-amber-400/30 blur-[1px] animate-pulse delay-150" />
        <div className="absolute top-[80%] left-[10%] w-3 h-3 rounded-full bg-primary/20 blur-[1px] animate-pulse delay-200" />
      </div>

      {/* Mid Layer (moves opposite moderately) */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
      >
        <div className="absolute top-[50%] left-[40%] w-2 h-2 rounded-full bg-amber-500/40 blur-[1px] animate-pulse" />
        <div className="absolute top-[30%] right-[30%] w-2 h-2 rounded-full bg-primary/30 blur-[1px] animate-pulse delay-[400ms]" />
        <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-orange-300/40 blur-[0.5px] animate-pulse delay-[600ms]" />
      </div>

      {/* Back Layer (moves WITH mouse to create deep 3D illusion) */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
      >
        <div className="absolute top-[10%] right-[40%] w-1 h-1 rounded-full bg-primary/40 animate-pulse delay-300" />
        <div className="absolute bottom-[10%] left-[40%] w-1.5 h-1.5 rounded-full bg-orange-500/30 animate-pulse delay-[800ms]" />
        <div className="absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-yellow-500/20 animate-pulse delay-[900ms]" />
      </div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0,rgba(0,0,0,0.02)_100%)] mix-blend-overlay" />
    </div>
  );
}

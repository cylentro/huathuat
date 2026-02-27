"use client";

import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, Zap, TrendingUp } from "lucide-react";
import { triggerCelebration } from "@/lib/confetti";

interface HuatMeterProps {
  numbers: number[][];
  history: { numbers: number[] }[];
  gameType: "toto" | "4d";
}

const SINGLISH_MESSAGES = {
  legendary: [
    "Wah lau eh, this set POWER sia! 🔥",
    "Confirm plus chop, this one is THE ONE! 🧧",
    "Steady bom pi pi! Maximum HUAT! 💰",
  ],
  high: [
    "Eh not bad leh, quite ong this one! ✨",
    "This set got potential sia! 🎯",
    "Can feel the HUAT energy already! 🚀",
  ],
  medium: [
    "Okay lah, can try your luck! 🎲",
    "Not bad not bad, see how lor! 🤞",
    "Got some pattern here, worth a shot! 📊",
  ],
  low: [
    "Hmm... maybe generate again? 😅",
    "This one ah... so-so only lah 🤔",
    "Can try lah, but don't bet the house! 🏠",
  ],
};

function getRandomMessage(tier: keyof typeof SINGLISH_MESSAGES): string {
  const messages = SINGLISH_MESSAGES[tier];
  return messages[Math.floor(Math.random() * messages.length)];
}

import { calculateHuatScore } from "@/lib/toto/huat-math";

export const HuatMeter = ({ numbers, history, gameType }: HuatMeterProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const score = useMemo(
    () => calculateHuatScore(numbers, history, gameType),
    [numbers, history, gameType]
  );

  const tier = useMemo(() => {
    if (score >= 80) return "legendary";
    if (score >= 60) return "high";
    if (score >= 40) return "medium";
    return "low";
  }, [score]);

  const message = useMemo(() => getRandomMessage(tier), [tier]);

  // Animate the score
  useEffect(() => {
    setAnimatedScore(0);
    setShowMessage(false);

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(score, Math.round(increment * step));
      setAnimatedScore(current);

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedScore(score);
        setTimeout(() => {
          setShowMessage(true);
          if (tier !== "low") {
            triggerCelebration(tier);
          }
        }, 200);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, tier]);

  const TierIcon =
    tier === "legendary"
      ? Flame
      : tier === "high"
        ? TrendingUp
        : tier === "medium"
          ? Zap
          : Sparkles;

  const tierColor = {
    legendary: {
      bg: "from-red-500 to-orange-500",
      text: "text-red-600",
      glow: "shadow-red-500/30",
      ring: "ring-red-200",
      bar: "bg-gradient-to-r from-red-500 to-orange-400",
      badge: "bg-red-50 text-red-700 border-red-100",
    },
    high: {
      bg: "from-orange-400 to-amber-400",
      text: "text-orange-600",
      glow: "shadow-orange-400/20",
      ring: "ring-orange-200",
      bar: "bg-gradient-to-r from-orange-400 to-amber-400",
      badge: "bg-orange-50 text-orange-700 border-orange-100",
    },
    medium: {
      bg: "from-amber-400 to-yellow-400",
      text: "text-amber-600",
      glow: "shadow-amber-400/20",
      ring: "ring-amber-200",
      bar: "bg-gradient-to-r from-amber-400 to-yellow-400",
      badge: "bg-amber-50 text-amber-700 border-amber-100",
    },
    low: {
      bg: "from-slate-300 to-slate-400",
      text: "text-slate-500",
      glow: "shadow-slate-300/20",
      ring: "ring-slate-200",
      bar: "bg-gradient-to-r from-slate-300 to-slate-400",
      badge: "bg-slate-50 text-slate-600 border-slate-100",
    },
  };

  const colors = tierColor[tier];
  const tierLabel =
    tier === "legendary"
      ? "HUAT LEVEL: MAXIMUM"
      : tier === "high"
        ? "HUAT LEVEL: HIGH"
        : tier === "medium"
          ? "HUAT LEVEL: MODERATE"
          : "HUAT LEVEL: LOW";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white p-5 shadow-lg transition-all duration-700 animate-in fade-in slide-in-from-bottom-4",
        colors.glow,
        colors.ring,
        "ring-1"
      )}
    >
      {/* Subtle background glow */}
      <div
        className={cn(
          "absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 bg-gradient-to-br",
          colors.bg
        )}
      />

      <div className="relative flex items-center gap-5">
        {/* Circular Score */}
        <div className="relative flex-shrink-0">
          <svg
            className="w-20 h-20 -rotate-90"
            viewBox="0 0 80 80"
          >
            {/* Track */}
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-100"
            />
            {/* Progress */}
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000 ease-out",
                tier === "legendary"
                  ? "stroke-red-500"
                  : tier === "high"
                    ? "stroke-orange-400"
                    : tier === "medium"
                      ? "stroke-amber-400"
                      : "stroke-slate-300"
              )}
              strokeDasharray={`${(animatedScore / 100) * 213.6} 213.6`}
            />
          </svg>
          {/* Score number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn("text-2xl font-black tabular-nums", colors.text)}
            >
              {animatedScore}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest",
                colors.badge
              )}
            >
              <TierIcon className="w-3 h-3" />
              {tierLabel}
            </div>
          </div>

          {/* Animated message */}
          <p
            className={cn(
              "text-sm font-bold text-slate-600 transition-all duration-500",
              showMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            {message}
          </p>

          {/* Sparkle Burst Effect */}
          {showMessage && tier !== "low" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
               <Sparkles className="w-12 h-12 text-yellow-400 animate-sparkle-burst" />
               <Sparkles className="w-8 h-8 text-orange-400 animate-sparkle-burst delay-100 absolute -top-4 -left-4" />
               <Sparkles className="w-6 h-6 text-red-400 animate-sparkle-burst delay-200 absolute -bottom-2 -right-6" />
            </div>
          )}

          {/* Mini bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                colors.bar
              )}
              style={{ width: `${animatedScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

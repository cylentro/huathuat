"use client";

import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, Zap, TrendingUp } from "lucide-react";

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

function calculateHuatScore(
  numbers: number[][],
  history: { numbers: number[] }[],
  gameType: "toto" | "4d"
): number {
  if (history.length === 0 || numbers.length === 0) return 50;

  const recentHistory = history.slice(0, 100);
  let totalScore = 0;

  if (gameType === "toto") {
    // Count frequency of each number in history
    const freq: Record<number, number> = {};
    recentHistory.forEach((draw) => {
      draw.numbers.forEach((n) => {
        freq[n] = (freq[n] || 0) + 1;
      });
    });

    const sorted = Object.entries(freq)
      .sort(([, a], [, b]) => b - a)
      .map(([n]) => parseInt(n));

    const hotNumbers = new Set(sorted.slice(0, 15));
    const warmNumbers = new Set(sorted.slice(15, 30));

    numbers.forEach((set) => {
      let setScore = 0;

      // Hot number bonus (0-35 points)
      const hotCount = set.filter((n) => hotNumbers.has(n)).length;
      setScore += Math.min(hotCount * 7, 35);

      // Warm number bonus (0-15 points)
      const warmCount = set.filter((n) => warmNumbers.has(n)).length;
      setScore += Math.min(warmCount * 5, 15);

      // Odd-even balance bonus (0-15 points)
      const oddCount = set.filter((n) => n % 2 !== 0).length;
      const evenCount = set.length - oddCount;
      const balance = 1 - Math.abs(oddCount - evenCount) / set.length;
      setScore += Math.round(balance * 15);

      // Number spread bonus (0-15 points)
      const min = Math.min(...set);
      const max = Math.max(...set);
      const spread = (max - min) / 49;
      setScore += Math.round(spread * 15);

      // Sum range bonus (0-10 points) — historical avg sum
      const sum = set.reduce((a, b) => a + b, 0);
      const avgSum = 150; // rough average for 6 from 49
      const sumDev = Math.abs(sum - avgSum) / avgSum;
      setScore += Math.round(Math.max(0, 1 - sumDev) * 10);

      // Lucky number bonus (0-10 points)
      const luckyNums = new Set([7, 8, 9, 11, 18, 28, 38, 48]);
      const luckyCount = set.filter((n) => luckyNums.has(n)).length;
      setScore += Math.min(luckyCount * 3, 10);

      totalScore += setScore;
    });

    totalScore = Math.round(totalScore / numbers.length);
  } else {
    // 4D scoring
    const digitFreq: Record<number, number> = {};
    for (let i = 0; i <= 9; i++) digitFreq[i] = 0;

    recentHistory.forEach((draw) => {
      draw.numbers.forEach((n) => {
        const digits = n.toString().padStart(4, "0").split("");
        digits.forEach((d) => {
          digitFreq[parseInt(d)] = (digitFreq[parseInt(d)] || 0) + 1;
        });
      });
    });

    const hotDigits = Object.entries(digitFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([d]) => parseInt(d));

    const hotSet = new Set(hotDigits);

    numbers.forEach((set) => {
      let setScore = 0;
      const num = set[0];
      const digits = num.toString().padStart(4, "0").split("").map(Number);

      // Hot digit bonus (0-40 points)
      const hotCount = digits.filter((d) => hotSet.has(d)).length;
      setScore += hotCount * 10;

      // Digit variety bonus (0-20 points)
      const unique = new Set(digits).size;
      setScore += unique * 5;

      // Lucky digit bonus (0-20 points)
      const luckyDigits = new Set([8, 6, 9, 3]);
      const luckyCount = digits.filter((d) => luckyDigits.has(d)).length;
      setScore += luckyCount * 5;

      // Pattern bonus (0-20 points) — pairs, sequences
      const hasPair = digits.some(
        (d, i) => i < digits.length - 1 && d === digits[i + 1]
      );
      if (hasPair) setScore += 10;

      const hasSequence = digits.some(
        (d, i) => i < digits.length - 1 && Math.abs(d - digits[i + 1]) === 1
      );
      if (hasSequence) setScore += 10;

      totalScore += setScore;
    });

    totalScore = Math.round(totalScore / numbers.length);
  }

  // Clamp to 0-100
  return Math.min(100, Math.max(0, totalScore));
}

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
        setTimeout(() => setShowMessage(true), 200);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

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

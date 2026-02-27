import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huat Huat - Confirm Plus Chop AI Luck",
  description: "Steady pom pi pi! Our AI engine help you generate HUAT numbers for Toto and 4D. Confirm steady one!",
};


import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/context/GameContext";
import { Navbar } from "@/components/layout/Navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mesh-gradient-bg min-h-screen text-slate-900 selection:bg-primary/10 selection:text-primary`}
      >
        <Suspense fallback={null}>
          <GameProvider>
          <TooltipProvider>
            <div className="relative min-h-screen">
              <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
                {/* Main Blurs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[120px]" />
                
                {/* Floating Charms */}
                <div className="absolute top-[15%] left-[5%] text-4xl animate-float opacity-20 hidden md:block">🧧</div>
                <div className="absolute top-[25%] right-[8%] text-3xl animate-float-delayed opacity-20 hidden md:block">💰</div>
                <div className="absolute bottom-[20%] left-[10%] text-4xl animate-sway opacity-20 hidden md:block">🪙</div>
                <div className="absolute bottom-[30%] right-[5%] text-3xl animate-float opacity-20 hidden md:block">✨</div>
                <div className="absolute top-[40%] left-[12%] text-2xl animate-sway opacity-10 hidden lg:block">🏮</div>
                <div className="absolute bottom-[45%] right-[15%] text-2xl animate-float-delayed opacity-10 hidden lg:block">🍊</div>
                
                {/* Decorative Grids */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0,rgba(0,0,0,0.02)_100%)]" />
              </div>
              
              <div className="relative z-10 pt-6">
                <Navbar />
                <main className="py-8 pb-16">
                  {children}
                </main>

                {/* Global Legal Disclaimer */}
                <footer className="mx-auto max-w-5xl px-4 pb-6">
                  <div className="text-center space-y-1">
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      🎲 For entertainment purposes only. This tool does not guarantee any winnings. Please gamble responsibly.
                    </p>
                    <p className="text-[9px] text-primary/50 font-bold">
                      Remember ah — HUAT is a mindset, not a guarantee! Play smart, play safe. 🧧
                    </p>
                  </div>
                </footer>
              </div>
            </div>
          </TooltipProvider>
        </GameProvider>
        </Suspense>
      </body>
    </html>
  );
}


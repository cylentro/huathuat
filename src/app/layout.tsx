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
import { FunBackground } from "@/components/ui/fun-background";

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
              <FunBackground />
              
              <div className="relative z-10 pt-6">
                <Navbar />
                <main className="py-8 pb-16">
                  {children}
                </main>
              </div>
            </div>
          </TooltipProvider>
        </GameProvider>
        </Suspense>
      </body>
    </html>
  );
}


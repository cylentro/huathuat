"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGame, GameId } from "@/context/GameContext";
import { 
  PartyPopper, 
  BarChart3, 
  Sparkles
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { activeGameId, setActiveGameId, games } = useGame();

  const navItems = [
    { name: "Huat Engine", href: "/", icon: Sparkles },
    { name: "Huat Watch", href: "/analytics", icon: BarChart3 },
  ];


  return (
    <nav className="sticky top-2 sm:top-4 z-50 mx-auto max-w-5xl px-2 sm:px-4">
      <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-1.5 sm:p-2 shadow-lg ring-1 ring-slate-200/50">

        <div className="flex flex-1 items-center gap-1.5 sm:gap-4 mr-2 sm:mr-0">
          <Link href="/" className="flex items-center gap-2 px-1 sm:px-2 shrink-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-primary shadow-lg shadow-primary/20">
              <PartyPopper className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="hidden text-xl font-black italic tracking-tighter text-primary lg:block">
              HUAT <span className="text-orange-500">HUAT</span>
            </span>
          </Link>

          <div className="h-5 w-px bg-slate-200 hidden xs:block shrink-0" />

          <Select 
            value={activeGameId} 
            onValueChange={(value) => setActiveGameId(value as GameId)}
          >
            <SelectTrigger className="h-8 sm:h-9 flex-1 sm:w-[160px] sm:flex-none border-none bg-slate-50 font-bold text-[10px] sm:text-xs ring-0 focus:ring-0 shadow-none hover:bg-slate-100 transition-colors px-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 shadow-xl rounded-xl">
              {games.map((game) => (
                <SelectItem key={game.id} value={game.id} className="text-xs font-medium">
                  {game.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        <div className="flex items-center gap-1 pr-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const fullHref = `${item.href}?game=${activeGameId}&page=${item.name.toLowerCase()}`;
            
            return (
              <Link
                key={item.href}
                href={fullHref}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-3.5 w-3.5 sm:h-4 w-4", isActive ? "animate-pulse" : "")} />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>

  );
}

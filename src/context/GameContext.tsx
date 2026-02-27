"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SINGAPORE_TOTO } from "@/lib/generators/singapore-toto";

export type GameId = "sg-toto" | "sg-4d";

interface GameConfig {
  id: GameId;
  name: string;
  description: string;
}

const GAMES: GameConfig[] = [
  { id: "sg-toto", name: "Singapore Toto", description: "The big one - 6 out of 49. Huat ah!" },
  { id: "sg-4d", name: "Singapore 4D", description: "Just pick 4 numbers. Simple and steady!" },
];

interface HistoryItem {
  strategy: string;
  sets: number[][];
  timestamp: number;
  gameId: GameId;
  huatScore?: number;
  huatLevel?: string;
}

interface GameContextType {
  activeGameId: GameId;
  setActiveGameId: (id: GameId) => void;
  games: GameConfig[];
  currentGame: GameConfig;
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, "gameId">) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [activeGameId, setActiveGameIdState] = useState<GameId>("sg-toto");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state with URL
  useEffect(() => {
    const gameParam = searchParams.get("game") as GameId;
    if (gameParam && GAMES.find(g => g.id === gameParam) && gameParam !== activeGameId) {
      setActiveGameIdState(gameParam);
    }
    
    // Also ensure 'page' reflects current path if not there
    const pageParam = searchParams.get("page");
    const expectedPage = pathname === "/" ? "generator" : "analytics";
    
    if (pageParam !== expectedPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", expectedPage);
      if (!params.get("game")) params.set("game", activeGameId);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname]);

  const setActiveGameId = (id: GameId) => {
    setActiveGameIdState(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("game", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Load from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("toto_history");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("toto_history", JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addHistory = (item: Omit<HistoryItem, "gameId">) => {
    const newItem: HistoryItem = { ...item, gameId: activeGameId };
    setHistory((prev: HistoryItem[]) => [newItem, ...prev].slice(0, 50));
  };

  const currentGame = GAMES.find(g => g.id === activeGameId) || GAMES[0];

  return (
    <GameContext.Provider value={{ 
      activeGameId, 
      setActiveGameId, 
      games: GAMES, 
      currentGame,
      history,
      addHistory 
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

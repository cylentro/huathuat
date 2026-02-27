
"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SetCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const SetCounter = ({ value, onChange, min = 1, max = 50 }: SetCounterProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (isNaN(val)) return;
    if (val < min) onChange(min);
    else if (val > max) onChange(max);
    else onChange(val);
  };

  return (
    <div className="flex items-center gap-1 bg-white border border-primary/10 rounded-full p-1 shadow-sm h-10 ring-1 ring-primary/5">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full text-primary/40 hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-20 disabled:text-primary/20"
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-12 h-8 border-none bg-transparent text-center font-black text-primary focus-visible:ring-0 shadow-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full text-primary/40 hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-20 disabled:text-primary/20"
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

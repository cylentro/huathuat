
import { Strategy } from "./types";
import { quickPick, balanced, hotNumbers, coldNumbers, deltaSystem } from "../strategies/core";
import { frequencyAnalysis, patternMatch, numberGroups, sumRange, cycleTracker } from "../strategies/advanced";

export const STRATEGIES: Strategy[] = [
    {
        id: "quick-pick",
        name: "Quick Pick",
        description: "Pure random selection - equal probability for all numbers.",
        complexity: "Simple",
        generate: quickPick
    },
    {
        id: "balanced",
        name: "Balanced",
        description: "Maintains a 3:3 split of Odd/Even and Low/High numbers.",
        complexity: "Simple",
        generate: balanced
    },
    {
        id: "hot-numbers",
        name: "Hot Numbers",
        description: "Favors numbers that appeared frequently in the last 50 draws.",
        complexity: "History",
        generate: hotNumbers
    },
    {
        id: "cold-numbers",
        name: "Cold Numbers",
        description: "Favors numbers that haven't appeared in the longest time (overdue).",
        complexity: "History",
        generate: coldNumbers
    },
    {
        id: "delta-system",
        name: "Delta System",
        description: "Based on the statistical distance between consecutive winning numbers.",
        complexity: "Pattern",
        generate: deltaSystem
    },
    {
        id: "frequency",
        name: "Frequency Analysis",
        description: "Weighted selection based on full historical frequency since 2014.",
        complexity: "History",
        generate: frequencyAnalysis
    },
    {
        id: "pattern-match",
        name: "Pattern Match",
        description: "Ensures coverage across different decades and number patterns.",
        complexity: "Pattern",
        generate: patternMatch
    },
    {
        id: "number-groups",
        name: "Number Groups",
        description: "Divides numbers into groups and ensures a wide spread across the field.",
        complexity: "Pattern",
        generate: numberGroups
    },
    {
        id: "sum-range",
        name: "Sum Range",
        description: "Forces the total sum of numbers to fall within the most common winning range (100-175).",
        complexity: "Statistical",
        generate: sumRange
    },
    {
        id: "cycle-tracker",
        name: "Cycle Tracker",
        description: "Mixes numbers from the current draw cycle and overdue numbers.",
        complexity: "History",
        generate: cycleTracker
    }
];

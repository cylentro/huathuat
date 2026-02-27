
import { Strategy } from "./types";
import * as fourD from "../strategies/four-d";

export const FOUR_D_STRATEGIES: Strategy[] = [
    {
        id: "4d-quick-pick",
        name: "Pure Random",
        description: "Standard random generation using unbiased statistical noise.",
        complexity: "Simple",
        generate: fourD.quickPick
    },
    {
        id: "4d-hot",
        name: "Hot Winners",
        description: "Targets numbers that have appeared as winners recently.",
        complexity: "Statistical",
        generate: fourD.hotNumbers
    },
    {
        id: "4d-cold",
        name: "Cold Gap",
        description: "Focuses on numbers that haven't appeared in a long time.",
        complexity: "Statistical",
        generate: fourD.coldNumbers
    },
    {
        id: "4d-pattern",
        name: "Pattern Mix",
        description: "Ensures a balanced mix of odd/even and high/low digits.",
        complexity: "Pattern",
        generate: fourD.patternMix
    },
    {
        id: "4d-digit-freq",
        name: "Digit Frequency",
        description: "Weights each digit position based on historical frequency.",
        complexity: "Statistical",
        generate: fourD.digitFrequency
    },
    {
        id: "4d-sum-target",
        name: "Sum Target",
        description: "Generates numbers whose digit sum falls in the golden range.",
        complexity: "Pattern",
        generate: fourD.sumTarget
    },
    {
        id: "4d-mirror",
        name: "Mirror/Reverse",
        description: "Flips recently winning numbers to exploit symmetry patterns.",
        complexity: "Pattern",
        generate: fourD.mirrorReverse
    },
    {
        id: "4d-repeating",
        name: "Repeating Digits",
        description: "Favors visually striking patterns like 1122 or 7777.",
        complexity: "Pattern",
        generate: fourD.repeatingDigits
    },
    {
        id: "4d-consecutive",
        name: "Consecutive Pairs",
        description: "Generates numbers with logical digit runs (e.g., 3489).",
        complexity: "Simple",
        generate: fourD.consecutivePairs
    },
    {
        id: "4d-trend",
        name: "Positional Trend",
        description: "Predicts digits based on upward/downward momentum per position.",
        complexity: "Statistical",
        generate: fourD.positionalTrend
    },
    {
        id: "4d-gap",
        name: "Gap Cycle",
        description: "Targets due numbers based on average appearance intervals.",
        complexity: "History",
        generate: fourD.gapCycle
    },
    {
        id: "4d-lucky",
        name: "Lucky Pairs",
        description: "Combines 2-digit pairs that frequently occur together.",
        complexity: "Simple",
        generate: fourD.luckyPairs
    }
];

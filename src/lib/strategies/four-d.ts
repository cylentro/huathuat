
import { StrategyFn } from "../generators/types";

// Helper to format number as 4 digits
const pad4 = (n: number) => n.toString().padStart(4, '0');

// 1. Quick Pick
export const quickPick: StrategyFn = (_config) => {
    return [Math.floor(Math.random() * 10000)];
};

// 2. Hot Numbers (Weighted toward recent winners)
export const hotNumbers: StrategyFn = (config, history) => {
    const freqMap: Record<number, number> = {};
    history.slice(0, 100).forEach(draw => {
        draw.numbers.forEach((n: number) => {
            freqMap[n] = (freqMap[n] || 0) + 1;
        });
    });

    const hotPool = Object.entries(freqMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 50)
        .map(([n]) => parseInt(n));

    if (hotPool.length === 0) return [Math.floor(Math.random() * 10000)];
    return [hotPool[Math.floor(Math.random() * hotPool.length)]];
};

// 3. Cold Numbers (Favor numbers not seen in a long time)
export const coldNumbers: StrategyFn = (config, history) => {
    const lastSeen: Record<number, number> = {};
    history.forEach((draw, idx) => {
        draw.numbers.forEach((n: number) => {
            if (lastSeen[n] === undefined) lastSeen[n] = idx;
        });
    });

    const coldPool = Object.entries(lastSeen)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 50)
        .map(([n]) => parseInt(n));

    if (coldPool.length === 0) return [Math.floor(Math.random() * 10000)];
    return [coldPool[Math.floor(Math.random() * coldPool.length)]];
};

// 4. Pattern Mix (Ensure mix of odd/even and high/low digits)
export const patternMix: StrategyFn = () => {
    const digits = [];
    for (let i = 0; i < 4; i++) {
        const isOdd = Math.random() > 0.5;
        const isHigh = Math.random() > 0.5;

        let d;
        do {
            d = Math.floor(Math.random() * 10);
        } while (
            (isOdd ? d % 2 === 0 : d % 2 !== 0) ||
            (isHigh ? d < 5 : d >= 5)
        );
        digits.push(d);
    }
    return [parseInt(digits.join(''))];
};

// 5. Digit Frequency (Weight each position 0-9)
export const digitFrequency: StrategyFn = (config, history) => {
    const posFreq: Record<number, number>[] = [{}, {}, {}, {}];
    history.slice(0, 200).forEach(draw => {
        draw.numbers.forEach((n: number) => {
            const s = pad4(n);
            for (let i = 0; i < 4; i++) {
                const d = parseInt(s[i]);
                posFreq[i][d] = (posFreq[i][d] || 0) + 1;
            }
        });
    });

    const result = [];
    for (let i = 0; i < 4; i++) {
        const sorted = Object.entries(posFreq[i]).sort(([, a], [, b]) => b - a);
        if (sorted.length === 0) {
            result.push(Math.floor(Math.random() * 10));
        } else {
            const best = sorted.slice(0, 3);
            result.push(parseInt(best[Math.floor(Math.random() * best.length)][0]));
        }
    }
    return [parseInt(result.join(''))];
};

// 6. Sum Target (Digit sum in common range 15-25)
export const sumTarget: StrategyFn = () => {
    let n;
    let sum;
    do {
        n = Math.floor(Math.random() * 10000);
        sum = pad4(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
    } while (sum < 15 || sum > 25);
    return [n];
};

// 7. Mirror/Reverse
export const mirrorReverse: StrategyFn = (config, history) => {
    const recent = history[0]?.numbers[Math.floor(Math.random() * 23)] || 1234;
    const reversed = parseInt(pad4(recent).split('').reverse().join(''));
    return [reversed];
};

// 8. Repeating Digits (1122, 3344, 7777)
export const repeatingDigits: StrategyFn = () => {
    const types = ['AABB', 'AAAA', 'ABAB', 'AAAB'];
    const type = types[Math.floor(Math.random() * types.length)];
    const d1 = Math.floor(Math.random() * 10);
    const d2 = Math.floor(Math.random() * 10);

    let s = '';
    if (type === 'AABB') s = `${d1}${d1}${d2}${d2}`;
    else if (type === 'AAAA') s = `${d1}${d1}${d1}${d1}`;
    else if (type === 'ABAB') s = `${d1}${d2}${d1}${d2}`;
    else s = `${d1}${d1}${d1}${d2}`;

    return [parseInt(s)];
};

// 9. Consecutive Pairs
export const consecutivePairs: StrategyFn = () => {
    const d1 = Math.floor(Math.random() * 9);
    const d2 = d1 + 1;
    const d3 = Math.floor(Math.random() * 10);
    const d4 = Math.floor(Math.random() * 10);

    const res = [d1, d2, d3, d4].sort(() => Math.random() - 0.5);
    return [parseInt(res.join(''))];
};

// 10. Positional Trend
export const positionalTrend: StrategyFn = (config, history) => {
    const lastTwo = history.slice(0, 2);
    const result = [];
    for (let i = 0; i < 4; i++) {
        const d1 = parseInt(pad4(lastTwo[0]?.numbers[0] || 0)[i]);
        const d2 = parseInt(pad4(lastTwo[1]?.numbers[0] || 0)[i]);
        const diff = d1 - d2;
        const next = (d1 + diff + 10) % 10;
        result.push(next);
    }
    return [parseInt(result.join(''))];
};

// 11. Gap Cycle
export const gapCycle: StrategyFn = (config, history) => {
    // Simple version: Pick numbers that haven't appeared in at least 50 draws
    const lastSeen: Record<number, number> = {};
    history.forEach((draw, idx) => {
        draw.numbers.forEach((n: number) => {
            if (lastSeen[n] === undefined) lastSeen[n] = idx;
        });
    });

    const due = Object.entries(lastSeen)
        .filter(([, gap]) => gap > 50)
        .map(([n]) => parseInt(n));

    if (due.length === 0) return [Math.floor(Math.random() * 10000)];
    return [due[Math.floor(Math.random() * due.length)]];
};

// 12. Lucky Pairs
export const luckyPairs: StrategyFn = () => {
    const pairs = ['88', '38', '16', '68', '99', '11'];
    const p1 = pairs[Math.floor(Math.random() * pairs.length)];
    const p2 = pairs[Math.floor(Math.random() * pairs.length)];
    return [parseInt(p1 + p2)];
};

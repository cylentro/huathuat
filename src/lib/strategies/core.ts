
import { StrategyFn } from "../generators/types";

export const quickPick: StrategyFn = (config) => {
    const numbers: number[] = [];
    while (numbers.length < config.pick) {
        const n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers.sort((a, b) => a - b);
};

export const balanced: StrategyFn = (config) => {
    // Aims for 3 odd/3 even and 3 low/3 high split
    const numbers: number[] = [];
    const mid = Math.floor((config.min + config.max) / 2);

    const getTarget = (isLow: boolean, isOdd: boolean) => {
        let n;
        do {
            n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        } while (
            numbers.includes(n) ||
            (isLow ? n > mid : n <= mid) ||
            (isOdd ? n % 2 === 0 : n % 2 !== 0)
        );
        return n;
    };

    // Try to pick one from each quadrant: Low-Odd, Low-Even, High-Odd, High-Even
    numbers.push(getTarget(true, true));
    numbers.push(getTarget(true, false));
    numbers.push(getTarget(false, true));
    numbers.push(getTarget(false, false));

    // Last two are random to maintain some entropy
    while (numbers.length < config.pick) {
        const n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }

    return numbers.sort((a, b) => a - b);
};

export const hotNumbers: StrategyFn = (config, history) => {
    const recent = history.slice(0, 50);
    const freqMap: Record<number, number> = {};
    recent.forEach(draw => {
        draw.numbers.forEach((n: number) => {
            freqMap[n] = (freqMap[n] || 0) + 1;
        });
    });

    const sorted = Object.entries(freqMap)
        .sort(([, a], [, b]) => b - a)
        .map(([n]) => parseInt(n));

    const hotPool = sorted.slice(0, 15);
    const numbers: number[] = [];

    // Pick 4 from hot pool, 2 random
    while (numbers.length < 4 && hotPool.length > 0) {
        const idx = Math.floor(Math.random() * hotPool.length);
        const n = hotPool.splice(idx, 1)[0];
        if (!numbers.includes(n)) numbers.push(n);
    }
    while (numbers.length < config.pick) {
        const n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers.sort((a, b) => a - b);
};

export const coldNumbers: StrategyFn = (config, history) => {
    const lastSeen: Record<number, number> = {};
    // Removed explicit initialization with 9999, relying on 'undefined' check
    history.forEach((draw, idx) => {
        draw.numbers.forEach((n: number) => {
            if (lastSeen[n] === undefined) lastSeen[n] = idx;
        });
    });

    const coldPool = Object.entries(lastSeen)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([n]) => parseInt(n));

    const numbers: number[] = [];
    while (numbers.length < 4 && coldPool.length > 0) {
        const idx = Math.floor(Math.random() * coldPool.length);
        const n = coldPool.splice(idx, 1)[0];
        if (!numbers.includes(n)) numbers.push(n);
    }
    while (numbers.length < config.pick) {
        const n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers.sort((a, b) => a - b);
};

export const deltaSystem: StrategyFn = (config) => {
    // Delta logic: 1 very small (1-3), 2 small (4-8), 1 mid (8-12), 2 large (12-15)
    // Sum must be < config.max
    let numbers: number[] = [];
    let valid = false;

    while (!valid) {
        const deltas = [
            Math.floor(Math.random() * 3) + 1,
            Math.floor(Math.random() * 5) + 4,
            Math.floor(Math.random() * 5) + 4,
            Math.floor(Math.random() * 5) + 8,
            Math.floor(Math.random() * 4) + 12,
            Math.floor(Math.random() * 4) + 12,
        ];
        // Shuffle deltas
        deltas.sort(() => Math.random() - 0.5);

        let current = Math.floor(Math.random() * 5) + 1;
        numbers = [current];
        for (let i = 0; i < config.pick - 1; i++) {
            current += deltas[i];
            numbers.push(current);
        }

        if (numbers[numbers.length - 1] <= config.max && new Set(numbers).size === config.pick) {
            valid = true;
        }
    }

    return numbers.sort((a, b) => a - b);
};

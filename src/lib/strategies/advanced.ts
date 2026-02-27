
import { StrategyFn } from "../generators/types";

export const frequencyAnalysis: StrategyFn = (config, history) => {
    const freqMap: Record<number, number> = {};
    history.forEach(draw => {
        draw.numbers.forEach((n: number) => {
            freqMap[n] = (freqMap[n] || 0) + 1;
        });
    });

    const total = Object.values(freqMap).reduce((a, b) => a + b, 0);
    const numbers: number[] = [];

    while (numbers.length < config.pick) {
        const rand = Math.random() * total;
        let acc = 0;
        for (let n = config.min; n <= config.max; n++) {
            acc += (freqMap[n] || 1);
            if (acc >= rand && !numbers.includes(n)) {
                numbers.push(n);
                break;
            }
        }
    }
    return numbers.sort((a, b) => a - b);
};

export const patternMatch: StrategyFn = (_config) => {
    // Logic: Ensure a mix of decades (1-9, 10-19, etc) and consecutive pairs
    const numbers: number[] = [];
    const decades = [0, 1, 2, 3, 4]; // 0-9, 10-19, 20-29, 30-39, 40-49

    // Pick one from each decade
    decades.forEach(d => {
        const low = Math.max(_config.min, d * 10);
        const high = Math.min(_config.max, (d + 1) * 10 - 1);
        numbers.push(Math.floor(Math.random() * (high - low + 1)) + low);
    });

    // Last one random
    while (numbers.length < _config.pick) {
        const n = Math.floor(Math.random() * (_config.max - _config.min + 1)) + _config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers.sort((a, b) => a - b);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const numberGroups: StrategyFn = (_config) => {
    // Divide 1-49 into 7 groups of 7
    const groups = Array.from({ length: 7 }, (_, i) =>
        Array.from({ length: 7 }, (_, j) => i * 7 + j + 1)
    );

    const selectedGroups = groups.sort(() => Math.random() - 0.5).slice(0, 6);
    return selectedGroups.map(g => g[Math.floor(Math.random() * g.length)]).sort((a, b) => a - b);
};

export const sumRange: StrategyFn = (_config) => {
    // Historically most winning sums fall between 100-175 for 6/49
    let numbers: number[] = [];
    let sum = 0;
    do {
        numbers = [];
        while (numbers.length < _config.pick) {
            const n = Math.floor(Math.random() * (_config.max - _config.min + 1)) + _config.min;
            if (!numbers.includes(n)) numbers.push(n);
        }
        sum = numbers.reduce((a, b) => a + b, 0);
    } while (sum < 100 || sum > 175);

    return numbers.sort((a, b) => a - b);
};

export const cycleTracker: StrategyFn = (config, history) => {
    // CycleTracker: mix of "due" (long time no see) and "repeaters" (just saw)
    const lastSeen: Record<number, number> = {};
    history.forEach((draw, idx) => {
        draw.numbers.forEach((n: number) => {
            if (lastSeen[n] === undefined) lastSeen[n] = idx;
        });
    });

    const sortedByRecency = Object.entries(lastSeen)
        .sort(([, a], [, b]) => b - a)
        .map(([n]) => parseInt(n));

    const numbers: number[] = [];
    // Pick 2 oldest, 2 newest, 2 random
    numbers.push(sortedByRecency[0]);
    numbers.push(sortedByRecency[1]);
    numbers.push(parseInt(Object.keys(lastSeen).find(n => lastSeen[parseInt(n)] === 0) || "1"));
    numbers.push(parseInt(Object.keys(lastSeen).find(n => lastSeen[parseInt(n)] === 1) || "2"));

    while (numbers.length < config.pick) {
        const n = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        if (!numbers.includes(n)) numbers.push(n);
    }
    return [...new Set(numbers)].slice(0, config.pick).sort((a, b) => a - b);
};

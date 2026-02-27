export function calculateHuatScore(
    numbers: number[][],
    history: { numbers: number[] }[],
    gameType: "toto" | "4d"
): number {
    if (history.length === 0 || numbers.length === 0) return 50;

    const recentHistory = history.slice(0, 100);
    let totalScore = 0;

    if (gameType === "toto") {
        // Count frequency of each number in history
        const freq: Record<number, number> = {};
        recentHistory.forEach((draw) => {
            draw.numbers.forEach((n) => {
                freq[n] = (freq[n] || 0) + 1;
            });
        });

        const sorted = Object.entries(freq)
            .sort(([, a], [, b]) => b - a)
            .map(([n]) => parseInt(n));

        const hotNumbers = new Set(sorted.slice(0, 15));
        const warmNumbers = new Set(sorted.slice(15, 30));

        numbers.forEach((set) => {
            let setScore = 0;

            // Hot number bonus (0-35 points)
            const hotCount = set.filter((n) => hotNumbers.has(n)).length;
            setScore += Math.min(hotCount * 7, 35);

            // Warm number bonus (0-15 points)
            const warmCount = set.filter((n) => warmNumbers.has(n)).length;
            setScore += Math.min(warmCount * 5, 15);

            // Odd-even balance bonus (0-15 points)
            const oddCount = set.filter((n) => n % 2 !== 0).length;
            const evenCount = set.length - oddCount;
            const balance = 1 - Math.abs(oddCount - evenCount) / set.length;
            setScore += Math.round(balance * 15);

            // Number spread bonus (0-15 points)
            const min = Math.min(...set);
            const max = Math.max(...set);
            const spread = (max - min) / 49;
            setScore += Math.round(spread * 15);

            // Sum range bonus (0-10 points) — historical avg sum
            const sum = set.reduce((a, b) => a + b, 0);
            const avgSum = 150; // rough average for 6 from 49
            const sumDev = Math.abs(sum - avgSum) / avgSum;
            setScore += Math.round(Math.max(0, 1 - sumDev) * 10);

            // Lucky number bonus (0-10 points)
            const luckyNums = new Set([7, 8, 9, 11, 18, 28, 38, 48]);
            const luckyCount = set.filter((n) => luckyNums.has(n)).length;
            setScore += Math.min(luckyCount * 3, 10);

            totalScore += setScore;
        });

        totalScore = Math.round(totalScore / numbers.length);
    } else {
        // 4D scoring
        const digitFreq: Record<number, number> = {};
        for (let i = 0; i <= 9; i++) digitFreq[i] = 0;

        recentHistory.forEach((draw) => {
            draw.numbers.forEach((n) => {
                const digits = n.toString().padStart(4, "0").split("");
                digits.forEach((d) => {
                    digitFreq[parseInt(d)] = (digitFreq[parseInt(d)] || 0) + 1;
                });
            });
        });

        const hotDigits = Object.entries(digitFreq)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([d]) => parseInt(d));

        const hotSet = new Set(hotDigits);

        numbers.forEach((set) => {
            let setScore = 0;
            const num = set[0];
            const digits = num.toString().padStart(4, "0").split("").map(Number);

            // Hot digit bonus (0-40 points)
            const hotCount = digits.filter((d) => hotSet.has(d)).length;
            setScore += hotCount * 10;

            // Digit variety bonus (0-20 points)
            const unique = new Set(digits).size;
            setScore += unique * 5;

            // Lucky digit bonus (0-20 points)
            const luckyDigits = new Set([8, 6, 9, 3]);
            const luckyCount = digits.filter((d) => luckyDigits.has(d)).length;
            setScore += luckyCount * 5;

            // Pattern bonus (0-20 points) — pairs, sequences
            const hasPair = digits.some(
                (d, i) => i < digits.length - 1 && d === digits[i + 1]
            );
            if (hasPair) setScore += 10;

            const hasSequence = digits.some(
                (d, i) => i < digits.length - 1 && Math.abs(d - digits[i + 1]) === 1
            );
            if (hasSequence) setScore += 10;

            totalScore += setScore;
        });

        totalScore = Math.round(totalScore / numbers.length);
    }

    // Clamp to 0-100
    return Math.min(100, Math.max(0, totalScore));
}

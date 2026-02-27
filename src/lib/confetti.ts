import confetti from 'canvas-confetti';

export type CelebrationTier = 'medium' | 'high' | 'legendary';

export function triggerCelebration(tier: CelebrationTier) {
    if (tier === 'medium') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#Fbbf24', '#f59e0b', '#d97706'], // Amber variations
        });
    } else if (tier === 'high') {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults, particleCount,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#F59E0B', '#EF4444', '#10B981'],
                shapes: ['circle', 'square']
            });
        }, 250);

    } else if (tier === 'legendary') {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#DC2626', '#EAB308'] // Red and Gold
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#DC2626', '#EAB308']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        const lenis = new Lenis({
            duration: 0.1,
            smoothWheel: true,
            wheelMultiplier: 0.5,
            touchMultiplier: 0.5,
            easing: (t) => 1 - Math.pow(1 - t, 2),
        });

        let frameId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            frameId = window.requestAnimationFrame(raf);
        };

        frameId = window.requestAnimationFrame(raf);

        return () => {
            window.cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return null;
}

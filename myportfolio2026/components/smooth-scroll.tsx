"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const lenis = new Lenis({
            duration: isMobile ? 4.0 : 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2,
        });

        // @ts-expect-error - Attach lenis to window for global control
        window.lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Recalculate scroll dimensions periodically and on resize
        // This ensures the footer is always reachable
        const resizeHandler = () => {
            lenis.resize();
        };

        window.addEventListener('resize', resizeHandler);

        // Also recalculate after images/fonts load
        window.addEventListener('load', resizeHandler);

        // Periodic resize check for dynamic content (every 2 seconds for first 10 seconds)
        let resizeChecks = 0;
        const resizeInterval = setInterval(() => {
            lenis.resize();
            resizeChecks++;
            if (resizeChecks >= 5) {
                clearInterval(resizeInterval);
            }
        }, 2000);

        return () => {
            // @ts-expect-error - Cleanup
            window.lenis = null;
            lenis.destroy();
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('load', resizeHandler);
            clearInterval(resizeInterval);
        };
    }, []);

    return <>{children}</>;
}

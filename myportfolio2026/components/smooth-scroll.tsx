"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);
    const startedRef = useRef(false);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const lenis = new Lenis({
            duration: isMobile ? 1.0 : 0.5, // Reduced from 1.5/0.8 for snappier feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: isMobile ? 1.0 : 1.5,
            touchMultiplier: isMobile ? 2.0 : 2.5,
            infinite: false,
            autoResize: true,
        });

        lenisRef.current = lenis;

        // @ts-expect-error - Attach lenis to window for global control
        window.lenis = lenis;

        const startRaf = () => {
            if (startedRef.current) return;
            startedRef.current = true;
            const raf = (time: number) => {
                lenis.raf(time);
                rafRef.current = requestAnimationFrame(raf);
            };
            rafRef.current = requestAnimationFrame(raf);
        };

        const stopRaf = () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            startedRef.current = false;
        };

        // Start only after first user interaction to reduce idle CPU.
        const onFirstIntent = () => {
            startRaf();
            window.removeEventListener("wheel", onFirstIntent, { passive: true } as AddEventListenerOptions);
            window.removeEventListener("touchstart", onFirstIntent, { passive: true } as AddEventListenerOptions);
            window.removeEventListener("keydown", onFirstIntent as any);
        };

        window.addEventListener("wheel", onFirstIntent, { passive: true });
        window.addEventListener("touchstart", onFirstIntent, { passive: true });
        window.addEventListener("keydown", onFirstIntent as any);

        // Pause RAF when tab is hidden; resume on show (without forcing immediate start if user never interacted).
        const onVisibility = () => {
            if (document.hidden) stopRaf();
            else if (startedRef.current) startRaf();
        };
        document.addEventListener("visibilitychange", onVisibility);

        // Recalculate scroll dimensions periodically and on resize
        // This ensures the footer is always reachable
        const resizeHandler = () => {
            lenis.resize();
        };

        window.addEventListener('resize', resizeHandler);

        // Also recalculate after images/fonts load
        window.addEventListener('load', resizeHandler);

        return () => {
            stopRaf();
            lenis.stop();
            // @ts-expect-error - Cleanup
            window.lenis = null;
            lenis.destroy();
            lenisRef.current = null;
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('load', resizeHandler);
            window.removeEventListener("wheel", onFirstIntent as any);
            window.removeEventListener("touchstart", onFirstIntent as any);
            window.removeEventListener("keydown", onFirstIntent as any);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    // Handle scroll reset on route change
    useEffect(() => {
        if (lenisRef.current) {
            // Check if there's a hash in the URL (for anchor links)
            if (window.location.hash) {
                // Let the browser or specific logic handle anchor scrolling if needed,
                // or use lenis.scrollTo(hash) if we want smooth scroll to anchor
                const target = document.querySelector(window.location.hash);
                if (target) {
                    lenisRef.current.scrollTo(target as HTMLElement, { offset: -100 }); // Adjust offset for header
                }
            } else {
                // Otherwise scroll to top immediately
                lenisRef.current.scrollTo(0, { immediate: true });
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return <>{children}</>;
}

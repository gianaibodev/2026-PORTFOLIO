"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { isLowEndDevice } from "@/lib/device-performance";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        // Skip Lenis entirely on low-end/reduced-motion — native scroll is faster.
        if (isLowEndDevice()) return;

        const lenis = new Lenis({
            duration: isMobile ? 1.0 : 0.5,
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
        };

        // Start immediately for smooth feel; pause when tab is hidden.
        startRaf();

        const onVisibility = () => {
            if (document.hidden) stopRaf();
            else startRaf();
        };
        document.addEventListener("visibilitychange", onVisibility);

        const resizeHandler = () => lenis.resize();
        window.addEventListener("resize", resizeHandler);
        window.addEventListener("load", resizeHandler);

        return () => {
            stopRaf();
            lenis.stop();
            // @ts-expect-error - Cleanup
            window.lenis = null;
            lenis.destroy();
            lenisRef.current = null;
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("load", resizeHandler);
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

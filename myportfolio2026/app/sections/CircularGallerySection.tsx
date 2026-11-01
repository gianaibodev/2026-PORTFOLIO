"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCopyMode } from "@/components/copy-mode-provider";
import { LazyMount } from "@/components/lazy-mount";
import { usePerformance } from "@/components/performance-provider";
import { useFullPageLoading } from "@/components/full-page-loading-context";

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
    ssr: false,
    loading: () => <div className="h-[380px] w-full sm:h-[480px] md:h-[540px] lg:h-[600px]" />,
});

export function CircularGallerySection() {
    const { copyMode } = useCopyMode();
    const { isLowEndDevice } = usePerformance();
    const { isActive: introPlaying } = useFullPageLoading();

    // Starting WebGL blocks for most of a second, which reads as a stall if it
    // lands mid-scroll. On capable desktops, do it during idle time after load.
    const [warm, setWarm] = useState(false);
    useEffect(() => {
        if (introPlaying || isLowEndDevice || window.innerWidth < 768 || !window.requestIdleCallback) return;
        let idle = 0;
        // Wait for a pause in scrolling too. Scrolling is native and survives a
        // busy main thread, but anything else on the page would stall.
        let lastScroll = 0;
        const onScroll = () => {
            lastScroll = performance.now();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        const attempt = () => {
            idle = window.requestIdleCallback(
                (deadline) => {
                    if (performance.now() - lastScroll < 400 || deadline.didTimeout) timer = window.setTimeout(attempt, 400);
                    else setWarm(true);
                },
                { timeout: 2000 }
            );
        };
        let timer = window.setTimeout(attempt, 5000);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
            if (idle) window.cancelIdleCallback(idle);
        };
    }, [introPlaying, isLowEndDevice]);

    return (
        <section className="section">
            <div className="wrap">
                <h2 className="heading reveal">Almost 1 Year on the Road</h2>
                <p className="lede">
                    {copyMode === "plain"
                        ? "After graduating, I spent almost 1 year backpacking across different countries. I freelanced in web design, SEO and video along the way, and built Haff Leisure Club. Now I'm ready for a full-time frontend role."
                        : "After graduating, I spent almost 1 year backpacking across different countries. I freelanced in web design, SEO and video along the way, and built Haff Leisure Club. Now I'm ready for a full-time frontend role."}
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
                    Traveling and experiencing different cultures has been a huge boost to my creativity, teaching me design styles, color palettes, and visual languages from around the world.
                </p>
            </div>
            <LazyMount
                rootMargin="900px"
                force={warm}
                className="mt-10"
                placeholder={<div className="h-[380px] w-full sm:h-[480px] md:h-[540px] lg:h-[600px]" />}
            >
                <CircularGalleryDemo />
            </LazyMount>
        </section>
    );
}

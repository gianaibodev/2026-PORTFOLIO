"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCopyMode } from "@/components/copy-mode-provider";
import { LazyMount } from "@/components/lazy-mount";
import { usePerformance } from "@/components/performance-provider";

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
    ssr: false,
    loading: () => <div className="h-[380px] w-full sm:h-[480px] md:h-[540px] lg:h-[600px]" />,
});

export function CircularGallerySection() {
    const { copyMode } = useCopyMode();
    const { isLowEndDevice } = usePerformance();

    // Starting WebGL blocks for most of a second, which reads as a stall if it
    // lands mid-scroll. On capable desktops, do it during idle time after load.
    const [warm, setWarm] = useState(false);
    useEffect(() => {
        if (isLowEndDevice || window.innerWidth < 768 || !window.requestIdleCallback) return;
        let idle = 0;
        const timer = window.setTimeout(() => {
            idle = window.requestIdleCallback(() => setWarm(true), { timeout: 3000 });
        }, 2500);
        return () => {
            window.clearTimeout(timer);
            if (idle) window.cancelIdleCallback(idle);
        };
    }, [isLowEndDevice]);

    return (
        <section className="section">
            <div className="wrap">
                <h2 className="heading reveal">Almost 1 Year on the Road</h2>
                <p className="lede">
                    {copyMode === "plain"
                        ? "After finishing school, I spent almost 1 year backpacking across different countries, funding my travels through freelance work: SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to transition into a full-time professional role and bring those fresh perspectives into my work."
                        : "After graduating, I spent almost 1 year backpacking across different countries, funding my travels through freelance work: SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to embark on my next professional chapter and bring those global perspectives into my work."}
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

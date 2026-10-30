"use client";

import dynamic from "next/dynamic";
import { useCopyMode } from "@/components/copy-mode-provider";
import { LazyMount } from "@/components/lazy-mount";

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
    ssr: false,
    loading: () => <div className="h-[380px] w-full sm:h-[480px] md:h-[540px] lg:h-[600px]" />,
});

export function CircularGallerySection() {
    const { copyMode } = useCopyMode();

    return (
        <section className="section">
            <div className="wrap">
                <h2 className="heading">6 Months on the Road</h2>
                <p className="lede">
                    {copyMode === "plain"
                        ? "After finishing school, I spent 6 months backpacking across different countries, funding my travels through freelance work: SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to transition into a full-time professional role and bring those fresh perspectives into my work."
                        : "After graduating, I spent 6 months backpacking across different countries, funding my travels through freelance work: SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to embark on my next professional chapter and bring those global perspectives into my work."}
                </p>
                <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
                    Traveling and experiencing different cultures has been a huge boost to my creativity, teaching me design styles, color palettes, and visual languages from around the world.
                </p>
            </div>
            <LazyMount
                rootMargin="300px"
                className="mt-10"
                placeholder={<div className="h-[380px] w-full sm:h-[480px] md:h-[540px] lg:h-[600px]" />}
            >
                <CircularGalleryDemo />
            </LazyMount>
        </section>
    );
}

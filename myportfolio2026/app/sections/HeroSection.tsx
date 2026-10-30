"use client";

import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { useCopyMode } from "@/components/copy-mode-provider";

const HeroShader = dynamic(() => import("@/components/ui/hero-shader"), { ssr: false });

export function HeroSection() {
    const { copyMode, toggleCopyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section id="home" className="relative isolate flex min-h-[100dvh] w-full items-end overflow-hidden">
            <div aria-hidden className="hero-canvas-wrapper absolute inset-0 -z-10">
                <HeroShader />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="wrap w-full pb-16 pt-28 md:pb-24">
                <p className="rise text-sm font-medium text-blue-600 dark:text-blue-300">
                    Open to work, {plain ? "2026 Portfolio" : "Portfolio 2026"}
                </p>
                <h1 className="rise rise-1 mt-5 max-w-5xl text-balance text-5xl font-medium leading-[1.04] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                    {plain ? "Websites that build trust and drive growth." : "Building high-end digital experiences."}
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    {plain
                        ? "I help businesses worldwide launch modern, fast, and mobile-friendly websites without the headache."
                        : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
                </p>
                <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
                    <a href="#projects" className="btn btn-primary">
                        {plain ? "See My Work" : "View My Work"}
                        <ArrowDown className="size-4" aria-hidden />
                    </a>
                    <button type="button" onClick={toggleCopyMode} className="btn btn-quiet">
                        {plain ? "Read Technical Version" : "Read Simple Version"}
                    </button>
                </div>
            </div>
        </section>
    );
}

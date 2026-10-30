"use client";

import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { BorderBeam } from "border-beam";
import { useCopyMode } from "@/components/copy-mode-provider";

const HeroShader = dynamic(() => import("@/components/ui/hero-shader"), { ssr: false });

export function HeroSection() {
    const { copyMode, toggleCopyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section id="home" className="relative isolate flex w-full items-start overflow-hidden">
            <div aria-hidden className="hero-canvas-wrapper absolute inset-0 -z-10">
                <HeroShader />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="wrap w-full pb-36 pt-28 md:pb-60 md:pt-32">
                <p className="rise text-sm font-medium text-blue-600 dark:text-blue-300">
                    Open to work, {plain ? "2026 Portfolio" : "Portfolio 2026"}
                </p>
                <h1 className="rise rise-1 mt-5 text-balance text-[clamp(3.25rem,8.6vw,8.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-foreground">
                    {plain ? (
                        <>
                            <span className="text-blue-600 dark:text-blue-300">Design</span> that people remember.
                        </>
                    ) : (
                        <>
                            <span className="text-blue-600 dark:text-blue-300">Designing</span> high-end digital experiences.
                        </>
                    )}
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    {plain
                        ? "Brand identities, interfaces, and motion for businesses worldwide, designed and built from first idea to launch."
                        : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
                </p>
                <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
                    <BorderBeam size="md" colorVariant="ocean" theme="dark" duration={3.2}>
                        <a href="#projects" className="btn btn-primary">
                            {plain ? "See My Work" : "View My Work"}
                            <ArrowDown className="size-4" aria-hidden />
                        </a>
                    </BorderBeam>
                    <button type="button" onClick={toggleCopyMode} className="btn btn-quiet">
                        {plain ? "Read Technical Version" : "Read Simple Version"}
                    </button>
                </div>
            </div>
        </section>
    );
}

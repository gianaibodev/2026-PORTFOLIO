"use client";

import { Fragment } from "react";
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
                    Open to work, Frontend Developer
                </p>
                <h1 className="mt-5 text-balance text-[clamp(3.25rem,8.6vw,8.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-foreground">
                    {(plain ? "I design interfaces, then build them." : "From Figma to production React.").split(" ").map((word, index) => (
                        <Fragment key={`${copyMode}-${word}`}>
                            <span className="hero-word" style={{ "--word": index } as React.CSSProperties}>
                                <span className={index === 0 ? "text-blue-600 dark:text-blue-300" : undefined}>{word}</span>
                            </span>{" "}
                        </Fragment>
                    ))}
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    {plain
                        ? "Frontend developer working in React, Next.js and TypeScript. I built the live queue and court app a pickleball club uses on its floor, and a company site with its own CMS."
                        : "Real-time interfaces, Web Workers, WebGL and accessible components. Open to full-time frontend roles."}
                </p>
                <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
                    <BorderBeam size="md" colorVariant="ocean" theme="dark" duration={3.2}>
                        <a href="#projects" className="btn btn-primary">
                            {plain ? "See My Work" : "View My Work"}
                            <ArrowDown className="size-4" aria-hidden />
                        </a>
                    </BorderBeam>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-quiet">View Resume</a>
                    <button type="button" onClick={toggleCopyMode} className="btn btn-quiet">
                        {plain ? "Read Technical Version" : "Read Simple Version"}
                    </button>
                </div>
            </div>
        </section>
    );
}

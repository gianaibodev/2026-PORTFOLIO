"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { Deferred } from "@/components/deferred";
import { ErrorBoundary } from "@/components/error-boundary";
import { useCopyMode } from "@/components/copy-mode-provider"; // Valid assuming provider is accessible

const SplineSceneBasic = dynamic(
    () => import("@/components/demos/spline-scene-demo").then((mod) => ({ default: mod.SplineSceneBasic })),
    {
        ssr: false,
        loading: () => <div className="w-full h-[500px] bg-muted/10 rounded-lg" />,
    }
);

export function Interactive3DSection({ variants, itemVariants }: { variants: any, itemVariants: any }) {
    // Types for variants should be strict but 'any' for speed in refactor if types not shared. 
    // I'll copy the variants definition if needed, or pass them as props.
    // Ideally components are self-contained. I will redefine variants inside or import.
    // The original file defined them locally. I'll define them here or accept props.
    // Accepting props makes it dependent on parent. Self-contained is better for "Section" architecture.

    const { copyMode } = useCopyMode();

    return (
        <section id="interactive-3d" className="w-full py-16 px-4 sm:px-6 lg:px-16 relative z-10 overflow-visible">
            <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={variants}
                className="max-w-7xl mx-auto backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-sm will-change-transform"
            >
                <div className="max-w-3xl mb-12">
                    <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        {copyMode === "plain" ? "Interactive & 3D Design" : "Mastering Motion & 3D"}
                    </m.h2>
                    <m.p variants={itemVariants} className="text-lg text-muted-foreground font-light leading-relaxed">
                        {copyMode === "plain" ? (
                            "I create websites that feel alive. Using modern 3D tools and animation, I make sure your brand stands out and keeps visitors engaged longer."
                        ) : (
                            <>
                                Blending technical code with creative artistry. I leverage{" "}
                                <span className="text-foreground font-semibold">Blender</span> for 3D modeling,{" "}
                                <span className="text-foreground font-semibold">After Effects</span> for motion design, and{" "}
                                <span className="text-foreground font-semibold">Three.js / React Three Fiber</span> to bring interactive experiences to the browser.
                            </>
                        )}
                    </m.p>
                </div>

                <m.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-muted/5">
                    <ErrorBoundary fallback={<div className="h-[400px] bg-muted" />}>
                        <Deferred delay={200}>
                            <SplineSceneBasic />
                        </Deferred>
                    </ErrorBoundary>
                </m.div>
            </m.div>
        </section>
    );
}

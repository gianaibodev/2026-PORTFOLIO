"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { ErrorBoundary } from "@/components/error-boundary";
import { useCopyMode } from "@/components/copy-mode-provider";
import { usePerformance } from "@/components/performance-provider";
import { LazyMount } from "@/components/lazy-mount";

const SplineSceneBasic = dynamic(
    () => import("@/components/demos/spline-scene-demo").then((mod) => ({ default: mod.SplineSceneBasic })),
    {
        ssr: false,
        loading: () => <div className="w-full h-[500px] bg-muted/10 rounded-lg" />,
    }
);

export function Interactive3DSection({ variants, itemVariants }: { variants: any, itemVariants: any }) {
    const { copyMode } = useCopyMode();
    const { isLowEndDevice } = usePerformance();

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
                    {isLowEndDevice ? (
                        /* Static fallback — same card shape, zero runtime cost */
                        <div className="w-full h-[500px] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl">
                            <div className="text-5xl">🎨</div>
                            <p className="text-sm text-muted-foreground text-center px-6 max-w-xs">
                                Interactive 3D preview available on higher-performance devices.
                            </p>
                        </div>
                    ) : (
                        <ErrorBoundary fallback={<div className="h-[400px] bg-muted" />}>
                            <LazyMount
                                rootMargin="300px"
                                placeholder={<div className="w-full h-[500px] bg-muted/10 rounded-lg" />}
                            >
                                <SplineSceneBasic />
                            </LazyMount>
                        </ErrorBoundary>
                    )}
                </m.div>
            </m.div>
        </section>
    );
}

"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { Deferred } from "@/components/deferred";
import { useCopyMode } from "@/components/copy-mode-provider";

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
    ssr: false,
    loading: () => <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-muted/50" />,
});

export function CircularGallerySection({ variants, itemVariants }: { variants: any, itemVariants: any }) {
    const { copyMode } = useCopyMode();

    return (
        <section className="w-full py-24 relative z-10 overflow-visible">
            <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={variants}
                className="max-w-7xl mx-auto px-4"
            >
                <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-4 text-center">
                    6 Months on the Road
                </m.h2>
                <m.p variants={itemVariants} className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                    {copyMode === "plain"
                        ? "After finishing school, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to transition into a full-time professional role and bring those fresh perspectives into my work."
                        : "After graduating, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to embark on my next professional chapter and bring those global perspectives into my work."}
                </m.p>
                <m.p variants={itemVariants} className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-sm italic">
                    "Traveling and experiencing different cultures has been a huge boost to my creativity—learning design styles, color palettes, and visual languages from around the world."
                </m.p>

                <m.div variants={itemVariants}>
                    <Deferred delay={200}>
                        <CircularGalleryDemo />
                    </Deferred>
                </m.div>
            </m.div>
        </section>
    );
}

"use client";

import { useCopyMode } from "@/components/copy-mode-provider";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ContactSection({ variants, itemVariants }: { variants: any, itemVariants: any }) {
    const { copyMode } = useCopyMode();

    return (
        <section id="contact-redirect" className="w-full py-16 relative z-10 overflow-visible">
            <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={variants}
                className="max-w-4xl mx-auto px-4 text-center backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-12 shadow-lg"
            >
                <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8">
                    {copyMode === "plain" ? "Ready to start?" : "Get In Touch"}
                </m.h2>
                <m.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
                    {copyMode === "plain"
                        ? "Let's discuss your project. I'm currently accepting new clients."
                        : "I'm always open to new opportunities, collaborations, and conversations."}
                </m.p>
                <m.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
                    <a
                        href="mailto:gianaibo.dev@gmail.com"
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                        suppressHydrationWarning
                    >
                        Email Me
                    </a>
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white/10 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-foreground dark:text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        suppressHydrationWarning
                    >
                        Connect Socially
                        <ArrowUpRight size={18} />
                    </Link>
                </m.div>
            </m.div>
        </section>
    );
}

"use client";

import Link from "next/link";
import { useCopyMode } from "@/components/copy-mode-provider";

export function ContactSection() {
    const { copyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section id="contact-redirect" className="section">
            <div className="wrap reveal">
                <h2 className="text-5xl font-medium leading-[1.04] tracking-[-0.035em] md:text-7xl">
                    {plain ? "Ready to start?" : "Get In Touch"}
                </h2>
                <p className="lede">
                    {plain
                        ? "Let's discuss your project. I'm currently accepting new clients."
                        : "I'm always open to new opportunities, collaborations, and conversations."}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <a href="mailto:gianaibo.dev@gmail.com" className="btn btn-primary">Email Me</a>
                    <Link href="/contact" className="btn btn-quiet">Connect Socially</Link>
                </div>
            </div>
        </section>
    );
}

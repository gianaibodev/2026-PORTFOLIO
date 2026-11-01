"use client";

import Link from "next/link";
import { BorderBeam } from "border-beam";
import { useCopyMode } from "@/components/copy-mode-provider";

export function ContactSection() {
    const { copyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section id="contact-redirect" className="section">
            <div className="wrap">
                <h2 className="closing-type text-5xl font-medium leading-[1.04] tracking-[-0.035em] md:text-7xl">
                    {plain ? "Hiring? Let's talk." : "Get In Touch"}
                </h2>
                <p className="lede">
                    {plain
                        ? "I'm open to full-time frontend roles and happy to walk you through my work."
                        : "I'm always open to new opportunities, collaborations, and conversations."}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <BorderBeam size="md" colorVariant="ocean" theme="dark" duration={3.2}>
                        <a href="mailto:gianaibo.dev@gmail.com" className="btn btn-primary">Email Me</a>
                    </BorderBeam>
                    <Link href="/contact" className="btn btn-quiet">Connect Socially</Link>
                </div>
            </div>
        </section>
    );
}

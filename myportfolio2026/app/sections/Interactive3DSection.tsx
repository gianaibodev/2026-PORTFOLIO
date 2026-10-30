"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCopyMode } from "@/components/copy-mode-provider";

export function Interactive3DSection() {
    const { copyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section id="interactive-3d" className="section">
            <div className="wrap">
                <h2 className="heading">{plain ? "Interactive & 3D Design" : "Mastering Motion & 3D"}</h2>
                <p className="lede">
                    {plain ? (
                        "I create websites that feel alive. Using modern 3D tools and animation, I make sure your brand stands out and keeps visitors engaged longer."
                    ) : (
                        <>
                            Blending technical code with creative artistry. I leverage{" "}
                            <span className="text-foreground">Blender</span> for 3D modeling,{" "}
                            <span className="text-foreground">After Effects</span> for motion design, and{" "}
                            <span className="text-foreground">Three.js / React Three Fiber</span> to bring interactive experiences to the browser.
                        </>
                    )}
                </p>

                <div className="reveal mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:grid-rows-2 md:gap-4">
                    <div className="relative col-span-2 aspect-video overflow-hidden rounded-2xl bg-muted md:col-span-8 md:row-span-2 md:aspect-auto">
                        <Image
                            src="/projects/3d-works/hero.webp"
                            alt="A rendered 3D sphere in brushed teal metal, split open around an amber core"
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted md:col-span-4">
                        <Image
                            src="/projects/3d-works/2.webp"
                            alt="Close view of the amber core inside the sphere"
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted md:col-span-4">
                        <Image
                            src="/projects/3d-works/3.webp"
                            alt="The same sphere with its core removed, showing the empty housing"
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <Link href="/blog/3d-works-2024" className="link-arrow group mt-8">
                    See the 3D work
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
            </div>
        </section>
    );
}

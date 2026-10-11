'use client'

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowUpRight } from "lucide-react";

/**
 * This card used to embed a live Spline scene. The Spline runtime cost ~2MB of
 * JavaScript, fetched a WebAssembly module from unpkg at runtime, and needed
 * 'unsafe-eval' in the CSP because it deserializes scenes with new Function().
 * A still from the 3D Works case study carries the same point at 30KB, and is
 * Gian's own render rather than a stock demo scene.
 */
export function Interactive3DShowcase() {
  return (
    <Card className="w-full h-[500px] bg-slate-100 dark:bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 dark:block hidden"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-neutral-50 dark:to-neutral-400">
            Interactive 3D
          </h3>
          <p className="mt-4 text-slate-600 dark:text-neutral-300 max-w-lg">
            Modelled, lit and rendered in Blender, then taken into the browser
            with Three.js and React Three Fiber for scenes that react to the
            people looking at them.
          </p>
          <Link
            href="/blog/3d-works-2024"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit"
          >
            See the 3D work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[300px] border-l border-zinc-300 dark:border-white/10">
          <Image
            src="/projects/3d-works/hero.webp"
            alt="A rendered 3D sphere in brushed steel, split open around a glowing amber core"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Card>
  )
}

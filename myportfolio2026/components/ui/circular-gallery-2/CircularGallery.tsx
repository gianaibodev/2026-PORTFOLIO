"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { App } from "./App";
import { CircularGalleryProps } from "./types";

/**
 * A circular 3D gallery component powered by OGL.
 * Features momentum scrolling, infinite wrapping, and WebGL-based image rendering.
 */
const CircularGallery = ({
    items,
    bend = 3,
    borderRadius = 0.05,
    scrollSpeed = 2,
    scrollEase = 0.05,
    imageScale = 1,
    className,
    fontClassName,
    ...props
}: CircularGalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const computedStyle = getComputedStyle(containerRef.current);
        const computedColor = computedStyle.color || "hsl(var(--foreground))";
        const computedFontWeight = computedStyle.fontWeight || "bold";
        const computedFontSize = computedStyle.fontSize || "30px";
        const computedFontFamily = computedStyle.fontFamily;

        const computedFont = `${computedFontWeight} ${computedFontSize} ${computedFontFamily}`;

        const app = new App(containerRef.current, {
            items,
            bend,
            textColor: computedColor,
            borderRadius,
            font: computedFont,
            scrollSpeed,
            scrollEase,
            imageScale,
        });

        return () => {
            app.destroy();
        };
    }, [items, bend, borderRadius, scrollSpeed, scrollEase, imageScale, fontClassName]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full h-full overflow-hidden cursor-grab active:cursor-grabbing",
                "text-foreground font-bold text-[30px]",
                fontClassName,
                className,
            )}
            style={{ touchAction: 'pan-y' }}
            {...props}
        />
    );
};

export { CircularGallery };

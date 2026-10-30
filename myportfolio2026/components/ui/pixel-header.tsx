"use client";

import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { isLowEndDevice } from "@/lib/device-performance";

interface PixelHeaderProps {
  colors?: string[];
  title: string;
  subtitle?: string;
  categoryIcon?: React.ReactNode;
  categoryText?: string;
  backLink?: React.ReactNode;
  maxWidth?: string;
  children?: React.ReactNode;
}

export function PixelHeader({
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
  title,
  subtitle,
  categoryIcon,
  categoryText,
  backLink,
  maxWidth = "max-w-6xl",
  children,
}: PixelHeaderProps) {
  const [lowEnd, setLowEnd] = useState(false);
  useEffect(() => setLowEnd(isLowEndDevice()), []);

  // The soft gradient needs few pixels, and only animates while it is on screen.
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full pt-[84px] sm:pt-[104px] overflow-hidden">
      {lowEnd ? (
        /* Static CSS mesh-gradient approximation of the WebGL shader,
           same palette, zero GPU cost. The shader animates at speed 0.05,
           so a still frame is visually near-identical. */
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 20% 20%, ${colors[0]} 0%, transparent 55%), radial-gradient(ellipse at 80% 25%, ${colors[1 % colors.length]} 0%, transparent 55%), radial-gradient(ellipse at 30% 80%, ${colors[2 % colors.length]} 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, ${colors[3 % colors.length]} 0%, transparent 60%), ${colors[0]}`,
          }}
        />
      ) : (
        <>
          <MeshGradient
            colors={colors}
            swirl={0.75}
            distortion={0.5}
            speed={inView ? 0.05 : 0}
            minPixelRatio={1}
            maxPixelCount={350000}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
          <Dithering
            colorBack="#000000"
            colorFront="#ffffff"
            scale={0.8}
            shape="dots"
            speed={0}
            minPixelRatio={1}
            maxPixelCount={900000}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.4,
              mixBlendMode: "overlay",
            }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

      <div className={`relative container mx-auto px-4 sm:px-6 pt-6 pb-8 sm:pt-8 sm:pb-10 md:pb-12 text-left flex flex-col ${maxWidth}`}>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 sm:gap-3"
        >
          {backLink && <div className="mb-1 sm:mb-2">{backLink}</div>}
          {(categoryIcon || categoryText) && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80">
              {categoryIcon}
              {categoryText && <p className="break-words">{categoryText}</p>}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl font-medium leading-relaxed break-words">
              {subtitle}
            </p>
          )}
          {children}
        </m.div>
      </div>
    </div>
  );
}


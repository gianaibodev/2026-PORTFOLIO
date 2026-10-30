"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { isLowEndDevice } from "@/lib/device-performance";

/**
 * The animated backdrop behind the hero. It only decorates: the hero's text is
 * server-rendered separately, so nothing depends on this loading, and low-end
 * devices keep the static gradient underneath instead. It draws in a worker,
 * so it costs the page's main thread nothing.
 */
export default function HeroShader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isLowEndDevice()) return;
    const canvas = document.createElement("canvas");
    if (!canvas.transferControlToOffscreen) return;

    canvas.className = "hero-shader-canvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    root.appendChild(canvas);

    const worker = new Worker(new URL("./hero-shader.worker.ts", import.meta.url));
    workerRef.current = worker;
    const offscreen = canvas.transferControlToOffscreen();
    worker.postMessage({ canvas: offscreen, dark: isDark ? 1 : 0 }, [offscreen]);

    const ro = new ResizeObserver(() => {
      if (root.clientWidth && root.clientHeight) {
        worker.postMessage({ width: root.clientWidth, height: root.clientHeight });
      }
    });
    ro.observe(root);

    // Halt the loop when the hero is off screen or the tab is hidden.
    let inView = true;
    const sync = () => worker.postMessage({ active: inView && !document.hidden });
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" }
    );
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      worker.terminate();
      workerRef.current = null;
      canvas.remove();
    };
    // Theme changes go to the running worker below rather than rebuilding it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    workerRef.current?.postMessage({ dark: isDark ? 1 : 0 });
  }, [isDark]);

  return <div ref={rootRef} className="absolute inset-0" />;
}

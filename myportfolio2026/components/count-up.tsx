"use client";

import { useEffect, useRef, useState } from "react";

// Server-renders the real number, then counts up once when first seen.
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(value);

    useEffect(() => {
        const node = ref.current;
        if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        setShown(0);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const t = Math.min((now - start) / 1100, 1);
                    setShown(Math.round(value * (1 - (1 - t) ** 3)));
                    if (t < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );
        observer.observe(node);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    return (
        <span ref={ref} aria-label={`${prefix}${value.toLocaleString("en-US")}${suffix}`} className="tabular-nums">
            {prefix}{shown.toLocaleString("en-US")}{suffix}
        </span>
    );
}

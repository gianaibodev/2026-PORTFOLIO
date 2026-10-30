"use client";

import { useEffect } from "react";

// One delegated listener drives every .spotlight card, so adding cards costs nothing.
export function SpotlightTracker() {
    useEffect(() => {
        if (!window.matchMedia("(hover: hover)").matches) return;

        let frame = 0;
        const onMove = (event: PointerEvent) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
                if (!card) return;
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--x", `${event.clientX - rect.left}px`);
                card.style.setProperty("--y", `${event.clientY - rect.top}px`);
            });
        };

        document.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            document.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return null;
}

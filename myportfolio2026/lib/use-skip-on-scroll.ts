"use client";

import { useEffect, useRef } from "react";

const SCROLL_KEYS = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
const SWIPE_DISTANCE = 24;

/**
 * Ends a full-screen intro as soon as the visitor tries to scroll, so the
 * scroll lock under it never reads as a broken page.
 */
export function useSkipOnScroll(active: boolean, skip: () => void) {
    const skipRef = useRef(skip);
    useEffect(() => {
        skipRef.current = skip;
    });

    useEffect(() => {
        if (!active) return;

        let touchY: number | null = null;
        const onWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) skipRef.current();
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (SCROLL_KEYS.includes(e.key)) skipRef.current();
        };
        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0]?.clientY ?? null;
        };
        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0]?.clientY;
            if (touchY !== null && y !== undefined && Math.abs(y - touchY) > SWIPE_DISTANCE) {
                skipRef.current();
            }
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [active]);
}

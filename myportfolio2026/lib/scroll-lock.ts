"use client";

/**
 * Centralized scroll lock management to prevent conflicts between components.
 * Uses a counter-based system so nested locks don't prematurely unlock.
 */

let lockCount = 0;

export function lockScroll() {
    lockCount++;
    if (lockCount === 1) {
        // First lock - actually disable scroll
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Also pause Lenis if available
        if (typeof window !== "undefined" && (window as unknown as { lenis?: { stop: () => void } }).lenis) {
            (window as unknown as { lenis: { stop: () => void } }).lenis.stop();
        }
    }
}

export function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        // Last unlock - restore scroll
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        // Resume Lenis if available
        if (typeof window !== "undefined" && (window as unknown as { lenis?: { start: () => void } }).lenis) {
            (window as unknown as { lenis: { start: () => void } }).lenis.start();
        }
    }
}

export function forceUnlockScroll() {
    // Emergency reset - use when navigation happens
    lockCount = 0;
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    if (typeof window !== "undefined" && (window as unknown as { lenis?: { start: () => void } }).lenis) {
        (window as unknown as { lenis: { start: () => void } }).lenis.start();
    }
}

/**
 * Shared low-end device heuristic. Single source of truth so every
 * effect (hero shader, smooth scroll, galleries, loaders) degrades
 * at the same threshold instead of each keeping its own copy.
 */
export function isLowEndDevice(): boolean {
    if (typeof window === "undefined") return false

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory
    const isLowMemory = deviceMemory !== undefined && deviceMemory < 4
    const hardwareConcurrency = navigator.hardwareConcurrency
    const isLowCPU = hardwareConcurrency !== undefined && hardwareConcurrency < 4

    return prefersReducedMotion || isLowMemory || isLowCPU
}

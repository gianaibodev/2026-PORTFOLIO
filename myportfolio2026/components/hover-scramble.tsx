"use client";

import { useEffect } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/#%&";
const DURATION = 420;

function scramble(node: Text) {
    const text = node.data;
    const start = performance.now();
    const tick = (now: number) => {
        const settled = Math.floor((text.length * (now - start)) / DURATION);
        if (settled >= text.length) {
            node.data = text;
            return;
        }
        node.data = text.replace(/\S/g, (char, i) =>
            i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        );
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

/**
 * Letters of a text link resolve from noise on hover. One delegated listener
 * covers every `.link-arrow`, so nothing runs until a pointer reaches one.
 */
export function HoverScramble() {
    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;

        const running = new WeakSet<Element>();
        const onOver = (event: PointerEvent) => {
            const link = (event.target as Element).closest?.(".link-arrow");
            if (!link || running.has(link)) return;
            const node = [...link.childNodes].find(
                (child): child is Text => child.nodeType === Node.TEXT_NODE && !!child.textContent?.trim()
            );
            if (!node) return;
            running.add(link);
            scramble(node);
            window.setTimeout(() => running.delete(link), DURATION + 100);
        };
        document.addEventListener("pointerover", onOver, { passive: true });
        return () => document.removeEventListener("pointerover", onOver);
    }, []);

    return null;
}

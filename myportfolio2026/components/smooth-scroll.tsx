"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Native scrolling only. The Lenis smooth-scroll loop was removed because it
 * added input lag on mid and low-end phones. This keeps the one useful
 * behaviour: jump to the top (or to a #hash target) when the route changes.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ block: "start" });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
}

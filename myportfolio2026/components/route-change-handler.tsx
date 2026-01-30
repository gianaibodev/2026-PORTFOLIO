"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { forceUnlockScroll } from "@/lib/scroll-lock";

/**
 * Component that listens for route changes and ensures scroll is unlocked.
 * This prevents scroll-lock issues when navigating away from a page with an open modal.
 */
export function RouteChangeHandler() {
    const pathname = usePathname();

    useEffect(() => {
        // Force unlock scroll whenever the route changes
        forceUnlockScroll();
    }, [pathname]);

    return null;
}

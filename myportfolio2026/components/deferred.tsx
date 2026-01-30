"use client";

import { useState, useEffect } from "react";

export function Deferred({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShouldRender(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return shouldRender ? <>{children}</> : null;
}

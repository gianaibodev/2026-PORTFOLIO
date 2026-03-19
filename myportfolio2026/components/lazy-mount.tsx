"use client";

import * as React from "react";

type LazyMountProps = {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  /**
   * Root margin for IntersectionObserver, e.g. "200px" to pre-load slightly early.
   */
  rootMargin?: string;
  /**
   * If true, mount once and never unmount when out of view.
   */
  once?: boolean;
  className?: string;
};

export function LazyMount({
  children,
  placeholder = null,
  rootMargin = "200px",
  once = true,
  className,
}: LazyMountProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (mounted && once) return;
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setMounted(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setMounted(false);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, once, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : placeholder}
    </div>
  );
}


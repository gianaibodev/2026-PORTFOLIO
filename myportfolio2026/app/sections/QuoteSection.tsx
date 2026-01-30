"use client";

import dynamic from "next/dynamic";

const QuoteSectionComponent = dynamic(
    () => import("@/components/quote-section").then((mod) => ({ default: mod.QuoteSection })),
    { ssr: false, loading: () => <div className="h-[180px]" /> }
);

export function QuoteSection() {
    return (
        <section className="w-full relative z-10 py-12 overflow-visible">
            <QuoteSectionComponent />
        </section>
    );
}

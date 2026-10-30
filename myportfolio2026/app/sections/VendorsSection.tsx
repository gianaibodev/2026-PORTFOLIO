"use client";

import dynamic from "next/dynamic";

const LogoCloud = dynamic(
    () => import("@/components/ui/logo-cloud-4").then((mod) => ({ default: mod.LogoCloud })),
    { ssr: false, loading: () => <div className="h-[120px]" /> }
);

export function VendorsSection() {
    return (
        <section aria-label="Organizations" className="w-full py-12 relative z-10 overflow-visible">
            <LogoCloud
                logos={[
                    { src: "/framer/framer-19.png", alt: "Google" },
                    { src: "/framer/framer-18.png", alt: "Google Developer Groups" },
                    { src: "/framer/framer-04.png", alt: "Armada Brands" },
                    { src: "/framer/framer-13.png", alt: "Tigris Publication" },
                    { src: "/framer/framer-22.png", alt: "DEVCON Bacolod" },
                    { src: "/framer/framer-12.png", alt: "DreamTheory" },
                ]}
            />
        </section>
    );
}

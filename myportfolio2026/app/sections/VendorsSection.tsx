"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";

const LogoCloud = dynamic(
    () => import("@/components/ui/logo-cloud-4").then((mod) => ({ default: mod.LogoCloud })),
    { ssr: false, loading: () => <div className="h-[120px]" /> }
);

export function VendorsSection({ variants }: { variants: any }) {
    return (
        <section className="w-full py-12 relative z-10 overflow-visible">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants}>
                <LogoCloud
                    logos={[
                        { src: "/framer/framer-18.png", alt: "Google" },
                        { src: "/framer/framer-19.png", alt: "GDSC" },
                        { src: "/framer/framer-13.png", alt: "Armada Brands" },
                        { src: "/framer/framer-12.png", alt: "Tigris Publication" },
                        { src: "/framer/framer-22.png", alt: "DEVCON Ph" },
                        { src: "/framer/framer-04.png", alt: "Devcon" },
                    ]}
                />
            </m.div>
        </section>
    );
}

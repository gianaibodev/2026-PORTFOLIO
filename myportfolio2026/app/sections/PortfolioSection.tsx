"use client";

import dynamic from "next/dynamic";

const PortfolioGallery = dynamic(
    () => import("@/components/ui/portfolio-gallery").then((mod) => ({ default: mod.PortfolioGallery })),
    { ssr: false, loading: () => <div className="h-[320px]" /> }
);

export function PortfolioSection({ galleryImages }: { galleryImages: { src: string; alt: string; slug?: string }[] }) {
    return (
        <div id="projects" className="scroll-mt-24">
            <PortfolioGallery title="Featured Projects" archiveButton={{ text: "View All Projects", href: "/projects" }} images={galleryImages} />
        </div>
    );
}

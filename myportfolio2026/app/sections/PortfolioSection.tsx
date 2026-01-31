"use client";

import dynamic from "next/dynamic";
import { Deferred } from "@/components/deferred";

const PortfolioGallery = dynamic(
    () => import("@/components/ui/portfolio-gallery").then((mod) => ({ default: mod.PortfolioGallery })),
    { ssr: false, loading: () => <div className="h-[320px]" /> }
); // Imports might need adjustment if PortfolioGallery export changed, but based on recent view it's named export.

// Need GalleryImage type
export type GalleryImage = {
    src: string;
    alt: string;
    slug?: string;
};

export function PortfolioSection({ galleryImages }: { galleryImages: GalleryImage[] }) {
    return (
        <div id="projects" className="scroll-mt-24">
            <PortfolioGallery
                title="Featured Projects"
                archiveButton={{ text: "View All Projects", href: "/projects" }}
                images={galleryImages}
            />
        </div>
    );
}

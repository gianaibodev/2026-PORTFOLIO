"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { useCopyMode } from "@/components/copy-mode-provider";
import {
  HeroSection,
  QuoteSection,
  PortfolioSection,
  Interactive3DSection,
  CircularGallerySection,
  AboutSection,
  VendorsSection,
  ContactSection,
} from "./sections";

// Shared Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type GalleryImage = {
  src: string;
  alt: string;
  slug?: string;
};

export default function HomeClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  // useCopyMode likely used here only for global context if needed, but sections use it locally. 
  // Should check if it needs to be initialized here? The provider wraps the app likely.
  // Original file called useCopyMode hook, let's keep it just in case it initializes something.
  useCopyMode();

  return (
    <ErrorBoundary>
      <div className="w-full overflow-x-hidden flex flex-col gap-0 selection:bg-blue-500/30">
        <MacOSMenuBar />

        <HeroSection />
        <QuoteSection />
        <PortfolioSection galleryImages={galleryImages} />

        <Interactive3DSection variants={containerVariants} itemVariants={itemVariants} />

        <CircularGallerySection variants={containerVariants} itemVariants={itemVariants} />

        <AboutSection variants={containerVariants} itemVariants={itemVariants} />

        <VendorsSection variants={containerVariants} />

        <ContactSection variants={containerVariants} itemVariants={itemVariants} />
      </div>
    </ErrorBoundary>
  );
}

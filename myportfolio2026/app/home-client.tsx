"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { useCopyMode } from "@/components/copy-mode-provider";
import { LazyMount } from "@/components/lazy-mount";
import { HeroSection } from "./sections/HeroSection";
import { QuoteSection } from "./sections/QuoteSection";
import { PortfolioSection } from "./sections/PortfolioSection";

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

const Interactive3DSection = dynamic(() => import("./sections/Interactive3DSection").then((m) => m.Interactive3DSection), {
  ssr: false,
  loading: () => (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-16 relative z-10 overflow-visible">
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-sm">
        <div className="w-full h-[500px] bg-muted/10 rounded-2xl" />
      </div>
    </section>
  ),
});

const CircularGallerySection = dynamic(() => import("./sections/CircularGallerySection").then((m) => m.CircularGallerySection), {
  ssr: false,
  loading: () => (
    <section className="w-full py-24 relative z-10 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-muted/50" />
      </div>
    </section>
  ),
});

const AboutSection = dynamic(() => import("./sections/AboutSection").then((m) => m.AboutSection), {
  ssr: false,
  loading: () => (
    <section id="about" className="w-full py-16 relative z-10 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-[720px] rounded-[32px] bg-muted/10 border border-zinc-200 dark:border-zinc-800" />
      </div>
    </section>
  ),
});

const VendorsSection = dynamic(() => import("./sections/VendorsSection").then((m) => m.VendorsSection), {
  ssr: false,
  loading: () => (
    <section className="w-full py-12 relative z-10 overflow-visible">
      <div className="h-[120px]" />
    </section>
  ),
});

const ContactSection = dynamic(() => import("./sections/ContactSection").then((m) => m.ContactSection), {
  ssr: false,
  loading: () => (
    <section id="contact-redirect" className="w-full py-16 relative z-10 overflow-visible">
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-[360px] backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-12 shadow-lg" />
      </div>
    </section>
  ),
});

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

        <LazyMount
          rootMargin="300px"
          placeholder={
            <section className="w-full py-16 px-4 sm:px-6 lg:px-16 relative z-10 overflow-visible">
              <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-sm">
                <div className="w-full h-[500px] bg-muted/10 rounded-2xl" />
              </div>
            </section>
          }
        >
          <Interactive3DSection variants={containerVariants} itemVariants={itemVariants} />
        </LazyMount>

        <LazyMount
          rootMargin="300px"
          placeholder={
            <section className="w-full py-24 relative z-10 overflow-visible">
              <div className="max-w-7xl mx-auto px-4">
                <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-muted/50" />
              </div>
            </section>
          }
        >
          <CircularGallerySection variants={containerVariants} itemVariants={itemVariants} />
        </LazyMount>

        <LazyMount
          rootMargin="400px"
          placeholder={
            <section id="about" className="w-full py-16 relative z-10 overflow-visible">
              <div className="max-w-7xl mx-auto px-4">
                <div className="h-[720px] rounded-[32px] bg-muted/10 border border-zinc-200 dark:border-zinc-800" />
              </div>
            </section>
          }
        >
          <AboutSection variants={containerVariants} itemVariants={itemVariants} />
        </LazyMount>

        <LazyMount
          rootMargin="500px"
          placeholder={
            <section className="w-full py-12 relative z-10 overflow-visible">
              <div className="h-[120px]" />
            </section>
          }
        >
          <VendorsSection variants={containerVariants} />
        </LazyMount>

        <LazyMount
          rootMargin="600px"
          placeholder={
            <section id="contact-redirect" className="w-full py-16 relative z-10 overflow-visible">
              <div className="max-w-4xl mx-auto px-4">
                <div className="h-[360px] backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-12 shadow-lg" />
              </div>
            </section>
          }
        >
          <ContactSection variants={containerVariants} itemVariants={itemVariants} />
        </LazyMount>
      </div>
    </ErrorBoundary>
  );
}

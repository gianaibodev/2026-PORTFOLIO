import { getAllCaseStudies } from "@/content/case-studies";
import { ErrorBoundary } from "@/components/error-boundary";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { HeroSection } from "./sections/HeroSection";
import { FeaturedWorkSection } from "./sections/FeaturedWorkSection";
import { StatementSection } from "./sections/StatementSection";
import { Interactive3DSection } from "./sections/Interactive3DSection";
import { CircularGallerySection } from "./sections/CircularGallerySection";
import { AboutSection } from "./sections/AboutSection";
import { LogosSection } from "./sections/LogosSection";
import { ContactSection } from "./sections/ContactSection";

// The homepage selection, in display order. Change the work shown here.
const FEATURED_SLUGS = [
  "haff-leisure-club",
  "paddle-zone",
  "pullvault",
  "la-vida-2025-brand-system",
  "secrecy-gdgoc-2022",
  "jose-app-prototype",
];

export default function HomePage() {
  const studies = getAllCaseStudies();
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const study = studies.find((s) => s.slug === slug);
    if (!study) return [];
    return {
      slug: study.slug,
      title: study.title,
      category: study.category,
      year: study.year,
      image: study.heroImage,
    };
  });

  return (
    <ErrorBoundary>
      <div className="flex w-full flex-col overflow-x-clip selection:bg-blue-500/30">
        <MacOSMenuBar />
        <HeroSection />
        <FeaturedWorkSection projects={featured} />
        <StatementSection />
        <Interactive3DSection />
        <CircularGallerySection />
        <AboutSection />
        <LogosSection />
        <ContactSection />
      </div>
    </ErrorBoundary>
  );
}

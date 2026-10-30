import { getAllCaseStudies } from "@/content/case-studies";
import { ErrorBoundary } from "@/components/error-boundary";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { HeroSection } from "./sections/HeroSection";
import { WorkFanSection } from "./sections/WorkFanSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { DisciplineRails } from "./sections/DisciplineRails";
import { QuoteSection } from "./sections/QuoteSection";
import { Interactive3DSection } from "./sections/Interactive3DSection";
import { CircularGallerySection } from "./sections/CircularGallerySection";
import { AboutSection } from "./sections/AboutSection";
import { VendorsSection } from "./sections/VendorsSection";
import { ContactSection } from "./sections/ContactSection";

// The homepage selection, in display order. Change the work shown here.
const FEATURED_SLUGS = [
  "la-vida-2025-brand-system",
  "secrecy-gdgoc-2022",
  "jose-app-prototype",
  "devfest-2023-hosting",
  "the-capitol-party-branding",
  "haff-leisure-club",
  "paddle-zone",
  "skill-making",
  "techcare-gdgoc",
  "google-awards-2023",
];

// The fan under the hero: range across disciplines, none repeated in the grid.
const FAN_SLUGS = [
  "photo-manipulation-visual-direction",
  "valtara-elementals-quest",
  "devcon-bacolod-branding",
  "the-capitol-party-branding",
  "3d-works-2024",
  "armada-brands-internship",
  "vector-works-2020",
  "createx-usls-posters",
  "pizzaporia-ui-ux-overhaul",
];

export default function HomePage() {
  const studies = getAllCaseStudies();
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const study = studies.find((s) => s.slug === slug);
    if (!study) return [];
    return { src: study.heroImage, alt: study.title, slug: study.slug };
  });

  const fan = FAN_SLUGS.flatMap((slug) => {
    const study = studies.find((s) => s.slug === slug);
    return study ? { slug: study.slug, title: study.title, image: study.heroImage } : [];
  });

  return (
    <ErrorBoundary>
      <div className="flex w-full flex-col overflow-x-clip selection:bg-blue-500/30">
        <MacOSMenuBar />
        <HeroSection />
        <WorkFanSection projects={fan} />
        <PortfolioSection galleryImages={featured} />
        <DisciplineRails />
        <QuoteSection />
        <Interactive3DSection />
        <CircularGallerySection />
        <AboutSection />
        <VendorsSection />
        <ContactSection />
      </div>
    </ErrorBoundary>
  );
}

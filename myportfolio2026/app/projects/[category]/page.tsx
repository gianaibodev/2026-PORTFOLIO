"use client";

import { useEffect, useMemo, useState } from "react";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GitPullRequest, ExternalLink } from "lucide-react";
import { PixelHeader } from "@/components/ui/pixel-header";
import { ResponsiveImage } from "@/components/ui/responsive-image";

type ApiStudy = {
  slug: string;
  projectId: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  year: number;
  heroImage: string;
  roles: string[];
  tags: string[];
  metrics: string[];
  isOverviewOnly?: boolean;
  externalHref?: string;
  ctaLabel?: string;
};

type ApiCategory = {
  name: string;
  slug: string;
  studies: ApiStudy[];
};

// Simplified category type to avoid serialization issues
type SimplifiedCategory = {
  name: string;
  slug: string;
  studies: {
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    category: string;
    year: number;
    heroImage: string;
    roles: string[];
    tags: string[];
    metrics: string[];
    isOverviewOnly?: boolean;
    externalHref?: string;
    ctaLabel?: string;
  }[];
};

export default function CategoryPage() {
  const [mounted, setMounted] = useState(false);
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const params = useParams();
  const categorySlug = params.category as string;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        // Add timeout for mobile devices
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch("/api/case-studies/categories", {
          cache: "no-store",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = (await res.json()) as { categories?: ApiCategory[] };
        if (cancelled) return;
        setApiCategories(json.categories ?? []);
      } catch (e) {
        if (cancelled) return;
        if (e instanceof Error && e.name === "AbortError") {
          console.warn("Categories fetch timeout");
        } else {
          console.error("Error loading categories:", e);
        }
        setApiCategories([]);
      } finally {
        if (!cancelled) setDataReady(true);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Find & simplify after fetch
  const category = useMemo<SimplifiedCategory | undefined>(() => {
    const found = apiCategories.find((cat) => cat.slug === categorySlug);
    if (!found) return undefined;
    return {
      name: found.name,
      slug: found.slug,
      studies: found.studies.map((s) => ({
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        summary: s.summary,
        category: s.category,
        year: s.year,
        heroImage: s.heroImage,
        roles: [...s.roles],
        tags: [...s.tags],
        metrics: [...s.metrics],
        isOverviewOnly: s.isOverviewOnly,
        externalHref: s.externalHref,
        ctaLabel: s.ctaLabel,
      })),
    };
  }, [apiCategories, categorySlug]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !dataReady) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="w-full min-h-screen bg-background">
        <MacOSMenuBar appName="Not Found" />
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold">Folder not found</h1>
          <p className="text-muted-foreground mt-3">That category doesn&apos;t exist (or hasn&apos;t been published yet).</p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.03] px-6 py-3 text-foreground dark:text-white font-bold backdrop-blur-xl shadow-xl transition-all active:scale-95"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full min-h-screen bg-background">
        <MacOSMenuBar appName={category.name} />

        <PixelHeader
          title={category.name}
          subtitle="These are the hero projects that define this discipline. Skim the highlights here, then open a case study for the full breakdown."
          backLink={
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <span>← Back to all folders</span>
            </Link>
          }
        />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pb-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
            <div className="grid gap-6 sm:gap-8">
              {category.studies.map((study) => (
                <div
                  key={study.slug}
                  className="rounded-[24px] sm:rounded-[32px] border border-zinc-300 dark:border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-4 sm:p-6 md:p-8 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-[2fr,1fr]"
                >
                  <div className="space-y-3 sm:space-y-4 order-2 md:order-1">
                    <p className="text-xs text-muted-foreground">
                      {study.category} • {study.year}
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold break-words">{study.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground break-words">{study.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span key={tag} className="px-2 sm:px-3 py-1 rounded-full bg-white/10 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      {study.metrics.slice(0, 2).map((metric) => (
                        <span key={metric} className="break-words">{metric}</span>
                      ))}
                    </div>

                    {study.isOverviewOnly && study.externalHref ? (
                      <a
                        href={study.externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-500 dark:text-blue-300 font-semibold break-words group"
                      >
                        {study.ctaLabel || "Visit site"}
                        <ExternalLink className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <Link href={`/blog/${study.slug}`} className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-500 dark:text-blue-300 font-semibold break-words">
                        Read the case study →
                      </Link>
                    )}
                  </div>
                  <div className="space-y-3 sm:space-y-4 order-1 md:order-2">
                    <ResponsiveImage
                      src={study.heroImage}
                      alt={`${study.title} - ${study.category} project showcase image`}
                      className="w-full h-[300px] sm:h-[350px] md:h-[400px]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 400px"
                      cover={true}
                    />
                    <div className="rounded-xl sm:rounded-2xl border border-zinc-300 dark:border-white/10 p-3 sm:p-4 text-xs sm:text-sm space-y-2">
                      <p className="text-xs text-muted-foreground">Roles</p>
                      <p className="text-muted-foreground break-words">{study.roles.join(" • ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";
import { getAllCaseStudies, getCaseStudyCategories } from "@/content/case-studies";

export default function BlogPage() {
  const studies = getAllCaseStudies();
  const categories = getCaseStudyCategories().filter((category) => category.studies.length > 0);
  const featured = studies.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <MacOSMenuBar appName="Case Studies" />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 dark:bg-white/10 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkle className="w-4 h-4" />
            Case Studies
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-6 text-balance">
            Editorial-grade breakdowns of branding, product, and experience design.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Every project here is documented like a trillionaire web developer’s lab notebook—strategy,
            craft, operations, and impact stitched into one glassmorphic story.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/blog/${study.slug}`}
              className="group backdrop-blur-3xl bg-white/5 dark:bg-white/[0.03] border border-white/15 rounded-[28px] overflow-hidden transition-all hover:-translate-y-1 hover:border-white/30 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.8)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/80">{study.category}</p>
                  <p className="text-2xl font-semibold text-white mt-2">{study.title}</p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <span key={metric} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                      {metric}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-500 dark:text-blue-300 font-semibold">
                  Read case study <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-32">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.slug} id={category.slug} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground/80">{category.name}</p>
                  <h2 className="text-3xl md:text-4xl font-semibold mt-2">Highlighted work</h2>
                </div>
                <Link
                  href={`/projects/${category.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-muted-foreground hover:bg-white/10 transition-colors"
                >
                  View folder
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {category.studies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/blog/${study.slug}`}
                    className="group border border-white/10 rounded-3xl p-6 backdrop-blur-2xl bg-white/10 dark:bg-white/[0.02] hover:border-white/30 transition-all flex flex-col gap-6"
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={study.heroImage}
                        alt={study.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{study.category}</span>
                      <span>•</span>
                      <span>{study.year}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-semibold">{study.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{study.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 dark:text-blue-300">
                      Dive deeper <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";
import { getAllCaseStudies, getCaseStudyCategories } from "@/content/case-studies";

export default function BlogPage() {
  const studies = getAllCaseStudies();
  const categories = getCaseStudyCategories().filter((category) => category.studies.length > 0);
  const featured = studies.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <MacOSMenuBar appName="Case Studies" />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 dark:bg-white/10 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkle className="w-4 h-4" />
            Case Studies
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-6 text-balance">
            Editorial-grade breakdowns of branding, product, and experience design.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Every project here is documented like a trillionaire web developer’s lab notebook—strategy,
            craft, operations, and impact stitched into one glassmorphic story.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/blog/${study.slug}`}
              className="group backdrop-blur-3xl bg-white/5 dark:bg-white/[0.03] border border-white/15 rounded-[28px] overflow-hidden transition-all hover:-translate-y-1 hover:border-white/30 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.8)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/80">{study.category}</p>
                  <p className="text-2xl font-semibold text-white mt-2">{study.title}</p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <span key={metric} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                      {metric}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-500 dark:text-blue-300 font-semibold">
                  Read case study <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-32">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.slug} id={category.slug} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground/80">{category.name}</p>
                  <h2 className="text-3xl md:text-4xl font-semibold mt-2">Highlighted work</h2>
                </div>
                <Link
                  href={`/projects/${category.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-muted-foreground hover:bg-white/10 transition-colors"
                >
                  View folder
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {category.studies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/blog/${study.slug}`}
                    className="group border border-white/10 rounded-3xl p-6 backdrop-blur-2xl bg-white/10 dark:bg-white/[0.02] hover:border-white/30 transition-all flex flex-col gap-6"
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={study.heroImage}
                        alt={study.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{study.category}</span>
                      <span>•</span>
                      <span>{study.year}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-semibold">{study.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{study.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 dark:text-blue-300">
                      Dive deeper <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



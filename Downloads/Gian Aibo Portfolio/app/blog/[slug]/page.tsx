import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) {
    notFound();
  }

  const allStudies = getAllCaseStudies();
  const currentIndex = allStudies.findIndex((s) => s.slug === study.slug);
  const nextStudy = allStudies[(currentIndex + 1) % allStudies.length];

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <MacOSMenuBar appName={study.title} />

      <article className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all case studies
          </Link>

          <header className="space-y-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{study.category}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">{study.title}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">{study.summary}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Roles & Stack</h2>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {study.roles.map((role) => (
                    <span key={role} className="px-3 py-1 rounded-full bg-white/10">
                      {role}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                  {study.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Impact</h2>
                <ul className="space-y-2 text-muted-foreground">
                  {study.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
                {study.links?.length ? (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {study.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-500 dark:text-blue-300 font-semibold"
                      >
                        {link.label} <ExternalLink className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-2xl">
              <img
                src={study.heroImage}
                alt={study.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Year</p>
              <p className="text-3xl font-semibold">{study.year}</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Category</p>
              <p className="text-3xl font-semibold">{study.category}</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Deliverables</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {study.deliverables.map((item) => (
                  <li key={item} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {study.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[32px] border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-8 space-y-4"
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {section.highlights?.length ? (
                <div className="flex flex-wrap gap-3 pt-4">
                  {section.highlights.map((highlight) => (
                    <span key={highlight} className="px-4 py-2 rounded-full bg-white/10 text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {study.gallery.length > 0 ? (
            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Gallery</p>
                <h2 className="text-3xl font-semibold">Process visuals</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {study.gallery.map((image) => (
                  <div key={image} className="rounded-3xl overflow-hidden border border-white/10">
                    <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[32px] border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore next</p>
              <h3 className="text-2xl font-semibold mt-2">{nextStudy.title}</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">{nextStudy.summary}</p>
            </div>
            <Link
              href={`/blog/${nextStudy.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-blue-500 dark:text-blue-300 hover:bg-white/10 transition-colors"
            >
              Read the next case study <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}

import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) {
    notFound();
  }

  const allStudies = getAllCaseStudies();
  const currentIndex = allStudies.findIndex((s) => s.slug === study.slug);
  const nextStudy = allStudies[(currentIndex + 1) % allStudies.length];

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <MacOSMenuBar appName={study.title} />

      <article className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all case studies
          </Link>

          <header className="space-y-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{study.category}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">{study.title}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">{study.summary}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Roles & Stack</h2>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {study.roles.map((role) => (
                    <span key={role} className="px-3 py-1 rounded-full bg-white/10">
                      {role}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                  {study.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 rounded-full bg-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Impact</h2>
                <ul className="space-y-2 text-muted-foreground">
                  {study.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
                {study.links?.length ? (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {study.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-500 dark:text-blue-300 font-semibold"
                      >
                        {link.label} <ExternalLink className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-2xl">
              <img
                src={study.heroImage}
                alt={study.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Year</p>
              <p className="text-3xl font-semibold">{study.year}</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Category</p>
              <p className="text-3xl font-semibold">{study.category}</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Deliverables</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {study.deliverables.map((item) => (
                  <li key={item} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {study.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[32px] border border-white/10 backdrop-blur-2xl bg-white/3 dark:bg-white/[0.02] p-8 space-y-4"
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {section.highlights?.length ? (
                <div className="flex flex-wrap gap-3 pt-4">
                  {section.highlights.map((highlight) => (
                    <span key={highlight} className="px-4 py-2 rounded-full bg-white/10 text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {study.gallery.length > 0 ? (
            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Gallery</p>
                <h2 className="text-3xl font-semibold">Process visuals</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {study.gallery.map((image) => (
                  <div key={image} className="rounded-3xl overflow-hidden border border-white/10">
                    <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[32px] border border-white/10 backdrop-blur-2xl bg-white/3 dark:bg-white/[0.02] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore next</p>
              <h3 className="text-2xl font-semibold mt-2">{nextStudy.title}</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">{nextStudy.summary}</p>
            </div>
            <Link
              href={`/blog/${nextStudy.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-blue-500 dark:text-blue-300 hover:bg-white/10 transition-colors"
            >
              Read the next case study <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}



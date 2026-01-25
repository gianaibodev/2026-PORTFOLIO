"use client";

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { getCaseStudyCategories } from "@/content/case-studies";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

const categories = getCaseStudyCategories();

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = categories.find((cat) => cat.slug === categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName={category.name} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-24 pb-24">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
            ← Back to all folders
          </Link>
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Folder</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{category.name}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              These are the hero projects that define this discipline. Each card links to the full trillionaire-level case study with strategy,
              craft, and community impact spelled out.
            </p>
          </header>

          <div className="grid gap-8">
            {category.studies.map((study) => (
              <div
                key={study.slug}
                className="rounded-[32px] border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-8 grid gap-8 md:grid-cols-[2fr,1fr]"
              >
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {study.category} • {study.year}
                  </p>
                  <h2 className="text-3xl font-semibold">{study.title}</h2>
                  <p className="text-muted-foreground">{study.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${study.slug}`} className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-300 font-semibold">
                    Read the case study →
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl border border-white/10">
                    <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-2xl border border-white/10 p-4 text-sm space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Roles</p>
                    <p className="text-muted-foreground">{study.roles.join(" • ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}





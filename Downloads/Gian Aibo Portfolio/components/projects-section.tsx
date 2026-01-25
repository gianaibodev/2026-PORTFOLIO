"use client";

import { AnimatedFolder } from "@/components/ui/3d-folder";
import { getCaseStudyCategories, CaseStudyCategory } from "@/content/case-studies";
import { motion } from "framer-motion";

const categoryColors: Record<CaseStudyCategory, string> = {
  Branding: "hsl(217, 91%, 60%)",
  "UI/UX": "hsl(280, 85%, 65%)",
  Photography: "hsl(35, 90%, 60%)",
  "Community & Events": "hsl(162, 70%, 55%)",
  "Startups & Innovation": "hsl(4, 85%, 62%)",
  "Games & Experiments": "hsl(300, 65%, 58%)",
  Internships: "hsl(210, 25%, 70%)",
};

const categories = getCaseStudyCategories()
  .map((category) => ({
    title: category.name,
    slug: category.slug,
    color: categoryColors[category.name as CaseStudyCategory] ?? "hsl(217, 91%, 60%)",
    projects: category.studies.slice(0, 4).map((study) => ({
      id: study.projectId,
      image: study.heroImage,
      title: study.title,
    })),
  }))
  .filter((category) => category.projects.length > 0);

export function ProjectsSection() {
  return (
    <section id="all-projects" className="w-full py-12 sm:py-16 md:py-20 bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-120px" }}
          className="text-center space-y-4"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Folders</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">All projects by discipline</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Each folder pulls from the same case study canon—tap a card to skim highlights, then deep-dive the
            matching blog entry for cinematic details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-16">
          {categories.length > 0 ? (
            categories.map((folder) => (
              <div key={folder.slug} className="w-full flex justify-center">
                <AnimatedFolder title={folder.title} projects={folder.projects} color={folder.color} href={`/projects/${folder.slug}`} />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No projects found</p>
          )}
        </div>
      </div>
    </section>
  );
}





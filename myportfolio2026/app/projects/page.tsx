"use client";

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ProjectsSection } from "@/components/projects-section";
import { GitPullRequest } from "lucide-react";
import { PixelHeader } from "@/components/ui/pixel-header";

import { useCopyMode } from "@/components/copy-mode-provider";

export default function ProjectsPage() {
  const { copyMode } = useCopyMode();

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="Projects" />

      <PixelHeader
        title={copyMode === "plain" ? "Browse my work by category" : "All projects by discipline"}
        subtitle={copyMode === "plain"
          ? "Click a category to see my projects. Each one includes a summary, screenshots, and details."
          : "Each folder pulls from the same case study canon. Tap a card to skim highlights, then deep-dive the matching blog entry for cinematic details."}
        categoryIcon={<GitPullRequest className="size-4" />}
        categoryText="Project Archive"
      />

      <div className="py-12 pb-24">
        <ProjectsSection />
      </div>
    </div>
  );
}

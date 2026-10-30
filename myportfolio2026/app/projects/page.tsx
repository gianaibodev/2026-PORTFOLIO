import { caseStudyCategories, getAllCaseStudies } from "@/content/case-studies";
import { WorkIndex } from "@/components/work-index";
import ProjectsClient from "./projects-client";

export default function ProjectsPage() {
  const rank = (category: string) => caseStudyCategories.indexOf(category as (typeof caseStudyCategories)[number]);
  const studies = [...getAllCaseStudies()]
    .sort((a, b) => rank(a.category) - rank(b.category) || b.year - a.year)
    .map(({ slug, title, category, year, heroImage }) => ({ slug, title, category, year, heroImage }));

  return (
    <>
      <ProjectsClient />
      <WorkIndex studies={studies} />
    </>
  );
}

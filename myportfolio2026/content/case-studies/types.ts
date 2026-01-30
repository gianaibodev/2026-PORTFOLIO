import { z } from "zod";

export const caseStudyCategories = [
    "Branding",
    "UI/UX",
    "Web Development",
    "Photography",
    "Community & Events",
    "Startups & Innovation",
    "Games & Experiments",
    "Internships",
] as const;

export type CaseStudyCategory = (typeof caseStudyCategories)[number];

export const caseStudySectionSchema = z.object({
    title: z.string(),
    body: z.array(z.string()),
    highlights: z.array(z.string()).optional(),
    iframe: z
        .object({
            src: z.string(),
            title: z.string().optional(),
        })
        .optional(),
});

export const caseStudySchema = z.object({
    slug: z.string(),
    projectId: z.string(),
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    date: z.string(),
    year: z.number(),
    category: z.enum(caseStudyCategories),
    tags: z.array(z.string()),
    roles: z.array(z.string()),
    tools: z.array(z.string()),
    metrics: z.array(z.string()),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    deliverables: z.array(z.string()).default([]),
    links: z
        .array(
            z.object({
                label: z.string(),
                href: z.string(),
            }),
        )
        .optional(),
    sections: z.array(caseStudySectionSchema),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

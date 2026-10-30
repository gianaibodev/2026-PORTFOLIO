import { z } from "zod";

// Display order across /projects and /blog: design disciplines lead.
export const caseStudyCategories = [
    "Branding",
    "UI/UX",
    "3D Design",
    "Illustration",
    "Concepts",
    "Photography",
    "Games & Experiments",
    "Community & Events",
    "Internships",
    "Web Development",
    "AI & Machine Learning",
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

export const caseStudyFeatureSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z
        .enum(["zap", "shield", "smartphone", "users", "calendar", "gift", "book", "layers", "sparkles", "route", "puzzle", "monitor"])
        .default("sparkles"),
    size: z.enum(["normal", "wide", "tall", "hero"]).default("normal"),
    preview: z
        .enum([
            "court-status",
            "session-list",
            "phone-app",
            "rls-policy",
            "rewards-card",
            "events-list",
            "guide-checklist",
            "skill-router",
            "skill-file",
            "skill-list",
            "prompt-compare",
        ])
        .optional(),
    image: z.string().optional(),
    stat: z.string().optional(),
    kicker: z.string().optional(),
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
    features: z.array(caseStudyFeatureSchema).optional(),
    theme: z
        .object({
            accent: z.string(),
            surface: z.string(),
            tile: z.string(),
        })
        .optional(),
    sections: z.array(caseStudySectionSchema),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudyFeature = z.infer<typeof caseStudyFeatureSchema>;
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

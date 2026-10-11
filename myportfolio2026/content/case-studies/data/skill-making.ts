import { CaseStudy } from "../types";

export const skillMaking: CaseStudy = {
    slug: "skill-making",
    projectId: "skill-making",
    title: "Skill Making",
    subtitle: "Building custom skills for Claude",
    summary:
        "Designing and installing custom Claude skills that carry my design and build standards into every project, including a triage skill that picks the right design skill for a raw idea.",
    date: "2026-10-07",
    year: 2026,
    category: "AI & Machine Learning",
    tags: ["Claude Skills", "AI Workflow", "Automation", "Design Systems"],
    roles: ["Skill Author", "AI Workflow Designer"],
    tools: ["Claude", "Claude Code", "GitHub"],
    metrics: [
        "Custom triage skill routes each idea to the best-fit design skill",
    ],
    heroImage: "/projects/skill-making/hero.webp",
    gallery: [
        "/projects/skill-making/2.webp",
        "/projects/skill-making/3.webp",
    ],
    deliverables: [
        "Custom Claude skills",
        "A design-skill triage router",
    ],
    features: [
        {
            title: "Triage router",
            description: "frontend-skill-picker reads a raw idea and hands it to the best-fit design skill automatically.",
            icon: "route",
            preview: "skill-router",
            size: "hero",
        },
        {
            title: "Custom skills",
            description: "Skills written to carry my build and design standards into every project.",
            icon: "puzzle",
            preview: "skill-file",
            size: "normal",
        },
        {
            title: "Installed and tested",
            description: "Design skills from GitHub, including impeccable, huashu-design and taste-skill, used on real projects.",
            icon: "layers",
            preview: "skill-list",
            size: "normal",
        },
        {
            title: "Reusable standards",
            description: "Every request starts from my way of working, not a blank prompt.",
            icon: "sparkles",
            preview: "prompt-compare",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "Why Skills",
            body: [
                "Skills package how I want work done, so a request starts from my standards instead of a blank prompt. I install frontend design skills from GitHub and write my own where nothing fits.",
            ],
            highlights: ["Reusable standards", "Installed and tested", "Written to fit"],
        },
        {
            title: "The Triage Router",
            body: [
                "With several design skills installed, choosing the right one became its own step. frontend-skill-picker reads a raw idea and hands it to the best-fit skill automatically.",
            ],
            highlights: ["Automatic skill selection", "Less prompt overhead"],
        },
    ],
};

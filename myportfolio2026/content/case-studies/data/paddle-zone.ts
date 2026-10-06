import { CaseStudy } from "../types";

export const paddleZone: CaseStudy = {
    slug: "paddle-zone",
    projectId: "paddle-zone",
    title: "Paddle Zone",
    subtitle: "Loyalty and events for a pickleball venue",
    summary:
        "A venue app for Paddle Zone, extended with a loyalty system and events, set up side by side with the venue owner so the rewards match how the venue actually runs.",
    date: "2026-10-06",
    year: 2026,
    category: "Web Development",
    tags: ["Loyalty System", "Events", "Venue App", "Client Work"],
    roles: ["Full-Stack Developer", "Client Collaboration"],
    tools: ["Next.js", "Supabase", "Vercel"],
    metrics: [
        "Loyalty rules configured live with the venue owner",
        "Owner guide written from the app's real code, not assumptions",
    ],
    heroImage: "/projects/paddle-zone/hero.webp",
    gallery: [
        "/projects/paddle-zone/2.webp",
        "/projects/paddle-zone/3.webp",
    ],
    deliverables: [
        "Loyalty system setup",
        "Events setup",
        "How-to-use guide for the venue owner",
    ],
    features: [
        {
            title: "Loyalty rewards",
            description: "A points and rewards system set up around how the venue actually runs.",
            icon: "gift",
            preview: "rewards-card",
            size: "hero",
        },
        {
            title: "Events",
            description: "Events set up inside the app for the venue owner to run.",
            icon: "calendar",
            preview: "events-list",
            size: "wide",
        },
        {
            title: "Guide from the real code",
            description: "The owner guide follows what the app really does, not generic assumptions.",
            icon: "book",
            preview: "guide-checklist",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "The Brief",
            body: [
                "Paddle Zone is a pickleball venue that wanted regulars to be rewarded and events to be easy to run. The work was to set up a loyalty system and events inside the venue's app.",
                "I set it up beside the venue owner, so every rule was decided and tested with the person who runs the floor.",
            ],
            highlights: ["Loyalty system", "Events", "Built with the owner"],
        },
        {
            title: "Documentation That Matches the Code",
            body: [
                "The owner guide for the app is written from the app's actual code rather than generic loyalty-program assumptions, so each step in it does what the screen really does.",
            ],
            highlights: ["Code-accurate guide", "Owner-ready walkthrough"],
        },
    ],
};

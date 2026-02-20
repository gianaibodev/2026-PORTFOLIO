import { CaseStudy } from "../types";

export const threeDWorks: CaseStudy = {
    slug: "3d-works-2024",
    projectId: "3d-works",
    title: "3D WORKS — 2024",
    subtitle: "Exploring Dimension, Materiality, and Light",
    summary:
        "A collection of 3D explorations created throughout 2024, focusing on abstract forms, realistic materials, and dynamic lighting setups. This series experiments with the intersection of technology and organic aesthetics.",
    date: "2024-12-01",
    year: 2024,
    category: "3D Design",
    tags: ["3D Modeling", "Rendering", "Abstract", "CGI"],
    roles: ["3D Artist", "Creative Director"],
    tools: ["Blender", "Octane Render", "Cinema 4D"],
    metrics: [
        "15+ Unique render compositions",
        "Experimental light-path tracing",
        "Material study on translucency and refraction",
    ],
    heroImage: "/projects/3d-works/hero.webp",
    gallery: [
        "/projects/3d-works/hero.webp",
        "/projects/3d-works/2.webp",
        "/projects/3d-works/3.webp",
    ],
    deliverables: ["High-Resolution Renders", "Motion Loops", "Material Library"],
    links: [
        { label: "View on Behance", href: "https://www.behance.net/gallery/231638657/3D-WORKS-2024" }
    ],
    sections: [
        {
            title: "Concept: Abstract Materiality",
            body: [
                "The 2024 series explores the visceral quality of digital materials. By pushing the boundaries of sub-surface scattering and complex refraction, these works seek to create objects that feel tactile and physically present.",
                "Each render is a study in how light interacts with geometry, utilizing global illumination and physical sky models to achieve cinematic realism within abstract compositions.",
            ],
            highlights: [
                "Complex Shading Networks",
                "Cinematic Lighting",
                "Conceptual Geometry",
            ],
        },
    ],
};

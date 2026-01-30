import { CaseStudy } from "../types";

export const portfolio2026: CaseStudy = {
    slug: "portfolio-2026-making-of",
    projectId: "portfolio-2026",
    title: "THE MAKING OF GIAN AIBO 2026",
    subtitle: "Designing a World-Class Digital Experience",
    summary:
        "A meta-study on the engineering and design choices behind this very website. Combining Next.js 16, custom GLSL shaders, and MacOS-inspired glassmorphism to create a high-end digital experience that pushes the boundaries of traditional portfolio design.",
    date: "2025-12-23",
    year: 2025,
    category: "UI/UX",
    tags: ["Technical Lead", "GLSL Shaders", "Next.js 16", "Apple Design"],
    roles: ["Architect", "Shader Artist", "Lead Developer"],
    tools: ["React 19", "Three.js", "Framer Motion", "GSAP", "PostCSS 4"],
    metrics: [
        "Real-time GPU-based theme switching",
        "Interactive 3D folder navigation system",
        "Zero-flash theme persistence using sessionStorage",
        "Sub-100ms interaction latency across all WebGL nodes",
    ],
    heroImage: "/portfolio-screenshots/hero-desktop.jpg",
    gallery: [
        "/portfolio-screenshots/hero-mobile.jpg",
        "/portfolio-screenshots/projects-page.jpg",
        "/portfolio-screenshots/blog-page.jpg",
        "/portfolio-screenshots/case-study-detail.jpg",
    ],
    deliverables: [
        "Custom WebGL 2.0 Loader",
        "Theme-Interpolating Fragment Shader",
        "MacOS Control Center Mobile UI",
        "Dynamic Case Study Engine",
    ],
    sections: [
        {
            title: "The Vision: Beyond the Grid",
            body: [
                "Standard portfolios are grids. This is an environment. I wanted to build a digital workspace that felt like an extension of the MacOS philosophy—clean, functional, and imbued with 'silent chaos.'",
                "The core challenge was balancing heavy WebGL processing with SEO-optimized React content. I utilized Next.js 16's server-first approach to ensure the 'editorial' content remains crawlable, while layering client-side interactive nodes for the visual flare.",
            ],
            highlights: [
                "Apple-inspired Glassmorphism",
                "GPU-accelerated Layouts",
                "Editorial Typography",
            ],
        },
        {
            title: "The Visuals: GPU-Native Storytelling",
            body: [
                "The Hero section isn't just an image—it's a real-time GPU calculation. I wrote an Adaptive Wave Shader that doesn't just change color when you toggle Light/Dark mode; it interpolates the noise vectors and lighting values within the fragment shader to ensure a seamless transition.",
                "The LightSpeed loader (created by @atzedent and refined for this project) utilizes WebGL 2.0 to create a warp-speed entrance, setting the tone for a high-performance visit.",
            ],
            highlights: [
                "Custom Fragment Shaders",
                "Real-time Theme Interpolation",
                "LightSpeed WebGL Entry",
            ],
        },
        {
            title: "The Interaction: Physics & Tactility",
            body: [
                "Navigation is handled by a custom MacOS-style menu bar, complete with a functional Clock and a mobile-exclusive Control Center. I replaced traditional buttons with high-end glass nodes that respond to user mouse movements via a global Canvas mouse-trail system.",
                "The 'Projects' loading state is a custom Particle Field. It's not just a spinner; it's a playground. By holding the Spacebar (or long-pressing on mobile), users can pause the progress and manipulate the particles, turning a moment of 'waiting' into a moment of 'play.'",
            ],
            highlights: [
                "Holding Space to Play",
                "Particle Physics Canvas",
                "MacOS Control Center UI",
            ],
        },
        {
            title: "The Stack: 2026 Ready",
            body: [
                "Technically, the site is a powerhouse. It uses React 19 for the UI, Framer Motion for the physics, and GSAP for the timeline orchestration. Every asset is optimized via Next.js Image, and every interaction is monitored by Error Boundaries to ensure resilience against GPU failures.",
                "This website serves as a living document of my capabilities—merging code-driven engineering with designer-grade artistry.",
            ],
            highlights: [
                "React 19 & Next.js 16",
                "GSAP Timeline Orchestration",
                "Resilient Error Boundaries",
            ],
        },
    ],
};

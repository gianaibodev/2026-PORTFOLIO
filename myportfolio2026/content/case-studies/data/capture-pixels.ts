import { CaseStudy } from "../types";

export const capturePixels: CaseStudy = {
    slug: "capture-pixels-photography-portfolio",
    projectId: "capture-pixels",
    title: "Capture Pixels — Photography Portfolio Platform",
    subtitle: "Engineering a Cinematic 3D Photography Ecosystem",
    summary:
        "A high-performance, full-stack photography portfolio designed to push the boundaries of modern web aesthetics. Built with Next.js 16 and React 19, the platform shifts away from static galleries toward a physics-based, interactive media experience.\n\nIt serves as a professional showcase that combines cutting-edge 3D mathematics with a robust, custom-built Content Management System (CMS).",
    date: "2025-12-15",
    year: 2025,
    category: "Web Development",
    tags: ["Next.js", "React 19", "3D Graphics", "CMS", "Supabase", "Full-Stack"],
    roles: ["Full-Stack Developer", "UI/UX Designer", "Frontend Engineer"],
    tools: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "Framer Motion 12",
        "Supabase (PostgreSQL)",
        "Radix UI",
        "shadcn/ui",
        "Vercel",
    ],
    metrics: [
        "60fps 3D animations provide premium 'luxury' feel",
        "Zero-friction content management workflow for non-technical users",
        "Instant revalidation ensures global updates within milliseconds",
        "High-performance Core Web Vitals (LCP/CLS) maintained",
        "Secure admin dashboard with HTTP-only cookies and middleware protection",
    ],
    heroImage: "/lib/96shots_so.png",
    gallery: [
        "/lib/96shots_so.png",
        "/lib/638shots_so.png",
        "/lib/217shots_so.png",
        "/lib/724shots_so.png",
        "/lib/953shots_so.png",
    ],
    deliverables: [
        "Scroll-Expand Hero with physics-based transitions",
        "3D Cylindrical Carousel with momentum physics",
        "3D Sphere Image Grid using Fibonacci distribution",
        "Custom Admin Dashboard & CMS with full CRUD",
        "Spring-Physics Custom Cursor",
        "Spotlight Glow Effects with real-time cursor tracking",
    ],
    sections: [
        {
            title: "Executive Summary",
            body: [
                "The mission was to create a digital gallery that mirrors the premium quality of high-end photography through cinematic motion and 3D spatial interfaces. The innovation centers on developing a proprietary 3D Sphere Image Grid using Fibonacci distribution and a Cylindrical Carousel driven by custom momentum physics.",
                "The core impact achieved is a 'Zero-Friction' content management workflow, allowing non-technical users to update complex 3D galleries in real-time via a secure admin dashboard. This shifts the platform away from static galleries toward a physics-based, interactive media experience.",
            ],
            highlights: [
                "Cinematic motion and 3D spatial interfaces",
                "Proprietary Fibonacci sphere distribution algorithm",
                "Zero-friction content management workflow",
            ],
        },
        {
            title: "Problem Statement: The 'Static Portfolio' Crisis",
            body: [
                "Standard photography portfolios often suffer from three major issues. First, passive UX: typical grids feel repetitive and fail to capture the user's attention in a crowded digital market. This makes it difficult for photographers to stand out and engage viewers.",
                "Second, performance vs. visuals: high-resolution images often lead to poor Core Web Vitals (LCP/CLS), resulting in a sluggish experience. Many portfolios sacrifice either image quality or loading speed, but rarely achieve both.",
                "Third, CMS rigidity: most 'beautiful' sites are hardcoded. Changing a single image often requires developer intervention, making it difficult for photographers to keep their work current. This creates a barrier between the photographer and their own portfolio.",
            ],
            highlights: [
                "Passive UX fails to engage users",
                "Performance vs. visual quality trade-offs",
                "Hardcoded sites require developer intervention",
            ],
        },
        {
            title: "The Solution: Physics-Based Visual Engineering",
            body: [
                "I architected Capture Pixels as a 'living' document where every interaction feels tactile and responsive. The platform combines cutting-edge 3D mathematics with a robust, custom-built Content Management System.",
            ],
            highlights: [
                "Tactile and responsive interactions",
                "3D mathematics integration",
                "Custom-built CMS",
            ],
        },
        {
            title: "3D Spatial Interfaces: The Mathematics of UI",
            body: [
                "Instead of a random cluster, I implemented a mathematical algorithm to distribute images evenly across a virtual 3D sphere. The Fibonacci Sphere Distribution ensures no overlaps and a perfectly symmetrical rotation regardless of the number of items. This creates a visually balanced and mathematically precise layout.",
                "Both the 3D Sphere and the Cylindrical Carousel use a custom-coded physics engine. Using velocity-based decay, the interface continues to rotate naturally after a user 'flicks' the screen, mimicking real-world inertia. This creates a natural, tactile feeling that responds to user input with realistic motion.",
            ],
            highlights: [
                "Fibonacci sphere distribution algorithm",
                "Custom momentum physics engine",
                "Velocity-based decay for natural motion",
            ],
        },
        {
            title: "Cinematic Scroll Orchestration",
            body: [
                "Using Framer Motion 12, I engineered a Scroll-Expand Hero section that expands from a centered container to a full-screen cinematic view based on scroll depth. This creates a dramatic, editorial-style reveal that draws users into the content.",
                "This is paired with 'Text-Splitting' logic that animates individual characters with mix-blend-mode for a high-end fashion editorial feel. The combination creates a premium, cinematic experience that elevates the perceived quality of the photography work.",
            ],
            highlights: [
                "Scroll-triggered full-screen expansion",
                "Text-splitting with mix-blend-mode",
                "Editorial-style cinematic reveals",
            ],
        },
        {
            title: "The 'Headless' Admin Engine",
            body: [
                "I utilized Next.js Server Actions to build a secure CRUD (Create, Read, Update, Delete) system. This allows photographers to manage projects, testimonials, and gallery content without needing to edit code or understand technical systems.",
                "When an image is uploaded to the Supabase backend, the site uses revalidatePath to clear the server cache globally. This ensures the 3D galleries update for all users within milliseconds of the admin's action, creating a seamless content management experience.",
                "Security is implemented through HTTP-only cookies and middleware-based route protection. The custom middleware intercepts every request to the /admin route, verifying the session on the server-side before rendering a single pixel of the dashboard. This mitigates XSS (Cross-Site Scripting) risks and ensures administrative data remains private.",
            ],
            highlights: [
                "Next.js Server Actions for secure CRUD",
                "Instant global cache revalidation",
                "HTTP-only cookies and middleware protection",
            ],
        },
        {
            title: "SWOT Analysis",
            body: [
                "Strengths include high fidelity 60fps 3D animations that provide a premium 'luxury' feel, a modern stack using the latest React 19 features (Actions, Use, etc.), and a full CMS that provides complete independence from code for content updates.",
                "Weaknesses include GPU load from heavy 3D calculations that can drain battery on older mobile devices, and complexity where mathematical algorithms require deep maintenance knowledge.",
                "Opportunities include VR/AR port where 3D logic is pre-optimized for future WebXR integration, and AI curation for future integration of AI-based image tagging and sorting.",
                "Threats include browser compatibility where some advanced CSS 3D transforms vary by engine, and platform bloat where adding too many 3D elements could impact LCP (Largest Contentful Paint).",
            ],
            highlights: [
                "High-fidelity 60fps animations",
                "GPU load considerations for mobile",
                "Future VR/AR integration potential",
                "Browser compatibility challenges",
            ],
        },
        {
            title: "Technical Implementation: Deep Dive",
            body: [
                "The physics engine uses natural motion that isn't just CSS transitions. I used a RequestAnimationFrame loop to track pointer velocity (how fast the user moves their mouse or finger), spring damping (a friction coefficient that gradually slows the rotation), and boundary logic (collision detection that keeps the 3D elements within the viewport limits).",
                "Security and authentication are implemented through HTTP-only cookies that cannot be accessed by client-side scripts, mitigating XSS risks. A custom middleware protection layer intercepts every request to the /admin route, verifying the session on the server-side before rendering a single pixel of the dashboard.",
            ],
            highlights: [
                "RequestAnimationFrame physics loop",
                "Pointer velocity and spring damping",
                "HTTP-only cookies for security",
                "Server-side session verification",
            ],
        },
        {
            title: "Results & Conclusion",
            body: [
                "Capture Pixels stands as a benchmark for what is possible with modern web technologies. It proves that high-resolution media and complex 3D graphics can coexist with high performance.",
                "Zero-lag navigation was achieved through efficient re-renders with React.memo, ensuring smooth interactions even with complex visual effects. The photographer can now manage five different 3D sections through one unified interface, creating scalable content management.",
                "The site's technical sophistication directly translates to the professional perceived value of the photography work displayed. The platform elevates the brand by demonstrating that advanced visual effects don't have to come at the cost of performance or usability.",
            ],
            highlights: [
                "Zero-lag navigation with React.memo",
                "Scalable content management",
                "Brand elevation through technical sophistication",
            ],
        },
    ],
};

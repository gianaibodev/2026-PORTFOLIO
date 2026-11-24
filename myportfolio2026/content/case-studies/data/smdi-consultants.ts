import { CaseStudy } from "../types";

export const smdiConsultants: CaseStudy = {
    slug: "smdi-consultants-website",
    projectId: "smdi-consultants",
    title: "SMDI Consultants",
    subtitle: "Delivered client project: company website and custom CMS, built 1:1 from a Figma design and running on Cloudflare",
    summary:
        "A delivered client project for SMDI Consultants: a responsive company website built 1:1 from a Figma design, with a custom content management system so the team updates the site without a developer. Signed off in November 2026 and running on Cloudflare Workers with D1 and KV.",
    date: "2026-11-21",
    year: 2026,
    category: "Web Development",
    tags: ["Next.js", "CMS", "Figma to Code", "Cloudflare"],
    roles: ["Full-Stack Developer"],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Zod", "Cloudflare Workers", "D1", "KV"],
    metrics: [
        "Six pages built 1:1 from Figma, with a full mobile layout",
        "Admin forms generated from one schema",
        "Moved from Vercel and Postgres to Cloudflare Workers, D1 and KV",
    ],
    heroImage: "/projects/smdi-consultants/hero.jpg",
    gallery: [],
    links: [{ label: "Open the live site", href: "https://smdi-website.gianaibo-dev.workers.dev" }],
    deliverables: [
        "Public site: Home, Solutions, Consulting, Projects, About us and Contact us",
        "Admin for page content, navigation, projects, news, media and enquiries",
    ],
    sections: [
        {
            title: "The Problem",
            body: [
                "A company website goes stale when every small text change needs a developer. The site had to match the Figma design closely, and the team still had to be able to edit it themselves.",
            ],
            highlights: ["Match the Figma design", "Editable without a developer"],
        },
        {
            title: "What I Built",
            body: [
                "Each page is a JSON document validated by a Zod schema. The admin form is generated from that schema, so adding an editable field is a one-line change and the editor updates by itself.",
                "Default copy and imagery come straight from the Figma file, so the first version of the site matches the design before anyone edits it.",
            ],
            highlights: ["Schema-driven admin forms", "Zod as the single source of truth", "Next.js App Router"],
        },
        {
            title: "Access and Security",
            body: [
                "The admin uses a single login with a bcrypt password and a signed httpOnly session cookie, and a route guard protects the admin pages and APIs. The database is reached only from the Worker, so nothing in the browser can touch it directly.",
            ],
            highlights: ["Signed httpOnly session", "Route guard on /admin", "Database only behind the Worker"],
        },
        {
            title: "Delivery and Hosting",
            body: [
                "The client signed off in November 2026. Before handover the site moved from Vercel, Supabase Postgres and Blob storage to Cloudflare: the Next.js app runs on a Worker through OpenNext, content lives in a D1 database, and media sits in KV.",
                "The company video on the About page streams from KV with range requests, so it seeks and plays full screen like any hosted video. The last pass added skeleton loading screens, a drag-and-spring photo strip and lightbox, and micro-interactions with no drop shadows.",
            ],
            highlights: ["Cloudflare Workers + OpenNext", "D1 and KV", "Video with range requests"],
        },
    ],
};

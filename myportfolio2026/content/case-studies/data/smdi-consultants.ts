import { CaseStudy } from "../types";

export const smdiConsultants: CaseStudy = {
    slug: "smdi-consultants-website",
    projectId: "smdi-consultants",
    title: "SMDI Consultants",
    subtitle: "Client proposal: company website and custom CMS, built 1:1 from a Figma design",
    summary:
        "A client proposal for SMDI Consultants: a responsive company website built 1:1 from a Figma design, with a custom content management system designed so a team can update the site without a developer.",
    date: "2026-09-17",
    year: 2026,
    category: "Web Development",
    tags: ["Next.js", "CMS", "Figma to Code", "PostgreSQL"],
    roles: ["Full-Stack Developer"],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Zod", "Vercel"],
    metrics: [
        "Six pages built 1:1 from Figma, with a full mobile layout",
        "Admin forms generated from one schema",
        "Row Level Security on every table",
    ],
    heroImage: "/projects/smdi-consultants/hero.jpg",
    gallery: [],
    links: [{ label: "Open the proposal site", href: "https://smdi-website.vercel.app" }],
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
                "The admin uses a single login with a bcrypt password and a signed httpOnly session cookie, and a route guard protects the admin pages and APIs. The app connects as a dedicated database role, and every table has Row Level Security enabled.",
            ],
            highlights: ["Signed httpOnly session", "Route guard on /admin", "Row Level Security"],
        },
        {
            title: "What I Would Add Next",
            body: ["Automated tests for the content schemas and the admin routes."],
        },
    ],
};

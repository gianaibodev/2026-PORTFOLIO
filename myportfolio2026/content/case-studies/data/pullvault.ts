import { CaseStudy } from "../types";

export const pullvault: CaseStudy = {
    slug: "pullvault",
    projectId: "pullvault",
    title: "PullVault",
    subtitle: "A digital pack storefront backed by real collectible inventory",
    summary:
        "A mobile-first storefront where collectors open digital packs, with every result drawn from real physical stock. The server decides each pull, then the app plays the reveal. Collectors keep the card in their Vault, sell it back for wallet credit or have it shipped.",
    date: "2026-10-06",
    year: 2026,
    category: "Web Development",
    tags: ["React", "Express", "Prisma", "Postgres", "E-commerce"],
    roles: ["Full-Stack Developer", "Product Design"],
    tools: ["React 19", "Vite", "Tailwind CSS", "Express", "Prisma", "PostgreSQL", "Framer Motion", "Zod"],
    metrics: [
        "Pull result decided on the server before the reveal plays",
        "Race-safe purchases: stock, wallet and card claim in one transaction",
        "Pack odds stored as one value and enforced in the API and the database",
    ],
    heroImage: "/projects/pullvault/hero.webp",
    gallery: [
        "/projects/pullvault/2.webp",
        "/projects/pullvault/3.webp",
    ],
    deliverables: [
        "Mobile-first storefront: packs, reveal, Vault, wallet",
        "Missions, streaks and leaderboard",
        "Admin console: inventory, packs, shipping, users and audit log",
        "Express API with server-side authorization",
        "Postgres schema with database-level constraints",
    ],
    theme: { accent: "#F2B544", surface: "#090C13", tile: "#10151F" },
    sections: [
        {
            title: "The Product",
            body: [
                "PullVault is built for collectors who want the excitement of opening a pack with the confidence that the cards are real. Every pack maps to physical inventory, and every card ends up in the collector's Vault where they can keep it, sell it back for wallet credit or request shipping.",
                "The interface is mobile-first, with a bottom navigation, large touch targets and the wallet always visible. The reveal is the one dramatic moment, and the rest of the app stays calm and fast.",
            ],
            highlights: ["Real inventory", "Keep, sell back or ship", "Mobile-first"],
        },
        {
            title: "Transparent by Design",
            body: [
                "The odds a pack displays are the same value the server rolls against. That single value is validated to total 100% in the API and again by a database constraint, so the app can never show one set of odds and use another.",
                "The pull is committed on the server before any animation runs. The reveal replays a result that already exists, and every screen shows odds, remaining stock and ledger history.",
            ],
            highlights: ["One source of odds", "Server-side pulls", "Visible ledger"],
        },
        {
            title: "Built to Be Race-Safe",
            body: [
                "Buying a pack touches stock, the wallet, vouchers and the card claim at once. All four are conditional writes inside one transaction, so two buyers can never be sold the same card and a balance can never be spent twice.",
                "Authorization lives entirely on the server. The browser talks to the API with an httpOnly session cookie, there is no database client or key in the bundle, and each query checks ownership in its own WHERE clause.",
            ],
            highlights: ["Single transaction", "httpOnly sessions", "Ownership checks in queries"],
        },
        {
            title: "Retention and Operations",
            body: [
                "Missions, streaks and a leaderboard bring collectors back, and rewards pay out as free-pack vouchers rather than wallet credit.",
                "An admin console covers inventory with photo upload, packs, missions, pulls, shipping, users and an audit log. Every animation, including the reveal, has a reduced-motion alternative and a skip control.",
            ],
            highlights: ["Missions and streaks", "Admin console", "Reduced-motion support"],
        },
    ],
};

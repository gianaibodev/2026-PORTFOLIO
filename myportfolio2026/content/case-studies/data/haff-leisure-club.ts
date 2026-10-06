import { CaseStudy } from "../types";

export const haffLeisureClub: CaseStudy = {
    slug: "haff-leisure-club",
    projectId: "haff-leisure-club",
    title: "Haff Leisure Club",
    subtitle: "A live club platform for pickleball and leisure",
    summary:
        "A full-stack web platform for a leisure and pickleball club, built with Next.js and Supabase and deployed on Vercel. It runs live court and session status for players, admins and lobby TV displays, and was hardened after two real production incidents.",
    date: "2026-09-28",
    year: 2026,
    category: "Web Development",
    tags: ["Next.js", "Supabase", "Realtime", "Security"],
    roles: ["Full-Stack Developer", "Product Design"],
    tools: ["Next.js", "Supabase", "Supabase Realtime", "Vercel", "PWA"],
    metrics: [
        "Live status moved from polling to Supabase Realtime",
        "Row Level Security locked down after a data-tampering incident",
        "Rate-limited club-state endpoint after a usage-cap outage",
    ],
    heroImage: "/projects/haff-leisure-club/hero.webp",
    gallery: [
        "/projects/haff-leisure-club/2.webp",
        "/projects/haff-leisure-club/3.webp",
    ],
    deliverables: [
        "Player and session management",
        "Live club status for TV displays and admin phones",
        "Installable PWA",
        "Admin tools with server-side authorization",
    ],
    features: [
        {
            title: "Live court status",
            description: "Supabase Realtime pushes club status to lobby TVs and admin phones the moment it changes, with no constant polling.",
            icon: "zap",
            preview: "court-status",
            size: "hero",
        },
        {
            title: "Player & session management",
            description: "Players, sessions and courts managed in one place.",
            icon: "users",
            preview: "session-list",
            size: "normal",
        },
        {
            title: "Installable PWA",
            description: "Staff keep it on their home screen like a native app.",
            icon: "smartphone",
            preview: "phone-app",
            size: "normal",
        },
        {
            title: "Locked-down data",
            description: "RLS policies, server-side checks and admin write tokens protect every write.",
            icon: "shield",
            preview: "rls-policy",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "The Platform",
            body: [
                "Haff Leisure Club is the web app a pickleball and leisure club runs on day to day. Players, sessions and court status live in one place, with a public display for the lobby TV and a phone-friendly view for staff.",
                "It is built with Next.js and Supabase, deployed on Vercel, and installable as a PWA so staff can keep it on their home screen.",
            ],
            highlights: ["Next.js + Supabase", "Vercel deployment", "Installable PWA"],
        },
        {
            title: "Incident 1: Open Write Access",
            body: [
                "In June 2026 a Supabase Row Level Security policy turned out to be too permissive. The publishable key is public by design, so the policy was the only thing protecting the data, and anonymous users could update Player and Session rows straight from the browser DevTools.",
                "The fix was a full lockdown: tightened RLS policies, server-side authorization checks, admin write tokens, and removing anonymous write permissions.",
            ],
            highlights: ["RLS policy lockdown", "Server-side auth checks", "Admin write tokens"],
        },
        {
            title: "Incident 2: The Usage-Cap Outage",
            body: [
                "Also in June 2026 the app hit 1.7M requests against the 1M cap on Vercel's Hobby tier. TV displays, admin phones and cached PWA tabs were all polling the club-state endpoint every 30 to 60 seconds, and old domains were still serving outdated polling bundles.",
                "Live status moved to Supabase Realtime, the endpoint was rate-limited, PWA clients were forced to refresh, and the legacy domain aliases were retired.",
            ],
            highlights: ["Polling replaced by Realtime", "Rate limiting", "Legacy domains decommissioned"],
        },
    ],
};

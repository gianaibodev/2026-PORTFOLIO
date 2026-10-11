import { CaseStudy } from "../types";

export const haffLeisureClub: CaseStudy = {
    slug: "haff-leisure-club",
    projectId: "haff-leisure-club",
    title: "Haff Leisure Club",
    subtitle: "Open Play queue, court timers and a TV board for a pickleball club",
    summary:
        "The web app a pickleball club uses on the floor. Players check in and join a queue of stacks, courts run on server-side timers, and a TV board shows who is on, who is next and how long the wait is.",
    date: "2026-09-28",
    year: 2026,
    category: "Web Development",
    tags: ["React", "Supabase", "Realtime", "Open Play"],
    roles: ["Full-Stack Developer", "Product Design"],
    tools: ["React", "Vite", "TypeScript", "Supabase", "Framer Motion", "Vercel"],
    metrics: [
        "Three courts, one queue, one shared game clock",
        "Court release and next-stack seating handled on the server",
        "Admin-created accounts with Row Level Security on every table",
    ],
    heroImage: "/projects/haff-leisure-club/hero.webp",
    gallery: [
        "/projects/haff-leisure-club/2.webp",
        "/projects/haff-leisure-club/3.webp",
    ],
    deliverables: [
        "Open Play queue with stacks and court assignments",
        "TV board for the club floor",
        "Admin console for staff",
        "Player profiles and check-in",
        "Spoken and on-screen announcements",
    ],
    theme: { accent: "#D9B65D", surface: "#07140F", tile: "#0C1D16" },
    features: [
        {
            title: "Your game on your phone",
            kicker: "Member phone",
            description: "Players see their stack, the court they will likely get and a live countdown, then a clear call when the court is theirs.",
            icon: "smartphone",
            image: "/projects/haff-leisure-club/tile-phone.webp",
            size: "tall",
        },
        {
            title: "TV board for the floor",
            kicker: "TV board",
            description: "Three courts, the stack queue and every timer on the club screen, readable from across the room.",
            icon: "monitor",
            image: "/projects/haff-leisure-club/ui-tv.webp",
            size: "wide",
        },
        {
            title: "Session control board",
            kicker: "Staff admin",
            description: "Staff check players in, manage stacks and run the courts from one admin screen.",
            icon: "layers",
            image: "/projects/haff-leisure-club/tile-admin.webp",
            size: "tall",
        },
        {
            title: "Get ready, then go",
            kicker: "TV board",
            description: "The next group gets a get-ready countdown and the game timer starts by itself after a short walk-over.",
            icon: "zap",
            image: "/projects/haff-leisure-club/ui-tv-getready.webp",
            size: "wide",
        },
        {
            title: "Courts called by name",
            kicker: "TV board",
            description: "The TV announces the court and shows who is on it, with a spoken call.",
            icon: "route",
            image: "/projects/haff-leisure-club/ui-tv-announce.webp",
            size: "wide",
        },
        {
            title: "One fair queue, every state",
            kicker: "Member phone",
            description: "Get ready, the overall queue and on court: one live queue, shown the same way on every phone.",
            icon: "users",
            image: "/projects/haff-leisure-club/tile-phones.webp",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "The Club Floor",
            body: [
                "Haff Leisure Club runs open play sessions on three courts. The app replaces the whiteboard: players check in, form stacks and wait their turn, while staff manage the session from an admin console.",
                "It is a React and TypeScript single-page app on Vite, backed by Supabase for auth, data and realtime, and deployed on Vercel.",
            ],
            highlights: ["React + TypeScript", "Supabase", "Vercel"],
        },
        {
            title: "Courts, Timers and Queue",
            body: [
                "Court rules live in plain functions that are tested against the compiled code: when a game has finished, when a new group has taken over a court, and which stack to seat next.",
                "A server job releases finished courts and seats the next stack, so the board stays correct even when no staff phone is open. Wait estimates count every court, including ones nobody has used yet this session.",
            ],
            highlights: ["Server-side court release", "Auto-seating", "Tested court rules"],
        },
        {
            title: "TV Board and Announcements",
            body: [
                "A TV page shows courts, queue and announcements on the club screen. Staff can post banners, full-screen curtains and overtime notices, and the board can announce when time is up.",
                "Staff screens show a clear message when a device is offline or asleep, so a frozen board is never mistaken for a quiet club.",
            ],
            highlights: ["TV page", "Announcements", "Sync status for staff"],
        },
        {
            title: "Access and Data Security",
            body: [
                "Row Level Security is enabled on the tables, anonymous visitors read from a public players view, and sensitive profile columns are guarded in the database. Accounts are created by an admin, and members can sign in with a username.",
                "Avatars are stored in a storage bucket and cached by version, so check-ins do not trigger needless downloads.",
            ],
            highlights: ["Row Level Security", "Admin-created accounts", "Username login"],
        },
    ],
};

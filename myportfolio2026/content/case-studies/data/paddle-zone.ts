import { CaseStudy } from "../types";

export const paddleZone: CaseStudy = {
    slug: "paddle-zone",
    projectId: "paddle-zone",
    title: "Paddle Zone",
    subtitle: "Open play queue, TV board and player passport for a Bacolod pickleball club",
    summary:
        "One app for the players, the front desk and the TV at Paddle Zone Bacolod. Members always know their next game, courts run themselves, and every game adds to a player passport with levels, grades, honor and shareable cards.",
    date: "2026-10-06",
    year: 2026,
    category: "Web Development",
    tags: ["React", "Supabase", "Realtime", "Open Play", "Gamification"],
    roles: ["Full-Stack Developer", "Product Design"],
    tools: ["React", "TypeScript", "Vite", "Supabase", "Web Push", "Vercel"],
    metrics: [
        "4 courts tracked live, with a 60 second walk-over before every game",
        "16 badges and 22 shareable card designs",
        "No public sign-up: staff create every login",
    ],
    heroImage: "/projects/paddle-zone/hero.webp",
    gallery: [
        "/projects/paddle-zone/2.webp",
        "/projects/paddle-zone/3.webp",
    ],
    deliverables: [
        "Member app: queue, home, community and profile",
        "TV board with a voice announcer",
        "Front desk board for staff",
        "Player passport, badges, pets and rings",
        "Instagram share cards",
        "Phone alerts",
    ],
    theme: { accent: "#ED1317", surface: "#0A0A0B", tile: "#141012" },
    features: [
        {
            title: "Know your next game",
            kicker: "Member app",
            description: "A wait countdown, the likely court and three queue views, live to the second.",
            icon: "smartphone",
            image: "/projects/paddle-zone/tile-queue.webp",
            size: "tall",
        },
        {
            title: "The TV runs the room",
            kicker: "TV board",
            description: "All four courts, the up-next group and a QR code to your own queue, with chimes, a voice announcer and a red final minute.",
            icon: "monitor",
            image: "/projects/paddle-zone/ui-tv.webp",
            size: "wide",
        },
        {
            title: "Player passport",
            kicker: "Member app",
            description: "Club level, season grade, honor and weekly streak, earned by playing and never by winning.",
            icon: "sparkles",
            image: "/projects/paddle-zone/tile-passport.webp",
            size: "tall",
        },
        {
            title: "Front desk, drag and drop",
            kicker: "Front desk",
            description: "Check in, stack, send to court, undo and reserve from one board built for a single person running the night.",
            icon: "layers",
            image: "/projects/paddle-zone/ui-staff.webp",
            size: "wide",
        },
        {
            title: "Share cards, pets and rings",
            kicker: "Member app",
            description: "Players share their day and member card as Instagram stickers, and dress their profile with pets and rings unlocked by playing.",
            icon: "gift",
            image: "/projects/paddle-zone/tile-share.webp",
            size: "wide",
        },
        {
            title: "Level, streak and court calls",
            kicker: "Member app",
            description: "Home shows club level and weekly streak, then switches to a clear call when the next court is yours.",
            icon: "zap",
            image: "/projects/paddle-zone/tile-home.webp",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "The Open Play Floor",
            body: [
                "Paddle Zone Bacolod runs open play on four courts. The desk used to be the bottleneck: crowds, people asking when they were up, missed calls.",
                "The app gives members their stack, court and wait on their phone, puts the same board on the TV, and lets one person at the desk run the whole night.",
            ],
            highlights: ["4 courts", "Phone, TV and desk views", "One live board"],
        },
        {
            title: "Courts That Run Themselves",
            body: [
                "When a game ends the app announces it, rotates the players out, seats the next group and starts the timer after a 60 second walk-over. Staff step in only when they want to.",
                "Members get lock-screen alerts as their court gets close, so nobody has to listen for their name.",
            ],
            highlights: ["Auto-seating", "60 second walk-over", "Phone alerts"],
        },
        {
            title: "Player Passport",
            body: [
                "Every game adds to a passport with a club level, season grades from B to S+, honor levels, weekly streaks, quests and 16 badges. None of it affects queue order.",
                "After a game players can honor their teammates, and match results stay private to staff.",
            ],
            highlights: ["Levels and grades", "16 badges", "Honor after every game"],
        },
        {
            title: "Built for a Real Club",
            body: [
                "There is no public sign-up. Staff create every login, destructive staff actions re-check the password and logins are rate-limited.",
                "The app runs on Supabase and Vercel free tiers, and its court rules, queue logic and progression are covered by an automated test suite.",
            ],
            highlights: ["Staff-created logins", "Rate-limited sign-in", "Automated tests"],
        },
    ],
};

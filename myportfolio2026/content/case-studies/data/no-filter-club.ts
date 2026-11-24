import { CaseStudy } from "../types";

export const noFilterClub: CaseStudy = {
    slug: "no-filter-club",
    projectId: "no-filter-club",
    title: "No Filter Club",
    subtitle: "Brand and live tournament board for a Bacolod pickleball club, running on Cloudflare",
    summary:
        "No Filter is a social-first pickleball club in Bacolod City. I built its brand from the name up, then the app the club runs its nights on: open play queues, tournaments, a hall TV with an announcer, rankings and a community page, with every score pushed live to every phone.",
    date: "2026-11-20",
    year: 2026,
    category: "Web Development",
    tags: ["React", "Cloudflare", "Durable Objects", "Branding", "Open Play"],
    roles: ["Brand Design", "Full-Stack Developer"],
    tools: ["React", "TypeScript", "Vite", "Cloudflare Workers", "D1", "Durable Objects", "Web Push", "Figma"],
    metrics: [
        "50 games and 27 players scored in one open play night",
        "100 players in the community, 6 events ranked",
        "Every score pushed over WebSockets, nothing polls",
    ],
    heroImage: "/projects/no-filter-club/hero.webp",
    gallery: ["/projects/no-filter-club/2.webp", "/projects/no-filter-club/3.webp"],
    links: [{ label: "Open the live site", href: "https://www.nofilterclub.live" }],
    deliverables: [
        "Brand: name, mark, palette, type and social posters",
        "Public site: events, rankings, community, club and how it works",
        "Live boards for open play, pools, knockouts and mixers",
        "Hall TV with a spoken announcer",
        "Admin and staff consoles for game day",
        "Player profiles, XP levels, kudos and phone alerts",
    ],
    theme: { accent: "#D9FF00", surface: "#0E0E0D", tile: "#161614" },
    features: [
        {
            title: "Your court, live",
            kicker: "Player phone",
            description: "Courts now, the stack and every result, on the phone the moment staff score a game.",
            icon: "smartphone",
            image: "/projects/no-filter-club/tile-phone.webp",
            size: "tall",
        },
        {
            title: "The hall TV",
            kicker: "TV board",
            description: "Three courts, who is up next, a QR code to join the line and a spoken announcer, readable from across the hall.",
            icon: "monitor",
            image: "/projects/no-filter-club/ui-tv.webp",
            size: "wide",
        },
        {
            title: "Rankings that only go up",
            kicker: "Player phone",
            description: "XP for every game, win, point and honor given, across five levels from Rookie to Legend. Nothing is ever taken away.",
            icon: "sparkles",
            image: "/projects/no-filter-club/tile-rankings.webp",
            size: "tall",
        },
        {
            title: "Every game, every score",
            kicker: "Results board",
            description: "A finished night keeps its podium and all of its games, by court and time, for anyone with the link.",
            icon: "layers",
            image: "/projects/no-filter-club/ui-board.webp",
            size: "wide",
        },
        {
            title: "A community of 100",
            kicker: "Community",
            description: "Every player gets a card with level, games and wins. Names and photos stay for members only.",
            icon: "users",
            image: "/projects/no-filter-club/tile-community.webp",
            size: "wide",
        },
        {
            title: "Be real. Play fierce.",
            kicker: "Brand",
            description: "Volt, hot pink and onyx, a condensed display face and real photos of Asian players, carried from the posters into the app.",
            icon: "zap",
            image: "/projects/no-filter-club/tile-brand.webp",
            size: "wide",
        },
    ],
    sections: [
        {
            title: "A Second Club, Its Own Look",
            body: [
                "No Filter runs open play nights, mixers and mini-tournaments for every age and level. It needed a brand before it needed software, so the work started with the name, the mark, a volt and hot pink palette on onyx, and a run of posters and social cards.",
                "The app came next and had to look like nothing else I had built: no Paddle Zone layouts, no template dashboards, no drop shadows or blinking. Product rules win on the screens used mid-game: big targets, plain words and clarity first.",
            ],
            highlights: ["Brand from scratch", "Posters and social", "Its own app"],
        },
        {
            title: "Formats and Three Clocks",
            body: [
                "Staff pick a format, add pairs or players, courts, minutes per game and a start time, and the app builds every game with its court and planned time. Pools with playoffs, everyone plays everyone, knockout brackets and social mixers all run from the same engine.",
                "Each game carries three times: planned, fixed when the tournament is published; predicted, which follows how the courts are really running; and actual, stamped by the server. On open play nights a job turns courts over by itself, every minute.",
            ],
            highlights: ["Four formats", "Planned, predicted, actual", "Courts turn over on their own"],
        },
        {
            title: "Live Without Polling",
            body: [
                "Cloudflare Pages serves the app and hands every API call, including the live WebSocket, to a Worker over a service binding. The Worker keeps everything in a D1 database, and one Durable Object per tournament pushes each change to every open phone and the TV.",
                "Players can turn on phone alerts for their court, and the hall TV announces courts with recorded neural voice clips, so nobody has to listen for their name.",
            ],
            highlights: ["Pages + Worker + D1", "One Durable Object per tournament", "Web Push and a voice announcer"],
        },
        {
            title: "Security and Privacy",
            body: [
                "Passwords are hashed with PBKDF2. A session is a random token in an httpOnly, Secure, SameSite=Strict cookie, and only its hash is stored. Wrong sign-ins are limited per device using a salted hash, and no IP address is ever kept.",
                "Every write checks the session and the role on the server and must arrive as same-origin JSON. Public reads only ever return published tournaments, and names and photos are shown to signed-in members only. The site sets one cookie and no trackers.",
            ],
            highlights: ["PBKDF2 and hashed sessions", "Rate-limited sign-in, no IPs stored", "Members-only names and photos"],
        },
        {
            title: "Easy for Everyone",
            body: [
                "Contrast meets WCAG AA in light and dark. Reduced motion is respected, and a Simple mode turns on bigger text and turns motion off, for lolos and titas as much as for the regulars. Text never relies on colour alone, and sizes are set to be read from a phone mid-game or from a TV across the hall.",
            ],
            highlights: ["WCAG AA, light and dark", "Simple mode", "Readable from across the hall"],
        },
    ],
};

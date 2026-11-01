import { CaseStudy } from "../types";

export const newsearch: CaseStudy = {
    slug: "newsearch-news-signal-lens",
    projectId: "newsearch",
    title: "NewSearch",
    subtitle: "A news signal lens built on the Brave Search API",
    summary:
        "A full-stack news app that pulls articles from the Brave Search API, stores them without duplicates, and ranks them with my own freshness and keyword scoring.",
    date: "2025-12-16",
    year: 2025,
    category: "Web Development",
    tags: ["React", "Express", "Brave Search API", "Jest"],
    roles: ["Full-Stack Developer"],
    tools: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Supabase", "Brave Search API", "Jest", "Supertest"],
    metrics: [
        "27 passing Jest and Supertest API tests",
        "Articles deduplicated by URL",
        "Custom ranking with a Brave Boost toggle",
    ],
    heroImage: "/projects/newsearch/hero.jpg",
    gallery: [],
    links: [{ label: "Open the app", href: "https://newsearch-frontend.vercel.app" }],
    deliverables: ["React frontend with topic lenses and search", "Express REST API", "Ingestion pipeline", "API test suite"],
    sections: [
        {
            title: "The Problem",
            body: [
                "News feeds are noisy. The same story appears many times, and sorting only by date buries the articles worth reading.",
            ],
            highlights: ["Duplicate stories", "Date order alone is not enough"],
        },
        {
            title: "What I Built",
            body: [
                "An ingestion service fetches articles from the Brave Search API, cleans them, and upserts them into Postgres with the URL as the unique key, so a story is only stored once.",
                "The React app scores each article on freshness and keywords. Visitors can switch between Fresh and Signal sorting, turn on Brave Boost, and filter by topic. Brave Boost is my own scoring, not a Brave feature.",
            ],
            highlights: ["Fetch, normalize, upsert", "Freshness and keyword scoring", "Topic lenses and search"],
        },
        {
            title: "Testing",
            body: ["An Express REST API sits between the database and the frontend, covered by 27 Jest and Supertest tests, including error cases such as unknown routes."],
            highlights: ["27 passing API tests"],
        },
    ],
};

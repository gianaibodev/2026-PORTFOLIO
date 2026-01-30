import { CaseStudy } from "../types";

export const gdgBacolod: CaseStudy = {
    slug: "gdg-bacolod-community-platform",
    projectId: "gdg-bacolod",
    title: "GDG Bacolod Community Platform",
    subtitle: "Community-Driven Software for Developer Chapter Management",
    summary:
        "A web application built to serve as the digital home for the Google Developer Group (GDG) Bacolod chapter.\n\nAs someone who organized events and managed creatives, I noticed how much time was spent on manual tasks like creating certificates and tracking event history. This platform automates those everyday community management tasks.",
    date: "2025-01-15",
    year: 2025,
    category: "Web Development",
    tags: ["Full-Stack", "React", "Firebase", "Community Platform", "CMS"],
    roles: ["Full-Stack Developer", "UI/UX Designer", "Community Organizer"],
    tools: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS v4",
        "Firebase Firestore",
        "html-to-image",
        "jsPDF",
        "Vercel",
    ],
    metrics: [
        "Automated certificate generation saves time for organizers",
        "Centralized archive preserves event history and moments",
        "Offline-ready fallback for venues with poor connectivity",
        "Multi-format certificate export (PNG & PDF)",
        "Public validation portal for certificate verification",
    ],
    heroImage: "/lib/982_1x_shots_so.png",
    gallery: ["/lib/982_1x_shots_so.png", "/lib/43_1x_shots_so.png", "/lib/201_1x_shots_so.png"],
    deliverables: [
        "Public Marketing Site with Events & Moments Gallery",
        "Automated Certificate Generation System",
        "Admin CMS Dashboard",
        "Certificate Validation Portal",
        "Firebase & LocalStorage Hybrid Storage",
        "Responsive Design with Dark/Light Mode",
    ],
    sections: [
        {
            title: "Why I Built This",
            body: [
                "As someone who helped organize events for GDG on Campus (USLS) and worked on creatives for GDG Bacolod from 2022 to 2025, I noticed how much time we spent on things that could be automated. Creating certificates by hand, copying event details between different places, and trying to keep track of who attended what—it all added up.",
                "I thought it would be nice to have one place where everything lives. A website that shows upcoming events, a gallery of past moments so people can remember the fun times, and a way to create certificates without opening design software every time. This platform was my attempt to make those tasks a little easier.",
            ],
            highlights: [
                "Built from Real Organizer Experience",
                "Addresses Actual Community Needs",
                "Personal Project for the Chapter",
            ],
        },
        {
            title: "The Problems It Tries to Solve",
            body: [
                "When you're running a community over several years, data gets scattered. Event photos end up in different folders, certificate designs don't have consistent metadata, and it's hard to verify if someone actually attended an event months later.",
                "I also noticed that after an event ends, the excitement fades quickly. Without a place to archive those moments, the energy and memories from great workshops or meetups would just disappear. The platform tries to keep those memories alive in a 'Moments' gallery that organizers can update.",
                "The certificate system was built because manually designing certificates for each event takes time, and sometimes the designs don't include the information needed to verify them later. The platform lets organizers create templates once and then generate certificates with unique IDs that can be verified online.",
            ],
            highlights: [
                "Centralized Data Management",
                "Historical Event Preservation",
                "Automated Certificate Generation",
            ],
        },
        {
            title: "How It Works",
            body: [
                "The platform has three main parts. First, there's a public website that shows upcoming events, past moments in a gallery, information about the team, and partner logos. It uses Google's design language because it's for a Google Developer Group, and it has both light and dark modes because people have different preferences.",
                "Second, there's a certificate system. Organizers can create templates by uploading a background image and setting where names should appear. When it's time to issue certificates, they can upload a list of names and the system generates certificates in both PNG (for sharing online) and PDF (for printing). Each certificate gets a unique ID that people can use to verify it later.",
                "Third, there's a simple admin area where organizers can add or update events, team members, and partners without needing to edit code. The platform works with Firebase when it's set up, but it can also use LocalStorage as a backup, which means it can work even if there's no internet connection during an event.",
            ],
            highlights: [
                "Public Marketing Site",
                "Certificate Generation & Validation",
                "Simple Admin Dashboard",
            ],
        },
        {
            title: "Technical Approach",
            body: [
                "I built it with React 19 and TypeScript because I wanted type safety and the latest React features. Vite makes development fast, and Tailwind CSS v4 helps with styling using Google's official color tokens.",
                "For certificates, I use html-to-image to convert the certificate design into a PNG, and jsPDF to create PDF versions. The system scales images up so they look good when printed, not just on screens.",
                "The data layer uses an abstract pattern so the same code works whether you're using Firebase or LocalStorage. This means organizers can test things locally or use it at events where internet might be spotty, and it will still work.",
            ],
            highlights: [
                "React 19 with TypeScript",
                "Hybrid Storage (Firebase + LocalStorage)",
                "Print-Ready Certificate Export",
            ],
        },
        {
            title: "Special Features for Bacolod",
            body: [
                "This isn't just generic community software—I tried to make it fit how GDG Bacolod actually works. For example, there's a 'Community Partners' tier specifically for local university organizations and tech startups in Bacolod, which is different from the standard sponsor tiers.",
                "The Moments gallery is set up to preserve four years of history (2022-2025), so future organizers can see what the chapter has accomplished and learn from past events. It's a way to keep the community's story alive.",
                "There's also a ShareCard feature that creates images optimized for Instagram Stories and Twitter, so when people share their certificates, it looks nice and includes a link back to the validation portal. This helps spread awareness about the chapter naturally.",
            ],
            highlights: [
                "Localized for Bacolod Tech Ecosystem",
                "Historical Archive (2022-2025)",
                "Social Media Share Cards",
            ],
        },
        {
            title: "What I Learned",
            body: [
                "Building this taught me a lot about what organizers actually need versus what seems cool to build. Sometimes the simplest solution—like using LocalStorage as a fallback—is the most useful because it means the platform works even when things don't go perfectly.",
                "I also learned that making something for a community you're part of is different from building for clients. You understand the real problems because you've lived them. The platform isn't perfect, and there are things I'd do differently now, but it was a good learning experience.",
                "The best part is seeing how it could help future organizers spend less time on administrative tasks and more time on what matters—bringing developers together and creating great events.",
            ],
            highlights: [
                "Built from Real Experience",
                "Practical Over Perfect",
                "Designed for Community Growth",
            ],
        },
    ],
};

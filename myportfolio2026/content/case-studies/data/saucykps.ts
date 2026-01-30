import { CaseStudy } from "../types";

export const saucykps: CaseStudy = {
    slug: "saucykps-bot-v1",
    projectId: "saucykps",
    title: "SaucyKPS Bot v1",
    subtitle:
        "Architectural Transformation of a Traditional Restaurant into a Telegram-Native Cloud Kitchen",
    summary:
        "A full-stack automation ecosystem that transforms a traditional restaurant into a 'Cloud Kitchen' model.\n\nBy utilizing Telegram as the primary infrastructure, the project eliminates 20-30% commission fees typical of third-party delivery platforms while providing a professional, automated POS experience.",
    date: "2025-11-01",
    year: 2025,
    category: "Web Development",
    tags: ["Automation", "Backend Engineering", "Telegram Bot", "Cloud Kitchen", "Full-Stack"],
    roles: ["Backend Developer", "System Architect", "Full-Stack Engineer"],
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Supabase"],
    metrics: [
        "Eliminated 5-15 minute 'dead zone' in order processing",
        "Reduced order-to-rider dispatch time to <1 second",
        "Zero commission fees by bypassing third-party delivery platforms",
        "Automated identity mapping eliminates manual customer data entry",
        "Real-time receipt generation enhances customer trust",
    ],
    heroImage: "/lib/936_1x_shots_so.png",
    gallery: [
        "/lib/936_1x_shots_so.png",
        "/lib/117_1x_shots_so.png",
        "/lib/133_1x_shots_so.png",
        "/lib/180_1x_shots_so.png",
        "/lib/289_1x_shots_so.png",
    ],
    deliverables: [
        "React/Vite Admin Dashboard",
        "Node.js Webhook Architecture",
        "Supabase/PostgreSQL Database",
        "Automated Receipt Engine",
        "Customer Identity Mapping",
    ],
    sections: [
        {
            title: "Project Genesis & Strategic Vision",
            body: [
                "The transition to an 'online-only' model for a family-owned business presented a massive operational hurdle: Communication Fragmentation. Relying on manual chat monitoring meant the business was limited by the physical speed of the person reading messages.",
                "SaucyKPS Bot v1 was developed to serve as the 'Digital Nervous System,' automating the flow of information between three distinct stakeholders: the Customer, the Kitchen, and the Delivery Fleet.",
            ],
            highlights: [
                "Eliminated Communication Bottlenecks",
                "Three-Stakeholder Automation",
                "Digital-First Restaurant Model",
            ],
        },
        {
            title: "The Problem: The 'Manual Messaging' Bottleneck",
            body: [
                "Before the implementation of SaucyKPS, the operational workflow was plagued by several critical failure points. The Relay Lag created a 5–15 minute 'dead zone' where a staff member had to manually copy order details from the customer chat and paste them into the rider group, causing food to sit getting cold.",
                "Identity Fragmentation meant there was no persistent way to track a customer's lifetime value—if a user changed their display name, their order history was effectively lost. The Verification Void left customers feeling insecure about where their money went until the food actually arrived, and Logistics Chaos saw riders 'double-pick' orders because there was no status-tracking mechanism.",
            ],
            highlights: [
                "5-15 Minute Order Processing Delay",
                "Lost Customer Identity & History",
                "No Automated Receipt System",
                "Order Status Tracking Gaps",
            ],
        },
        {
            title: "The Solution: A Modular Automation Ecosystem",
            body: [
                "Instead of using inefficient 'polling,' I built a Node.js Webhook listener that ensures the moment a customer interacts with the bot, the server receives a push notification. This architecture allows for sub-second response times, making the 'digital restaurant' feel as responsive as a physical waiter.",
                "I designed a custom SQL schema to move beyond simple chat interactions. Every user is indexed by their unique Telegram chat_id, allowing the restaurant to map @usernames to order histories, preferences, and delivery addresses—turning a chat app into a powerful Customer Relationship Management (CRM) tool.",
                "I engineered a complex message-routing logic that manages three separate environments simultaneously: Customer DMs for private receipt delivery and order status updates, Kitchen/Admin Dashboard as a modern React/Vite interface where the owner accepts or rejects orders, and Rider Logistics Group as an automated dispatch feed that instantly notifies all available riders when an order is ready.",
            ],
            highlights: [
                "Webhook-Driven Core (Sub-Second Response)",
                "PostgreSQL Identity Persistence",
                "Tri-Group Dispatch Logic",
                "CRM Integration via Telegram",
            ],
        },
        {
            title: "Technical Implementation: The Automation Flow",
            body: [
                "The automation flow begins when a customer triggers the bot via a /start or /menu command. The bot checks the Supabase database—if new, it captures the chat_id and @username. The web dashboard updates in real-time to show the incoming request.",
                "Upon admin approval, the bot executes a sendMessage request to the Rider Group Chat ID, tagging the order as [UNCLAIMED]. Simultaneously, a professionally formatted Digital Receipt is sent to the customer's private messages, including a timestamped Order ID.",
                "The tech stack leverages Node.js as the runtime, PostgreSQL (via Supabase) for database persistence, React + TypeScript + Tailwind for the Admin Dashboard frontend, and Telegram Bot API with Webhooks for real-time integration. The entire system is deployed via a Git-based workflow with npm dependency management.",
            ],
            highlights: [
                "Step-by-Step Automation Workflow",
                "Real-Time Dashboard Updates",
                "Automated Dispatch Ticket Generation",
                "Timestamped Order Receipts",
            ],
        },
        {
            title: "Impact & Conclusion",
            body: [
                "The SaucyKPS Bot v1 transformed a chaotic group chat into a structured, data-driven enterprise. It successfully eliminated the 'Manual Dispatcher' role, allowing the restaurant to redirect labor costs into food quality and faster delivery times.",
                "This project demonstrates that custom-built automation can empower small family businesses to compete effectively in the digital marketplace, providing them with professional-grade tools typically reserved for larger operations.",
            ],
            highlights: [
                "Eliminated Manual Dispatcher Role",
                "Structured Data-Driven Operations",
                "Cost Redirection to Food Quality",
                "Professional Tools for Small Business",
            ],
        },
    ],
};

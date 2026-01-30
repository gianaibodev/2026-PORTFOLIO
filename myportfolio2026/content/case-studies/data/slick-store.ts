import { CaseStudy } from "../types";

export const slickStore: CaseStudy = {
    slug: "slick-store-ecommerce-platform",
    projectId: "slick-store",
    title: "Slick Store — Full‑Stack Sneaker Marketplace",
    subtitle: "A React + Supabase architecture study for sneaker resell flows",
    summary:
        "Slick Store is a full-stack e‑commerce prototype focused on the sneaker reselling space. It explores how to model products, variants, and orders in PostgreSQL, and how to connect that to a React + Tailwind frontend that feels similar to modern sneaker marketplaces without relying on boilerplate templates.",
    date: "2025-11-01",
    year: 2025,
    category: "Web Development",
    tags: ["E-commerce", "React", "Supabase", "Web Development", "Tailwind CSS"],
    roles: ["Full-Stack Developer", "UI/UX Designer"],
    tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Supabase (PostgreSQL, Auth, Storage)",
        "Vercel",
    ],
    metrics: [
        "Relational schema for products, variants, and orders in PostgreSQL",
        "Inventory updates scoped to specific size variants",
        "Supabase-backed authentication for shopper accounts",
        "Cart and checkout flow connected to real database records",
        "Client-side filters for brand, size, and price without full page reloads",
    ],
    heroImage: "/lib/64shots_so.png",
    gallery: ["/lib/64shots_so.png", "/lib/13shots_so.png", "/lib/115shots_so.png"],
    deliverables: [
        "Sneaker-focused product catalog UI",
        "Supabase schema for products, users, and carts",
        "Filtering and search experience",
        "Cart and checkout pages",
        "Responsive layout and theming",
    ],
    sections: [
        {
            title: "Executive Summary",
            body: [
                "Slick Store started as a way to study what a sneaker-focused marketplace needs at both the database and UI level. The goal was not to launch a live store, but to see how far I could go in modeling products, sizes, and orders while keeping the frontend simple and fast.",
                "Instead of using a generic e‑commerce template, I designed a schema and React components specifically for sneakers, where sizes, colorways, and high-resolution images matter a lot.",
            ],
            highlights: [
                "Sneaker-specific e‑commerce prototype",
                "Focus on data modeling and UX together",
                "Built as a learning and architecture project",
            ],
        },
        {
            title: "Problem: The Reseller’s Friction",
            body: [
                "In sneaker reselling, it’s common to have very limited stock for each size. If the system isn’t careful about how it updates inventory, it can accidentally allow two people to buy the same size at once.",
                "Another challenge is image handling. People want to see shoes clearly from different angles, but serving lots of large images can slow things down if they aren’t stored and loaded properly.",
                "Finally, a single shoe model can have many colorways and size runs. Trying to manage everything in a flat products table quickly becomes hard to reason about, especially when connecting orders back to specific sizes.",
            ],
            highlights: [
                "Per-size inventory constraints",
                "Need for clear, high-quality imagery",
                "Complex product and variant relationships",
            ],
        },
        {
            title: "Solution: Headless Full‑Stack Architecture",
            body: [
                "I used a React + Supabase stack so the frontend stays focused on rendering and interaction, while the backend is responsible for relational logic and data integrity.",
                "In PostgreSQL (through Supabase), I split the data into Products, Variants, and Orders. Products store shared information like SKU, brand, and model. Variants represent specific size and colorway combinations with their own stock counts. Orders then link a user to one or more variants.",
                "On the frontend, TypeScript types mirror this structure, so components know exactly what fields to expect and can show the right information without guessing.",
            ],
            highlights: [
                "Products / Variants / Orders separation",
                "Typed end‑to‑end data flow with TypeScript",
                "React frontend talking to Supabase via headless APIs",
            ],
        },
        {
            title: "Technical Implementation Details",
            body: [
                "When a user checks out, the app calls a Supabase edge function (or transaction-like sequence) that checks variant stock, updates it, and records an order entry. If any step fails, the operation is cancelled so the stock doesn’t go negative.",
                "Supabase Row Level Security (RLS) is used so that users can only see their own orders, while admin accounts can manage products and prices. This keeps read and write access clear and avoids mixing admin logic into the frontend.",
                "The UI is built with React, TypeScript, Vite, and Tailwind CSS. Product grids use consistent aspect ratios so different silhouettes still look tidy. Filtering is handled on the client using data fetched from Supabase, which keeps navigation feeling quick.",
            ],
            highlights: [
                "Atomic-style inventory updates for variants",
                "RLS policies for user vs. admin access",
                "Client-side filtering and Tailwind-based layout",
            ],
        },
        {
            title: "SWOT & Reflections",
            body: [
                "A clear schema and type-safe stack are definite strengths: they made it easier to reason about inventory and cart behavior. Using Supabase also simplified auth and storage so I could focus on the sneaker experience itself.",
                "At the same time, the platform still relies on manual data entry for products and doesn’t include real payment processing yet. Features like price history charts or Stripe integration are ideas for the future rather than things that are live today.",
                "Overall, Slick Store gave me a gentle but realistic look at what it takes to design an e‑commerce architecture that respects both data integrity and a pleasant browsing experience.",
            ],
            highlights: [
                "Strong data integrity and typing",
                "Room to grow into payments and analytics",
            ],
        },
    ],
};

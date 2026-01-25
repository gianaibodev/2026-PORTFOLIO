import { z } from "zod";

export const caseStudyCategories = [
  "Branding",
  "UI/UX",
  "Photography",
  "Community & Events",
  "Startups & Innovation",
  "Games & Experiments",
  "Internships",
] as const;

export type CaseStudyCategory = (typeof caseStudyCategories)[number];

const caseStudySectionSchema = z.object({
  title: z.string(),
  body: z.array(z.string()),
  highlights: z.array(z.string()).optional(),
});

const caseStudySchema = z.object({
  slug: z.string(),
  projectId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  date: z.string(),
  year: z.number(),
  category: z.enum(caseStudyCategories),
  tags: z.array(z.string()),
  roles: z.array(z.string()),
  tools: z.array(z.string()),
  metrics: z.array(z.string()),
  heroImage: z.string(),
  gallery: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  sections: z.array(caseStudySectionSchema),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

const rawCaseStudies: CaseStudy[] = caseStudySchema.array().parse([
  {
    slug: "la-vida-2025-brand-system",
    projectId: "la-vida",
    title: "LA VIDA — Endless Summer 2025",
    subtitle: "An adaptive retail identity with cinematic gradients and modular merch rules.",
    summary:
      "Built a reusable brand engine for Bacolod’s lifestyle label—covering hero visuals, campaign typography, retail packaging, and launch content stitched into one glassy visual OS.",
    date: "2025-03-01",
    year: 2025,
    category: "Branding",
    tags: ["Campaign System", "Retail", "Art Direction"],
    roles: ["Creative Direction", "Motion Design", "Web Implementation"],
    tools: ["Figma", "After Effects", "Cinema 4D", "Framer"],
    metrics: [
      "+312% waitlist sign-ups for the preorder drop",
      "42-piece toolkit handed to the in-store team",
      "Shot and edited 11 hero looks in 48 hours",
    ],
    heroImage: "/framer/framer-01.jpg",
    gallery: ["/framer/framer-02.jpg", "/framer/framer-03.jpg", "/framer/framer-04.png"],
    deliverables: ["Art direction deck", "Social toolkit", "Landing page", "Retail packaging system"],
    sections: [
      {
        title: "Research & Mood Construction",
        body: [
          "Mapped local summer rituals, swimwear textures, and Bacolod sunsets to build a gradient language inspired by beach dusk tones.",
          "Interviewed the internal retail team to understand turnover speeds and what a 'ready-to-use' toolkit needs to contain to avoid redesign fatigue.",
        ],
        highlights: [
          "Palette anchored on warm cobalt + papaya",
          "8-type pairing system for physical and digital collateral",
        ],
      },
      {
        title: "System & Toolkit",
        body: [
          "Delivered a 42-piece toolkit that contains merch patches, poster grids, TikTok cover crops, and vertical video treatments.",
          "Composited footage to feel like a 90s DV cam while keeping hero typography sharp for retina devices.",
        ],
      },
      {
        title: "Launch & Handoff",
        body: [
          "Coordinated with the in-store team to print the lookbook, animate the social teasers, and deploy the Framer landing page in under four days.",
          "Documented naming conventions, layer styles, and color tokens so the client could iterate without breaking the Apple-like sheen.",
        ],
      },
    ],
  },
  {
    slug: "pool-party-social-lab",
    projectId: "pool-party",
    title: "Pool Party Social Lab",
    subtitle: "A hyper-saturated shoot that turned into a modular ad kit for a summer series.",
    summary:
      "Designed and filmed a micro campaign for a Gen-Z swim experience, combining neon product photography with punchy typography that slots directly into Reels, TikTok, and DOOH layouts.",
    date: "2024-11-12",
    year: 2024,
    category: "Photography",
    tags: ["Campaign", "Photography", "Motion"],
    roles: ["Creative Direction", "On-set Direction", "Editing"],
    tools: ["Sony A7IV", "DaVinci Resolve", "Lightroom", "After Effects"],
    metrics: [
      "Sold out 2 weekend runs in advance",
      "Produced 63 deliverables from a single day of shooting",
      "Cut editing time by 40% thanks to the LUT + typography kit",
    ],
    heroImage: "/framer/framer-05.png",
    gallery: ["/framer/framer-06.jpg", "/framer/framer-07.jpg", "/framer/framer-08.jpg"],
    deliverables: ["Photo set", "15s + 30s edits", "Story stickers", "Lottie transitions"],
    sections: [
      {
        title: "Concept",
        body: [
          "Turned the usual pool party coverage into a futuristic magazine layout. Every frame was planned with negative space so typography could glide like an Apple keynote.",
          "Mixed film grain overlays with glassmorphic title cards to keep it on brand with the rest of my portfolio aesthetic.",
        ],
      },
      {
        title: "Production",
        body: [
          "Directed the crew through a two-location sprint—midday rooftop and blue-hour indoor pool—sequencing outfits so the palette ramps from citrus to midnight teal.",
          "Shot stills and motion back-to-back with continuous lighting to retain consistent reflections on metallic accessories.",
        ],
      },
      {
        title: "Post",
        body: [
          "Edited selects in Lightroom, then pushed them into After Effects templates for kinetic typography.",
          "Automated exports with pre-baked presets for 9:16, 4:5, and 1:1 so the marketing team could deploy instantly.",
        ],
      },
    ],
  },
  {
    slug: "the-capitol-fashion-weekender",
    projectId: "the-capitol",
    title: "The Capitol — Fashion Weekender",
    subtitle: "Reimagined a civic space into a luxury runway using projection-mapped visuals.",
    summary:
      "Owned scenography, brand identity, and comms for The Capitol runway show, transforming a historic venue into a futuristic portal with glass gradients and volumetric lighting.",
    date: "2024-08-20",
    year: 2024,
    category: "Community & Events",
    tags: ["Event Direction", "Lighting", "Branding"],
    roles: ["Show Director", "Visual Designer", "Motion Lead"],
    tools: ["TouchDesigner", "Blender", "Resolume Arena", "Figma"],
    metrics: [
      "1,000+ attendees over two nights",
      "Projected visuals across 32m facade without distortion",
      "5 sponsor ecosystems integrated into the scenography",
    ],
    heroImage: "/framer/framer-09.jpg",
    gallery: ["/framer/framer-10.jpg", "/framer/framer-11.jpg", "/framer/framer-12.png"],
    deliverables: ["Venue experience map", "Sponsor toolkit", "Lighting cues", "Press kit"],
    sections: [
      {
        title: "Experience Strategy",
        body: [
          "Mapped the civic building’s columns into modular frames, allowing sponsors to inhabit the visual system without derailing the hero typography.",
          "Designed badges, seat drops, and interactive foyer pillars using the same glassmorphic logic as the website header for brand continuity.",
        ],
      },
      {
        title: "Motion & Lighting",
        body: [
          "Animatics were built in Blender, exported into Resolume, and triggered live to keep the audio-reactive gradients synced with the music director.",
          "Added volumetric cues that guide the audience through pre-show, runway, and after-party phases with subtle shifts in haze density.",
        ],
      },
      {
        title: "Community Impact",
        body: [
          "Featured 18 emerging designers, giving them modular press kits and immediate social-ready clips to help with post-event reach.",
        ],
      },
    ],
  },
  {
    slug: "google-dev-program-scale",
    projectId: "gds-ecosystem",
    title: "Google Developer Programs — Ecosystem Scale",
    subtitle: "Scaled a campus tech community from 500 to 1,500+ members in five months.",
    summary:
      "Led GDG on Campus + GDSC USLS as CEO & Organizer, designing the growth engine, community rituals, and keynote-ready visuals that sparked 50+ events and 2,650+ attendees.",
    date: "2023-12-18",
    year: 2023,
    category: "Community & Events",
    tags: ["Community Design", "Operations", "Brand"],
    roles: ["Founder/CEO", "Host", "Visual Designer"],
    tools: ["Notion", "Figma", "Google Cloud", "After Effects"],
    metrics: [
      "Growth from 500 → 1,500 members",
      "50+ events, 2,650+ attendees",
      "40+ officers managed with async rituals",
    ],
    heroImage: "/legacy/landing/vendor-4.jpg",
    gallery: [
      "/legacy/assets/demopic/8.jpg",
      "/legacy/assets/demopic/13.jpg",
      "/legacy/assets/demopic/14.jpg",
    ],
    deliverables: ["Community OS", "Visual campaigns", "Speaker onboarding kit", "Partnership decks"],
    sections: [
      {
        title: "Community OS",
        body: [
          "Built a Notion-based operating system with rituals, templates, and automation—so officers can spin up workshops that look on-brand within minutes.",
          "Designed membership funnels per discipline (AI, design, devrel) ensuring every event has a clear learning ladder.",
        ],
        highlights: ["Weekly pulse reports", "Mentor pods", "Resource vault"],
      },
      {
        title: "Design System",
        body: [
          "Kept every poster, deck, and stream overlay aligned to a single color + grid system inspired by Google's Material geometry but remixed with softer gradients.",
          "Crafted motion bumpers using the same shader logic I use on the site hero to keep the 'Apple energy' alive on stage.",
        ],
      },
      {
        title: "Results",
        body: [
          "Brought enterprise partners (Google, Globe, Metrobank, Accenture) to Bacolod and activated sponsor experiences without losing community warmth.",
        ],
      },
    ],
  },
  {
    slug: "armada-brands-internship",
    projectId: "armada",
    title: "Armada Brands — Internship Capsule",
    subtitle: "Translated a fragrance lab’s mood boards into tactile e-commerce assets.",
    summary:
      "During my internship I prototyped a multi-scent launch—including brand films, product photography, and CRO-focused PDP layouts—for Armada Brands.",
    date: "2024-05-05",
    year: 2024,
    category: "Internships",
    tags: ["E-commerce", "Photo/Video", "CRO"],
    roles: ["Product Designer", "Cinematographer", "Editor"],
    tools: ["Figma", "Premiere Pro", "Cinema 4D", "Shopify"],
    metrics: [
      "Cut PDP bounce rate by 27% in usability tests",
      "Shot 90 SKUs in four studio days",
      "Delivered fully responsive PDP components",
    ],
    heroImage: "/framer/framer-13.png",
    gallery: ["/framer/framer-14.png", "/framer/framer-15.jpg", "/framer/framer-16.jpg"],
    deliverables: ["E-commerce PDP pack", "Product film", "Retouching presets", "Shopify sections"],
    sections: [
      {
        title: "Product Strategy",
        body: [
          "Partnered with the biz-dev team to understand scent storytelling, then mapped each fragrance to a lighting treatment so CTAs felt tactile.",
        ],
      },
      {
        title: "UI & CRO",
        body: [
          "Built PDP components (accordions, sticky cart, cross-sell) that mirror the glassmorphic card system used in this Next.js site.",
        ],
      },
      {
        title: "Studio Pipeline",
        body: [
          "Automated Lightroom presets and DaVinci LUTs so the marketing team can add SKUs without waiting for me.",
        ],
      },
    ],
  },
  {
    slug: "custopia-vr-simulator",
    projectId: "custopia",
    title: "Custopia VR — Customer Service Simulator",
    subtitle: "A VR learning experience that turns service training into a playable adventure.",
    summary:
      "Conceptualized and pitched Custopia VR for our Game Programming course—blending simulation mechanics, SDG impact, and dynamic AI customers to level up soft skills.",
    date: "2024-01-11",
    year: 2024,
    category: "Games & Experiments",
    tags: ["VR", "Game Design", "Service Design"],
    roles: ["Game Designer", "Narrative Lead", "Deck Designer"],
    tools: ["Unity", "Figma", "Blender", "Google Slides"],
    metrics: [
      "Playtested with 30 hospitality students",
      "Documented 12 branching scenarios",
      "Created investor-ready pitch in 48 hours",
    ],
    heroImage: "/legacy/assets/demopic/11.png",
    gallery: ["/legacy/assets/demopic/11-a.png", "/legacy/assets/demopic/11.png"],
    deliverables: ["Pitch deck", "Game design document", "Prototype UI kit"],
    sections: [
      {
        title: "Narrative & Mechanics",
        body: [
          "Replaced boring customer service modules with an RPG-like leveling system where empathy, accuracy, and recovery unlock new locations.",
        ],
      },
      {
        title: "Visual Language",
        body: [
          "Combined neon HUDs with glass cards—the same UI language used in this site—to keep the prototype consistent with my overall brand.",
        ],
      },
      {
        title: "Impact",
        body: [
          "Framed Custopia as an SDG-aligned solution: upskilling youth for more compassionate service industries.",
        ],
      },
    ],
  },
  {
    slug: "signalin-startup-sprint",
    projectId: "signalin",
    title: "Signalin — Regional Startup Finalist",
    subtitle: "An alert system designed for disaster response teams across Negros Occidental.",
    summary:
      "Co-led product strategy and UX for Signalin, a disaster response platform that landed as a finalist in the Regional Startup Challenge.",
    date: "2023-10-10",
    year: 2023,
    category: "Startups & Innovation",
    tags: ["Product Strategy", "IoT", "Mobile"],
    roles: ["Product Designer", "Pitch Lead"],
    tools: ["Figma", "Firebase", "Arduino", "Notion"],
    metrics: [
      "Regional Startup Challenge finalist",
      "Built working alert prototype in 2 weeks",
      "Partner-ready go-to-market plan",
    ],
    heroImage: "/legacy/assets/demopic/10.jpg",
    gallery: [
      "/legacy/assets/demopic/10-a.png",
      "/legacy/assets/demopic/10-b.png",
      "/legacy/assets/demopic/10-c.jpg",
    ],
    deliverables: ["Mobile app UI", "Hardware prototype housing", "Pitch narrative"],
    sections: [
      {
        title: "Problem Framing",
        body: [
          "Emergency teams still rely on manual SMS trees. We designed a single dashboard that broadcasts verified alerts to barangays, schools, and responders simultaneously.",
        ],
      },
      {
        title: "System Design",
        body: [
          "Integrated IoT beacons + Firebase to trigger multi-channel notifications, while the mobile app handles acknowledgement tracking.",
        ],
      },
      {
        title: "Outcome",
        body: [
          "Placed as a regional finalist and opened partnerships with LGUs exploring rapid-deploy alert systems.",
        ],
      },
    ],
  },
  {
    slug: "smileit-service-suite",
    projectId: "smileit",
    title: "SmileIT Inc. — Service Suite 2.0",
    subtitle: "Rebuilt a service-desk platform with calmer IA and AI-assisted workflows.",
    summary:
      "Audit, redesign, and prototype for SmileIT’s internal tooling—turning a chaotic dashboard into a glassy productivity cockpit with automated status updates.",
    date: "2024-02-11",
    year: 2024,
    category: "UI/UX",
    tags: ["Enterprise UX", "Automation", "Design Systems"],
    roles: ["Lead Product Designer", "Frontend Dev"],
    tools: ["Figma", "Next.js", "Supabase", "Tailwind"],
    metrics: [
      "Cut ticket resolution time by 23% in usability tests",
      "Documented 120+ components in a tokenized system",
      "Rolled out AI summaries integrated into existing workflow",
    ],
    heroImage: "/legacy/assets/demopic/9-a.png",
    gallery: [
      "/legacy/assets/demopic/9-b.png",
      "/legacy/assets/demopic/9-c.png",
      "/legacy/assets/demopic/9.jpg",
    ],
    deliverables: ["Design system", "Dashboard UI", "Frontend prototype"],
    sections: [
      {
        title: "Research",
        body: [
          "Shadowed agents to map out recurring workflows, then tagged frustration areas using service-blueprint layers.",
        ],
      },
      {
        title: "Design",
        body: [
          "Rebuilt navigation to highlight priority tickets, layered glass cards for quick scanning, and injected automation suggestions directly into the queue.",
        ],
      },
      {
        title: "Pilot",
        body: [
          "Prototyped inside a Next.js environment with Supabase so live data could be plugged in immediately.",
        ],
      },
    ],
  },
  {
    slug: "hack-lasalle-megathon",
    projectId: "hack-lasalle",
    title: "Hack La Salle — Mega Ideathon",
    subtitle: "Built the brand, ops, and show flow for a 800+ participant tech festival.",
    summary:
      "Designed the end-to-end experience (branding, live show cues, judge portals) for Hack La Salle, fusing education with festival energy.",
    date: "2023-12-18",
    year: 2023,
    category: "Community & Events",
    tags: ["Hackathon", "Ops", "Brand"],
    roles: ["Lead Organizer", "Showcaller", "Visual Designer"],
    tools: ["Notion", "Canva", "Figma", "OBS"],
    metrics: [
      "800+ registered hackers",
      "9 keynote partners",
      "40-person staff controlled through a single ops board",
    ],
    heroImage: "/legacy/assets/demopic/8.jpg",
    gallery: [
      "/legacy/assets/demopic/8.jpg",
      "/legacy/assets/demopic/13-a.jpg",
      "/legacy/assets/demopic/13-b.jpg",
    ],
    deliverables: ["Visual identity", "Stage graphics", "Ops handbook", "Judge dashboard"],
    sections: [
      {
        title: "Ops Backbone",
        body: [
          "Created a Notion-based control room with live updates, escalations, and sponsor status to keep 40 officers synced.",
        ],
      },
      {
        title: "Brand & Stage",
        body: [
          "Wrapped the venue with a gradient grid system referencing the Apple glass aesthetic, so every banner and LED matched the site’s visual language.",
        ],
      },
      {
        title: "Community Impact",
        body: [
          "Generated 2,650+ total attendees across the GDG and Hack La Salle calendars, all referencing the same identity library.",
        ],
      },
    ],
  },
]);

export function getAllCaseStudies(): CaseStudy[] {
  return [...rawCaseStudies].sort((a, b) => b.year - a.year);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return rawCaseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByCategory(category: CaseStudyCategory): CaseStudy[] {
  return rawCaseStudies.filter((cs) => cs.category === category).sort((a, b) => b.year - a.year);
}

export function getCaseStudyCategories() {
  return caseStudyCategories.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z]+/g, "-"),
    studies: getCaseStudiesByCategory(name),
  }));
}





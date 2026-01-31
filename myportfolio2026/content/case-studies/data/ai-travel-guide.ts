import { CaseStudy } from "../types";

export const aiTravelGuide: CaseStudy = {
    slug: "ai-travel-guide-paris",
    projectId: "ai-travel-guide",
    title: "AI Travel Guide for Paris",
    subtitle:
        "Your Virtual Parisian Expert Powered by OpenAI",
    summary:
        "An AI-powered travel assistant that leverages OpenAI's GPT models to provide personalized, expert-level travel recommendations for Paris. From hidden gems to local cuisine, this virtual guide offers authentic Parisian insights.",
    date: "2025-01-20",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["Conversational AI", "Travel Tech", "OpenAI API", "Python", "NLP"],
    roles: ["AI Engineer", "Product Developer"],
    tools: ["Python", "OpenAI API", "Jupyter Notebook"],
    metrics: [
        "Context-aware travel recommendations",
        "Multi-turn conversation support",
        "Personalized itinerary suggestions",
        "Local insights and cultural tips",
    ],
    heroImage: "/projects/ai/ai-travel-guide-paris/images/eiffel-tower.png",
    gallery: [
        "/projects/ai/ai-travel-guide-paris/images/eiffel-tower.png",
    ],
    deliverables: [
        "Conversational AI System",
        "OpenAI API Integration",
        "Travel Knowledge Prompt Engineering",
        "Interactive Jupyter Demo",
    ],
    sections: [
        {
            title: "Project Vision",
            body: [
                "Traditional travel guides are static and impersonal. This project reimagines travel assistance by creating a conversational AI that acts as a knowledgeable Parisian local, ready to answer questions and provide tailored recommendations.",
                "Using OpenAI's powerful language models, the virtual guide can discuss everything from the best croissants in Le Marais to optimal museum visiting times, all while maintaining engaging, natural conversation.",
            ],
            highlights: [
                "Personalized Travel Assistance",
                "Natural Language Interaction",
                "Local Expert Knowledge",
            ],
        },
        {
            title: "AI Architecture",
            body: [
                "The system uses carefully engineered prompts to establish the AI's persona as a Parisian travel expert. This includes context about French culture, famous landmarks, local customs, and practical travel tips.",
                "The conversational flow maintains context across multiple exchanges, allowing users to have natural back-and-forth discussions about their travel plans and preferences.",
            ],
            highlights: [
                "Persona-Based Prompting",
                "Context Retention",
                "GPT-4o-mini Integration",
            ],
        },
        {
            title: "Future Roadmap",
            body: [
                "This proof-of-concept demonstrates the foundation for a full-featured travel companion app. Future iterations could include real-time booking integrations, map visualizations, and expanded city coverage.",
                "The modular architecture allows easy adaptation to other destinations, making this a scalable template for AI-powered travel experiences worldwide.",
            ],
            highlights: [
                "Scalable Architecture",
                "Multi-City Expansion Ready",
                "Booking Integration Potential",
            ],
        },
    ],
};

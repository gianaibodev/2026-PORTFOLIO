import { CaseStudy } from "../types";

export const aiTravelGuide: CaseStudy = {
    slug: "ai-travel-guide-paris",
    projectId: "ai-travel-guide",
    title: "AI Travel Guide for Paris",
    subtitle:
        "Your Virtual Parisian Expert Powered by OpenAI",
    summary:
        "An AI-powered travel assistant that leverages OpenAI's GPT models to provide personalized, expert-level travel recommendations for Paris.\n\nUsing advanced prompt engineering techniques, the system maintains conversational context and delivers authentic Parisian insights—from hidden gems to local cuisine recommendations.",
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
            title: "The Situation: Static Travel Resources",
            body: [
                "Travelers planning a trip to Paris face information overload: thousands of blog posts, outdated guidebooks, and generic recommendations that don't account for personal preferences. Finding authentic local experiences requires hours of research.",
                "The opportunity was to create an interactive AI assistant that could answer travel questions naturally, provide personalized recommendations, and adapt to each user's interests—whether they're foodies, art lovers, or adventure seekers.",
            ],
            highlights: [
                "Information Overload Problem",
                "Personalization Gap in Travel",
                "Natural Language Interaction",
            ],
        },
        {
            title: "The Problem: Generic AI Doesn't Feel Local",
            body: [
                "A basic ChatGPT query about Paris returns generic tourist information. The challenge was engineering a system that feels like talking to a knowledgeable local friend—someone who knows the best croissants in Le Marais, the optimal museum visiting times, and the neighborhoods tourists should avoid.",
                "The key problems to solve: establishing a consistent persona, injecting domain-specific knowledge, and maintaining context across a multi-turn conversation.",
            ],
            highlights: [
                "Generic AI Responses",
                "Persona Consistency Challenge",
                "Context Retention Across Turns",
            ],
        },
        {
            title: "The Solution: Persona-Based Prompt Engineering",
            body: [
                "I designed a system prompt that establishes the AI as a Parisian local with specific personality traits and deep knowledge of the city. The prompt includes instructions for conversational style, areas of expertise, and how to handle different types of queries.",
                "The implementation uses OpenAI's chat completions API with a carefully crafted system message:",
            ],
            highlights: [
                "System Prompt Architecture",
                "Persona Engineering",
                "Expertise Domain Definition",
            ],
        },
        {
            title: "Technical Implementation: The Code",
            body: [
                "```python\nimport openai\n\nSYSTEM_PROMPT = \"\"\"\nYou are Marie, a lifelong Parisian who works as an art curator at the Musée d'Orsay.\nYou have deep knowledge of:\n- Hidden cafés and restaurants that locals love\n- Art history and museum visiting strategies\n- Neighborhood personalities and safety tips\n- Seasonal events and local customs\n\nSpeak warmly but directly, like a friend giving advice.\nAlways ask a follow-up question to understand preferences better.\nAvoid tourist traps unless specifically asked.\n\"\"\"",
                "```python\ndef get_travel_advice(conversation_history: list, user_message: str) -> str:\n    \"\"\"Get personalized Paris travel advice.\"\"\"\n    \n    messages = [{\"role\": \"system\", \"content\": SYSTEM_PROMPT}]\n    messages.extend(conversation_history)\n    messages.append({\"role\": \"user\", \"content\": user_message})\n    \n    response = openai.chat.completions.create(\n        model=\"gpt-4o-mini\",\n        messages=messages,\n        temperature=0.8  # Higher creativity for engaging conversation\n    )\n    \n    assistant_reply = response.choices[0].message.content\n    conversation_history.append({\"role\": \"user\", \"content\": user_message})\n    conversation_history.append({\"role\": \"assistant\", \"content\": assistant_reply})\n    \n    return assistant_reply\n```",
                "The conversation history is maintained between calls, allowing the AI to reference earlier parts of the conversation and build on previous recommendations.",
            ],
            highlights: [
                "Persona System Prompt",
                "Conversation History Management",
                "Temperature Tuning for Creativity",
            ],
        },
        {
            title: "Impact & Future Roadmap",
            body: [
                "The travel guide demonstrates that effective AI assistants require careful prompt engineering, not just raw model capability. The persona approach creates a more engaging experience than generic Q&A.",
                "Future iterations could include: integration with booking APIs for real-time availability, map visualizations for recommended routes, and expansion to other cities using the same modular architecture.",
            ],
            highlights: [
                "Engaging Conversational Experience",
                "Modular Architecture for Expansion",
                "API Integration Potential",
            ],
        },
    ],
};

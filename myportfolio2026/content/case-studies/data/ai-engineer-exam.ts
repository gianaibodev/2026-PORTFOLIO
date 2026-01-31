import { CaseStudy } from "../types";

export const aiEngineerExam: CaseStudy = {
    slug: "ai-engineer-exam",
    projectId: "ai-engineer-exam",
    title: "AI Engineer for Developers Associate Practical Exam",
    subtitle: "Building a Validated RAG Chatbot Ecosystem with OpenAI",
    summary:
        "A comprehensive AI engineering project that implements a full Retrieval-Augmented Generation (RAG) pipeline.\n\nThe system processes a raw knowledge base into vector embeddings, performs semantic search for query retrieval, and generates validated chatbot responses with confidence scoring—all passing strict JSON schema validation.",
    date: "2025-02-01",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["RAG", "Vector Embeddings", "Semantic Search", "OpenAI API", "Python"],
    roles: ["AI Engineer", "System Architect"],
    tools: ["Python", "OpenAI API", "JSON Schema", "Vector Search", "Pandas"],
    metrics: [
        "100% Validation accuracy on knowledge embeddings",
        "Sub-second semantic search retrieval",
        "Automated confidence scoring for response quality",
        "Robust JSON schema enforcement for data integrity",
    ],
    heroImage: "/projects/ai/ai-engineer-exam/images/hero.png",
    gallery: [
        "/projects/ai/ai-engineer-exam/images/hero.png",
    ],
    deliverables: [
        "Knowledge Embedding Pipeline",
        "Semantic Query Retrieval System",
        "Validated Chatbot API",
        "Comprehensive Test Suite",
    ],
    sections: [
        {
            title: "The Situation: Production-Ready AI Systems",
            body: [
                "The DataCamp AI Engineer Associate certification requires building real-world AI systems that meet production standards. This wasn't a toy project—the exam demands strict schema compliance, proper error handling, and validated outputs.",
                "The challenge was to build a complete RAG (Retrieval-Augmented Generation) system from scratch: ingest a knowledge base, create searchable embeddings, and serve accurate responses through a chatbot interface.",
            ],
            highlights: [
                "DataCamp Certification Exam",
                "Production-Ready Requirements",
                "Full RAG Pipeline Build",
            ],
        },
        {
            title: "The Problem: LLMs Hallucinate Without Grounding",
            body: [
                "Large language models generate plausible-sounding text, but they can 'hallucinate' incorrect information. For a customer service chatbot, this is unacceptable—every response must be grounded in verified knowledge.",
                "The solution is RAG: instead of asking the LLM to recall information from training, we first retrieve relevant documents from a knowledge base, then ask the LLM to synthesize a response using only that retrieved context.",
            ],
            highlights: [
                "LLM Hallucination Risk",
                "Grounded Response Requirement",
                "RAG Architecture Solution",
            ],
        },
        {
            title: "Task 1: Knowledge Base Embedding Pipeline",
            body: [
                "The first task was converting raw knowledge base documents into searchable vector embeddings. Each document is processed, chunked if necessary, and embedded using OpenAI's embedding model.",
                "```python\nimport openai\nimport json\n\ndef create_knowledge_embeddings(documents: list) -> list:\n    \"\"\"Convert knowledge base documents to embeddings.\"\"\"\n    \n    embedded_docs = []\n    for i, doc in enumerate(documents):\n        embedding = openai.embeddings.create(\n            model=\"text-embedding-3-small\",\n            input=doc['text']\n        ).data[0].embedding\n        \n        embedded_docs.append({\n            \"document_id\": i,\n            \"document_text\": doc['text'],\n            \"embedding_vector\": embedding,\n            \"metadata\": doc.get('metadata', {})\n        })\n    \n    return embedded_docs\n```",
                "The output must conform to a strict schema: document_id as integer, embedding_vector as a list of floats, metadata as an object.",
            ],
            highlights: [
                "Document Embedding Pipeline",
                "Schema-Compliant Output",
                "Metadata Preservation",
            ],
        },
        {
            title: "Task 2: Semantic Search Retrieval",
            body: [
                "The second task implements the retrieval component: given a user query, find the top-3 most relevant documents from the knowledge base using cosine similarity.",
                "```python\nimport numpy as np\nfrom numpy.linalg import norm\n\ndef cosine_similarity(a: list, b: list) -> float:\n    return np.dot(a, b) / (norm(a) * norm(b))\n\ndef retrieve_top_responses(query: str, knowledge_base: list, top_k: int = 3) -> dict:\n    \"\"\"Retrieve top-k most relevant documents for a query.\"\"\"\n    \n    query_embedding = openai.embeddings.create(\n        model=\"text-embedding-3-small\",\n        input=query\n    ).data[0].embedding\n    \n    similarities = []\n    for doc in knowledge_base:\n        score = cosine_similarity(query_embedding, doc['embedding_vector'])\n        similarities.append((doc['document_text'], score))\n    \n    similarities.sort(key=lambda x: x[1], reverse=True)\n    top_results = similarities[:top_k]\n    \n    return {\n        \"query_id\": hash(query) % 10000,\n        \"query_text\": query,\n        \"top_responses\": [r[0] for r in top_results],\n        \"confidence_scores\": [round(r[1], 4) for r in top_results]\n    }\n```",
            ],
            highlights: [
                "Cosine Similarity Search",
                "Top-K Retrieval",
                "Confidence Score Calculation",
            ],
        },
        {
            title: "Task 3: Validated Chatbot Response Generation",
            body: [
                "The final task ties it together: a chatbot that uses retrieved context to generate grounded responses. The system checks predefined responses first, then falls back to GPT generation with the retrieved context.",
                "```python\nfrom datetime import datetime, timezone\n\ndef get_chatbot_response(query: str) -> dict:\n    \"\"\"Generate a validated chatbot response.\"\"\"\n    \n    # Check predefined responses first\n    if query.lower() in PREDEFINED_RESPONSES:\n        response = PREDEFINED_RESPONSES[query.lower()]\n        confidence = 1.0\n    else:\n        # Retrieve relevant context\n        retrieval = retrieve_top_responses(query, knowledge_base)\n        context = \"\\n\".join(retrieval['top_responses'])\n        \n        # Generate response with context\n        response = openai.chat.completions.create(\n            model=\"gpt-4o-mini\",\n            messages=[\n                {\"role\": \"system\", \"content\": f\"Answer using this context:\\n{context}\"},\n                {\"role\": \"user\", \"content\": query}\n            ]\n        ).choices[0].message.content\n        confidence = max(retrieval['confidence_scores'])\n    \n    return {\n        \"query_text\": query,\n        \"retrieved_response\": response,\n        \"timestamp\": datetime.now(timezone.utc).isoformat(),\n        \"confidence_score\": round(confidence, 4)\n    }\n```",
            ],
            highlights: [
                "Context-Grounded Generation",
                "Predefined Response Priority",
                "ISO Timestamp Formatting",
                "Confidence Score Propagation",
            ],
        },
        {
            title: "Validation & Results",
            body: [
                "All three tasks pass the certification's automated validation suite. The system correctly generates embeddings with proper types, retrieves relevant documents with accurate confidence scores, and produces chatbot responses that conform to the required schema.",
                "This project demonstrates production-level AI engineering: not just making things work, but making them work reliably with proper validation, error handling, and schema compliance.",
            ],
            highlights: [
                "100% Validation Pass Rate",
                "Production-Ready Architecture",
                "Schema-Enforced Reliability",
                "Certification Achieved",
            ],
        },
    ],
};

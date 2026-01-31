import { CaseStudy } from "../types";

export const ecommerceReviewAnalysis: CaseStudy = {
    slug: "ecommerce-review-analysis",
    projectId: "ecommerce-reviews",
    title: "E-commerce Review Analysis with Text Embeddings",
    subtitle:
        "Semantic Analysis and Visualization of Customer Feedback using AI",
    summary:
        "A data science project that applies OpenAI text embeddings and t-SNE dimensionality reduction to analyze and visualize customer reviews from a women's clothing e-commerce dataset, uncovering hidden patterns and sentiment clusters.",
    date: "2025-01-25",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["Text Embeddings", "Data Visualization", "NLP", "E-commerce", "Python"],
    roles: ["Data Scientist", "ML Engineer"],
    tools: ["Python", "OpenAI API", "ChromaDB", "scikit-learn", "Matplotlib", "t-SNE"],
    metrics: [
        "Semantic clustering of 23,000+ customer reviews",
        "2D visualization of high-dimensional embeddings",
        "Automated sentiment pattern detection",
        "Product category clustering analysis",
    ],
    heroImage: "/projects/ai/ecommerce-review-analysis/images/clothing.jpg",
    gallery: [
        "/projects/ai/ecommerce-review-analysis/images/clothing.jpg",
    ],
    deliverables: [
        "Text Embedding Pipeline",
        "t-SNE Visualization System",
        "ChromaDB Vector Storage",
        "Interactive Analysis Notebook",
    ],
    sections: [
        {
            title: "Project Context",
            body: [
                "Customer reviews are a goldmine of insights for e-commerce businesses, but analyzing thousands of text reviews manually is impractical. This project demonstrates how AI-powered text embeddings can transform unstructured feedback into actionable intelligence.",
                "Using the Women's Clothing E-Commerce Reviews dataset, we apply state-of-the-art embedding techniques to map reviews into a semantic vector space where similar opinions cluster together naturally.",
            ],
            highlights: [
                "23,000+ Reviews Analyzed",
                "Semantic Vector Mapping",
                "Automated Insight Discovery",
            ],
        },
        {
            title: "Technical Approach",
            body: [
                "OpenAI's embedding models convert each review into a high-dimensional vector that captures semantic meaning. These vectors are stored in ChromaDB for efficient similarity search and retrieval.",
                "t-SNE (t-distributed Stochastic Neighbor Embedding) reduces the dimensionality to 2D for visualization, revealing natural clusters of similar reviews. Matplotlib creates clear visualizations that highlight sentiment patterns and product category groupings.",
            ],
            highlights: [
                "OpenAI Text Embeddings",
                "ChromaDB Vector Database",
                "t-SNE Dimensionality Reduction",
            ],
        },
        {
            title: "Insights & Applications",
            body: [
                "The visualization reveals distinct clusters corresponding to positive vs. negative sentiment, product fit issues, quality concerns, and style preferences. These insights can drive product improvements and marketing strategies.",
                "The methodology is applicable to any text analysis task: support tickets, social media monitoring, competitor analysis, and more. The embedding approach captures nuanced meaning that keyword-based methods miss.",
            ],
            highlights: [
                "Sentiment Pattern Discovery",
                "Product Feedback Clustering",
                "Scalable to Any Domain",
            ],
        },
    ],
};

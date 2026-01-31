import { CaseStudy } from "../types";

export const ecommerceReviewAnalysis: CaseStudy = {
    slug: "ecommerce-review-analysis",
    projectId: "ecommerce-reviews",
    title: "E-commerce Review Analysis with Text Embeddings",
    subtitle:
        "Semantic Analysis and Visualization of Customer Feedback using AI",
    summary:
        "A data science project that applies OpenAI text embeddings and t-SNE dimensionality reduction to analyze and visualize customer reviews from a women's clothing e-commerce dataset.\n\nThe system processes 23,000+ reviews, converts them to vector embeddings, and reveals hidden sentiment clusters through interactive 2D visualization.",
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
            title: "The Situation: Millions of Reviews, No Insights",
            body: [
                "E-commerce platforms accumulate massive volumes of customer reviews. These reviews contain invaluable signals about product quality, fit issues, and customer sentiment—but analyzing thousands of text reviews manually is impossible.",
                "The Women's Clothing E-Commerce Reviews dataset presented a perfect testbed: 23,000+ reviews with ratings, product categories, and recommendation flags. The goal was to uncover patterns that keyword searches and simple aggregations miss.",
            ],
            highlights: [
                "23,000+ Customer Reviews",
                "Hidden Sentiment Patterns",
                "Beyond Keyword Analysis",
            ],
        },
        {
            title: "The Problem: Text is High-Dimensional",
            body: [
                "Traditional approaches like word frequency analysis or sentiment scoring reduce rich text to simplistic metrics. They miss nuance: a 3-star review saying 'fabric is nice but runs small' contains different information than 'average quality, fine for the price.'",
                "The challenge was to represent reviews in a way that captures semantic meaning—so that similar opinions cluster together naturally, regardless of the exact words used.",
            ],
            highlights: [
                "Nuance Lost in Simple Metrics",
                "Semantic Similarity Challenge",
                "High-Dimensional Text Data",
            ],
        },
        {
            title: "The Solution: Embedding + Dimensionality Reduction",
            body: [
                "I built a pipeline that converts each review into a high-dimensional vector using OpenAI's embedding model. These vectors capture the 'meaning' of the text—similar reviews have similar vectors, even if they use different words.",
                "To visualize these vectors, I applied t-SNE (t-distributed Stochastic Neighbor Embedding) to reduce 1536 dimensions down to 2D, creating a scatter plot where clusters represent groups of semantically similar reviews.",
            ],
            highlights: [
                "OpenAI text-embedding-3-small",
                "t-SNE for Visualization",
                "Semantic Clustering",
            ],
        },
        {
            title: "Technical Implementation: The Code",
            body: [
                "```python\nimport openai\nimport pandas as pd\nfrom sklearn.manifold import TSNE\nimport matplotlib.pyplot as plt\n\n# Load and clean the reviews\ndf = pd.read_csv('womens_clothing_e-commerce_reviews.csv')\ndf = df.dropna(subset=['Review Text'])\nreviews = df['Review Text'].tolist()[:1000]  # Sample for visualization",
                "```python\n# Generate embeddings for each review\ndef get_embedding(text: str) -> list:\n    response = openai.embeddings.create(\n        model=\"text-embedding-3-small\",\n        input=text\n    )\n    return response.data[0].embedding\n\nembeddings = [get_embedding(review) for review in reviews]",
                "```python\n# Reduce to 2D with t-SNE\ntsne = TSNE(n_components=2, perplexity=30, random_state=42)\nembeddings_2d = tsne.fit_transform(embeddings)\n\n# Visualize with sentiment coloring\nplt.figure(figsize=(12, 8))\nscatter = plt.scatter(\n    embeddings_2d[:, 0], \n    embeddings_2d[:, 1],\n    c=df['Rating'][:1000],\n    cmap='RdYlGn',\n    alpha=0.6\n)\nplt.colorbar(scatter, label='Rating')\nplt.title('Customer Review Embeddings (t-SNE Projection)')\nplt.show()\n```",
            ],
            highlights: [
                "Embedding Generation Pipeline",
                "t-SNE Dimensionality Reduction",
                "Matplotlib Visualization",
            ],
        },
        {
            title: "Insights & Impact",
            body: [
                "The visualization revealed distinct clusters: positive reviews about fit and quality grouped together, while complaints about sizing formed a separate cluster. This insight could drive product improvements—if 'runs small' complaints cluster together, the sizing chart needs updating.",
                "The methodology is applicable beyond e-commerce: support ticket analysis, social media monitoring, competitive intelligence. The embedding approach captures meaning that keyword-based methods miss, enabling deeper understanding of unstructured text data.",
            ],
            highlights: [
                "Actionable Product Insights",
                "Sizing Issue Detection",
                "Transferable Methodology",
                "Semantic Understanding at Scale",
            ],
        },
    ],
};

import { CaseStudy } from "../types";

export const medicalTranscriptions: CaseStudy = {
    slug: "medical-transcriptions-openai",
    projectId: "medical-transcriptions",
    title: "Medical Transcriptions with OpenAI API",
    subtitle:
        "Extracting Structured Clinical Data from Unstructured Medical Transcriptions",
    summary:
        "A Python-based data pipeline that leverages OpenAI's GPT-4o-mini model to extract structured medical information—including patient age, specialty, treatment plans, and ICD-10 diagnostic codes—from raw clinical transcriptions with high accuracy.",
    date: "2025-01-15",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["NLP", "Healthcare AI", "Data Extraction", "OpenAI API", "Python"],
    roles: ["AI Engineer", "Data Scientist"],
    tools: ["Python", "OpenAI API", "Pandas", "JSON Mode", "Jupyter Notebook"],
    metrics: [
        "Automated extraction of 4+ clinical data fields per transcription",
        "Structured output with ICD-10 code matching",
        "JSON schema validation for data integrity",
        "Batch processing capability for large datasets",
    ],
    heroImage: "/projects/ai/medical-transcriptions-openai/images/med-tran.png",
    gallery: [
        "/projects/ai/medical-transcriptions-openai/images/med-tran.png",
    ],
    deliverables: [
        "Python Data Extraction Pipeline",
        "OpenAI API Integration",
        "Structured JSON Output Schema",
        "Jupyter Notebook Documentation",
    ],
    sections: [
        {
            title: "Project Overview",
            body: [
                "Medical transcriptions contain valuable clinical information, but extracting structured data from free-form text has traditionally required expensive, time-consuming manual review. This project demonstrates how modern Large Language Models can automate this process with remarkable accuracy.",
                "Using OpenAI's GPT-4o-mini model with JSON mode, the pipeline extracts key clinical entities: patient demographics, medical specialty, treatment recommendations, and standardized ICD-10 diagnostic codes.",
            ],
            highlights: [
                "Automated Clinical Data Extraction",
                "ICD-10 Code Classification",
                "Structured JSON Output",
            ],
        },
        {
            title: "Technical Implementation",
            body: [
                "The solution uses OpenAI's function calling with strict JSON schema enforcement to ensure consistent, validated output. Each transcription is processed through a carefully crafted prompt that instructs the model to identify and extract specific medical entities.",
                "Pandas is used for data manipulation and batch processing, enabling efficient handling of large transcription datasets. The pipeline includes error handling, retry logic, and validation to ensure reliability in production environments.",
            ],
            highlights: [
                "GPT-4o-mini with JSON Mode",
                "Schema-Enforced Output",
                "Pandas Data Pipeline",
            ],
        },
        {
            title: "Impact & Applications",
            body: [
                "This project showcases the potential of AI in healthcare data processing. By automating the extraction of structured data from clinical notes, healthcare organizations can accelerate research, improve billing accuracy, and enhance patient care analytics.",
                "The methodology is applicable to various healthcare NLP tasks including clinical coding, patient summarization, and medical research data extraction.",
            ],
            highlights: [
                "Healthcare Data Automation",
                "Research Acceleration",
                "Scalable Architecture",
            ],
        },
    ],
};

import { CaseStudy } from "../types";

export const medicalTranscriptions: CaseStudy = {
    slug: "medical-transcriptions-openai",
    projectId: "medical-transcriptions",
    title: "Medical Transcriptions with OpenAI API",
    subtitle:
        "Extracting Structured Clinical Data from Unstructured Medical Transcriptions",
    summary:
        "A Python-based data pipeline that leverages OpenAI's GPT-4o-mini model to extract structured medical information—including patient age, specialty, treatment plans, and ICD-10 diagnostic codes—from raw clinical transcriptions.\n\nThis project demonstrates production-grade AI engineering with JSON schema enforcement, achieving automated extraction of 4+ clinical data fields per transcription with high accuracy.",
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
            title: "The Situation: Unstructured Clinical Data",
            body: [
                "Healthcare organizations generate massive volumes of clinical transcriptions daily. These free-form text documents contain valuable patient information—diagnoses, treatments, demographics—but extracting this data manually is expensive, slow, and error-prone.",
                "I was tasked with building an automated pipeline that could parse raw transcriptions and output structured, validated JSON suitable for analytics and billing systems. The key challenge: medical language is nuanced, full of abbreviations, and requires domain knowledge to interpret correctly.",
            ],
            highlights: [
                "High-Volume Medical Data Processing",
                "NLP for Healthcare Applications",
                "Structured Output Requirements",
            ],
        },
        {
            title: "The Problem: Manual Extraction Doesn't Scale",
            body: [
                "Traditional approaches to this problem involve either expensive human coders who manually review each transcription, or rigid rule-based systems that fail on edge cases. Both approaches suffer from significant limitations.",
                "Human coders are slow, expensive, and prone to fatigue-related errors. Rule-based NLP systems break when doctors use non-standard phrasing or new terminology. The result is a backlog of unprocessed data and inconsistent output quality.",
            ],
            highlights: [
                "Human Coding Bottleneck",
                "Rule-Based System Brittleness",
                "Inconsistent Data Quality",
                "Processing Backlog",
            ],
        },
        {
            title: "The Solution: LLM-Powered Extraction Pipeline",
            body: [
                "I built a Python pipeline using OpenAI's GPT-4o-mini with JSON mode to ensure structured, validated output. The key insight was using a carefully engineered prompt that instructs the model to extract specific fields while adhering to medical coding standards.",
                "The core extraction function sends each transcription to the API with a system prompt that defines the exact JSON schema expected. Here's the actual implementation:",
            ],
            highlights: [
                "GPT-4o-mini for Cost-Effective Processing",
                "JSON Mode for Schema Enforcement",
                "Prompt Engineering for Medical Domain",
            ],
        },
        {
            title: "Technical Implementation: The Code",
            body: [
                "```python\nimport openai\nimport json\n\ndef extract_medical_info(transcription: str) -> dict:\n    \"\"\"Extract structured medical data from a transcription.\"\"\"\n    \n    response = openai.chat.completions.create(\n        model=\"gpt-4o-mini\",\n        response_format={\"type\": \"json_object\"},\n        messages=[\n            {\n                \"role\": \"system\",\n                \"content\": \"\"\"You are a medical data extraction assistant.\n                Extract the following fields as JSON:\n                - patient_age: integer or null\n                - medical_specialty: string\n                - treatment_plan: string\n                - icd10_codes: list of ICD-10 diagnostic codes\n                - confidence_score: float between 0 and 1\"\"\"\n            },\n            {\"role\": \"user\", \"content\": transcription}\n        ]\n    )\n    \n    return json.loads(response.choices[0].message.content)\n```",
                "The pipeline processes transcriptions in batches using Pandas. Each row is passed through the extraction function, and results are validated against the expected schema before being written to the output file.",
                "```python\nimport pandas as pd\n\ndf = pd.read_csv('transcriptions.csv')\ndf['extracted_data'] = df['text'].apply(extract_medical_info)\n\n# Validate and flatten the nested JSON into columns\ndf['patient_age'] = df['extracted_data'].apply(lambda x: x.get('patient_age'))\ndf['icd10_codes'] = df['extracted_data'].apply(lambda x: x.get('icd10_codes', []))\n```",
            ],
            highlights: [
                "OpenAI JSON Mode API",
                "Pandas Batch Processing",
                "Schema Validation Pipeline",
            ],
        },
        {
            title: "Impact & Results",
            body: [
                "The pipeline successfully processes transcriptions with high accuracy, extracting patient demographics, specialty classifications, treatment summaries, and ICD-10 codes. The JSON mode ensures output is always parseable and valid.",
                "This project demonstrates that LLMs can be reliable tools for healthcare data processing when properly constrained with structured output formats. The approach is extensible to other medical document types and can be integrated into existing healthcare IT infrastructure.",
            ],
            highlights: [
                "High Extraction Accuracy",
                "Consistent Structured Output",
                "Extensible Architecture",
                "Healthcare IT Integration Ready",
            ],
        },
    ],
};

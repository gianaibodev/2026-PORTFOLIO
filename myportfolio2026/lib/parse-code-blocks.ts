// Helper to parse markdown-style code blocks from text (can be used server-side)
export function parseCodeBlocks(text: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
    const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];

    // Matches: ```language\nCODE``` or ```language\nCODE\n```
    // The closing ``` can be preceded by optional whitespace/newline
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
            const textContent = text.slice(lastIndex, match.index).trim();
            if (textContent) {
                parts.push({ type: 'text', content: textContent });
            }
        }

        // Add code block — trim trailing newline only, preserve internal whitespace
        const rawCode = match[2];
        // Remove one trailing newline if present (from the \n before ```)
        const cleanCode = rawCode.endsWith('\n') ? rawCode.slice(0, -1) : rawCode;

        parts.push({
            type: 'code',
            content: cleanCode,
            language: match[1] || 'text',
        });

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < text.length) {
        const textContent = text.slice(lastIndex).trim();
        if (textContent) {
            parts.push({ type: 'text', content: textContent });
        }
    }

    // If no matches found, return original as plain text
    if (parts.length === 0) {
        parts.push({ type: 'text', content: text });
    }

    return parts;
}

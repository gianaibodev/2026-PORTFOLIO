"use client";

import { useState } from "react";
import { Check, Copy, Terminal, Code2, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    output?: string;
    showLineNumbers?: boolean;
    className?: string;
}

// Robust syntax highlighting using a tokenization approach to avoid overlapping replacements
function highlightTokens(code: string, rules: { regex: RegExp; className: string; wrap?: (match: string) => string }[]): string {
    let escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    let result = "";
    let pos = 0;

    while (pos < escapedCode.length) {
        let bestMatch: { index: number; length: number; className: string; content: string; wrap?: (match: string) => string } | null = null;

        for (const rule of rules) {
            rule.regex.lastIndex = pos;
            const match = rule.regex.exec(escapedCode);
            if (match && (bestMatch === null || match.index < bestMatch.index)) {
                bestMatch = {
                    index: match.index,
                    length: match[0].length,
                    className: rule.className,
                    content: match[0],
                    wrap: rule.wrap
                };
            }
        }

        if (bestMatch && bestMatch.index === pos) {
            const content = bestMatch.wrap ? bestMatch.wrap(bestMatch.content) : bestMatch.content;
            result += `<span class="${bestMatch.className}">${content}</span>`;
            pos += bestMatch.length;
        } else {
            const nextMatchIndex = bestMatch ? bestMatch.index : escapedCode.length;
            result += escapedCode.slice(pos, nextMatchIndex);
            pos = nextMatchIndex;
        }
    }

    return result;
}

function highlightPython(code: string): string {
    const rules = [
        { regex: /#[^\n]*/g, className: "text-emerald-400 italic" },
        { regex: /"""[\s\S]*?"""|'''[\s\S]*?'''/g, className: "text-amber-300" },
        { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, className: "text-amber-300" },
        { regex: /\b(import|from|def|class|return|if|else|elif|for|while|try|except|with|as|in|not|and|or|True|False|None|lambda|async|await|yield|raise|pass|break|continue)\b/g, className: "text-pink-400 font-medium" },
        {
            regex: /\b(print|len|range|str|int|float|list|dict|set|tuple|open|type|isinstance|enumerate|zip|map|filter|sorted|reversed|sum|min|max|abs|round|input|format|hash|append)(?=\s*\()/g,
            className: "text-cyan-400"
        },
        { regex: /(?<=def\s+)\w+/g, className: "text-blue-400 font-semibold" },
        { regex: /(?<=class\s+)\w+/g, className: "text-yellow-400 font-semibold" },
        { regex: /@\w+/g, className: "text-yellow-500" },
        { regex: /\b\d+\.?\d*\b/g, className: "text-orange-400" },
        { regex: /(?<=:\s*)(str|int|float|bool|list|dict|tuple|set|None|Any)\b/g, className: "text-teal-400" }
    ];
    return highlightTokens(code, rules);
}

function highlightJS(code: string): string {
    const rules = [
        { regex: /\/\/[^\n]*/g, className: "text-emerald-400 italic" },
        { regex: /\/\*[\s\S]*?\*\//g, className: "text-emerald-400 italic" },
        { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, className: "text-amber-300" },
        { regex: /\b(const|let|var|function|return|if|else|for|while|try|catch|throw|new|class|extends|import|export|from|default|async|await|typeof|instanceof|true|false|null|undefined|this|super)\b/g, className: "text-pink-400 font-medium" },
        { regex: /\b\d+\.?\d*\b/g, className: "text-orange-400" },
        { regex: /=>/g, className: "text-pink-400" }
    ];
    return highlightTokens(code, rules);
}

function highlightCode(code: string, language: string): string {
    const lang = language.toLowerCase();
    if (lang === 'python' || lang === 'py') return highlightPython(code);
    if (['javascript', 'js', 'typescript', 'ts', 'jsx', 'tsx'].includes(lang)) return highlightJS(code);
    return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function CodeBlock({
    code,
    language = "python",
    filename,
    output,
    showLineNumbers = true,
    className,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const highlightedFull = highlightCode(code, language);
    const highlightedLines = highlightedFull.split('\n');
    const rawLines = code.split('\n');

    return (
        <div
            className={cn("relative group rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-3xl w-full", className)}
            suppressHydrationWarning
        >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#161b22] border-b border-white/10 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden flex-1">
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/80" />
                    </div>

                    {filename && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#0d1117] border border-white/10 min-w-0 overflow-hidden">
                            <Code2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            <span className="text-[10px] font-mono text-zinc-400 truncate tracking-tight">{filename}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1.5 px-1.5 sm:px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-400">{language}</span>
                    </div>
                </div>

                <button
                    onClick={handleCopy}
                    aria-label={copied ? "Copied!" : "Copy code"}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[10px] sm:text-xs font-medium text-zinc-400 hover:text-white flex-shrink-0 cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Content - Container Div (Removed <pre> to avoid invalid <table> nesting) */}
            <div className="w-full relative bg-[#0d1117]">
                {showLineNumbers ? (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse table-auto border-spacing-0 font-mono text-[11px] sm:text-[13px] leading-6 sm:leading-7">
                            <tbody>
                                {rawLines.map((_, i) => (
                                    <tr key={i} className="group/line hover:bg-white/[0.04] transition-colors">
                                        <td
                                            className="w-[3rem] sm:w-[4rem] min-w-[3rem] sm:min-w-[4rem] py-0 pr-3 sm:pr-4 text-right text-zinc-600 select-none border-r border-white/5 text-[9px] sm:text-[11px] align-top bg-[#0d1117] group-hover/line:text-zinc-400 transition-colors"
                                        >
                                            {i + 1}
                                        </td>
                                        <td className="py-0 pl-3 sm:pl-5 text-zinc-300 whitespace-pre-wrap break-normal align-top leading-6 sm:leading-7">
                                            <span dangerouslySetInnerHTML={{ __html: highlightedLines[i] ?? '' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-4 whitespace-pre-wrap break-normal text-zinc-300 font-mono text-[11px] sm:text-[13px] leading-6 sm:leading-7">
                        <span dangerouslySetInnerHTML={{ __html: highlightedFull }} />
                    </div>
                )}
            </div>

            {/* Terminal Output */}
            {output && (
                <div className="border-t border-white/10">
                    <div className="flex items-center gap-2 px-4 py-1.5 sm:py-2 bg-[#1c2128] border-b border-white/5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Terminal Output</span>
                        <Play className="w-3 h-3 text-emerald-400 ml-auto animate-pulse" />
                    </div>
                    <div className="p-3 sm:p-4 bg-[#0a0e14] font-mono text-xs sm:text-sm">
                        <div className="flex items-start gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed m-0">{output}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

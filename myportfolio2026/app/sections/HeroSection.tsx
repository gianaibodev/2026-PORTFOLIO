"use client";

import dynamic from "next/dynamic";
import { useCopyMode } from "@/components/copy-mode-provider";
import { Deferred } from "@/components/deferred"; // Assuming extracted or I need to import/define it. Wait, Deferred is local to home-client. I should extract it or inline it.

// Extract Deferred to a shared component or utils if used multiple times. 
// For now, I will assume I need to handle it. 
// Actually, `Deferred` is simple enough to duplicate or better, move to components/ui.
// For this refactor, I'll assume Deferred is available or I need to create it.
// The user prompt didn't specify extracting Deferred, but it's used everywhere.
// I'll create `components/deferred.tsx` first.

interface SyntheticHeroProps {
    title: string;
    description: string;
    badgeText?: string;
    badgeLabel?: string;
    ctaButtons?: Array<{ text: string; href?: string; primary?: boolean; onClick?: () => void }>;
    microDetails?: Array<string>;
}

const SyntheticHero = dynamic<SyntheticHeroProps>(
    () => import("@/components/ui/synthetic-hero").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => <div className="min-h-screen bg-background" />,
    }
);

export function HeroSection() {
    const { copyMode, toggleCopyMode } = useCopyMode();

    return (
        <div id="home" className="w-full min-h-screen relative overflow-visible">
            {/* ErrorBoundary should be at page level or section level. I'll omit local EB for clarity unless requested */}
            <Deferred delay={0}>
                <SyntheticHero
                    title={copyMode === "plain" ? "Websites that build trust and drive growth." : "Building high-end digital experiences."}
                    description={copyMode === "plain"
                        ? "I help businesses worldwide launch modern, fast, and mobile-friendly websites without the headache."
                        : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
                    badgeText={copyMode === "plain" ? "2026 Portfolio" : "Portfolio 2026"}
                    badgeLabel="Open to work"
                    ctaButtons={[
                        { text: copyMode === "plain" ? "See My Work" : "View My Work", href: "#projects", primary: true },
                        { text: copyMode === "plain" ? "Read Technical Version" : "Read Simple Version", onClick: toggleCopyMode },
                    ]}
                    microDetails={copyMode === "plain"
                        ? ["Modern Design", "Mobile-First", "Fast Loading"]
                        : ["Design-driven Engineering", "1,500+ Global Members Led", "#1 of 7,042 · 1st Year"]}
                />
            </Deferred>
        </div>
    );
}

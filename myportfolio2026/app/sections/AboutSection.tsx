"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopyMode } from "@/components/copy-mode-provider";
import { GradesModal } from "@/components/academic-modals";

const EDUCATION = [
    { school: "University of St. La Salle", detail: "BS Computer Science, 2021-2025", honor: "Cum Laude, GWA 1.3 / 97%" },
    { school: "Liceo De La Salle", detail: "Senior High School, STEM", honor: "With Highest Honors, 98%" },
    { school: "Holy Infant Academy", detail: "Junior High School", honor: "Highest Honors, Rank 1, 98.2%" },
    { school: "Holy Infant Academy", detail: "Primary School", honor: "Valedictorian, 97.4%" },
];

const CERTIFICATIONS = ["11x Google Certified", "3x Canva Designer", "IBM Certified", "7x Microsoft Trophies"];

function FactList({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export function AboutSection() {
    const { copyMode } = useCopyMode();
    const [showGrades, setShowGrades] = useState(false);
    const plain = copyMode === "plain";

    return (
        <section id="about" className="section scroll-mt-20">
            <div className="wrap grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <div className="flex items-center gap-5">
                        <Image
                            src="/lib/image.jpeg"
                            alt="Portrait of Gian Aibo C. Boyero"
                            width={160}
                            height={160}
                            className="size-20 rounded-full object-cover md:size-24"
                        />
                        <h2 className="heading">About Me</h2>
                    </div>

                    <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted-foreground">
                        {plain ? (
                            <>
                                <p>
                                    I&apos;m <span className="font-medium text-foreground">Gian Aibo C. Boyero</span>, a designer and developer who builds websites that work. I recently graduated with honors, but my focus is 100% on delivering real results for clients.
                                </p>
                                <p>
                                    Whether you need a simple landing page or a full online store, I handle the technical details so you can focus on your business. I value clear communication, hitting deadlines, and making things look professional.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    I&apos;m <span className="font-medium text-foreground">Gian Aibo C. Boyero</span>, a Computer Science graduate (Class 2025) from the University of St. La Salle, where I achieved <span className="text-foreground">Cum Laude</span> honors with a 1.3 (97%) GPA.
                                </p>
                                <p>
                                    My academic journey is marked by excellence: I ranked <span className="text-foreground">#1 of 7,042</span> across all colleges in my first year. I blend technical rigor with a deep passion for visual storytelling and community leadership.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2">
                        {plain ? (
                            <>
                                <FactList title="My Focus" items={["Web Design & Dev", "E-commerce (Shopify)", "Brand Strategy"]} />
                                <FactList title="Values" items={["Reliability", "Fast Delivery", "Clear Communication"]} />
                            </>
                        ) : (
                            <>
                                <FactList title="Leadership" items={["President, DEVCON Bacolod", "CEO, GDG on Campus USLS", "Creatives Co-head, GDG Bacolod"]} />
                                <FactList title="Key Wins" items={["Most Outstanding Student (Visual Arts & Service)", "National Creative Awards (Best Art Direction)", "Google Role Model of the Year", "Outstanding Intern & Legacy Builder"]} />
                            </>
                        )}
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link href="/about" className="btn btn-primary">Know More About Me</Link>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-quiet">View Resume</a>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <h3 className="text-xl font-medium tracking-tight">Education</h3>
                    <ol className="mt-6 space-y-6 border-l border-border pl-6">
                        {EDUCATION.map((entry) => (
                            <li key={entry.detail} className="reveal">
                                <p className="font-medium text-foreground">{entry.school}</p>
                                <p className="mt-0.5 text-sm text-muted-foreground">{entry.detail}</p>
                                <p className="mt-0.5 text-sm text-blue-600 dark:text-blue-300">{entry.honor}</p>
                            </li>
                        ))}
                    </ol>
                    <button type="button" onClick={() => setShowGrades(true)} className="link-arrow mt-6">
                        View Full Transcript
                    </button>
                    <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{CERTIFICATIONS.join(", ")}</p>
                </div>
            </div>
            <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
        </section>
    );
}

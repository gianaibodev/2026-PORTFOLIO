"use client";

import { useCopyMode } from "@/components/copy-mode-provider";

export function StatementSection() {
    const { copyMode } = useCopyMode();
    const plain = copyMode === "plain";

    return (
        <section className="section">
            <figure className="wrap reveal">
                <blockquote className="max-w-5xl text-pretty text-3xl font-medium leading-[1.15] tracking-[-0.025em] text-muted-foreground sm:text-4xl lg:text-[3.5rem]">
                    {plain ? (
                        <>
                            <em>Reliability</em> is my main currency. I turn <em>messy ideas</em> into{" "}
                            <em>clean, profitable websites</em> that you&apos;ll be proud to show off.
                        </>
                    ) : (
                        <>
                            <em>Great software</em> isn&apos;t just code. It&apos;s <em>communication</em>. I bridge the gap
                            between <em>complex engineering</em> and <em>human experience</em>.
                        </>
                    )}
                </blockquote>
                <figcaption className="mt-8 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Gian Aibo C. Boyero</span>
                    <br />
                    {plain ? "Designer & Developer" : "Software Engineer & Community Leader"}
                </figcaption>
            </figure>
        </section>
    );
}

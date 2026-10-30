import { CountUp } from "@/components/count-up";

const PROOF = [
    { prefix: "#1 of ", value: 7042, suffix: "", label: "students across all colleges in my first year" },
    { prefix: "", value: 1500, suffix: "+", label: "global community members led" },
    { prefix: "", value: 32, suffix: "", label: "professional certifications" },
    { prefix: "", value: 8, suffix: "+", label: "years of design experience" },
];

export function ProofSection() {
    return (
        <section aria-label="Achievements" className="wrap pt-16 md:pt-24">
            <dl className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {PROOF.map((item) => (
                    <div key={item.label}>
                        <dt className="text-4xl font-medium tracking-[-0.03em] text-foreground md:text-5xl">
                            <CountUp prefix={item.prefix} value={item.value} suffix={item.suffix} />
                        </dt>
                        <dd className="mt-2 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">{item.label}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

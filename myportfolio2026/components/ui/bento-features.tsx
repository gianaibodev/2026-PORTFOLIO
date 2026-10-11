import type { CSSProperties } from "react";
import type { CaseStudy, CaseStudyFeature } from "@/content/case-studies/types";
import { cn } from "@/lib/utils";
import { FEATURE_PREVIEWS } from "@/components/ui/feature-previews";

const SIZE_CLASS: Record<CaseStudyFeature["size"], string> = {
  normal: "",
  wide: "sm:col-span-2",
  tall: "lg:row-span-2",
  hero: "sm:col-span-2 lg:row-span-2",
};

const DEFAULT_THEME = { accent: "#60a5fa", surface: "#0b1020", tile: "#111827" };

type Theme = NonNullable<CaseStudy["theme"]>;

export function BentoFeatures({ features, theme }: { features: CaseStudyFeature[]; theme?: Theme }) {
  const t = theme ?? DEFAULT_THEME;
  const vars = { "--accent": t.accent, "--surface": t.surface, "--tile": t.tile } as CSSProperties;

  return (
    <section
      aria-labelledby="bento-heading"
      style={vars}
      className="rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[var(--surface)] p-4 sm:p-8 text-white"
    >
      <div className="flex items-end justify-between gap-4 pb-6 sm:pb-8">
        <div className="space-y-3">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            <span className="h-px w-8 bg-[var(--accent)]" aria-hidden />
            Inside the product
          </p>
          <h2 id="bento-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            What I built
          </h2>
        </div>
        <p className="hidden sm:block text-sm text-white/50 tabular-nums">
          {String(features.length).padStart(2, "0")} screens
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(190px,auto)] gap-3 sm:gap-4">
        {features.map((feature, index) => {
          const Preview = feature.preview ? FEATURE_PREVIEWS[feature.preview] : null;
          const hasImage = !Preview && Boolean(feature.image);
          return (
            <article
              key={feature.title}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[var(--tile)] transition-colors duration-300 hover:border-[var(--accent)]",
                SIZE_CLASS[feature.size],
              )}
            >
              {Preview ? (
                <div className="relative flex-1 min-h-[120px] p-4">
                  <Preview />
                </div>
              ) : null}
              {hasImage ? (
                <div className="relative flex w-full flex-1 items-center justify-center">
                  {/* Natural aspect ratio, never cropped. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image as string}
                    alt={`${feature.title} screen`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="relative space-y-2 border-t border-white/10 p-5 sm:p-6">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  <span className="tabular-nums text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                  {feature.kicker ? <span>{feature.kicker}</span> : null}
                  {feature.stat ? <span className="ml-auto text-sm normal-case tracking-normal text-white">{feature.stat}</span> : null}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight break-words">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/65 break-words">{feature.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

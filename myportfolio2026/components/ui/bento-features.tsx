import Image from "next/image";
import {
  Zap,
  Shield,
  Smartphone,
  Users,
  Calendar,
  Gift,
  BookOpen,
  Layers,
  Sparkles,
  Route,
  Puzzle,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import type { CaseStudyFeature } from "@/content/case-studies/types";
import { cn } from "@/lib/utils";
import { FEATURE_PREVIEWS } from "@/components/ui/feature-previews";

const ICONS: Record<CaseStudyFeature["icon"], LucideIcon> = {
  zap: Zap,
  shield: Shield,
  smartphone: Smartphone,
  users: Users,
  calendar: Calendar,
  gift: Gift,
  book: BookOpen,
  layers: Layers,
  sparkles: Sparkles,
  route: Route,
  puzzle: Puzzle,
  monitor: Monitor,
};

const SIZE_CLASS: Record<CaseStudyFeature["size"], string> = {
  normal: "",
  wide: "sm:col-span-2",
  tall: "lg:row-span-2",
  hero: "sm:col-span-2 lg:row-span-2",
};

export function BentoFeatures({ features }: { features: CaseStudyFeature[] }) {
  return (
    <section className="space-y-6" aria-labelledby="bento-heading">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Features</p>
        <h2 id="bento-heading" className="text-3xl font-semibold">
          What I built
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(190px,auto)] gap-4 md:gap-5">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon];
          const Preview = feature.preview ? FEATURE_PREVIEWS[feature.preview] : null;
          const hasImage = !Preview && Boolean(feature.image);
          return (
            <div
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-[28px] border border-zinc-300 dark:border-white/10 bg-white/5 dark:bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-end gap-4 transition-colors duration-500 hover:border-zinc-500 dark:hover:border-white/25",
                SIZE_CLASS[feature.size],
              )}
            >
              {Preview ? (
                <div className="relative z-10 flex-1 min-h-[120px]">
                  <Preview />
                </div>
              ) : null}
              {hasImage ? (
                <>
                  <Image
                    src={feature.image as string}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
                </>
              ) : (
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-colors duration-700 group-hover:bg-blue-500/20" />
              )}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                    <Icon className={cn("size-5", hasImage ? "text-white" : "text-blue-500 dark:text-blue-300")} />
                  </div>
                  {feature.stat ? (
                    <span className={cn("text-2xl font-semibold", hasImage ? "text-white" : "text-foreground")}>
                      {feature.stat}
                    </span>
                  ) : null}
                </div>
                <h3 className={cn("text-lg sm:text-xl font-semibold break-words", hasImage ? "text-white" : "text-foreground")}>
                  {feature.title}
                </h3>
                <p className={cn("text-sm leading-relaxed break-words", hasImage ? "text-gray-200" : "text-muted-foreground")}>
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

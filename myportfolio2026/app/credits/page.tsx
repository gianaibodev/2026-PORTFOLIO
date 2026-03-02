"use client";

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { PixelHeader } from "@/components/ui/pixel-header";
import { Code2, Palette, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

const libraries = [
  { name: "Next.js", href: "https://nextjs.org", desc: "React framework" },
  { name: "React", href: "https://react.dev", desc: "UI library" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com", desc: "Styling" },
  { name: "Framer Motion", href: "https://www.framer.com/motion", desc: "Animation" },
  { name: "Radix UI", href: "https://www.radix-ui.com", desc: "Components" },
  { name: "Three.js & React Three Fiber", href: "https://docs.pmnd.rs/react-three-fiber", desc: "3D" },
  { name: "OGL", href: "https://github.com/oframe/ogl", desc: "WebGL" },
  { name: "@paper-design/shaders-react", href: "https://github.com/paper-design/shaders-react", desc: "Shaders" },
  { name: "GSAP", href: "https://gsap.com", desc: "Animation" },
  { name: "Spline", href: "https://spline.design", desc: "3D scenes" },
  { name: "Lucide", href: "https://lucide.dev", desc: "Icons" },
  { name: "next-themes", href: "https://github.com/pacocoursey/next-themes", desc: "Theme" },
  { name: "tw-animate-css", href: "https://github.com/jhukdev/tw-animate-css", desc: "Animations" },
];

// Add artists, designers, collaborators here — replace or add entries: { name, role, href (or null) }
const artistsAndDesigners: { name: string; role: string; href: string | null }[] = [
  { name: "—", role: "Add artists & designers you’ve collaborated with", href: null },
];

const developersAndCollaborators: { name: string; role: string; href: string | null }[] = [
  { name: "—", role: "Add developers & collaborators", href: null },
];

function CreditCard({
  name,
  href,
  desc,
  icon: Icon,
}: {
  name: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl border border-zinc-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-4 sm:p-5 hover:border-zinc-400 dark:hover:border-white/20 hover:bg-white/70 dark:hover:bg-white/[0.05] transition-all"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-200/80 dark:bg-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-zinc-600 dark:text-white/70" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </a>
  );
}

function PersonCard({
  name,
  role,
  href,
}: {
  name: string;
  role: string;
  href: string | null;
}) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" as const }
    : {};
  return (
    <Wrapper
      {...props}
      className={`flex items-start gap-4 rounded-2xl border border-zinc-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-4 sm:p-5 ${href ? "hover:border-zinc-400 dark:hover:border-white/20 hover:bg-white/70 dark:hover:bg-white/[0.05] transition-all group" : ""}`}
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 dark:from-blue-400/20 dark:to-violet-400/20 flex items-center justify-center">
        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-foreground ${href ? "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" : "text-muted-foreground"}`}>{name}</span>
          {href && <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{role}</p>
      </div>
    </Wrapper>
  );
}

export default function CreditsPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="Credits" />

      <PixelHeader
        title="Credits"
        subtitle="Libraries, components, and the people who helped make this portfolio possible."
        colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-4 sm:pt-8 space-y-16">
        {/* Attributes coming soon */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Attributes Coming Soon</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A proper credits and attribution update is in progress. All sources, collaborators, and assets will be properly documented here.
          </p>
        </section>

        <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

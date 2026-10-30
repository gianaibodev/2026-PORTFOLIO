import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FeaturedProject = {
    slug: string;
    title: string;
    category: string;
    year: number;
    image: string;
};

// Column spans out of 12, read in pairs so each row closes on the grid edge.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];

export function FeaturedWorkSection({ projects }: { projects: FeaturedProject[] }) {
    return (
        <section id="projects" className="section scroll-mt-20">
            <div className="wrap">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                    <h2 className="heading">Featured Projects</h2>
                    <Link href="/projects" className="link-arrow group">
                        View All Projects
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </Link>
                </div>

                <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-12 md:gap-y-16">
                    {projects.map((project, index) => (
                        <li key={project.slug} className={cn("reveal", SPANS[index % SPANS.length])}>
                            <Link href={`/blog/${project.slug}`} className="group block rounded-2xl">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-[clamp(260px,31vw,460px)]">
                                    <Image
                                        src={project.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                    />
                                </div>
                                <div className="mt-4 flex items-baseline justify-between gap-6">
                                    <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-300">
                                        {project.title}
                                    </h3>
                                    <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{project.year}</p>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

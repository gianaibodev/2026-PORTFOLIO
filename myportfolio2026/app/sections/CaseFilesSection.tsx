import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CaseFile = { slug: string; title: string; subtitle: string; category: string; year: number; image: string; result: string };

// Real projects that pin and stack as you scroll, driven by CSS alone.
export function CaseFilesSection({ files }: { files: CaseFile[] }) {
    return (
        <section aria-labelledby="case-files-heading" className="wrap py-16 md:py-24">
            <h2 id="case-files-heading" className="heading">A closer look</h2>
            <ol className="case-stack mt-10 md:mt-14" style={{ "--cases": files.length } as React.CSSProperties}>
                {files.map((file, index) => (
                    <li key={file.slug} className="case-slot" style={{ "--i": index } as React.CSSProperties}>
                        <Link href={`/blog/${file.slug}`} className="case-file group">
                            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                                <Image src={file.image} alt="" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
                                <p className="text-sm text-muted-foreground">{file.category}, {file.year}</p>
                                <div>
                                    <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl">{file.title}</h3>
                                    <p className="mt-3 text-muted-foreground">{file.subtitle}</p>
                                    <p className="mt-6 border-t border-border pt-4 text-sm text-foreground">{file.result}</p>
                                </div>
                                <ArrowUpRight className="size-6 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" aria-hidden />
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
        </section>
    );
}

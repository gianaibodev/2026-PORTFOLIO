import Image from "next/image";
import Link from "next/link";

type IndexStudy = { slug: string; title: string; category: string; year: number; heroImage: string };

// Every project as one typographic list. On desktop the hovered project's image
// trails the cursor: the images are display:none until hover, so none load until wanted.
export function WorkIndex({ studies }: { studies: IndexStudy[] }) {
    return (
        <section aria-labelledby="work-index-heading" className="wrap pb-24">
            <h2 id="work-index-heading" className="heading">Every project</h2>
            <ol className="work-index spotlight mt-10">
                {studies.map((study) => (
                    <li key={study.slug}>
                        <Link href={`/blog/${study.slug}`} className="work-row">
                            <span className="work-title">{study.title}</span>
                            <span className="work-meta">{study.category}, {study.year}</span>
                            <Image src={study.heroImage} alt="" width={340} height={225} loading="lazy" className="work-thumb" />
                        </Link>
                    </li>
                ))}
            </ol>
        </section>
    );
}

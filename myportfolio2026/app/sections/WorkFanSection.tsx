import Image from "next/image";
import Link from "next/link";

type FanProject = {
    slug: string;
    title: string;
    image: string;
};

// A wall of work rising out of the hero. Pure CSS: the cards deal outward as
// the section scrolls in (see .fan in globals.css), and phones get a swipeable
// rail, so this adds no JavaScript.
export function WorkFanSection({ projects }: { projects: FanProject[] }) {
    const middle = (projects.length - 1) / 2;

    return (
        <section aria-label="More work" className="relative z-10 -mt-20 md:-mt-48">
            <ul className="fan">
                {projects.map((project, index) => (
                    <li
                        key={project.slug}
                        className="fan-slot"
                        style={{
                            "--offset": index - middle,
                            "--distance": Math.abs(index - middle),
                            zIndex: projects.length - Math.ceil(Math.abs(index - middle)),
                        } as React.CSSProperties}
                    >
                        <Link href={`/blog/${project.slug}`} className="fan-card group">
                            <Image src={project.image} alt="" fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" />
                            <span className="fan-title">{project.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

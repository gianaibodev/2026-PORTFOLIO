import Image from "next/image";

const LOGOS = [
    { src: "/framer/framer-19.png", alt: "Google" },
    { src: "/framer/framer-18.png", alt: "Google Developer Groups" },
    { src: "/framer/framer-04.png", alt: "Armada Brands" },
    { src: "/framer/framer-22.png", alt: "DEVCON Bacolod" },
    { src: "/framer/framer-13.png", alt: "Tigris Publication" },
    { src: "/framer/framer-12.png", alt: "DreamTheory" },
];

// Several marks are dark or full colour, so each sits on its own light tile
// rather than being flattened to a silhouette.
export function LogosSection() {
    return (
        <section aria-label="Organizations" className="pb-8">
            <ul className="wrap grid grid-cols-3 gap-3 md:grid-cols-6">
                {LOGOS.map((logo) => (
                    <li key={logo.src} className="relative h-20 rounded-2xl bg-zinc-100 md:h-24">
                        <Image src={logo.src} alt={logo.alt} fill sizes="200px" className="object-contain p-5" />
                    </li>
                ))}
            </ul>
        </section>
    );
}

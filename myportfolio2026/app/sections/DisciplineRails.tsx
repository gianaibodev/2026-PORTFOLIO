const TOP = ["Brand Identity", "UI/UX", "Motion", "3D", "Brand Identity", "UI/UX", "Motion", "3D"];
const BOTTOM = ["Illustration", "Photography", "Event Design", "Illustration", "Photography", "Event Design"];

// Two rows that travel in opposite directions, driven only by scroll position,
// so nothing runs while the page is still.
function Rail({ words, className }: { words: string[]; className: string }) {
    return (
        <div className={`rail ${className}`}>
            {words.map((word, index) => (
                <span key={`${word}-${index}`}>{word}</span>
            ))}
        </div>
    );
}

export function DisciplineRails() {
    return (
        <section aria-label="Brand identity, UI/UX, motion, 3D, illustration, photography and event design" className="overflow-x-clip py-16 md:py-24">
            <div aria-hidden>
                <Rail words={TOP} className="rail-left" />
                <Rail words={BOTTOM} className="rail-right" />
            </div>
        </section>
    );
}

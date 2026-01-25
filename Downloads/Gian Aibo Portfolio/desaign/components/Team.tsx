export function Team() {
  return (
    <section id="team" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <h2 className="font-playfair italic text-4xl md:text-5xl mb-16 text-center">Meet the creators</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="group">
            <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                {/* Placeholder Image - using a gradient or color block if no image */}
                <div className="w-full h-full bg-neutral-800" />
            </div>
            <h3 className="font-playfair text-3xl mb-2">Gian Aibo</h3>
            <p className="font-inter font-thin uppercase tracking-widest text-gold-base text-xs">Lead Designer & Engineer</p>
        </div>

        <div className="group md:mt-24">
             <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                <div className="w-full h-full bg-neutral-800" />
            </div>
            <h3 className="font-playfair text-3xl mb-2">Leigh Andrew</h3>
            <p className="font-inter font-thin uppercase tracking-widest text-gold-base text-xs">Creative Director</p>
        </div>
      </div>
    </section>
  );
}

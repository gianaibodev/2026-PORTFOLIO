interface PixelHeaderProps {
  title: string;
  subtitle?: string;
  categoryIcon?: React.ReactNode;
  categoryText?: string;
  backLink?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The shared inner-page header. It carries the hero's gradient as a quiet echo
 * so the pages read as one site, and stays a Server Component with no WebGL.
 */
export function PixelHeader({ title, subtitle, categoryIcon, categoryText, backLink, children }: PixelHeaderProps) {
  return (
    <header className="relative isolate w-full overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden className="hero-canvas-wrapper absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="wrap pb-10 sm:pb-14">
        {backLink && <div className="rise mb-6">{backLink}</div>}
        {(categoryIcon || categoryText) && (
          <div className="rise mb-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300">
            {categoryIcon}
            {categoryText && <p>{categoryText}</p>}
          </div>
        )}
        <h1 className="rise rise-1 max-w-4xl text-balance text-4xl font-medium leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="rise rise-2 mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
        {children && <div className="rise rise-3 mt-6">{children}</div>}
      </div>
    </header>
  );
}

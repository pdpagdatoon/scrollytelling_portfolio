interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-2)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-paper)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)]">{description}</p>
      ) : null}
    </header>
  );
}
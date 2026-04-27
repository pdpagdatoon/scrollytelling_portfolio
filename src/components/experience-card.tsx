import type { Experience } from "@/types/portfolio";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-[var(--color-card-bg)] p-6 backdrop-blur-md transition-all duration-200 hover:border-white/15">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold text-[var(--color-paper)]">{experience.role}</h3>
        <p className="text-xs font-medium text-[var(--color-accent-2)]">{experience.period}</p>
      </div>
      <p className="mt-2 text-sm font-medium text-[var(--color-accent-1)]">{experience.company}</p>
      <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[var(--color-muted)]">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2"><span className="text-[var(--color-accent-2)] flex-shrink-0">•</span><span>{highlight}</span></li>
        ))}
      </ul>
    </article>
  );
}
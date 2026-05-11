import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const availableLinks = [
    project.liveUrl && !project.liveUrl.includes(["example", "com"].join("."))
      ? { label: "Live Site", href: project.liveUrl }
      : null,
    project.repoUrl && /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(project.repoUrl)
      ? { label: "Source", href: project.repoUrl }
      : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <article className="card-highlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl">
      {project.featured ? (
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-[var(--color-accent-1)]/0 via-[var(--color-accent-1)]/60 to-[var(--color-accent-1)]/0" />
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-[var(--color-paper)]">{project.title}</h3>
        {project.type ? (
          <span className="rounded-full border border-[var(--color-accent-2)]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-accent-2)]">
            {project.type}
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>
      {project.description ? (
        <p className="mt-3 border-l-2 border-[var(--color-accent-2)]/40 pl-3 text-sm leading-6 italic text-[var(--color-muted)]">
          {project.description}
        </p>
      ) : null}
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-accent-2)]"
          >
            {tech}
          </li>
        ))}
      </ul>
      {availableLinks.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {availableLinks.map((link) => (
            <a
              key={link.label}
              className="text-[var(--color-accent-1)] transition-colors hover:text-[var(--color-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-xs italic text-[var(--color-muted)]">Links coming soon</p>
      )}
    </article>
  );
}
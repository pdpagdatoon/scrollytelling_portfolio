import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card-highlight group flex h-full flex-col rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-[var(--color-paper)]">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>
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
      <div className="mt-6 flex gap-4 text-sm font-semibold">
        <a
          className="text-[var(--color-accent-1)] hover:text-[var(--color-paper)] transition-colors"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
        >
          Live Site
        </a>
        <a
          className="text-[var(--color-accent-1)] hover:text-[var(--color-paper)] transition-colors"
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </div>
    </article>
  );
}
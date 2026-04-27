import { ExperienceCard } from "@/components/experience-card";
import { PrCampaignCard } from "@/components/pr-campaign-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillPill } from "@/components/skill-pill";
import { PostShowcase } from "@/components/post-showcase";
import { portfolioService } from "@/services/portfolioService";
import { readdir } from "node:fs/promises";

export default async function Home() {
  const portfolio = await portfolioService.getPortfolio();

  // Pull every image from public/posts so new uploads appear automatically.
  const postFiles = await readdir("public/posts");
  const allPostImages = postFiles
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((file) => `/posts/${encodeURIComponent(file)}`);

  return (
    <main className="relative overflow-x-hidden bg-[var(--color-ink)]">
      <div className="ambient-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-10 sm:pt-16 lg:px-16">
        <div className="fade-up space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              {portfolio.location}
            </p>
            <h1 className="mt-3 text-5xl font-bold leading-tight tracking-tight text-[var(--color-paper)] sm:text-6xl lg:text-7xl">
              {portfolio.name}
            </h1>
            <p className="mt-2 text-2xl font-light text-[var(--color-accent-1)]">{portfolio.role}</p>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {portfolio.intro}
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {portfolio.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Social and Design Work */}
      {allPostImages.length > 0 ? (
        <PostShowcase images={allPostImages} campaigns={portfolio.prCampaigns} />
      ) : null}

      {/* Resume Highlights Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="fade-up space-y-8" style={{ animationDelay: "120ms" }}>
          <SectionTitle
            eyebrow="What I Bring"
            title="Core capabilities and expertise"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {portfolio.resumeHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-xl border border-white/10 bg-[var(--color-card-bg)] p-6 backdrop-blur-md hover:border-white/15 transition-colors"
              >
                <h3 className="text-base font-semibold text-[var(--color-paper)]">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{highlight.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="fade-up space-y-8" style={{ animationDelay: "170ms" }}>
          <SectionTitle
            eyebrow="Selected Work"
            title="Products built for speed and durability"
            description="Each project demonstrates clear architecture, reusable systems, and user-first execution."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="fade-up space-y-8" style={{ animationDelay: "150ms" }}>
          <SectionTitle
            eyebrow="Capabilities"
            title="Tools I trust in production"
          />
          <div className="flex flex-wrap gap-2">
            {portfolio.skills.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="fade-up space-y-8" style={{ animationDelay: "180ms" }}>
          <SectionTitle
            eyebrow="Experience"
            title="Engineering leadership with practical delivery"
          />
          <div className="space-y-4">
            {portfolio.experience.map((experience) => (
              <ExperienceCard key={`${experience.company}-${experience.role}`} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* PR Campaigns Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="fade-up space-y-8" style={{ animationDelay: "240ms" }}>
          <SectionTitle
            eyebrow="PR Work"
            title="Campaigns and social execution"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {portfolio.prCampaigns.map((campaign) => (
              <PrCampaignCard key={`${campaign.organization}-${campaign.title}`} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="fade-up" style={{ animationDelay: "270ms" }}>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-1)] font-semibold">Ready to work together</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-paper)] sm:text-5xl">
                Let&apos;s build something great.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
                Currently available for web development, UX design collaboration, and student projects.
              </p>
              <a
                href={`mailto:${portfolio.contactEmail}`}
                className="mt-8 inline-flex rounded-lg bg-[var(--color-accent-1)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-accent-2)] hover:shadow-lg"
              >
                {portfolio.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

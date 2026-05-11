import { ExperienceCard } from "@/components/experience-card";
import { AnimateIn } from "@/components/animate-in";
import { Footer } from "@/components/footer";
import { PrCampaignCard } from "@/components/pr-campaign-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillPill } from "@/components/skill-pill";
import { SkillGroup } from "@/components/skill-group";
import { PostShowcase } from "@/components/post-showcase";
import { SideRail } from "@/components/side-rail";
import { portfolioService } from "@/services/portfolioService";
import { readdir } from "node:fs/promises";
import Image from "next/image";

const sideRailLinks = [
  { label: "Home", targetId: "about", icon: "/icons/home-svgrepo-com.svg" },
  { label: "Projects", targetId: "projects", icon: "/icons/folder-svgrepo-com.svg" },
  { label: "Campaigns", targetId: "campaigns", icon: "/icons/megaphone-solid-svgrepo-com.svg" },
  { label: "Social Media & Design", targetId: "social-work", icon: "/icons/images-svgrepo-com.svg" },
  { label: "Contact", targetId: "contact", icon: "/icons/email-1572-svgrepo-com.svg" },
];

export default async function Home() {
  const portfolio = await portfolioService.getPortfolio();
  const totalSkillCount = portfolio.skillGroups?.flatMap((group) => group.skills).length ?? portfolio.skills.length;

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
    <>
    <main className="relative overflow-x-hidden bg-[var(--color-ink)] pt-16">
      <div className="ambient-glow" />

      <SideRail links={sideRailLinks} />

      {/* Hero Section */}
      <section
        id="about"
        className="mx-auto flex max-w-7xl flex-col-reverse gap-12 px-6 pb-16 pt-12 sm:px-10 sm:pt-16 md:flex-row md:items-center lg:px-16"
      >
        <AnimateIn delay={0} className="order-2 flex-1 space-y-6 md:order-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-2)]">
              {portfolio.location}
            </p>
            <h1 className="mt-3 text-5xl font-bold leading-tight tracking-tight text-[var(--color-paper)] sm:text-6xl lg:text-7xl">
              {portfolio.name}
            </h1>
            <p className="mt-2 text-2xl font-light text-[var(--color-accent-1)]">{portfolio.role}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships & projects — May 2027 graduation</span>
            </div>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {portfolio.intro}
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {portfolio.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={90} className="order-1 flex flex-shrink-0 justify-center md:order-2 md:justify-end">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent-1)] to-[var(--color-accent-2)] opacity-60 blur-md" />
            <Image src={portfolio.profilePhoto ?? "/profile.jpg"} alt={`${portfolio.name} — profile photo`} width={280} height={280} priority className="relative h-48 w-48 rounded-full border-2 border-white/20 object-cover md:h-64 md:w-64" />
          </div>
        </AnimateIn>
      </section>

      {/* Selected Work Section */}
      <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16">
        <AnimateIn delay={170} className="space-y-8">
          <SectionTitle
            eyebrow="Projects"
            title="Projects I've built and shipped"
            description="Each project demonstrates clear architecture, reusable systems, and user-first execution."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Skills Section */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16">
        <AnimateIn delay={150} className="space-y-8">
          <SectionTitle
            eyebrow="Capabilities"
            title="Tools I've worked with"
          />
          <span className="mt-1 block text-xs font-medium text-[var(--color-muted)]">
            {totalSkillCount} technologies
          </span>
          {portfolio.skillGroups ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.skillGroups.map((group) => (
                <SkillGroup key={group.category} group={group} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          )}
        </AnimateIn>
      </section>

      <section id="campaigns" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16">
        <AnimateIn delay={180} className="space-y-8">
          <SectionTitle
            eyebrow="Campaigns"
            title="Campaigns"
          />
          <div className="space-y-5">
            {portfolio.prCampaigns.map((campaign) => (
              <PrCampaignCard key={`${campaign.organization}-${campaign.title}`} campaign={campaign} />
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Social Media and Graphic Design Work */}
      <section id="social-work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16">
        <AnimateIn delay={210} className="space-y-8">
          <SectionTitle
            eyebrow="Social Media and Graphic Design work"
            title="Social Media and Graphic Design work"
          />
          {allPostImages.length > 0 ? <PostShowcase images={allPostImages} campaigns={portfolio.prCampaigns} /> : null}
        </AnimateIn>
      </section>

      {/* CTA Section */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16">
        <AnimateIn delay={270} className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-1)] font-semibold">
            Ready to work together
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-paper)] sm:text-5xl">
            Let&apos;s build something great.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
            Currently available for web development, UX design collaboration, and student projects.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${portfolio.contactEmail}`}
              className="inline-flex rounded-lg bg-[var(--color-accent-1)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-accent-2)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            >
              {portfolio.contactEmail}
            </a>
            <a
              href="https://github.com/pdpagdatoon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-[var(--color-accent-1)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--color-accent-1)] transition-all hover:bg-[var(--color-accent-1)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            >
              View GitHub
            </a>
            <a
              href="https://linkedin.com/in/patrick-david-pagdatoon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-[var(--color-accent-1)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--color-accent-1)] transition-all hover:bg-[var(--color-accent-1)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            >
              LinkedIn
            </a>
          </div>
        </AnimateIn>
      </section>
    </main>
      <Footer portfolioData={portfolio} />
    </>
  );
}

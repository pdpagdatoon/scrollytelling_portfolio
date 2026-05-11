import type { PortfolioData } from "@/types/portfolio";

interface FooterProps {
  portfolioData: PortfolioData;
}

export function Footer({ portfolioData }: FooterProps) {
  const links = portfolioData.socialLinks.filter((link) =>
    ["LinkedIn", "GitHub", "Email"].includes(link.label),
  );

  return (
    <footer className="bg-[var(--color-dark-bg)] border-t border-white/10 py-8 text-sm text-[var(--color-muted)] text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:px-10 lg:px-16">
        <p>© 2025 Patrick David Pagdatoon · Built with Next.js</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-all duration-300 hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
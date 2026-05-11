"use client";

import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Campaigns", href: "#campaigns" },
  { label: "Social Work", href: "#social-work" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("about");

  const navClassName = useMemo(
    () =>
      `fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        scrolled ? "bg-[var(--color-dark-bg)]/90 backdrop-blur-md" : "bg-transparent"
      }`,
    [scrolled],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    navLinks.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const linkClassName = (href: string) =>
    `transition-all duration-300 hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
      activeId === href.slice(1) ? "text-[var(--color-accent-1)]" : "text-[var(--color-paper)]/85"
    }`;

  return (
    <nav className={navClassName} role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <a
          href="#about"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-paper)] transition-all duration-300 hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
        >
          PDP
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClassName(link.href)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:pdpagdatoon@gmail.com"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-[var(--color-paper)] transition-all duration-300 hover:border-[var(--color-accent-1)] hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] md:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--color-paper)] transition-all duration-300 hover:border-[var(--color-accent-1)] hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] md:hidden"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[60] bg-[var(--color-ink)]/95 backdrop-blur-lg md:hidden">
          <div
            id="mobile-navigation-panel"
            className="mx-auto flex h-full max-w-7xl flex-col px-6 pb-10 pt-24 sm:px-10"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-2)]">
                Main navigation
              </p>
              <button
                type="button"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-[var(--color-paper)] transition-all duration-300 hover:border-[var(--color-accent-1)] hover:text-[var(--color-accent-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                onClick={closeMobileMenu}
              >
                Close
              </button>
            </div>

            <div className="mt-10 flex flex-1 flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`rounded-2xl border border-white/10 px-5 py-4 text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
                    activeId === link.href.slice(1)
                      ? "bg-white/10 text-[var(--color-accent-1)]"
                      : "text-[var(--color-paper)]/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="mailto:pdpagdatoon@gmail.com"
                onClick={closeMobileMenu}
                className="mt-auto inline-flex items-center justify-center rounded-full border border-[var(--color-accent-1)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-1)] transition-all duration-300 hover:bg-[var(--color-accent-1)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
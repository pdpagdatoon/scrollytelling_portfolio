"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface SideRailLink {
  label: string;
  targetId?: string;
  href?: string;
  isExternal?: boolean;
  icon?: string | null;
}

interface SideRailProps {
  links: SideRailLink[];
}

export function SideRail({ links }: SideRailProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionIds = useMemo(
    () => links.flatMap((link) => (link.targetId ? [link.targetId] : [])),
    [links],
  );

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let closestSectionId = sectionIds[0] ?? null;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionCenter = sectionTop + rect.height / 2;
        const isViewportCenterInsideSection = sectionTop <= viewportCenter && sectionBottom >= viewportCenter;
        const distanceToCenter = isViewportCenterInsideSection ? 0 : Math.abs(sectionCenter - viewportCenter);

        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          closestSectionId = sectionId;
        }
      });

      setActiveId((currentActiveId) => (currentActiveId === closestSectionId ? currentActiveId : closestSectionId));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  const scrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-3 xl:right-8">
      <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-[var(--color-dark-bg)]/65 p-3 shadow-2xl shadow-black/20 backdrop-blur-md">
        {links.map((link) => {
          const isExternal = link.isExternal || !!link.href;

          if (isExternal) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
                className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[var(--color-paper)] transition-all duration-300 hover:-translate-x-0.5 hover:border-[var(--color-accent-1)] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
              >
                <span className="sr-only">{link.label}</span>
                {link.icon ? (
                  <Image
                    src={link.icon}
                    alt=""
                    width={22}
                    height={22}
                    aria-hidden="true"
                    className="h-5 w-5 brightness-0 invert opacity-85 transition-all duration-300 group-hover:opacity-100"
                  />
                ) : (
                  <span className="text-xs font-bold opacity-85 transition-all duration-300 group-hover:opacity-100">in</span>
                )}
              </a>
            );
          }

          return (
            <button
              key={link.targetId}
              type="button"
              onClick={() => link.targetId && scrollToSection(link.targetId)}
              aria-label={link.label}
              title={link.label}
              className={`group inline-flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
                activeId === link.targetId
                  ? "border-[var(--color-accent-1)] bg-white/15 text-[var(--color-accent-1)]"
                  : "border-white/10 bg-white/8 text-[var(--color-paper)] hover:border-[var(--color-accent-1)] hover:bg-white/15"
              }`}
            >
              <span className="sr-only">{link.label}</span>
              {link.icon && (
                <Image
                  src={link.icon}
                  alt=""
                  width={22}
                  height={22}
                  aria-hidden="true"
                  className={`h-5 w-5 brightness-0 invert transition-all duration-300 ${
                    activeId === link.targetId ? "opacity-100" : "opacity-85 group-hover:opacity-100"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
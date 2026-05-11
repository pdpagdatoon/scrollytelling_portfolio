"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEventHandler, TouchEvent } from "react";
import Image from "next/image";
import type { PrCampaign } from "@/types/portfolio";
import { AnimateIn } from "./animate-in";

interface PostShowcaseProps {
  images: string[];
  campaigns: PrCampaign[];
}

function fileNameFromPath(path: string) {
  return decodeURIComponent(path.split("/").pop() ?? "");
}

function labelFromImagePath(path: string) {
  const raw = fileNameFromPath(path) || "Post";
  return raw.replace(/\.[a-zA-Z0-9]+$/, "");
}

export function PostShowcase({ images, campaigns }: PostShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState("All");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const imageMeta = useMemo(() => {
    return images.map((src) => {
      const imageFileName = fileNameFromPath(src);
      const matchedCampaign = campaigns.find((campaign) =>
        campaign.postImages.some((imagePath) => fileNameFromPath(imagePath) === imageFileName),
      );

      return {
        src,
        label: labelFromImagePath(src),
        campaign: matchedCampaign?.organization ?? "General",
      };
    });
  }, [images, campaigns]);

  const campaignFilters = useMemo(() => {
    const distinct = Array.from(new Set(imageMeta.map((item) => item.campaign)));
    return ["All", ...distinct];
  }, [imageMeta]);

  const filteredImages = useMemo(() => {
    if (activeCampaign === "All") {
      return imageMeta;
    }

    return imageMeta.filter((item) => item.campaign === activeCampaign);
  }, [imageMeta, activeCampaign]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCampaign]);

  useEffect(() => {
    const autoRotateTimer = setInterval(() => {
      setActiveIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(autoRotateTimer);
  }, [filteredImages.length]);

  if (images.length === 0 || filteredImages.length === 0) {
    return null;
  }

  const activeItem = filteredImages[activeIndex] ?? filteredImages[0];

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyNavigation: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;

    if (delta > 44) {
      goToPrevious();
    }

    if (delta < -44) {
      goToNext();
    }

    setTouchStartX(null);
  };

  return (
    <>
      <AnimateIn delay={90} className="grid gap-8 lg:grid-cols-12">
        <aside className="white-surface space-y-6 rounded-2xl p-6 lg:col-span-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-2)]">
              Design Portfolio
            </p>
            <h2 className="text-2xl font-bold leading-tight text-[var(--color-paper)]">
              Social media and graphic design work
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 border-y border-white/10 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">Total Posts</p>
              <p className="mt-1 text-3xl font-semibold text-white">{images.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">Visible</p>
              <p className="mt-1 text-3xl font-semibold text-white">{filteredImages.length}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">Filter Campaign</p>
            <div className="flex flex-wrap gap-2">
              {campaignFilters.map((campaign) => {
                const isActiveFilter = campaign === activeCampaign;

                return (
                  <button
                    key={campaign}
                    onClick={() => setActiveCampaign(campaign)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
                      isActiveFilter
                        ? "border-white bg-white text-[var(--color-ink)]"
                        : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {campaign}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="space-y-3 text-sm text-[var(--color-muted)]">
            {campaigns.map((campaign) => (
              <li key={`${campaign.organization}-${campaign.title}`} className="rounded-lg border border-white/15 bg-white/10 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent-1)]">
                  {campaign.organization}
                </p>
                <p className="mt-1 font-medium text-[var(--color-paper)]">{campaign.title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-4 lg:col-span-8">
          <div
            className="white-surface rounded-2xl p-4 sm:p-6"
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
            aria-label="Post showcase, use left and right arrow keys"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#081429]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {!loadedImages[activeItem.src] ? <div className="shimmer absolute inset-0" /> : null}
              <Image key={activeItem.src} src={activeItem.src} alt={activeItem.label} fill className={`object-contain p-2 transition-all duration-500 ${loadedImages[activeItem.src] ? "opacity-100" : "opacity-0"}`} sizes="(max-width: 1024px) 100vw, 720px" priority onLoad={() => setLoadedImages((previous) => ({ ...previous, [activeItem.src]: true }))} />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[var(--color-paper)]">{activeItem.label}</p>
                <p className="text-xs tracking-[0.1em] text-[var(--color-muted)] uppercase">{activeItem.campaign}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={goToPrevious}
                  className="rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                  aria-label="Previous post"
                >
                  Prev
                </button>
                <button
                  onClick={goToNext}
                  className="rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                  aria-label="Next post"
                >
                  Next
                </button>
                <p className="text-xs tracking-[0.12em] text-[var(--color-muted)]">
                  {activeIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15" aria-hidden="true">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / filteredImages.length) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              Tip: Use thumbnails, buttons, campaign filters, keyboard arrows, or swipe on mobile.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {filteredImages.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={image.src}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
                    isActive
                      ? "border-[var(--color-accent-1)] ring-1 ring-[var(--color-accent-1)]"
                      : "border-white/10 hover:border-white/40"
                  }`}
                  aria-label={`View ${image.label}`}
                  title={image.label}
                >
                  {!loadedImages[image.src] ? <div className="shimmer absolute inset-0" /> : null}
                  <Image src={image.src} alt={image.label} fill className={`object-cover transition duration-200 group-hover:scale-[1.02] ${loadedImages[image.src] ? "opacity-100" : "opacity-0"}`} sizes="(max-width: 1024px) 20vw, 140px" onLoad={() => setLoadedImages((previous) => ({ ...previous, [image.src]: true }))} />
                </button>
              );
            })}
          </div>
        </div>
      </AnimateIn>
    </>
  );
}

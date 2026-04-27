"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-full max-w-sm md:max-w-md">
          <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/10 bg-[#081429]">
            <Image
              src={images[currentIndex]}
              alt={`Campaign post ${currentIndex + 1}`}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 90vw, 420px"
              priority
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 rounded-lg border border-white/20 bg-white/8 p-3 text-[var(--color-accent-1)] transition-all hover:border-white/40 hover:bg-white/12"
            aria-label="Previous post"
          >
            ←
          </button>

          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-[var(--color-accent-1)]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex-shrink-0 rounded-lg border border-white/20 bg-white/8 p-3 text-[var(--color-accent-1)] transition-all hover:border-white/40 hover:bg-white/12"
            aria-label="Next post"
          >
            →
          </button>
        </div>
      )}

      <p className="text-xs text-[var(--color-muted)] text-center font-light">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}

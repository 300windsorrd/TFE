"use client";
import * as React from 'react';
import type { HeroImage } from '../../types';

type Props = { images: HeroImage[]; className?: string };

export function HeroCarousel({ images, className }: Props) {
  const total = images.length;
  const [index, setIndex] = React.useState(0);
  const id = React.useId();

  React.useEffect(() => {
    if (!total || total === 1) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  React.useEffect(() => {
    if (!total) return;
    setIndex((current) => {
      if (current < total) return current;
      return 0;
    });
  }, [total]);

  const showNext = React.useCallback(() => {
    if (total <= 1) return;
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const showPrev = React.useCallback(() => {
    if (total <= 1) return;
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  if (!total) return null;
  const curr = images[index];

  return (
    <div
      className={
        `relative aspect-[16/9] w-full overflow-hidden rounded-lg border-[11px] border-[color:var(--color-carousel-border)] md:aspect-[16/9] ${
          className ?? ''
        }`
      }
    >
      <img src={curr.src} alt={curr.alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={showPrev}
            className="group absolute left-3 top-[60%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="sr-only">Previous slide</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M15 6 9 12l6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={showNext}
            className="group absolute right-3 top-[60%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="sr-only">Next slide</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="m9 6 6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={`${id}-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            type="button"
          />
        ))}
      </div>
      {curr.attribution && (
        <div className="absolute right-2 top-2 text-xs text-white/70">{curr.attribution}</div>
      )}
    </div>
  );
}


import * as React from 'react';
import { cn } from '../utils/cn';

type ReviewScore = { label: string; score: string };

type Review = {
  id: string;
  label: string;
  quote: string;
  rating: number;
  priceRange: string;
  timeframe: string;
  isNew?: boolean;
  experiences: string[];
  scores?: ReviewScore[];
};

type ReviewsProps = {
  reviews: Review[];
  doordashUrl: string;
  grubhubUrl: string;
  googleReviewsUrl: string;
  restaurantName?: string;
  priceRange?: string;
};

const defaultScores: ReviewScore[] = [
  { label: 'Food', score: '5/5' },
  { label: 'Service', score: '5/5' },
  { label: 'Atmosphere', score: '5/5' }
];

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l2.35 5.73 6.15.53-4.64 4.04 1.38 5.9L12 15.89l-5.24 3.31 1.38-5.9-4.64-4.04 6.15-.53z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const scores = review.scores && review.scores.length ? review.scores : defaultScores;
  const totalStars = Math.max(1, Math.min(5, Math.round(review.rating)));
  const timeframeText = review.isNew ? `NEW | ${review.timeframe}` : review.timeframe;

  return (
    <article className="relative flex w-[320px] shrink-0 snap-center flex-col gap-5 rounded-3xl border border-theme-subtle bg-theme-surface-strong p-7 text-theme-primary shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex flex-col gap-3">
        <span
          className={cn(
            'inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide whitespace-nowrap',
            review.isNew
              ? 'border-[color:var(--color-brandRed)]/40 bg-[color:var(--color-brandRed)]/15 text-[color:var(--color-brandRed)]'
              : 'border-theme-subtle bg-theme-surface text-theme-subtle'
          )}
        >
          {timeframeText}
        </span>
        <div className="flex items-center gap-3 text-base">
          <span
            className="flex items-center gap-1"
            aria-label={`${totalStars} star${totalStars > 1 ? 's' : ''} out of 5`}
          >
            {Array.from({ length: totalStars }).map((_, index) => (
              <StarIcon key={index} className="h-5 w-5 text-[#f4ab2d]" />
            ))}
          </span>
        </div>
        {review.experiences.length > 0 ? (
          <div className="mt-4 flex gap-2 overflow-x-auto text-[11px] uppercase tracking-wide text-theme-soft scrollbar-none">
            {review.experiences.map((experience) => (
              <span
                key={experience}
                className="rounded-full border border-theme-subtle/70 bg-theme-surface px-3 py-[5px] whitespace-nowrap"
              >
                {experience}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-theme-muted">"{review.quote}"</p>
      <div className="flex flex-wrap gap-2 text-[11px]">
        {scores.map((score) => (
          <span
            key={`${review.id}-${score.label}`}
            className="rounded-full border border-theme-subtle bg-theme-surface px-3 py-[5px] font-medium uppercase tracking-wide text-theme-subtle"
          >
            {score.label} {score.score}
          </span>
        ))}
      </div>
      <footer className="border-t border-theme-subtle pt-4 text-xs uppercase tracking-wide text-theme-soft">{review.label}</footer>
    </article>
  );
}

export function Reviews({ reviews, doordashUrl, grubhubUrl, googleReviewsUrl, restaurantName, priceRange }: ReviewsProps) {
  if (!reviews?.length) return null;

  const structuredData = React.useMemo<Record<string, unknown> | null>(() => {
    if (!reviews.length) return null;

    const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
    const reviewEntries = reviews.map((review, index) => {
      const authorName = review.label.includes('|') ? review.label.split('|')[0].trim() : review.label.trim();
      return {
        '@type': 'Review',
        name: `Google review ${index + 1}`,
        reviewBody: review.quote,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1
        },
        author: {
          '@type': 'Person',
          name: authorName || undefined
        },
        publisher: {
          '@type': 'Organization',
          name: 'Google Reviews'
        }
      };
    });

    const relatedProfiles = [googleReviewsUrl, doordashUrl, grubhubUrl].filter(
      (value): value is string => typeof value === 'string' && value.trim().length > 0
    );
    const restaurantTitle = restaurantName && restaurantName.trim().length ? restaurantName : "These Freakin' Empanadas & More";
    const derivedPriceRange = priceRange && priceRange.trim().length ? priceRange : reviews.find((item) => item.priceRange.trim().length)?.priceRange ?? '$$';

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: restaurantTitle,
      servesCuisine: 'Latin American',
      priceRange: derivedPriceRange,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number(averageRating.toFixed(1)),
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1
      },
      review: reviewEntries
    };

    if (relatedProfiles.length) {
      data.sameAs = relatedProfiles;
    }
    if (googleReviewsUrl && googleReviewsUrl.trim().length) {
      data.url = googleReviewsUrl;
    }

    return data;
  }, [reviews, googleReviewsUrl, doordashUrl, grubhubUrl, restaurantName, priceRange]);

  return (
    <section id="reviews" className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-theme-soft">Reviews</p>
          <h2 className="mt-3 text-3xl font-semibold text-theme-primary md:text-4xl">Guests keep raving about the empanadas</h2>
          <p className="mt-2 text-sm text-theme-muted">Straight from Wood-Ridge and beyond: every quote is from a real guest who ordered fresh empanadas made to order.</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-theme-soft">
          <span className="rounded-full border border-theme-subtle bg-theme-surface px-3 py-1">Verified</span>
          <span className="rounded-full border border-theme-subtle bg-theme-surface px-3 py-1">No AI edits</span>
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-4 left-0 w-16 rounded-3xl"
          style={{ background: 'linear-gradient(90deg, var(--color-page-bg, #050505) 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-4 right-0 w-16 rounded-3xl"
          style={{ background: 'linear-gradient(270deg, var(--color-page-bg, #050505) 0%, transparent 100%)' }}
        />
        <div
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-theme-subtle bg-theme-surface-strong/80 p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-theme-primary">Catch the hype while it is fresh</p>
            <p className="text-xs text-theme-soft">Find us on Google Maps — see location and get directions.</p>
          </div>
          <div className="w-full md:w-[360px]">
            <div className="overflow-hidden rounded-lg border border-theme-subtle">
              <iframe
                title="These Freakin Empanadas & More - location"
                src="https://www.google.com/maps?q=251-B+Valley+Blvd,+Wood-Ridge,+NJ+07075&hl=en&z=17&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {structuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      ) : null}
    </section>
  );
}

export type { Review };

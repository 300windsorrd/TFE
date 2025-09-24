import * as React from 'react';
import type { MenuItem } from '../../types';
import { Card } from '../ui/Card';
import { MenuItemImage } from '../ui/MenuItemImage';
import { Button } from '../ui/Button';
import { cn } from '../utils/cn';

type FeaturedMenuProps = {
  items: MenuItem[];
  doordashUrl?: string;
  grubhubUrl?: string;
};

function fmtUSD(n: number | undefined) {
  if (typeof n !== 'number') return undefined;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function FeaturedMenu({ items, doordashUrl, grubhubUrl }: FeaturedMenuProps) {
  const activeItems = items.filter((item) => item.isActive !== false);
  const byCategory = activeItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Featured Menu</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(byCategory).map(([category, list]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-xl font-medium">{category}</h3>
            {list.map((item) => {
              const doorDashHref = doordashUrl ?? item.orderLinks?.doordash;
              const grubhubHref = grubhubUrl ?? item.orderLinks?.grubhub;
              const hasDoorDash = Boolean(doorDashHref);
              const hasGrubhub = Boolean(grubhubHref);
              const hasLinks = hasDoorDash || hasGrubhub;
              const isActive = activeItemId === item.id;

              return (
                <Card
                  key={item.id}
                  className="group relative !p-0 overflow-hidden tfe-focus-ring"
                  tabIndex={0}
                  onFocus={() => setActiveItemId(item.id)}
                  onPointerDown={(event) => {
                    event.currentTarget.focus();
                    setActiveItemId(item.id);
                  }}
                  onBlur={(event) => {
                    const next = event.relatedTarget as HTMLElement | null;
                    if (!next || !event.currentTarget.contains(next)) {
                      setActiveItemId((current) => (current === item.id ? null : current));
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setActiveItemId((current) => (current === item.id ? null : current));
                      event.currentTarget.blur();
                    }
                  }}
                >
                  <div className="relative">
                    <div
                      className={cn(
                        'relative h-48 overflow-hidden rounded-md border border-theme-strong transition-transform duration-300 ease-out sm:h-56 md:h-64 lg:h-72 xl:h-80',
                        isActive && hasLinks ? 'scale-[1.02]' : undefined
                      )}
                    >
                      {item.image ? (
                        <MenuItemImage
                          src={item.image}
                          alt={item.name}
                          variant="fluid"
                          className={cn(
                            'transition-transform duration-500 ease-out',
                            isActive && hasLinks ? 'scale-105' : undefined
                          )}
                        />
                      ) : (
                        <div className="h-full w-full bg-theme-surface" />
                      )}
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-200 ease-out',
                          isActive && hasLinks ? 'opacity-100' : undefined
                        )}
                      />
                      <div
                        className={cn(
                          'absolute left-2 top-2 rounded bg-[color:var(--color-image-badge-bg)] px-2 py-1 text-xs font-medium text-[color:var(--color-image-badge-text)] transition-opacity duration-200 ease-out',
                          isActive && hasLinks ? 'opacity-0' : undefined
                        )}
                      >
                        {(() => {
                          const prices = [item.prices?.doordash, item.prices?.grubhub].filter(
                            (n): n is number => typeof n === 'number'
                          );
                          const unified = prices.length ? Math.min(...prices) : undefined;
                          return fmtUSD(unified) ?? '';
                        })()}
                      </div>
                      <div
                        className={cn(
                          'absolute bottom-2 right-2 max-w-[80%] truncate rounded bg-[color:var(--color-image-badge-bg)] px-2 py-1 text-sm font-semibold text-[color:var(--color-image-badge-text)] shadow transition-opacity duration-200 ease-out',
                          isActive && hasLinks ? 'opacity-0' : undefined
                        )}
                      >
                        {item.name}
                      </div>
                      <div
                        className={cn(
                          'absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center transition-all duration-300 ease-out',
                          isActive && hasLinks
                            ? 'pointer-events-auto opacity-100 backdrop-blur-sm'
                            : 'pointer-events-none opacity-0'
                        )}
                      >
                        {hasLinks ? (
                          <>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/80">Order Now</p>
                            <div className="flex w-full flex-col gap-2 sm:flex-row">
                              {hasDoorDash && doorDashHref && (
                                <a
                                  href={doorDashHref}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="flex-1"
                                >
                                  <Button
                                    className="h-11 w-full shadow-lg shadow-red-500/25"
                                    aria-label={`Order ${item.name} on DoorDash`}
                                  >
                                    <span className="flex items-center justify-center gap-2">
                                      <img src="/images/DoorDash.png" alt="DoorDash" className="h-5 w-auto" />
                                      <span>DoorDash</span>
                                    </span>
                                  </Button>
                                </a>
                              )}
                              {hasGrubhub && grubhubHref && (
                                <a
                                  href={grubhubHref}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="flex-1"
                                >
                                  <Button
                                    variant="secondary"
                                    className="h-11 w-full border border-[color:rgba(255,127,1,0.55)] shadow-lg shadow-purple-500/20"
                                    aria-label={`Order ${item.name} on Grubhub`}
                                  >
                                    <span className="flex items-center justify-center gap-2">
                                      <img src="/images/Grubhub.png" alt="Grubhub" className="h-5 w-auto" />
                                      <span>Grubhub</span>
                                    </span>
                                  </Button>
                                </a>
                              )}
                            </div>
                          </>
                        ) : (
                          <p className="text-sm font-medium text-white/90">Online ordering unavailable for this item.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

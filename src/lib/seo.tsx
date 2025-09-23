import React from 'react';
import type { MenuItem } from './types';

type OpeningHours = Record<string, { open: string; close: string; closed?: boolean }>;

export function RestaurantJSONLD({ name, address, phone, hours, sameAs }: { name: string; address: string; phone: string; hours?: OpeningHours; sameAs: string[] }) {
  const openingHours = Object.entries(hours ?? {}).flatMap(([day, spec]) => {
    if (spec?.closed) return [];
    return spec && !spec.closed ? [{ dayOfWeek: day, opens: spec.open, closes: spec.close }] : [];
  });
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name,
    address,
    telephone: phone,
    openingHoursSpecification: openingHours,
    sameAs
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function MenuJSONLD({ sections, doordashUrl, grubhubUrl }: { sections: Array<{ name: string; items: MenuItem[] }>; doordashUrl?: string; grubhubUrl?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    hasMenuSection: sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.name,
      hasMenuItem: s.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        image: item.image,
        offers: [
          item.prices?.doordash && (doordashUrl || item.orderLinks?.doordash)
            ? { '@type': 'Offer', priceCurrency: 'USD', price: item.prices.doordash, url: doordashUrl || item.orderLinks?.doordash }
            : null,
          item.prices?.grubhub && (grubhubUrl || item.orderLinks?.grubhub)
            ? { '@type': 'Offer', priceCurrency: 'USD', price: item.prices.grubhub, url: grubhubUrl || item.orderLinks?.grubhub }
            : null
        ].filter(Boolean)
      }))
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}


"use client";
export { Header } from './components/sections/Header';
export { Hero } from './components/sections/Hero';
export { HeroCarousel } from './components/sections/HeroCarousel';
export { FeaturedMenu } from './components/sections/FeaturedMenu';
export { About } from './components/sections/About';
export { Reviews } from './components/sections/Reviews';
export { Contact } from './components/sections/Contact';
export { OrderNowBanner } from './components/sections/OrderNowBanner';
export { Footer } from './components/sections/Footer';
export { Utilities, formatPhoneNumber, generateGoogleMapsUrl, isMobile, isDesktop } from './utilities';

export { Button } from './components/ui/Button';
export { Card, CardHeader, CardContent, CardFooter } from './components/ui/Card';
export { Input } from './components/ui/Input';
export { Dialog } from './components/ui/Dialog';
export { Tooltip } from './components/ui/Tooltip';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';

export { type HeroImage, type CustomStyles, type MenuItem, type TheseFreakinEmpanadasProps } from './types';

import type { TheseFreakinEmpanadasProps, HeroImage, MenuItem } from './types';
import * as React from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { FeaturedMenu } from './components/sections/FeaturedMenu';
import { About } from './components/sections/About';
import { Reviews } from './components/sections/Reviews';
import { OrderNowBanner } from './components/sections/OrderNowBanner';
import { Footer } from './components/sections/Footer';
import { cn } from './components/utils/cn';

const DEFAULT_DD = 'https://www.doordash.com/store/these-freakin-empanadas-and-more-wood-ridge-34379601/?srsltid=AfmBOop7RQWjGGjS_ozZrRP0mAFSNaHmv2phAm0y5CY9PepFgB4OLzIp';
const DEFAULT_GH = 'https://www.grubhub.com/restaurant/these-freakin-empanadas-and-more-251-b-valley-blvd-wood-ridge/11509544';

export default function TheseFreakinEmpanadas({
  restaurantName = 'These Freakin\u2019 Empanadas & More',
  restaurantAddress = '251-B Valley Blvd, Wood-Ridge, NJ 07075',
  restaurantPhone = '(201) 559-2165',
  restaurantHours = 'Tue\u2013Sat 11:00 AM\u20137:00 PM; Sun 11:00 AM\u20135:00 PM; Mon closed',
  doordashUrl = DEFAULT_DD,
  grubhubUrl = DEFAULT_GH,
  heroImages,
  className,
  items: itemsProp
}: TheseFreakinEmpanadasProps & { items?: MenuItem[] }) {
  const images: HeroImage[] = heroImages ?? [
    { src: '/images/hero/spinach-artichoke-closeup.jpg', alt: 'Spinach Artichoke Empanada close-up', attribution: 'In-house' },
    { src: '/images/hero/empanada-trio-tray.jpg', alt: 'Empanada trio on tray', attribution: 'In-house' },
    { src: '/images/hero/cuban-sandwich-fries.jpg', alt: 'Cuban sandwich with fries', attribution: 'In-house' }
  ];

  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(() => (Array.isArray(itemsProp) ? itemsProp : []));
  React.useEffect(() => {
    if (Array.isArray(itemsProp) && itemsProp.length) return;
    let cancelled = false;
    fetch('/data/menu.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (!cancelled) {
          setMenuItems(Array.isArray(d) ? d : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMenuItems([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [itemsProp]);

  const rootClassName = cn('flex min-h-screen flex-col bg-theme-page text-theme-primary', className);

  return (
    <div className={rootClassName}>
      <Header restaurantName={restaurantName} doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} />
      <main className="flex-1">
        <Hero images={images} doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} />
        <FeaturedMenu items={menuItems} />
        <About address={restaurantAddress} phone={restaurantPhone} hours={restaurantHours} />
        <Reviews
          reviews={[
            { author: 'Maggie R.', quote: 'Crispy and packed with flavor! New favorite.' },
            { author: 'Luis P.', quote: 'Dessert empanadas are next-level. The Oreo one!' },
            { author: 'Jenna C.', quote: 'Fast pickup and great service every time.' }
          ]}
        />
        <OrderNowBanner doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} phone={restaurantPhone} />
      </main>
      <Footer />
    </div>
  );
}


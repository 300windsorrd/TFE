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
import type { Review } from './components/sections/Reviews';
import { OrderNowBanner } from './components/sections/OrderNowBanner';
import { Footer } from './components/sections/Footer';
import { cn } from './components/utils/cn';

const DEFAULT_DD = 'https://www.doordash.com/store/these-freakin-empanadas-and-more-wood-ridge-34379601/71715400/?srsltid=AfmBOop7RQWjGGjS_ozZrRP0mAFSNaHmv2phAm0y5CY9PepFgB4OLzIp';
const DEFAULT_GH = 'https://www.grubhub.com/restaurant/these-freakin-empanadas-and-more-251-b-valley-blvd-wood-ridge/11509544';
const DEFAULT_LINKTREE = 'https://linktr.ee/freakinempanadas';
const DEFAULT_GOOGLE_REVIEWS = 'https://www.google.com/maps/place/These+Freakin%27+Empanadas+%26+More/@40.8544897,-74.087359,17z/data=!4m7!3m6!1s0x89c2f8a0fb50a499:0xb216a73ab6090d37!8m2!3d40.8544897!4d-74.087359!9m1!1b1!16s%2Fg%2F11t9t2h24k#lrd=0x89c2f8a0fb50a499:0xb216a73ab6090d37,1';

const FEATURED_REVIEWS: Review[] = [
  {
    id: 'review-a',
    label: 'Review A | Google',
    quote: "If you're in Wood-Ridge, you need to check out These Freakin' Empanadas. The cheese empanadas are made fresh to order, so they come out hot, melty, and crispy. Great vibe, friendly staff, and perfect for a quick bite or takeout. Definitely recommend it.",
    rating: 5,
    priceRange: '$10-$20',
    timeframe: '4 months ago',
    experiences: []
  },
  {
    id: 'review-b',
    label: 'Review B | Google',
    quote: "Great food, great people. These empanadas were made with love and you can taste it. Definitely making the trip from NYC again!",
    rating: 5,
    priceRange: '$10-$20',
    timeframe: '2 weeks ago',
    isNew: true,
    experiences: ['Dine-in', 'Lunch']
  },
  {
    id: 'review-c',
    label: 'Review C | Google',
    quote: 'Empanadas done right - fresh, hot, and crispy with delicious fillings from savory meat and cheese to sweet desserts. Keep up the good work!',
    rating: 5,
    priceRange: '$10-$20',
    timeframe: '2 weeks ago',
    isNew: true,
    experiences: ['Takeout', 'Lunch']
  },
  {
    id: 'review-d',
    label: 'Review D | Google',
    quote: "Outstanding service. The food is wonderful. I can't wait to go back again and again until I've had every option on their menu. Incredible!",
    rating: 5,
    priceRange: '$10-$20',
    timeframe: '2 weeks ago',
    isNew: true,
    experiences: ['Dine-in', 'Lunch']
  }
];

export default function TheseFreakinEmpanadas({
  restaurantName = 'These Freakin\u2019 Empanadas & More',
  restaurantAddress = '251-B Valley Blvd, Wood-Ridge, NJ 07075',
  restaurantPhone = '(201) 559-2165',
  restaurantHours = 'Tue\u2013Sat 11:00 AM\u20137:00 PM; Sun 11:00 AM\u20135:00 PM; Mon closed',
  doordashUrl = DEFAULT_DD,
  grubhubUrl = DEFAULT_GH,
  googleReviewsUrl = DEFAULT_GOOGLE_REVIEWS,
  linkTreeUrl = DEFAULT_LINKTREE,
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
        <FeaturedMenu items={menuItems} doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} />
        <About address={restaurantAddress} phone={restaurantPhone} hours={restaurantHours} />
        <Reviews
          reviews={FEATURED_REVIEWS}
          doordashUrl={doordashUrl}
          grubhubUrl={grubhubUrl}
          googleReviewsUrl={googleReviewsUrl}
          restaurantName={restaurantName}
          priceRange='$10-$20'
        />
        <OrderNowBanner doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} linkTreeUrl={linkTreeUrl} phone={restaurantPhone} />
      </main>
      <Footer />
    </div>
  );
}

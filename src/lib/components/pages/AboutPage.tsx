import * as React from "react";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { generateGoogleMapsUrl, formatPhoneNumber } from "../../utilities";
import type { HeroImage } from "../../types";

type NavLink = { href: string; label: string };

type AboutPageProps = {
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  restaurantHours: string;
  grubhubUrl: string;
  doordashUrl: string;
  linkTreeUrl: string;
  heroImages?: HeroImage[];
};

const HERO_ALT = "Founder holding a fresh empanada inside our Wood-Ridge kitchen";

const ORIGIN_EVENTS = [
  {
    title: "The Hunch",
    description:
      "Fifteen years ago, over breakfast with my eldest son, we wondered: what if we sell empanadas at local wrestling events? We made 50 that night. Sold out in 30 minutes.",
  },
  {
    title: "The Run",
    description: "Side-hustle turned food truck—five years on the road, festivals, multiple awards.",
  },
  {
    title: "The Leap",
    description: "March 2025: opened our first brick-and-mortar in Wood-Ridge, NJ.",
  },
] as const;

const PILLARS = [
  { title: "Family Tradition", copy: "Recipes with roots, made by hand." },
  { title: "Bold Flavor", copy: "Classic Latin profiles + playful twists." },
  { title: "Jersey Hustle", copy: "Work hard, serve hot, keep it real." },
] as const;

const TROPHY_ITEMS = [
  "Empanada Throwdown Finalist",
  "Garden State Street Eats Winner",
  "Tri-County Food Fest Fan Favorite",
  "Hudson Night Market Best Bite",
] as const;

const PEOPLE_PHOTOS = [
  {
    src: "/images/About/michael.webp",
    alt: "Founder Michael smiling inside the Wood-Ridge kitchen holding empanadas",
  },
  {
    src: "/images/northjersey-imgs/nj 2.webp",
    alt: "Food truck parked at a New Jersey festival with fans ordering",
  },
  {
    src: "/images/hero/empanada-trio-tray.jpg",
    alt: "Tray of assorted empanadas ready to serve",
  },
] as const;

const SIGNATURE_ITEMS = [
  "The OG Beef",
  "Mac Attack",
  "Buffalo Chicken",
  "Sweet Plantain & Cheese",
] as const;

function splitHours(hours: string): Array<{ label: string; value: string }> {
  if (!hours) return [];
  return hours
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [label, ...rest] = segment.split(":");
      return { label: (label ?? "Hours").trim(), value: rest.join(":").trim() };
    });
}

export function AboutPage({
  restaurantName,
  restaurantAddress,
  restaurantPhone,
  restaurantHours,
  grubhubUrl,
  doordashUrl,
  linkTreeUrl,
  heroImages,
}: AboutPageProps) {
  const navLinks = React.useMemo<NavLink[]>(() => {
    return [
      { href: "/", label: "Home" },
      { href: "#story", label: "Story" },
      { href: "#pillars", label: "What We\'re About" },
      { href: "#visit", label: "Visit" },
      { href: "#culture", label: "Culture" },
      { href: "#newsletter", label: "Newsletter" },
    ];
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const previousTitle = document.title;
    const previousDescription = document.querySelector<HTMLMetaElement>("meta[name=\"description\"]");
    const originalDescriptionContent = previousDescription?.getAttribute("content") ?? "";

    document.title = "About – These Freakin\' Empanadas (Wood-Ridge, NJ)";
    if (previousDescription) {
      previousDescription.setAttribute(
        "content",
        "From sold-out wrestling nights to an award-winning food truck and our Wood-Ridge restaurant—discover the story behind These Freakin\' Empanadas and our signature flavors."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "From sold-out wrestling nights to an award-winning food truck and our Wood-Ridge restaurant—discover the story behind These Freakin\' Empanadas and our signature flavors.";
      document.head.appendChild(meta);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription) {
        previousDescription.setAttribute("content", originalDescriptionContent);
      }
    };
  }, []);

  const heroImage = heroImages?.[0] ?? {
    src: "/images/hero/nj 8.webp",
    alt: "Restaurant photo",
  };

  const hoursList = React.useMemo(() => splitHours(restaurantHours), [restaurantHours]);
  const formattedPhone = React.useMemo(() => formatPhoneNumber(restaurantPhone), [restaurantPhone]);
  const googleMapsUrl = React.useMemo(() => generateGoogleMapsUrl(restaurantAddress), [restaurantAddress]);

  return (
    <div className="flex min-h-screen flex-col bg-theme-page text-theme-primary">
      <Header restaurantName={restaurantName} doordashUrl={doordashUrl} grubhubUrl={grubhubUrl} navLinks={navLinks} />
      <main className="flex-1">
        <section id="hero" className="relative isolate overflow-hidden border-b border-theme bg-gradient-to-br from-[rgba(79,35,119,0.65)] via-[rgba(5,5,5,0.9)] to-[rgba(195,132,22,0.35)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:py-24">
            <div className="relative z-10 max-w-2xl space-y-5">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-accent">These Freakin\' Empanadas</p>
              <h1 className="text-4xl font-semibold sm:text-5xl">From the ring to the kitchen.</h1>
              <p className="text-lg text-theme-muted">
                A hunch, a handful of empanadas, and a New Jersey hustle.
              </p>
              <p className="text-theme-muted">
                From the ring to the kitchen — our journey began with a hunch and a handful of empanadas.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={doordashUrl} target="_blank" rel="noreferrer">
                  <Button className="min-w-[160px] text-base">Order Now</Button>
                </a>
                <a href="/">
                  <Button variant="outline" className="min-w-[160px] text-base">Back to Menu</Button>
                </a>
              </div>
              <p className="text-sm text-theme-soft">
                Fast pickup, hotter than a turnbuckle slam.
              </p>
            </div>
            <div className="relative flex-1">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[rgba(244,61,86,0.25)] blur-3xl" aria-hidden="true" />
              <img
                src={heroImage.src}
                alt={heroImage.alt || HERO_ALT}
                className="aspect-[4/5] w-full max-w-lg rounded-3xl border border-theme-strong object-cover"
              />
            </div>
          </div>
        </section>

        <section id="story" className="border-b border-theme bg-theme-page">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Origin Story</p>
              <h2 className="text-3xl font-semibold">Our Origin Story</h2>
              <p className="text-theme-muted">
                Side hustle at wrestling events ? food truck for five years ? multiple festival awards.
              </p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {ORIGIN_EVENTS.map((event) => (
                <article key={event.title} className="rounded-2xl border border-theme bg-theme-surface p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                  <h3 className="text-xl font-semibold text-brand-accent">{event.title}</h3>
                  <p className="mt-3 text-sm text-theme-muted">{event.description}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-12 max-w-3xl rounded-2xl border border-theme-strong bg-theme-surface p-6 text-lg text-theme-muted">
              <span className="block text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">Word on the street</span>
              <p className="mt-3 text-xl font-medium text-theme-primary">
                These Freakin' Empanadas isn't just a name—it is what people say after the first bite.
              </p>
            </blockquote>
          </div>
        </section>

        <section id="pillars" className="border-b border-theme bg-gradient-to-br from-[rgba(32,14,52,0.85)] via-[rgba(5,5,5,0.95)] to-[rgba(244,165,26,0.15)]">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold">What We Are About</h2>
              <p className="text-theme-muted">
                Our cuisine is rooted in family tradition, bold flavors, and that New Jersey hustle.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-theme bg-theme-surface p-6">
                  <h3 className="text-xl font-semibold text-brand-accent">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-theme-muted">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trophy" className="border-b border-theme bg-theme-page">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Trophy Case</h2>
                <p className="mt-2 text-theme-muted">Festival finalists and multi-time winners—proudly hanging on our wall.</p>
              </div>
              <p className="text-sm text-theme-soft">Tap to enlarge the wins, then come taste them.</p>
            </div>
            <div className="mt-10 overflow-x-auto">
              <div className="flex min-w-full gap-4 pb-4">
                {TROPHY_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="min-w-[220px] rounded-full border border-theme-strong bg-theme-surface px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-theme-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="visit" className="border-b border-theme bg-theme-surface/50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Visit Us</h2>
                <p className="text-theme-muted">Find us in the heart of Wood-Ridge, NJ.</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-semibold text-theme-primary">Location:</span>{" "}
                    <a className="underline" href={googleMapsUrl} target="_blank" rel="noreferrer">
                      {restaurantAddress}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-theme-primary">Call:</span>{" "}
                    <a className="underline" href={`tel:${restaurantPhone.replace(/[^\d+]/g, "")}`}>
                      {formattedPhone}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-theme-primary">Hours:</span>
                    <dl className="mt-2 space-y-1">
                      {hoursList.map((row) => (
                        <div key={row.label} className="flex gap-4 text-theme-muted">
                          <dt className="w-20 shrink-0 uppercase tracking-[0.2em] text-xs text-theme-soft">{row.label}</dt>
                          <dd className="text-sm">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                    <Button className="min-w-[160px]">Get Directions</Button>
                  </a>
                  <a href={doordashUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="min-w-[160px]">Order on DoorDash</Button>
                  </a>
                  <a href={grubhubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="min-w-[160px]">Order on Grubhub</Button>
                  </a>
                  <a href={`tel:${restaurantPhone.replace(/[^\d+]/g, "")}`}>
                    <Button variant="outline" className="min-w-[160px]">Call Us</Button>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div
                  role="img"
                  aria-label="Map showing the location of These Freakin' Empanadas in Wood-Ridge, New Jersey"
                  className="relative overflow-hidden rounded-3xl border border-theme-strong bg-[linear-gradient(135deg,rgba(79,35,119,0.35)_0%,rgba(244,165,26,0.2)_100%)] p-6 text-sm text-theme-muted"
                >
                  <div className="absolute inset-0 grid place-items-center text-center text-theme-soft">
                    Map embed placeholder
Replace with live map.
                  </div>
                  <div className="invisible" aria-hidden="true">
                    Map embed placeholder
Replace with live map.
                  </div>
                </div>
                <div className="rounded-3xl border border-theme bg-theme-surface p-6 text-sm text-theme-muted">
                  <h3 className="text-lg font-semibold text-theme-primary">Signature empanadas to start with</h3>
                  <ul className="mt-3 space-y-1">
                    {SIGNATURE_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-theme-soft">
                    These Freakin' Empanadas is not just a catchy name—it is what people say after they take their first bite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="culture" className="border-b border-theme bg-theme-page">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-3xl font-semibold">People & Culture</h2>
            <p className="mt-2 max-w-3xl text-theme-muted">
              Built by family. Backed by a community of regulars.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PEOPLE_PHOTOS.map((photo) => (
                <figure key={photo.src} className="overflow-hidden rounded-3xl border border-theme bg-theme-surface">
                  <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="border-b border-theme bg-theme-surface/50">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h2 className="text-3xl font-semibold">Newsletter & Perks</h2>
            <p className="mt-3 text-theme-muted">Get drops on specials, pop-ups, and festival days.</p>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="sm:flex-1"
                required
              />
              <Button type="submit" className="sm:min-w-[160px]">
                Join the Freakin' List
              </Button>
            </form>
            <p className="mt-3 text-xs text-theme-soft">No spam, just the good stuff.</p>
          </div>
        </section>

        <section id="footer-cta" className="bg-gradient-to-br from-[rgba(79,35,119,0.65)] via-[rgba(5,5,5,0.95)] to-[rgba(195,132,22,0.35)]">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
            <h2 className="text-3xl font-semibold">Come hungry, leave hyped.</h2>
            <p className="text-theme-muted">
              From that first sold-out night to Wood-Ridge locals, we are still serving the hustle fresh and hot.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={doordashUrl} target="_blank" rel="noreferrer">
                <Button className="min-w-[160px] text-base">Order Now</Button>
              </a>
              <a href={linkTreeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="min-w-[160px] text-base">All Ordering Options</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;

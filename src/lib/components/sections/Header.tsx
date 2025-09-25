import * as React from 'react';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
] as const;

const VARIABLE_FONT_STACK = "var(--font-source), var(--font-lato), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";

type Props = {
  restaurantName: string;
  doordashUrl: string;
  grubhubUrl: string;
};

export function Header({ restaurantName, doordashUrl, grubhubUrl }: Props) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false); // mount drawer only when true
  const headerRef = React.useRef<HTMLElement | null>(null);
  const fallbackStateRef = React.useRef<{ applied: boolean; updatePadding?: () => void }>({ applied: false });
  const brandContainerRef = React.useRef<HTMLAnchorElement | null>(null);
  const navContainerRef = React.useRef<HTMLElement | null>(null);
  const mobileNavContainerRef = React.useRef<HTMLElement | null>(null);

  const closeMenu = React.useCallback(() => {
    setOpen(false);
    // Unmount after transition ends
    window.setTimeout(() => setShow(false), 300);
  }, []);

  const openMenu = React.useCallback(() => {
    setShow(true);
    // Wait a frame so transition triggers
    requestAnimationFrame(() => setOpen(true));
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const supportsSticky = () => {
      if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
        return true;
      }
      return CSS.supports('position', 'sticky') || CSS.supports('position', '-webkit-sticky');
    };

    if (supportsSticky()) return;

    const node = headerRef.current;
    if (!node) return;

    const previousBodyPaddingTop = document.body.style.paddingTop;

    const syncBodyPadding = () => {
      document.body.style.paddingTop = `${node.getBoundingClientRect().height}px`;
    };

    fallbackStateRef.current.applied = true;
    fallbackStateRef.current.updatePadding = syncBodyPadding;

    node.style.position = 'fixed';
    node.style.top = '0';
    node.style.left = '0';
    node.style.right = '0';
    node.style.width = '100%';
    node.style.zIndex = '50';

    syncBodyPadding();
    window.addEventListener('resize', syncBodyPadding);

    return () => {
      window.removeEventListener('resize', syncBodyPadding);
      document.body.style.paddingTop = previousBodyPaddingTop;
      node.style.position = '';
      node.style.top = '';
      node.style.left = '';
      node.style.right = '';
      node.style.width = '';
      node.style.zIndex = '';
      fallbackStateRef.current.applied = false;
      fallbackStateRef.current.updatePadding = undefined;
    };
  }, []);

  React.useEffect(() => {
    if (!fallbackStateRef.current.applied || !fallbackStateRef.current.updatePadding) return;
    fallbackStateRef.current.updatePadding();
  }, [open, show]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-theme bg-theme-header backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-header-bg-blur)] shadow-sm"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a ref={brandContainerRef} href="/" className="flex items-center gap-3">
          <img
            src="/images/Logo.png"
            alt={`${restaurantName} logo`}
            className="h-8 w-auto"
          />
          <span
            className="text-base sm:text-lg inline-block"
            style={{ fontFamily: VARIABLE_FONT_STACK }}
            aria-label={restaurantName}
          >
            {restaurantName}
          </span>
        </a>

        {/* Desktop nav */}
        <nav ref={navContainerRef} className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="hover:underline">
              <span
                className="text-sm uppercase tracking-[0.15em] text-theme-primary/90 transition-colors duration-200"
                style={{ fontFamily: VARIABLE_FONT_STACK }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* Desktop order buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <a href={doordashUrl} target="_blank" rel="noreferrer">
            <Button>
              <img src="/images/DoorDash.png" alt="Order on DoorDash" className="h-6 w-auto scale-125" />
            </Button>
          </a>
          <a href={grubhubUrl} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="border border-[color:rgba(255,127,1,0.55)]">
              <img src="/images/Grubhub.png" alt="Order on Grubhub" className="h-6 w-auto" />
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="tfe-focus-ring md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--color-border-subtle)] bg-theme-surface hover:bg-[color:var(--color-menu-hover)]"
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <svg
            className="h-5 w-5 text-theme-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              // X icon
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              // Hamburger icon
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>

        {/* Mobile slide-in drawer + overlay (mounted only when shown) */}
        {show && (
          <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!open}>
            <div
              className={`absolute inset-0 bg-theme-overlay transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
              onClick={closeMenu}
            />
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              className={`absolute right-0 top-3 w-72 max-w-[80%] border-l border-theme bg-white p-5 text-black shadow-xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  className="tfe-focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border-subtle)] bg-white text-black hover:bg-neutral-100"
                  onClick={closeMenu}
                >
                  <svg
                    className="h-5 w-5 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav ref={mobileNavContainerRef} className="mt-3 grid gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block rounded px-3 py-2 text-black hover:bg-neutral-100"
                    onClick={closeMenu}
                  >
                    <span
                      className="text-base font-semibold tracking-[0.1em] text-black"
                      style={{ fontFamily: VARIABLE_FONT_STACK }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </nav>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={doordashUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  <Button className="w-full">
                    <img src="/images/DoorDash.png" alt="Order on DoorDash" className="h-6 w-auto mx-auto scale-125" />
                  </Button>
                </a>
                <a href={grubhubUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  <Button variant="secondary" className="w-full border border-[color:rgba(255,127,1,0.55)]">
                    <img src="/images/Grubhub.png" alt="Order on Grubhub" className="h-6 w-auto mx-auto" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


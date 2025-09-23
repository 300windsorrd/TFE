import * as React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-theme py-6">
      <div className="mx-auto max-w-6xl px-4 text-xs text-theme-subtle">
        © {new Date().getFullYear()} These Freakin’ Empanadas & More
      </div>
    </footer>
  );
}



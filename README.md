# These Freakin' Empanadas & More (Simplified)

A lightweight Vite + React build of the These Freakin' Empanadas landing site. The project trims the prior monorepo into a single npm-managed app while keeping the hero component library, menu data, and marketing images in one place.

## Getting Started

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # production build written to ./dist
npm start          # serves the last build (uses vite preview)
npm run lint       # type-aware lint on src/**/*.{ts,tsx}
```

## Project Layout

- `src/App.tsx` wires menu JSON + hero images into the reusable UI library.
- `src/lib/` contains the lifted component library that previously lived in the package workspace.
- `src/data/` mirrors `public/data/` so JSON can be imported at build time and fetched at runtime.
- `public/images/` holds every asset from the original repo (DoorDash/Grubhub badges, hero shots, etc.).
- `src/legacy/` archives the prior `src` experiments; it is excluded from TypeScript builds but kept for reference.

### Updating Menu or Hero Data

Edit the files in `src/data/` and re-run `npm run build`. The matching copies under `public/data/` are served at `/data/*.json` so the hero component's client-side fetch keeps working. When you change `src/data/menu.json`, rebuild to regenerate the structured data emitted by `MenuJSONLD`.

### Styling

Global styles live in `src/styles/global.css`. Component-specific styles remain inside `src/lib`. Tailwind classes are pre-baked in JSX so no PostCSS/Tailwind setup is required.

## Deployment Notes

1. Run `npm run build` - the static site lands in `dist/`.
2. Upload the contents of `dist/` plus `/public/data` and `/public/images` to your IONOS webspace (details below).
3. If you prefer a Node preview server on IONOS, use the same scripts: `npm install --production` & `npm start`.

See `deployment/IONOS.md` for step-by-step hosting guidance (FTP upload, optional Node app configuration, cache headers).

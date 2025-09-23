import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-source)', 'var(--font-lato)', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          red: "var(--color-brandRed)",
          accent: "var(--color-accent)"
        }
      }
    }
  },
  plugins: []
};

export default config;

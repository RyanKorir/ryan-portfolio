import type { Config } from "tailwindcss";

// Design tokens follow Section 20 (Visual Identity) of the portfolio spec:
// deep navy / charcoal / white base, electric blue + cyan + restrained green accents.
// No UI is built on top of this yet — this just makes the tokens available
// as soon as component work starts.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0e17",
          900: "#0e1420",
          800: "#141b2b"
        },
        charcoal: {
          900: "#15171c",
          800: "#1c1f26"
        },
        accent: {
          blue: "#3b82f6",
          cyan: "#22d3ee",
          green: "#34d399"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;

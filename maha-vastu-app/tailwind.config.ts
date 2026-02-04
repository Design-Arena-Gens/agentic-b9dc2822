import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-sans)", "sans-serif"]
      },
      colors: {
        sand: {
          50: "#f9f5ef",
          100: "#f2e6d3",
          200: "#e4cba7",
          300: "#d5ad79",
          400: "#c78f4c",
          500: "#ae7532",
          600: "#885b27",
          700: "#62411c",
          800: "#3d2711",
          900: "#1b0f04"
        }
      }
    }
  },
  plugins: []
};

export default config;

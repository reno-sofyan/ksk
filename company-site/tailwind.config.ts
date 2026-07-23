import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151717",
        fog: "#F1F1F1",
        muted: "#A9A9A9",
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

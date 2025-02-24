import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const neonGreen = "#00ff94";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [{
      custom: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": neonGreen,
        "primary-content": "#000000",
        "secondary": "#1c1c1c",
        "accent": neonGreen,
        "neutral": "#1c1c1c",
        "base-100": "#000000",
        "base-200": "#0a0a0a",
        "base-300": "#1c1c1c",
        "base-content": "#ffffff",
        "info": "#3abff8",
        "success": neonGreen,
        "warning": "#fbbd23",
        "error": "#f87272",
      },
    }],
    darkTheme: "custom",
  },
} satisfies Config;

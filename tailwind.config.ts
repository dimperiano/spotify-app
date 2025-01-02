import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          black: {
            "0": "#000000",
            "10": "#090707",
            "20": "#181414",
            "30": "#303030",
          },
          white: {
            "0": "#ffffff",
          },
          gray: {
            "10": "#949EA2",
            '20': '#D3DADD',
          },
        },
        accent: {
          green: {
            "10": "#57B660",
          },
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        "0": "0px",
        body: "16px",
        h1: "31px",
        h2: "25px",
        h3: "20px",
        "small-text": "13px",
        "really-small-text": "10px",
        "form-labels": "14px",
        "button-label": "16px",
        "caption1-sm": "12px",
        "caption1-bold": "12px",
        caption2: "11px",
        base2: "14px",
        base1: "16px",
        "h1-large": "64px",
        "h2-large": "48px",
        "h3-large": "40px",
        "h4-large": "28px",
        "h4-small": "32px",
        h5: "24px",
        h6: "18px",
      },
      lineHeight: {
        body: "1.4",
        h1: "1.2",
        h2: "1.2",
        h3: "1.2",
        "small-text": "1.2",
        "really-small-text": "1.2",
        "form-labels": "1.2",
        "button-label": "1.2",
        "caption1-sm": "24px",
        "caption1-bold": "24px",
        caption2: "16px",
        base2: "24px",
        base1: "24px",
        "h1-large": "72px",
        "h2-large": "56px",
        "h3-large": "48px",
        "h4-large": "40px",
        "h4-small": "48px",
        h5: "40px",
        h6: "32px",
      },
    },
  },
  plugins: [],
} satisfies Config;

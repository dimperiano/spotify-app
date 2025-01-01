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
            '0': '#000000',
            '10': '#090707',
            '20': '#181414',
          },
          white: {
            '0': '#ffffff',
          },
          gray: {
            '10': '#949EA2',
          },
        },
        accent: {
          green: {
            '10': '#57B660',
          },




          background: "var(--background)",
          foreground: "var(--foreground)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

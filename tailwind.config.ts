import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f9f4ee",
        sage: "#c2d6c8",
        lime: "#c3db5f",
        teal: "#3c756f",
        pine: "#00292d",
      },
      borderRadius: {
        organic: "40px 10px 40px 10px",
        "organic-reverse": "10px 40px 10px 40px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

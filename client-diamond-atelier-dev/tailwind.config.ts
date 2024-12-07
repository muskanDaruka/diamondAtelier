import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/adminComponents/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "18": "repeat(18, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'custom-gradient': 'linear-gradient(90deg, #1c5ab1, #2469c9, #4282ef)',
        }
    },
    fontFamily: {
      // montserrat: ["Montserrat", "serif"],
    },
    boxShadow: {
      custom:
        "inset 0 4px 1px rgba(0, 0, 0, 0.3), inset 0 -4px 6px rgba(255, 255, 255, 0.7)",
    },
  },
  plugins: [],
};
export default config;

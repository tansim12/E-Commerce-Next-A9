import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0866ff",
        primary: "#0866ff",
        lightText: "#000000",
        darkText: "#ffffff",
        bgColor: "#020611",
      },
      animation: {
        "background-shine": "background-shine 2s linear infinite",
      },
      keyframes: {
        "background-shine": {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

// Use `export default` for ESM compatibility
export default config;

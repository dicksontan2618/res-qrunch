/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-clr": "#F55353",
        "nav-bg-clr" : "#F5F5F5",
        "nav-text-clr" : "#797979",
      },
    },
  },
  plugins: [daisyui],
};

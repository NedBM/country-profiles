

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      fadeIn: "fadeIn .5s ease-in forwards"
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      }
    }
  },
  plugins: [require('tailwindcss-animated'), require("@tailwindcss/typography"), require("daisyui")],
  variants: {
    animation: ["motion-safe"]
}
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marsden: ['"Marsden Extended"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

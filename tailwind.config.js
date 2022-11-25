/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "#68697D",
        red: "rgb(193, 27, 64)",
        dark: "#1D1E21",
        darkest: "#1c1c20",
        beige: "rgb(236, 219, 186)",
      },
      screens: {
        "3xl": "1920px",
      },
      fontFamily:{
        sans: ['var(--font-nunito)'],
      }
    },
  },
  plugins: [],
};

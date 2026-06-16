/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  "#fff8f0",
          100: "#fef0dc",
          200: "#fcd9a0",
          400: "#f4a044",
          500: "#e8750a",
          600: "#c45f07",
          700: "#9e4c06",
        },
        earth: {
          50:  "#faf5f2",
          100: "#f2e9e3",
          200: "#e0cfc5",
          400: "#b89080",
          500: "#8c5e4a",
          700: "#5c3a28",
          900: "#2e1a10",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

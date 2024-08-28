/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    colors: {
      primary: "#1E90FF",
      secondary: "#FF6347",
      primaryLight: "#00BFFF",
      code_deck_black: "#1E1E1E",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
});
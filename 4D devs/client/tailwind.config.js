/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'myColor': '#192a4a',
      'white1' : '#FFFFFF',
      ...colors
    },
  },
  plugins: [],
}


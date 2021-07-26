/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: {
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

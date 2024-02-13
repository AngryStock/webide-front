/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  theme: {
    extend: {},
    colors: {
      customblack: '#141617',
      white: '#ffffff',
      black: '#000000',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

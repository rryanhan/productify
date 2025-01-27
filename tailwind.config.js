/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./extension/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add Inter font here
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
        '12xl': '12rem',
        '13xl': '13rem',
      },
      colors: {
        customGreen: '#2EBD59',
        customWhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

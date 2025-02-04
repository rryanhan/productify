/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./extension/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '10%': { opacity: '0.75', transform: 'translateY(0)' },
          '90%': { opacity: '0.75', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(8px)' },
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 2.1s ease-in-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      width: {
        '21': '5.25rem', // 84px
        '22': '5.5rem',  // 88px
        '23': '5.75rem', // 92px
        '24': '6rem',    // 96px
        '25': '6.25rem', // 100px
        'customWidth': '7rem', // 100px
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
        customGrey:  '#D9D9D9'
      },
      padding: {
        '0': '0px',
        '1': '0.25rem', 
      },
    
    },
  },
  plugins: [],
  
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: "#193549"
      },
      fontFamily:{
        main:['Maven Pro']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "san-serif"],
    },
    extend: {
      colors: {
        primary: {
          light: " #FECA9F",
          normal: " #FD7E14",
          dark: " #9A4D0C",
        },
        secondary: "#4F4F4F",
        gray: "#6D6D6D",
        'black-rgba': 'rgba(58, 58, 58, 0.6)',
        greyBg: 'rgba(237, 237, 237, 0.16)',
        headingColor: "#121212",
        tertiary: "#B1580E",
      },
      backgroundImage:{
        'benefit': "url('./src/assets/images/bg-pix.png')",
      }
    },
  },
  plugins: [],
};

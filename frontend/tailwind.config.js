const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      yellow: "#FBBF24",
      lightyellow: "#FDE68A",
      gray: "#1F2937",
      black: colors.black
    },
    fontFamily: {
      sans: ["Consolas", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')

  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  corePlugins: {},
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        blue: {
          600: "rgb(37, 99, 235)",
        },
        green: {
          700: "rgb(21, 128, 61)",
        },
        gray: {
          700: "rgb(55, 65, 81)",
          800: "rgb(31, 41, 55)",
        },
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

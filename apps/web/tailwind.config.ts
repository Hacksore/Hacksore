const { fontFamily } =
  // eslint-disable-next-line
  require("tailwindcss/defaultTheme") as typeof import("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // iPad Pro vertical is 1024px exactly
        lg: "1025px",
      },
      colors: {
        "card-bg": "#0D1118",
        "card-border": "#31363E",
      },
    },
    plugins: [],
  },
};

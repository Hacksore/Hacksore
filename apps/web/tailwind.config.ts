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
        primary: "#2563EB",
        "card-bg": "#0D1118",
        "card-border": "#31363E",
        "discord-online": "#43B581",
        "discord-offline": "#747F8D",
        "discord-dnd": "#F04747",
        "discord-idle": "#FAA61A",
        "discord-streaming": "#593695",
        "discord-invisible": "#747F8D",
      },
    },
    plugins: [],
  },
};

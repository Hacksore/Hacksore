module.exports = {
  root: true,
  extends: [
    "plugin:@next/next/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    require.resolve("lint/index"),
  ],
  plugins: ["import", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
};

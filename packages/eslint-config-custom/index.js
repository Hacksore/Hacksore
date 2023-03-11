/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier"],
  plugins: [],
  rules: {
    "no-undef": "off",
  },
};

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "prettier"],
  plugins: [],
  globals: {
    node: true,
  },
  rules: {
    // this is handled by typescript
    "no-undef": "off",
    quotes: ["error", "double"],
  },
};

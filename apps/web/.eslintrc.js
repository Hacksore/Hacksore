/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: ["plugin:@next/next/recommended", "eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "custom"],
  plugins: ["import", "react"],
};

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "custom"],
  plugins: ["import", "react"],
};

const withTM = require("next-transpile-modules")(["api"]);

module.exports = withTM({
  reactStrictMode: true,
  // If this is turned on firebase goes wild with and hits call stack
  swcMinify: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

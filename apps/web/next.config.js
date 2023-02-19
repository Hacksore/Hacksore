const withTM = require("next-transpile-modules")(["api"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If this is turned on firebase goes wild with and hits call stack
  swcMinify: false,
};

module.exports = withTM(nextConfig);

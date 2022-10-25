import withTM from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: true,
  // If this is turned on firebase goes wild with and hits call stack
  swcMinify: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default withTM(["api"])(nextConfig);

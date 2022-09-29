const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  typescript: {
    // TODO: fix mui build error seen from MUI
    // ../../node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.d.ts:79:89
    // ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

export default nextConfig;

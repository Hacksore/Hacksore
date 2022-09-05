const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  typescript: {
    // TODO: fix mui build error seen from MUI
    // ../../node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.types.d.ts:79:89
    ignoreBuildErrors: true,
  }
}

export default nextConfig;

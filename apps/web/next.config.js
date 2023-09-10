import mdx from "@next/mdx";
import "./src/env.js";

/** @type {import('@next/mdx')} */
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@boult/types", "@boult/api"],
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "**.discord.com",
      },
    ],
  },
};

export default withMDX(nextConfig);

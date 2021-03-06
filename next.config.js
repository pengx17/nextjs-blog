const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const path = require("path");

const prod = process.env.NODE_ENV === "production";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    reactRoot: true,
  },
  basePath: process.env.BASE_PATH ?? "",
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

module.exports = withPlugins([withPWA], {
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: !prod,
    skipWaiting: true,
  },
});

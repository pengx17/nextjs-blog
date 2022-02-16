const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const prod = process.env.NODE_ENV === "production";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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

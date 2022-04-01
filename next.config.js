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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Remove me until https://github.com/kentcdodds/mdx-bundler/issues/164 fixed
      "mdx-bundler/client": path.resolve(
        __dirname,
        "lib",
        "mdx-bundler-client.js"
      ),
    };
    return config;
  },
};

module.exports = withPlugins([withPWA], {
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: !prod,
    skipWaiting: true,
  },
});

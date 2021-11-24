const withMDX = require("@next/mdx")();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: process.env.BASE_PATH ?? "",
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withMDX(nextConfig);

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

module.exports = nextConfig;

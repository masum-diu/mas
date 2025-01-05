/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", // Ensure this is set
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;

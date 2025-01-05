/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["apimas.etherstaging.xyz"],
  },
};

module.exports = nextConfig;

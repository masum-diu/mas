const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true, // ✅ Correct property name
  images: {
    unoptimized: true, // ✅ For static image compatibility
  },
};

module.exports = nextConfig;

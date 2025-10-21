const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true, // ✅ Correct property name
  images: {
    unoptimized: true, // ✅ For static image compatibility
  },
  // API route configuration
  experimental: {
    // Increase API route timeout
    serverComponentsExternalPackages: ["nodemailer"],
  },
  // Add server configuration for longer timeouts
  serverRuntimeConfig: {
    // Increase the timeout for API routes
    maxDuration: 30,
  },
};

module.exports = nextConfig;

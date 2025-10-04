/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don’t block production builds on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don’t block production builds on type errors
    ignoreBuildErrors: true,
  },
  images: {
    // Optional — ensures Next Image works in Docker
    domains: ["localhost", "127.0.0.1"],
  },
  experimental: {
    // Enable modern Next.js 15 features safely
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;

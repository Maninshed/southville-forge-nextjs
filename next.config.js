/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Ensure Turbopack uses this project as the root (avoid selecting parent workspace root)
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;

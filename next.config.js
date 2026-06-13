/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Turbopack ignores stray lockfiles elsewhere on disk.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

module.exports = nextConfig;

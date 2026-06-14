/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Turbopack ignores stray lockfiles elsewhere on disk.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Serve images straight from TMDB's CDN via a custom loader instead of
    // Vercel's Image Optimization, so we don't burn the free-tier transformation
    // quota (one transformation per unique image/width/quality). See
    // src/lib/tmdb/imageLoader.ts.
    loader: "custom",
    loaderFile: "./src/lib/tmdb/imageLoader.ts",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generates static files in the 'out' directory
  basePath: '/QAEHS-CENTRAL', // Matches your repo name
  images: {
    unoptimized: true, // Required for static export on GitHub Pages
  },
};
module.exports = nextConfig;
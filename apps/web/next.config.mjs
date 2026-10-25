/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@macknow/ui', '@macknow/missions', '@macknow/core'],
};

export default nextConfig;

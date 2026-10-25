/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@macknow/ui', '@macknow/missions', '@macknow/core'],
};

export default nextConfig;

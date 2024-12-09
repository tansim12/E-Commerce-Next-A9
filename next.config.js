/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname
        pathname: '/**', // Allows any path
      },
    ],
    // unoptimized: true,
  },
};

module.exports = nextConfig;

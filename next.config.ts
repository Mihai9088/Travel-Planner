import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '64bdwlfa86.ufs.sh',
      },
    ],
  },
};

export default nextConfig;

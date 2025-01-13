import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during production builds
  },
  // Add other Next.js configuration options here
};

export default nextConfig;

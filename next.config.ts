import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenderlab.co.uk',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

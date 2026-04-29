import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenderlab.co.uk',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig

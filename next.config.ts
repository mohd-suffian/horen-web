import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Subpath deployment: served at /horen/v2/ on app.dn-lab.my
  // Remove these two lines once pointing to a dedicated domain (horen.com.my)
  basePath:    '/horen/v2',
  assetPrefix: '/horen/v2',

  // Allow images from horen.com.my and dn-lab.my
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'horen.com.my' },
      { protocol: 'https', hostname: 'app.dn-lab.my' },
    ],
  },
}

export default nextConfig

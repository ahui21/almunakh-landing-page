/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['via.placeholder.com', 'placehold.co'],
  },
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://almunakh.com' : '',
  trailingSlash: true,
}

module.exports = nextConfig
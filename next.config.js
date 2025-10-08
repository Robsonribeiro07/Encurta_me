const { redirect } = require('next/dist/server/api-utils')

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig

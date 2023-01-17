/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 's3.us-west-2.amazonaws.com', 'via.placeholder.com']
  }
}

module.exports = nextConfig

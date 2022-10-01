/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['market-index.herokuapp.com'],
  },
}

module.exports = nextConfig

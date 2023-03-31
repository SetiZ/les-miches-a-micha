/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return {
        ...config,
        watch: true,
        watchOptions: {
            aggregateTimeout: 1000,
            poll: 1000,
            ignored: ['node_modules', '.next']
        }
    }
  },
}

module.exports = nextConfig

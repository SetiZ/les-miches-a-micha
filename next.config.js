/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	bundlePagesRouterDependencies: true,
	serverExternalPackages: ['framer-motion'],
	experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = import('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
})

export default nextConfig;

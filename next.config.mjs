/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = import('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

export default withBundleAnalyzer(nextConfig)

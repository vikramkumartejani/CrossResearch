import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow both localhost and 127.0.0.1 in dev (cookies/HMR break if you mix them)
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/blog/1', destination: '/blog/crossresearch-multi-asset-dashboards', permanent: true },
      { source: '/blog/2', destination: '/blog/signal-alerts-high-conviction-setups', permanent: true },
      { source: '/blog/3', destination: '/blog/faster-chart-loading-performance', permanent: true },
      { source: '/blog/4', destination: '/blog/layering-indicators-without-noise', permanent: true },
      { source: '/blog/5', destination: '/blog/pivot-structure-support-resistance', permanent: true },
      { source: '/blog/6', destination: '/blog/divergence-price-momentum', permanent: true },
      { source: '/blog/7', destination: '/blog/short-term-momentum-rsi-framework', permanent: true },
      { source: '/blog/8', destination: '/blog/market-regime-detection-update', permanent: true },
      { source: '/blog/9', destination: '/blog/signal-quality-review-process', permanent: true },
      { source: '/blog/10', destination: '/blog/smart-screener-filter-markets', permanent: true },
      { source: '/blog/11', destination: '/blog/understanding-market-regimes', permanent: true },
      { source: '/blog/12', destination: '/blog/risk-management-consistent-trading', permanent: true },
      { source: '/blog/13', destination: '/blog/reading-order-flow-institutions', permanent: true },
      { source: '/blog/14', destination: '/blog/reading-order-flow-institutions', permanent: true },
      { source: '/blog/15', destination: '/blog/reading-order-flow-institutions', permanent: true },
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/articles/:path*', destination: '/blog', permanent: true },
      { source: '/plans', destination: '/#pricing', permanent: true },
      { source: '/get-started', destination: '/signup', permanent: true },
      { source: '/features', destination: '/algo', permanent: true },
      { source: '/trading-desk', destination: '/analysis', permanent: true },
    ]
  },
}

export default nextConfig

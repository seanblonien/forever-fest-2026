import Analyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = Analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = withBundleAnalyzer({
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  typedRoutes: true,
  reactCompiler: true,
  reactStrictMode: true,
  // cacheComponents: true,
  // Add cache headers for static assets
  async headers() {
    return [
      {
        // Cache JavaScript files for 1 year
        source: '/_next/static/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache CSS files for 1 year
        source: '/_next/static/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static assets in public folder for 1 year
        source: '/:path*.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache manifest and robots.txt for 1 day
        source: '/(site.webmanifest|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  experimental: {
    taint: true,
    turbopackFileSystemCacheForDev: true,
    optimizeCss: true,
    cssChunking: true,
    inlineCss: true,
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
});

export default nextConfig;

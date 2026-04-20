import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp'],
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
  redirects() {
    return [
      {
        source: '/address',
        destination: 'https://form.jotform.com/251896494421062',
        permanent: true,
      },
      {
        source: '/rsvp-form',
        destination: 'https://form.jotform.com/253148903936161',
        permanent: true,
      },
    ];
  },
  headers() {
    return [
      {
        // Cache public assets conservatively to avoid stale long-lived caches.
        source: '/:path*.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|otf|eot|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
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
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './lib/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './lib/modern-polyfill.js',
    },
  },
};

export default nextConfig;

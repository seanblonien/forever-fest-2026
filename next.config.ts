import Analyzer from '@next/bundle-analyzer';
import type {NextConfig} from 'next';

const withBundleAnalyzer = Analyzer({
  enabled: process.env.ANALYZE === 'true',
})


const nextConfig: NextConfig = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
  },
  compiler: {
    // Remove React properties
    reactRemoveProperties: true,
    // Remove console.log in production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  experimental: {
    // reactCompiler: true,
    // taint: true,
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-dialog',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
  },
});

export default nextConfig;

import type { Metadata } from 'next';

export const PUBLIC_SITE_BASE_URL = 'https://foreverfest.wedding';

const OG_IMAGE = {
  url: '/sean_and_eva_banner_photo.webp',
  width: 1200,
  height: 630,
  alt: 'Sean Blonien & Eva Melendez - Forever Fest 2026 Wedding',
} as const;

export const OPEN_GRAPH_DEFAULTS = {
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  description: 'Join Sean Blonien & Eva Melendez as they celebrate their love and lifelong marriage together at Forever Fest 2026!',
  url: PUBLIC_SITE_BASE_URL,
  siteName: 'Forever Fest 2026',
  images: [OG_IMAGE],
  locale: 'en_US',
  type: 'website',
};

export const createPageMetadata = (options: { description: string; title: string }): Metadata =>
  ({
    ...options,
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      ...options,
    },
  });

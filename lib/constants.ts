import type { Metadata } from 'next';

export const PUBLIC_SITE_BASE_URL = 'https://foreverfest.wedding';

export const OG_IMAGE = {
  url: '/sean_and_eva_banner_photo.webp',
  width: 1200,
  height: 630,
  alt: 'Sean Blonien & Eva Melendez - Forever Fest 2026 Wedding',
} as const;

export const createPageMetadata = (options: { description: string; title: string }): Metadata =>
  ({
    title: options.title,
    description: options.description,
    openGraph: {
      title: options.title,
      description: options.description,
      images: [OG_IMAGE],
    },
  });

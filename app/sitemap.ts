import { PUBLIC_SITE_BASE_URL } from '@/lib';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/our-story', '/travel', '/registry', '/faqs', '/rsvp'];

  return routes.map((path) => ({
    url: `${PUBLIC_SITE_BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- sitemap api
    priority: path === '' ? 1 : 0.7,
  }));
}

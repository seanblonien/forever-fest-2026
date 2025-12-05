import { OurStoryPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Our Story',
};

const OurStory: React.FC = () => (
  <PageLayout>
    <OurStoryPage />
  </PageLayout>
);
export default OurStory;

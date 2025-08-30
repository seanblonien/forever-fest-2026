import {OurStoryPage} from '@/components/pages';
import PageLayout from '@/components/shared/PageLayout';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Our Story',
};

export default function OurStory() {
  return (
    <PageLayout>
      <OurStoryPage />
    </PageLayout>
  );
}

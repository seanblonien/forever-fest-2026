import { FaqPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - FAQs',
};

const FAQs: React.FC = () => (
  <PageLayout>
    <FaqPage />
  </PageLayout>
);
export default FAQs;

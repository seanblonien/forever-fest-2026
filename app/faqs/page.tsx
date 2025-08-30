import {FAQsPage} from '@/components/pages';
import PageLayout from '@/components/shared/PageLayout';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - FAQs',
};

export default function FAQs() {
  return (
    <PageLayout>
      <FAQsPage />
    </PageLayout>
  );
}

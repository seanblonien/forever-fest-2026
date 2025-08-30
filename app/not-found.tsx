import {NotFoundPage} from '@/components/pages';
import PageLayout from '@/components/shared/PageLayout';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Page Not Found',
};

export default function NotFound() {
  return (
    <PageLayout>
      <NotFoundPage />
    </PageLayout>
  );
}

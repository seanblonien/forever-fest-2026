import { NotFoundPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Page Not Found',
};

const NotFound: React.FC = () => (
  <PageLayout>
    <NotFoundPage />
  </PageLayout>
);
export default NotFound;

import { TravelPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Travel',
};

const Travel: React.FC = () => (
  <PageLayout>
    <TravelPage />
  </PageLayout>
);
export default Travel;

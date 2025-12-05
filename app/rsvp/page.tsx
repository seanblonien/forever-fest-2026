import { RSVPPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - RSVP',
};

const RSVP: React.FC = () => (
  <PageLayout>
    <RSVPPage />
  </PageLayout>
);
export default RSVP;

import { RegistryPage } from '@/components/pages';
import { PageLayout } from '@/components/shared/PageLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Registry',
};

const Registry: React.FC = () => (
  <PageLayout>
    <RegistryPage />
  </PageLayout>
);
export default Registry;

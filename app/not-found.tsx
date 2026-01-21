import { NotFoundPage } from '@/components/pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Page Not Found',
};

const NotFound: React.FC = () => (
  <NotFoundPage />
);
export default NotFound;

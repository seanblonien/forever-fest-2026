import { Metadata } from 'next';
import { createPageMetadata } from '@/lib';
import { FaqList } from './FaqList';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - FAQs',
  description: 'Frequently asked questions about Forever Fest 2026 - Sean & Eva\'s Wedding.',
});

const FaqsPage = () => (
  <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
    <h1 className='text-4xl md:text-6xl mb-6 font-league-gothic'>FAQs</h1>
    <FaqList initialCategory='all' />
  </div>
);

export default FaqsPage;

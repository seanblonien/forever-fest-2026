import { FAQ_CATEGORIES } from '@/lib/faqData';

import type { FaqCategory } from '@/lib/faqData';
import type { Metadata } from 'next';

import { FaqList } from './FaqList';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Forever Fest 2026',
};

type FaqsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const FaqsPage = async ({ searchParams }: FaqsPageProps) => {
  const { category } = await searchParams;
  const validCategory = FAQ_CATEGORIES.includes(category as FaqCategory)
    ? (category as FaqCategory)
    : 'all';

  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-6 font-league-gothic'>FAQs</h1>
      <FaqList initialCategory={validCategory} />
    </div>
  );
};

export default FaqsPage;

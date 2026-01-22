'use client';

import { Heart, Pin, Plane } from 'lucide-react';

import MapLinks from '@/components/MapLinks';
import { useQueryParamState, useRouteHash } from '@/hooks';
import { FAQ_CATEGORIES, faqs } from '@/lib/faqData';

import type { FaqCategory, FaqComponentKey } from '@/lib/faqData';
import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
import { CategoryTab } from './CategoryTab';
import { FaqLink } from './FaqLink';
import { IndividualFaq } from './IndividualFaq';

const FAQ_COMPONENT_MAP: Record<FaqComponentKey, React.ReactNode> = {
  'calendar': <CalendarEmbedDynamic />,
  'map': <MapLinks />,
  'our-story': <FaqLink href='/our-story' icon={Heart} label='Our Story Page' />,
  'pinterest': <FaqLink href='https://pin.it/hICCCXKqj' icon={Pin} label='Pinterest Moodboard' />,
  'travel': <FaqLink href='/travel' icon={Plane} label='Visit Travel Page' />,
};

const FAQs: React.FC = () => {
  const { currentHash } = useRouteHash();
  const [activeCategory, setActiveCategory] = useQueryParamState({
    defaultValue: 'all' as FaqCategory,
    paramName: 'category',
    validValues: FAQ_CATEGORIES,
  });

  const filteredFaqs =
    activeCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-6 font-league-gothic'>FAQs</h1>

      {/* Category Filter Tabs */}
      <div className='flex flex-wrap justify-center gap-2 mb-8'>
        {FAQ_CATEGORIES.map((category) => (
          <CategoryTab
            key={category}
            category={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* FAQ List */}
      <div className='space-y-6 text-left'>
        {filteredFaqs.map((faq) => (
          <IndividualFaq
            key={`faq-${faq.question}`}
            answer={faq.answer}
            component={faq.componentKey ? FAQ_COMPONENT_MAP[faq.componentKey] : undefined}
            highlightedId={currentHash}
            question={faq.question}
          />
        ))}
      </div>
    </div>
  );
};
export default FAQs;

'use client';

import { Heart, Pin, Plane } from 'lucide-react';
import MapLinks from '@/components/MapLinks';
import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
import { useQueryParamState, useRouteHash } from '@/hooks';
import { FAQ_CATEGORIES, faqs } from '@/lib/faqData';
import type { FaqCategory, FaqComponentKey } from '@/lib/faqData';
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

type FaqListProps = {
  initialCategory: FaqCategory;
};

export function FaqList({ initialCategory }: FaqListProps) {
  const { currentHash } = useRouteHash();
  const [activeCategory, setActiveCategory] = useQueryParamState({
    defaultValue: initialCategory,
    paramName: 'category',
    validValues: FAQ_CATEGORIES,
  });

  const filteredFaqs =
    activeCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
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
    </>
  );
}

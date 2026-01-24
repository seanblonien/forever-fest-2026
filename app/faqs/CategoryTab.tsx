import { cn } from '@/lib';
import { CATEGORY_CONFIG, getCategoryCount } from '@/lib/faqData';
import type { FaqCategory } from '@/lib/faqData';

type CategoryTabProps = {
  category: FaqCategory;
  isActive: boolean;
  onClick: () => void;
};

export const CategoryTab: React.FC<CategoryTabProps> = ({ category, isActive, onClick }) => {
  const { emoji, label } = CATEGORY_CONFIG[category];
  const count = getCategoryCount(category);

  return (
    <button
      aria-label={`Show ${label} FAQs`}
      className={cn(
        'px-3 py-2 rounded-lg font-league-gothic text-base md:text-lg transition-all duration-200 cursor-pointer',
        'flex items-center gap-2.5 whitespace-nowrap',
        isActive
          ? 'bg-steel-pink text-white shadow-lg shadow-steel-pink/30'
          : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white',
      )}
      type='button'
      onClick={onClick}
    >
      <span>{emoji}</span>
      <span>{label}</span>
      <span className='text-sm'>({count})</span>
    </button>
  );
};

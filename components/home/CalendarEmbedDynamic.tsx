'use client';
import dynamic from 'next/dynamic';

const CalendarLoadingPlaceholder = () => (
  <div className='max-w-[600px] height-[294px] flex justify-center items-center'>
    <div className='animate-pulse bg-white/10 rounded-lg p-8 w-64 h-16 flex items-center justify-center'>
      <span className='text-white/60 font-league-gothic'>Loading calendar...</span>
    </div>
  </div>
);

const CalendarEmbedContent = dynamic(
  () => import('./CalendarEmbedContent').then((mod) => mod.CalendarEmbedContent),
  {
    loading: () => <CalendarLoadingPlaceholder />,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- library api
    ssr: false,
  },
);

type CalendarEmbedDynamicProps = {
  isShowTitle?: boolean;
};

export const CalendarEmbedDynamic: React.FC<CalendarEmbedDynamicProps> = ({ isShowTitle }) => (
  <div className='py-8 flex flex-col items-center'>
    {isShowTitle && (
      <h2 className='text-4xl font-bold font-league-gothic text-papaya-whip mb-2'>
        Save the Date
      </h2>
    )}

    <CalendarEmbedContent />
  </div>
);

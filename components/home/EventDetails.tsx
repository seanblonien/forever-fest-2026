import Link from 'next/link';

export const EventDetails = () => (
  <div className='flex flex-col md:flex-row max-w-[600px] mx-auto px-4 mb-12 text-white items-center md:items-stretch'>
    {/* Date Section - responsive layout */}
    <Link
      className='flex-1 text-center md:text-left md:relative mb-6 md:mb-0 cursor-pointer'
      href='/faqs#when-is-the-wedding'
    >
      {/* Mobile: Single line date */}
      <div className='md:hidden text-6xl font-black text-lavender-pink font-league-gothic'>
        MARCH
        {' '}
        <span className='font-alex-brush text-7xl text-white'>28th</span>
        {' '}
        2026
      </div>

      {/* Desktop: Stacked date with absolute positioned "28" */}
      <div className='hidden md:block'>
        <div className='absolute top-[40px] -right-10 text-9xl font-alex-brush text-white z-10'>
          28th
        </div>
        <div className='text-8xl font-black mb-2 text-lavender-pink font-league-gothic'>
          MARCH
        </div>
        <div className='text-8xl font-black text-lavender-pink font-league-gothic'>
          2026
        </div>
      </div>
    </Link>

    {/* Vertical separator line - desktop only */}
    <div className='hidden md:block w-px bg-lavender-pink mx-8' />

    {/* Event Details Section */}
    <div className='flex-1 flex flex-col justify-center'>
      <Link
        className='flex flex-col space-y-2 text-lavender-pink text-center md:text-left font-league-gothic cursor-pointer'
        href='/faqs#where-is-the-wedding'
      >
        <div className='text-4xl'>Dallas, Texas</div>
        <div className='text-lg opacity-80'>DEC on Dragon</div>
      </Link>
    </div>
  </div>
);

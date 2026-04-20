import { Heart } from 'lucide-react';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - RSVP',
  description: 'RSVP to Forever Fest 2026 - Sean & Eva\'s Wedding celebration.',
});

function RsvpPage() {
  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>RSVP</h1>
      <div className='space-y-8 text-lg md:text-xl'>
        <div className='bg-white/10 backdrop-blur-xs rounded-lg p-8'>
          <div className='flex items-center justify-center gap-2 mb-6'>
            <Heart className='w-6 h-6 text-pink-300' />
            <h2 className='text-2xl font-league-gothic'>RSVP Updates Soon</h2>
            <Heart className='w-6 h-6 text-pink-300' />
          </div>
          <p className='text-base md:text-lg'>
            Our wedding date is now confirmed for October 17, 2026.
            RSVP details and any next steps will be posted here soon.
          </p>
          <p className='text-base md:text-lg mt-4 text-white/80'>
            Thank you for celebrating with us.
          </p>
        </div>
      </div>
    </div>
  );
}
export default RsvpPage;

import { Calendar, ExternalLink, Heart } from 'lucide-react';
import type { Metadata } from 'next';
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
        <p>
          {'We can\'t wait to celebrate with you at Forever Fest 2026! Please let us know if you\'ll be joining us on October 17th.'}
        </p>

        <div className='bg-white/10 backdrop-blur-xs rounded-lg p-8'>
          <h2 className='text-2xl mb-4 font-league-gothic'>Submit Your RSVP</h2>
          <a
            aria-label='Open the RSVP form in a new tab'
            className='inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-6 group text-xl font-league-gothic'
            href='/rsvp-form'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Calendar className='w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200' />
            <span>RSVP Form</span>
            <ExternalLink className='w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200' />
          </a>
        </div>

        <div className='bg-white/10 backdrop-blur-xs rounded-lg p-8'>
          <div className='flex items-center justify-center gap-2 mb-6'>
            <Heart className='w-6 h-6 text-pink-300' />
            <h2 className='text-2xl font-league-gothic'>Important RSVP Information</h2>
            <Heart className='w-6 h-6 text-pink-300' />
          </div>
          <div className='text-base md:text-lg space-y-6 text-left'>
            <div className='bg-white/10 rounded-lg p-4 border-l-4 border-blue-300'>
              <p className='font-semibold mb-2'>👥 Guest List</p>
              <p>
                Only people listed on your invitation and in the party name field
                are invited. If you have any questions or issues with your invite,
                please reach out to us directly.
              </p>
            </div>

            <div className='bg-white/10 rounded-lg p-4 border-l-4 border-purple-300'>
              <p className='font-semibold mb-2'>✏️ Need to Make Changes?</p>
              <p>
                If you need to update your RSVP after submitting, search your email for
                {' '}
                <strong>&quot;Response received for Forever Fest 2026&quot;</strong>
                {' '}
                and use the edit link in that email to make changes.
              </p>
            </div>

            <div className='bg-white/10 rounded-lg p-4 border-l-4 border-green-300'>
              <p className='font-semibold mb-2'>💬 Questions?</p>
              <p>
                {'If you have any questions about your RSVP or need assistance, please don\'t hesitate to reach out to us directly. We\'re here to help!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RsvpPage;

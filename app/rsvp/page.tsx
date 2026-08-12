import { ArrowRight, Calendar, Heart } from 'lucide-react';
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
          {'We can\'t wait to celebrate with you at Forever Fest 2026! Please submit one RSVP for everyone in your invited party.'}
        </p>

        <div className='rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-penn-blue/20 backdrop-blur-xs md:p-8'>
          <a
            aria-label='RSVP for your party (opens in a new tab)'
            className='group inline-flex w-full max-w-sm touch-manipulation items-center justify-center gap-3 rounded-xl bg-linear-to-r from-steel-pink to-syracuse-orange px-6 py-5 text-2xl font-league-gothic shadow-lg shadow-penn-blue/30 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-penn-blue/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lavender-pink focus-visible:ring-offset-4 focus-visible:ring-offset-penn-blue active:translate-y-0 motion-reduce:transform-none'
            href='/rsvp-form'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Calendar aria-hidden='true' className='size-6' />
            <span>RSVP for Your Party</span>
            <ArrowRight
              aria-hidden='true'
              className='size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none'
            />
          </a>
          <p className='mt-4 text-sm text-white/75'>
            Takes about 2 minutes · Opens the RSVP form
          </p>
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

import { ArrowRight, Calendar } from 'lucide-react';
import { RSVP_DETAILS } from '@/lib/publicWeddingDetails';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - RSVP',
  description: 'RSVPs for Forever Fest 2026 - Sean & Eva\'s Wedding closed September 20, 2026. Reach out to us if you still need to respond.',
});

function RsvpPage() {
  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>RSVP</h1>
      <div className='space-y-8 text-lg md:text-xl'>
        <div className='rounded-2xl border border-white/20 bg-white/10 p-6 md:p-8'>
          <h2 className='mb-3 text-3xl font-league-gothic'>{RSVP_DETAILS.status}</h2>
          <p>
            Our RSVP deadline was
            {' '}
            <strong>{RSVP_DETAILS.deadline}</strong>
            . Thank you to everyone who has already responded!
          </p>
          <p className='mt-4'>
            {RSVP_DETAILS.contact}
          </p>
        </div>

        <div className='rounded-lg bg-white/10 p-6 text-left text-base md:text-lg space-y-6'>
          <div className='rounded-lg border-l-4 border-purple-300 bg-white/10 p-4'>
            <p className='mb-2 font-semibold'>✏️ Need to change your response?</p>
            <p>
              Search your email for
              {' '}
              <strong>
                &quot;
                {RSVP_DETAILS.confirmationSubject}
                &quot;
              </strong>
              {' '}
              and use the edit link in that email.
            </p>
          </div>
          <div className='rounded-lg border-l-4 border-blue-300 bg-white/10 p-4'>
            <p className='mb-2 font-semibold'>👥 Guest list</p>
            <p>
              {RSVP_DETAILS.guestList}
            </p>
          </div>
        </div>

        <div>
          <p className='mb-3 text-sm text-white/75'>
            {RSVP_DETAILS.formInstructions}
          </p>
          <a
            aria-label='Open the RSVP form (opens in a new tab)'
            className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-lavender-pink/60 px-5 py-2 font-league-gothic text-xl text-lavender-pink transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink'
            href='/rsvp-form'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Calendar aria-hidden='true' className='size-5' />
            <span>Open RSVP form</span>
            <ArrowRight aria-hidden='true' className='size-4' />
          </a>
        </div>
      </div>
    </div>
  );
}
export default RsvpPage;

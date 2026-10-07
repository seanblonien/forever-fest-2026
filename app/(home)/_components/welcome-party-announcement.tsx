import Link from 'next/link';
import { welcomeParty } from '@/lib/scheduleData';

export function WelcomePartyAnnouncement() {
  return (
    <section
      aria-labelledby='welcome-party-announcement'
      className='mx-auto mb-10 max-w-150 px-4'
    >
      <div className='rounded-xl border border-lavender-pink/50 bg-white/10 p-5 text-center text-white sm:p-6'>
        <h2
          className='font-league-gothic text-3xl text-lavender-pink sm:text-4xl'
          id='welcome-party-announcement'
        >
          Join us for the
          {' '}
          {welcomeParty.title}
          !
        </h2>
        <p className='mt-2 text-base leading-relaxed'>
          {welcomeParty.date}
          {' · '}
          {welcomeParty.time}
        </p>
        <p className='mt-1 text-base'>{welcomeParty.venue.name}</p>
        <p className='mt-3 text-sm leading-relaxed text-white/85'>
          {welcomeParty.attendance}
          {' '}
          Come and go as you please.
        </p>
        <Link
          className='mt-4 inline-flex min-h-11 items-center rounded-lg border border-lavender-pink/60 px-4 py-2 font-league-gothic text-xl text-lavender-pink transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink'
          href={`/schedule#${welcomeParty.id}`}
        >
          View invitation &amp; details
          <span aria-hidden='true' className='ml-2'>→</span>
        </Link>
      </div>
    </section>
  );
}

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { WelcomePartyInvitation } from '@/components/shared/welcome-party-invitation';
import { createPageMetadata } from '@/lib';
import { scheduleDays, welcomeParty } from '@/lib/scheduleData';
import type { Metadata } from 'next';
import type { ScheduleDay } from '@/lib/scheduleData';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Schedule',
  description: 'View the schedule of events for Forever Fest 2026 - Sean & Eva\'s Wedding celebration.',
});

const LINK_STYLE = 'inline-flex min-h-11 items-center rounded-lg text-sm text-lavender-pink underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink';

function ParkingDetails({ parking }: { parking: NonNullable<ScheduleDay['parking']> }) {
  return (
    <details className='group mt-5 border-t border-white/15'>
      <summary className='flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-medium text-white transition-colors hover:text-lavender-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink [&::-webkit-details-marker]:hidden'>
        Parking at State & Allen
        <ChevronDown
          aria-hidden='true'
          className='size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none'
        />
      </summary>
      <div className='pb-1'>
        <p className='text-sm leading-relaxed text-white/75'>{parking.description}</p>
        <a
          aria-label='View venue parking directions (opens in new tab)'
          className={LINK_STYLE}
          href={parking.directionsUrl}
          rel='noopener noreferrer'
          target='_blank'
        >
          Venue parking directions
        </a>
      </div>
    </details>
  );
}

function EventTimeline({ events }: { events: ScheduleDay['events'] }) {
  return (
    <ol className='mt-6'>
      {events.map((event) => (
        <li
          key={`${event.startTime}-${event.title}`}
          className='group grid grid-cols-[5.25rem_1fr] gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5'
        >
          <div className='pt-0.5 tabular-nums'>
            <p className='font-league-gothic text-xl text-lavender-pink sm:text-2xl'>
              {event.startTime}
            </p>
            {event.endTime && (
              <p className='mt-0.5 text-xs text-white/65'>
                until
                {' '}
                {event.endTime}
              </p>
            )}
          </div>
          <div className='relative border-l border-white/20 pb-6 pl-5 group-last:pb-0'>
            <span aria-hidden='true' className='absolute -left-1 top-2 size-2 rounded-full bg-lavender-pink' />
            <h3 className='font-league-gothic text-2xl text-white'>{event.title}</h3>
            {event.description && (
              <p className='mt-1 text-sm leading-relaxed text-white/75'>{event.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ScheduleDayCard({ day }: { day: ScheduleDay }) {
  const isWelcomeParty = day.id === welcomeParty.id;

  return (
    <section
      aria-labelledby={`${day.id}-heading`}
      className='scroll-mt-6 rounded-2xl border border-white/15 bg-penn-blue/70 p-5 text-left shadow-lg shadow-penn-blue/10 sm:p-8'
      id={day.id}
    >
      <h2 className='font-league-gothic text-4xl tracking-wide text-white' id={`${day.id}-heading`}>
        {day.title}
      </h2>

      {isWelcomeParty && <WelcomePartyInvitation />}

      <div className={isWelcomeParty ? 'mt-6' : 'mt-3'}>
        <p className='text-sm font-medium leading-relaxed text-lavender-pink'>
          {day.date}
          {day.time && (
            <>
              {' · '}
              <span className='whitespace-nowrap'>{day.time}</span>
            </>
          )}
        </p>
        {day.venue && (
          <div className='mt-3'>
            <p className='font-medium text-white'>{day.venue.name}</p>
            <p className='mt-1 text-sm text-white/70'>{day.venue.address}</p>
            {day.venue.directionsUrl
              ? (
                  <a
                    aria-label={`Get directions to ${day.venue.name} (opens in new tab)`}
                    className={LINK_STYLE}
                    href={day.venue.directionsUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    Get directions
                  </a>
                )
              : (
                  <Link className={LINK_STYLE} href='/travel'>Venue & travel info</Link>
                )}
          </div>
        )}
        {day.attendance && <p className='mt-3 text-sm leading-relaxed text-white'>{day.attendance}</p>}
        {day.description && <p className='mt-2 text-sm leading-relaxed text-white/75'>{day.description}</p>}
      </div>

      {day.parking && <ParkingDetails parking={day.parking} />}
      {day.events.length > 0 && <EventTimeline events={day.events} />}
    </section>
  );
}

export default function SchedulePage() {
  return (
    <div className='mx-auto w-full max-w-160 px-4 pt-8 pb-16 text-white sm:px-5'>
      <header className='mb-8 text-center'>
        <p className='text-xs font-medium tracking-widest text-lavender-pink uppercase'>October 16–17, 2026</p>
        <h1 className='mt-2 font-league-gothic text-5xl sm:text-6xl'>Schedule</h1>
        <nav aria-label='Jump to an event' className='mt-5 flex flex-wrap justify-center gap-2'>
          {scheduleDays.map((day) => (
            <a
              key={day.id}
              className='inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/5 px-4 text-sm transition-colors hover:border-lavender-pink hover:text-lavender-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink'
              href={`#${day.id}`}
            >
              {day.title}
            </a>
          ))}
        </nav>
      </header>
      <div className='space-y-6'>
        {scheduleDays.map((day) => <ScheduleDayCard key={day.id} day={day} />)}
      </div>
    </div>
  );
}

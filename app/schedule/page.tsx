import { scheduleDays } from '@/lib/scheduleData';

import type { Metadata } from 'next';
import type { ScheduleDay } from '@/lib/scheduleData';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Schedule',
  openGraph: {
    title: 'Forever Fest 2026 - Schedule',
  },
};

type SimpleDayProps = {
  day: ScheduleDay;
};

const SimpleDay: React.FC<SimpleDayProps> = ({ day }) => (
  <div className='mb-12 text-left'>
    <h2 className='text-3xl md:text-4xl font-league-gothic text-white tracking-wide'>
      {day.title}
    </h2>
    <p className='text-white/70 text-sm md:text-base tracking-wider mt-1'>
      {day.date.toUpperCase()}
    </p>
    {day.time && (
      <p className='text-steel-pink font-league-gothic text-xl md:text-2xl mt-1'>
        {day.time}
      </p>
    )}

    {day.venue && (
      <div className='mt-4 text-white/80 text-sm md:text-base'>
        <p>{day.venue.name}</p>
        <p className='text-white/60'>{day.venue.address}</p>
      </div>
    )}

    {day.description && (
      <p className='mt-4 text-white/80 text-sm md:text-base leading-relaxed max-w-xl'>
        {day.description}
      </p>
    )}

    {day.events.length > 0 && (
      <div className='mt-6 space-y-4'>
        {day.events.map((event) => {
          const timeDisplay = event.endTime
            ? `${event.startTime} - ${event.endTime}`
            : event.startTime;

          return (
            <div key={`${event.startTime}-${event.title}`}>
              <p className='text-white font-league-gothic text-xl md:text-2xl'>
                {event.title}
              </p>
              <p className='text-white/90 font-league-gothic text-lg mt-0.5'>
                {timeDisplay}
              </p>
              {event.description && (
                <p className='text-white/80 text-sm md:text-base mt-1 leading-relaxed max-w-xl'>
                  {event.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const WeekendTimeline: React.FC = () => (
  <div>
    {scheduleDays.map((day) => (
      <SimpleDay key={day.date} day={day} />
    ))}
  </div>
);

const Schedule: React.FC = () => (
  <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
    <h1 className='text-4xl md:text-6xl mb-4 font-league-gothic'>Schedule</h1>

    <section className='text-left'>
      <WeekendTimeline />
    </section>
  </div>
);

export default Schedule;

'use client';

import { addDays, addHours, addMinutes, addMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  months: number;
  seconds: number;
};

const CountdownBox = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className='rounded-lg py-2 px-1 md:p-4 bg-papaya-whip'>
    <div className='text-3xl md:text-4xl font-black text-syracuse-orange font-league-gothic'>
      {value.toString()}
    </div>
    <div className='text-sm md:text-base text-steel-pink font-league-gothic'>
      {label}
    </div>
  </div>
);

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // March 28th, 2026 at 6pm CST
      const targetDate = new Date('2026-03-28T18:00:00-06:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        // Calculate months remaining
        const months = differenceInMonths(targetDate, now);

        // Calculate remaining days after removing months
        const afterMonths = addMonths(now, months);
        const days = differenceInDays(targetDate, afterMonths);

        // Calculate remaining hours after removing full days
        const afterDays = addDays(afterMonths, days);
        const hours = differenceInHours(targetDate, afterDays);

        // Calculate remaining minutes after removing full hours
        const afterHours = addHours(afterDays, hours);
        const minutes = differenceInMinutes(targetDate, afterHours);

        // Calculate remaining seconds after removing full minutes
        const afterMinutes = addMinutes(afterHours, minutes);
        const seconds = differenceInSeconds(targetDate, afterMinutes);

        setTimeLeft({ months, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='mb-12 px-2 max-w-[600px] mx-auto'>
      <div className='grid grid-cols-5 gap-2 md:gap-4 max-w-3xl mx-auto'>
        <CountdownBox label='MONTHS' value={timeLeft.months} />
        <CountdownBox label='DAYS' value={timeLeft.days} />
        <CountdownBox label='HOURS' value={timeLeft.hours} />
        <CountdownBox label='MINUTES' value={timeLeft.minutes} />
        <CountdownBox label='SECONDS' value={timeLeft.seconds} />
      </div>
    </div>
  );
};

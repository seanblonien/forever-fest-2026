'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  months: number;
  seconds: number;
};

const calculateTimeLeft = (): TimeLeft => {
  // March 28th, 2026 at 6pm CST
  const targetDate = new Date('2026-03-28T18:00:00-06:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference > 0) {
    // Calculate time units using native Date math
    const totalSeconds = Math.floor(difference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calculate months (approximate using 30.44 days average)
    const months = Math.floor(totalDays / 30.44);

    // Calculate remaining time units
    const remainingDays = totalDays - Math.floor(months * 30.44);
    const hours = totalHours - (totalDays * 24);
    const minutes = totalMinutes - (totalHours * 60);
    const seconds = totalSeconds - (totalMinutes * 60);

    return { months, days: remainingDays, hours, minutes, seconds };
  }

  return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
};

function CountdownBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <figure className='rounded-lg py-2 px-1 md:p-4 bg-papaya-whip text-center'>
      <data suppressHydrationWarning className='block text-3xl md:text-4xl font-black text-syracuse-orange font-league-gothic' value={value}>
        {value}
      </data>
      <figcaption className='text-sm md:text-base text-steel-pink font-league-gothic'>
        {label}
      </figcaption>
    </figure>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='mb-12 px-2 max-w-150 mx-auto'>
      <div className='grid grid-cols-5 gap-2 md:gap-4 max-w-3xl mx-auto'>
        <CountdownBox label='MONTHS' value={timeLeft.months} />
        <CountdownBox label='DAYS' value={timeLeft.days} />
        <CountdownBox label='HOURS' value={timeLeft.hours} />
        <CountdownBox label='MINUTES' value={timeLeft.minutes} />
        <CountdownBox label='SECONDS' value={timeLeft.seconds} />
      </div>
    </div>
  );
}

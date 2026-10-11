'use client';

import { useCurrentTime } from '@/hooks';

const WEDDING_DATE = '2026-10-17';
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const chicagoDateFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' });

// Whole calendar days from "now" to the wedding date, in Central Time.
const getDaysUntilWedding = (currentTimestamp: number): number => {
  const todayInChicago = chicagoDateFormat.format(currentTimestamp);

  return Math.round((Date.parse(WEDDING_DATE) - Date.parse(todayInChicago)) / MS_PER_DAY);
};

const getCountdownMessage = (currentTimestamp: number): string => {
  if (currentTimestamp === 0) return 'October 17, 2026';

  const days = getDaysUntilWedding(currentTimestamp);

  if (days < 0) return 'Thank you for celebrating with us!';
  if (days === 0) return 'Today is the day!';
  if (days === 1) return '1 day to go!';

  return `${days} days to go!`;
};

export function CountdownTimer() {
  const currentTimestamp = useCurrentTime();

  return (
    <p
      className='mb-10 px-4 text-center font-league-gothic text-3xl text-papaya-whip md:text-4xl'
    >
      {getCountdownMessage(currentTimestamp)}
    </p>
  );
}

'use client';

import {useEffect, useState} from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function CountdownBox({value, label}: {value: number; label: string}) {
  return (
    <div className="rounded-lg p-2 md:p-4 bg-papaya-whip">
      <div className="text-3xl md:text-4xl font-black text-syracuse-orange font-league-gothic">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-steel-pink font-league-gothic">
        {label}
      </div>
    </div>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
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
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({days, hours, minutes, seconds});
      } else {
        setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-12 px-2 max-w-[600px] mx-auto">
      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto">
        <CountdownBox value={timeLeft.days} label="DAYS" />
        <CountdownBox value={timeLeft.hours} label="HOURS" />
        <CountdownBox value={timeLeft.minutes} label="MINUTES" />
        <CountdownBox value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  );
}

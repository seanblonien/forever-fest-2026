'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownTimerProps = {
  initialTime?: TimeLeft;
  className?: string;
};

export default function CountdownTimer({
  initialTime = {
    days: 265,
    hours: 19,
    minutes: 37,
    seconds: 7,
  },
  className = '',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' },
  ];

  return (
    <div className={`mb-12 ${className}`}>
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-4 bg-papaya-whip"
          >
            <div className="text-3xl md:text-4xl font-black text-syracuse-orange">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-bold text-steel-pink">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

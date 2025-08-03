'use client';
import {AddToCalendarButton} from 'add-to-calendar-button-react';

export default function CalendarEmbed() {
  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold font-league-gothic text-papaya-whip mb-2">
        Save the Date
      </h2>
      <div className="max-w-[600px] height-[294px] flex justify-center items-center">
        <AddToCalendarButton
          name="Forever Fest 2026 - Sean & Eva's Wedding"
          description="Join us for our wedding celebration! Attire: Funky Formal"
          options={['Apple', 'Google', 'iCal', 'Outlook.com']}
          location="DEC on Dragon, 1414 Dragon St, Dallas, TX 75207"
          startDate="2026-03-28"
          endDate="2026-03-28"
          startTime="18:00"
          endTime="23:00"
          timeZone="America/Chicago"
          buttonStyle="default"
        >
        </AddToCalendarButton>
      </div>
    </div>
  );
}

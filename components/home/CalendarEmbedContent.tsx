'use client';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

// This is the actual calendar component that will be loaded dynamically
export const CalendarEmbedContent = () => (
  <div className='max-w-[600px] height-[294px] flex justify-center items-center pb-4'>
    <AddToCalendarButton
      buttonsList
      hideBackground
      buttonStyle='default'
      description='Join us for our wedding celebration! Attire: Funky Semi-Formal'
      endDate='2026-03-28'
      endTime='23:00'
      location='DEC on Dragon, 1414 Dragon St, Dallas, TX 75207'
      name="Forever Fest 2026 - Sean & Eva's Wedding"
      options={['Apple', 'Google', 'iCal', 'Outlook.com']}
      startDate='2026-03-28'
      startTime='18:00'
      timeZone='America/Chicago'
    />
  </div>
);

export type ScheduleEvent = {
  description?: string;
  emoji: string;
  endTime?: string;
  startTime: string;
  title: string;
};

export type ScheduleVenue = {
  address: string;
  directionsUrl?: string;
  name: string;
};

export type ScheduleDay = {
  attendance?: string;
  date: string;
  description?: string;
  events: ScheduleEvent[];
  id: string;
  parking?: {
    description: string;
    directionsUrl: string;
  };
  time?: string;
  title: string;
  venue?: ScheduleVenue;
};

export const welcomeParty = {
  id: 'welcome-party',
  date: 'Friday, October 16, 2026',
  title: 'Welcome Party',
  time: '7:00 PM',
  venue: {
    name: 'State & Allen Kitchen + Bar',
    address: '2400 Allen Street, Dallas, TX 75204',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=State+%26+Allen+Kitchen+%2B+Bar%2C+2400+Allen+Street%2C+Dallas%2C+TX+75204',
  },
  attendance: 'All wedding guests are welcome! No separate RSVP needed.',
  description:
    'Come and go as you please. Cute & casual attire. Food and drinks available for purchase.',
  parking: {
    description:
      'Street parking is available nearby; follow posted signs. Free covered parking for up to 3 hours is behind the restaurant, with entry on State Street just past the patio. For longer stays, speak with the manager.',
    directionsUrl: 'https://www.stateandallen.com/location/state-and-allen/',
  },
  events: [],
} satisfies ScheduleDay;

export const scheduleDays: ScheduleDay[] = [
  welcomeParty,
  {
    id: 'wedding-day',
    date: 'Saturday, October 17, 2026',
    title: 'Wedding Day',
    venue: {
      name: 'DEC on Dragon',
      address: '1414 Dragon St, Dallas, TX 75207',
    },
    events: [
      {
        emoji: '🚗',
        startTime: '5:30 PM',
        title: 'Guest Arrival',
        description:
          'Aim for 5:30 PM; a little earlier is welcome. Complimentary valet provided.',
      },
      {
        emoji: '💒',
        startTime: '6:00 PM',
        title: 'Ceremony',
        description:
          'Our rooftop ceremony begins promptly. Please be seated before it starts.',
      },
      {
        emoji: '🍸',
        startTime: '6:30 PM',
        endTime: '7:30 PM',
        title: 'Cocktail Hour',
        description:
          'Drinks, hors d\'oeuvres, and time to mingle.',
      },
      {
        emoji: '💃',
        startTime: '7:30 PM',
        endTime: '11:00 PM',
        title: 'Reception',
        description:
          'Dinner, toasts, cake, and dancing.',
      },
    ],
  },
];

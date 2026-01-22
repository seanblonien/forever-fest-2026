export type ScheduleEvent = {
  description?: string;
  emoji: string;
  endTime?: string;
  startTime: string;
  title: string;
};

export type ScheduleVenue = {
  address: string;
  name: string;
};

export type ScheduleDay = {
  date: string;
  description?: string;
  events: ScheduleEvent[];
  time?: string;
  title: string;
  venue?: ScheduleVenue;
};

export const scheduleDays: ScheduleDay[] = [
  {
    date: 'Friday, March 27th',
    title: 'Welcome Party',
    time: '7:30 PM - 10:00 PM',
    venue: {
      name: 'Location TBD',
      address: 'Details coming soon',
    },
    description:
      'Kick off the wedding weekend with an informal gathering! This is a casual, come-and-go event to meet fellow guests and catch up before the big day. Food and drinks will be available for purchase, and the event is come & go as you please. Dress code is cute & casual.',
    events: [],
  },
  {
    date: 'Saturday, March 28th',
    title: 'Wedding Day',
    venue: {
      name: 'DEC on Dragon',
      address: '1414 Dragon St, Dallas, TX 75207',
    },
    description:
      'The main event! Join us for our ceremony and celebration in the Dallas Design District.',
    events: [
      {
        emoji: '💒',
        startTime: '6:00 PM',
        title: 'Ceremony',
        description:
          'We\'ll say "I do" on the rooftop. Please arrive by 5:30 PM to find your seat and settle in before we begin. Complimentary valet parking is available.',
      },
      {
        emoji: '🍸',
        startTime: '6:30 PM',
        endTime: '7:30 PM',
        title: 'Cocktail Hour',
        description:
          'Enjoy drinks and hors d\'oeuvres while we sneak away for photos. Mingle, explore the venue, and grab a signature cocktail!',
      },
      {
        emoji: '💃',
        startTime: '7:30 PM',
        endTime: '11:00 PM',
        title: 'Reception',
        description:
          'Dinner, toasts, cake, and dancing! Let loose, celebrate with us, and party the night away. #ForeverFest2026',
      },
    ],
  },
];

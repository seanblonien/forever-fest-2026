import { GUEST_CONTACT, GUEST_DETAILS, GUEST_PHOTO_ALBUM } from './guestInformation';

export const FAQ_CATEGORIES = ['all', 'event', 'logistics', 'experience', 'rsvp'] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];
export type FaqCategoryFilter = Exclude<FaqCategory, 'all'>;

export const CATEGORY_CONFIG: Record<FaqCategory, { emoji: string; label: string }> = {
  all: { emoji: '📋', label: 'All' },
  event: { emoji: '🎪', label: 'Event Details' },
  logistics: { emoji: '🚗', label: 'Logistics' },
  experience: { emoji: '👗', label: 'Guest Experience' },
  rsvp: { emoji: '📝', label: 'RSVP & Guests' },
};

export type FaqComponentKey = 'calendar' | 'map' | 'our-story' | 'pinterest' | 'rsvp' | 'travel' | 'menu' | 'bar' | 'photos' | 'help';

export type FAQData = {
  answer: string;
  category: FaqCategoryFilter;
  componentKey?: FaqComponentKey;
  question: string;
};

export const faqs: FAQData[] = [
  // Event Details
  {
    category: 'event',
    question: 'How many guests will be at the wedding?',
    answer: GUEST_DETAILS.guestCount,
  },
  {
    category: 'event',
    question: 'Why is it called "Forever Fest"?',
    answer: `Festivals are at the core of Sean and Eva's relationship story (See "Our Story" page). Festivals and EDM culture have positively influenced Sean and Eva to be more creative, expressive, social, joyful, and connected, and so they want to bring some of that culture and energy to their wedding. "Forever Fest" is a manifestation of Sean and Eva's lifelong commitment together (i.e. "forever") combined with their desire to bring some of the festival/EDM culture to their wedding day (i.e. "fest"). ${GUEST_DETAILS.atmosphere}`,
    componentKey: 'our-story',
  },
  {
    category: 'event',
    question: 'When is the wedding?',
    answer: 'Forever Fest 2026 will take place on Saturday, October 17, 2026, from 6:00 PM to 11:00 PM CDT. Add the event to your calendar using the buttons below ⬇️',
    componentKey: 'calendar',
  },
  {
    category: 'event',
    question: 'Where is the wedding?',
    answer: 'Both the ceremony and reception will be held at DEC on Dragon, located at 1414 Dragon St, Dallas, TX 75207.',
    componentKey: 'map',
  },
  {
    category: 'event',
    question: 'What time should I arrive for the ceremony?',
    answer: `${GUEST_DETAILS.arrival} Complimentary valet is provided.`,
  },

  // Logistics
  {
    category: 'logistics',
    question: 'What do I do for parking?',
    answer: 'Complimentary valet is recommended. See Travel for entrance photos, pickup directions and parking details.',
    componentKey: 'travel',
  },
  {
    category: 'logistics',
    question: 'Are the ceremony and reception indoors or outdoors?',
    answer: GUEST_DETAILS.weather,
  },
  {
    category: 'logistics',
    question: 'I am coming from out of town, where can I stay?',
    answer: 'Check out the Travel page for details and recommendations on where to stay.',
    componentKey: 'travel',
  },
  {
    category: 'logistics',
    question: 'Is the venue accessible?',
    answer: `${GUEST_DETAILS.access} ${GUEST_DETAILS.restrooms} ${GUEST_DETAILS.assistance}`,
  },
  {
    category: 'logistics',
    question: 'What if I arrive late?',
    answer: GUEST_DETAILS.lateArrival,
  },
  {
    category: 'logistics',
    question: 'Where do I find the welcome party group?',
    answer: GUEST_DETAILS.welcomeLocation,
  },

  // Guest Experience
  {
    category: 'experience',
    question: 'Where should I sit for the ceremony?',
    answer: GUEST_DETAILS.ceremonySeating,
  },
  {
    category: 'experience',
    question: 'Where is the photo booth?',
    answer: GUEST_DETAILS.photoBooth,
  },
  {
    category: 'experience',
    question: 'What music will be played, and can I request a song?',
    answer: `${GUEST_DETAILS.music} ${GUEST_DETAILS.songRequests}`,
  },
  {
    category: 'experience',
    question: 'What happens at the end of the night?',
    answer: GUEST_DETAILS.sendOff,
  },
  {
    category: 'experience',
    question: 'Should I keep and wear my original festival wristband?',
    answer: 'Yes—if you received a Forever Fest wristband with your original invitation, please keep it! We will not be mailing new wristbands. We encourage you to wear yours (we will be wearing ours!) to share in the festival spirit, but it is not required and we will not check wristbands at the door.',
  },
  {
    category: 'experience',
    question: 'What is the dress code?',
    answer: 'Funky Formal Attire! Think semi-formal wear with a fun, creative twist that matches the festive spirit of ✨ Forever Fest ✨. Eclectic colors, bold prints, and unique accessories are all welcome. Colorful suits and dresses are great, but you can also wear whatever makes you feel your best in semi-formal attire. Express yourself in whatever makes you feel confident! 😎',
    componentKey: 'pinterest',
  },
  {
    category: 'experience',
    question: 'Will there be food at the reception?',
    answer: `${GUEST_DETAILS.dinner} Two passed hors d’oeuvres are served during cocktail hour.`,
    componentKey: 'menu',
  },
  {
    category: 'experience',
    question: 'Will there be drinks?',
    answer: `${GUEST_DETAILS.drinks} ${GUEST_DETAILS.welcomeDrinks}`,
    componentKey: 'bar',
  },
  {
    category: 'experience',
    question: 'I have a dietary restriction, what options will be provided?',
    answer: GUEST_DETAILS.dietary,
  },
  {
    category: 'experience',
    question: 'Can I take photos/videos during the ceremony?',
    answer: 'We will have a photographer to capture the important moments, so we politely ask to refrain from recording *until* the "I do" moment, after which you can record/take photos as much as you want. The goal is to be present in the ceremony with us, so that should be the focus. Go wild during the reception with capturing media! 📸 #ForeverFest2026',
  },
  {
    category: 'experience',
    question: 'What should I bring?',
    answer: `${GUEST_DETAILS.clothing} ${GUEST_DETAILS.accessories} ${GUEST_DETAILS.belongings}`,
  },
  {
    category: 'experience',
    question: 'Can I step out or leave early?',
    answer: `${GUEST_DETAILS.quietSpace} ${GUEST_DETAILS.reentry}`,
  },
  {
    category: 'experience',
    question: 'Is there an after-party?',
    answer: GUEST_DETAILS.afterParty,
  },
  {
    category: 'experience',
    question: 'How can I share my photos with everyone?',
    answer: `Share your favorite moments in our Google Photos album. You can also use ${GUEST_PHOTO_ALBUM.hashtag}. ${GUEST_DETAILS.professionalPhotos}`,
    componentKey: 'photos',
  },
  {
    category: 'event',
    question: 'Who can help on the wedding day?',
    answer: `Ask the entrance greeters or venue staff for help. You can also contact our wedding coordinator, ${GUEST_CONTACT.name}, at ${GUEST_CONTACT.phone}.`,
    componentKey: 'help',
  },

  // RSVP & Guests
  {
    category: 'rsvp',
    question: 'Can I still RSVP?',
    answer: 'Our RSVP deadline was September 20, 2026. If you have not responded yet, please text or email Sean or Eva as soon as you can and we will do our best to fit you in.',
    componentKey: 'rsvp',
  },
  {
    category: 'rsvp',
    question: 'Does the QR code from my original invitation still work?',
    answer: 'Yes! If you received a QR code sheet with your original invitation, it still works for the updated celebration. For the quickest route, you can also use the RSVP page linked here.',
    componentKey: 'rsvp',
  },
  {
    category: 'rsvp',
    question: 'Can I bring a plus-one?',
    answer: 'We love that you want to bring someone to celebrate with us! However, due to space constraints, we\'ve limited the guest list to those specifically invited. If your plus-one\'s name was not listed on the invitation, they are not invited. If you have questions about your invite, please reach out.',
  },
  {
    category: 'rsvp',
    question: 'Are kids invited?',
    answer: 'To ensure everyone can fully immerse themselves in the festival vibes, we\'re making this an adults-only event. Time for the big kids to play!',
  },
  {
    category: 'rsvp',
    question: 'How can I update my RSVP?',
    answer: 'If you already submitted the RSVP form, search your email for a Jotform confirmation with the subject "Response received for Forever Fest 2026," then use the "Edit Link" in that email. You can also text or email Sean or Eva for help at any time.',
  },
];

export const getCategoryCount = (category: FaqCategory): number =>
  category === 'all' ? faqs.length : faqs.filter((faq) => faq.category === category).length;

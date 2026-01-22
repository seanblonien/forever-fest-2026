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

export type FaqComponentKey = 'calendar' | 'map' | 'our-story' | 'pinterest' | 'travel';

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
    question: 'Why is it called "Forever Fest"?',
    answer: 'Festivals are at the core of Sean and Eva\'s relationship story (See "Our Story" page). Festivals and EDM culture have positively influenced Sean and Eva to be more creative, expressive, social, joyful, and connected, and so they want to bring some of that culture and energy to their wedding. "Forever Fest" is a manifestation of Sean and Eva\'s lifelong commitment together (i.e. "forever") combined with their desire to bring some of the festival/EDM culture to their wedding day (i.e. "fest").',
    componentKey: 'our-story',
  },
  {
    category: 'event',
    question: 'When is the wedding?',
    answer: 'Forever Fest 2026 will take place on Saturday, March 28th, 2026 from 6:00 PM to 11:00 PM CST. Add the event to your calendar using the buttons below ⬇️',
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
    answer: 'Please plan to arrive about 30 minutes before the ceremony starts at 6:00 PM to ensure you have time to settle in and find your seat.',
  },

  // Logistics
  {
    category: 'logistics',
    question: 'What do I do for parking?',
    answer: 'There is free, complimentary valet parking available for all guests! Simply pull up to the address for DEC on dragon, and a valet will take care of the rest.',
  },
  {
    category: 'logistics',
    question: 'Are the ceremony and reception indoors or outdoors?',
    answer: 'Our ceremony and reception will take place on the rooftop of DEC on Dragon, an outdoor venue designed for comfort in any weather. It features a retractable roof for open-air enjoyment on clear days, with the option to close it for rain. Heating lamps will also be provided for cooler temperatures. Rest assured, we\'ve planned with the venue to ensure a wonderful celebration, come rain or shine!',
  },
  {
    category: 'logistics',
    question: 'I am coming from out of town, where can I stay?',
    answer: 'Check out the Travel page for details and recommendations on where to stay.',
    componentKey: 'travel',
  },

  // Guest Experience
  {
    category: 'experience',
    question: 'Do I need to wear my festival wristband? What if I forgot or lost it?',
    answer: 'We do encourage you to wear your wristband (we will be wearing ours!) to share in the festival spirit with us, but it is not required. If you forget it or lost it, that\'s ok, we will not be checking them at the door. They are just for fun.',
  },
  {
    category: 'experience',
    question: 'What is the dress code?',
    answer: 'Funky Semi-Formal Attire! Think semi-formal wear with a fun, creative twist that matches the festive spirit of ✨ Forever Fest ✨. Eclectic colors, bold prints, and unique accessories are all welcome. Colorful suits and dresses are great, but you can also wear whatever makes you feel your best in semi-formal attire. Express yourself in whatever makes you feel confident! 😎',
    componentKey: 'pinterest',
  },
  {
    category: 'experience',
    question: 'Will there be food at the reception?',
    answer: 'Absolutely! We\'ve got a delicious buffet meal planned for the reception with a cocktail hour with hors d\'oeuvres as well.',
  },
  {
    category: 'experience',
    question: 'Will there be drinks?',
    answer: 'Yes! There will be a bar at the reception and the cocktail hour. The cocktail hour drinks are covered by us, but the reception will have a cash bar that you can pay for at your own discretion.',
  },
  {
    category: 'experience',
    question: 'I have a dietary restriction, what options will be provided?',
    answer: 'Our buffet will include allergy labels on all dishes so you can make informed choices. While we won\'t be offering alternative entrees (both main options are meat-based), there will be a variety of sides and appetizers available. If you have specific concerns, feel free to reach out and we\'ll do our best to help!',
  },
  {
    category: 'experience',
    question: 'Can I take photos/videos during the ceremony?',
    answer: 'We will have a photographer to capture the important moments, so we politely ask to refrain from recording *until* the "I do" moment, after which you can record/take photos as much as you want. The goal is to be present in the ceremony with us, so that should be the focus. Go wild during the reception with capturing media! 📸 #ForeverFest2026',
  },

  // RSVP & Guests
  {
    category: 'rsvp',
    question: 'Can I bring a plus-one?',
    answer: 'We love that you want to bring someone to celebrate with us! However, due to space constraints, we\'ve limited the guest list to those specifically invited. If your plus one\'s  name was not listed on the invitation, they are not invited. If you have questions about your invite, please reach out.',
  },
  {
    category: 'rsvp',
    question: 'Are kids invited?',
    answer: 'To ensure everyone can fully immerse themselves in the festival vibes, we\'re making this an adults-only event. Time for the big kids to play!',
  },
  {
    category: 'rsvp',
    question: 'How can I update my RSVP?',
    answer: 'If you already submitted the RSVP form, you can check your email from Jotform with the edit link to edit/update your RSVP. Simply search for "Response received for Forever Fest 2026" as the subject line, and the "Edit Link" will be in the email. Or, you can text or email Sean/Eva at any time.',
  },
];

export const getCategoryCount = (category: FaqCategory): number =>
  category === 'all' ? faqs.length : faqs.filter((faq) => faq.category === category).length;

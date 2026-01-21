'use client';

import { ExternalLink, LinkIcon, Pin, Plane } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouteHash } from '@/hooks';
import MapLinks from '@/components/MapLinks';
import { CalendarEmbedDynamic } from '../home';

// Travel Link Component
const TravelLink = () => (
  <Link
    className='inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group text-lg font-league-gothic'
    href='/travel'
  >
    <Plane className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200' />
    <span>Visit Travel Page</span>
    <ExternalLink className='w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200' />
  </Link>
);

// Pinterest Moodboard Link Component
const PinterestMoodboardLink = () => (
  <a
    className='inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group text-lg font-league-gothic'
    href='https://pin.it/hICCCXKqj'
    rel='noopener noreferrer'
    target='_blank'
  >
    <Pin className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200' />
    <span>Pinterest Moodboard</span>
    <ExternalLink className='w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200' />
  </a>
);

// Function to generate URL-friendly slugs from questions
const generateSlug = (question: string) => question
  .toLowerCase()
  .replaceAll(/[^a-z0-9\s-]/g, '') // Remove special characters
  .replaceAll(/\s+/g, '-') // Replace spaces with hyphens
  .replaceAll(/-+/g, '-') // Replace multiple hyphens with single hyphen
  .trim();

type QuestionProps = {
  answer: string;
  component?: React.ReactNode;
  highlightedId: string | null;
  question: string;
};

const IndividualFAQ = ({ answer, component, highlightedId, question }: QuestionProps) => {
  const [hasCopiedTooltip, setHasCopiedTooltip] = useState(false);
  const slug = generateSlug(question);
  const isHighlighted = highlightedId === slug;

  const copyLinkToClipboard = () => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    void navigator.clipboard.writeText(url);

    // Show tooltip
    setHasCopiedTooltip(true);

    // Hide tooltip after 1.5 seconds
    setTimeout(() => {
      setHasCopiedTooltip(false);
    }, 1500);
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-xs rounded-lg p-6 transition-all duration-500 group/question ${
        isHighlighted
          ? 'ring-2 ring-[#DE1ACE] shadow-lg shadow-[#DE1ACE]/50 bg-white/20'
          : ''
      }`}
      id={slug}
    >
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-xl font-bold flex-1'>
          <button
            className='text-left cursor-pointer group-hover/question:underline transition-all duration-200'
            title='Copy link to this question'
            type='button'
            onClick={copyLinkToClipboard}
          >
            {question}
          </button>
        </h3>
        <div className='relative'>
          <button
            className='ml-3 p-1 rounded-sm hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/question:opacity-100'
            title='Copy link to this question'
            onClick={copyLinkToClipboard}
          >
            <LinkIcon className='w-4 h-4 text-white/60 hover:text-white transition-colors duration-200' />
          </button>
          {hasCopiedTooltip && (
            <div className='absolute -top-8 -left-4 bg-[#DE1ACE]/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg transition-opacity duration-300 animate-in fade-in-0'>
              Link copied!
            </div>
          )}
        </div>
      </div>
      <p className='text-lg mb-4'>{answer}</p>
      {component && (
        <div className='mt-4 flex justify-center'>
          {component}
        </div>
      )}
    </div>
  );
};

type FAQData = {
  answer: string;
  component?: React.ReactNode;
  question: string;
};

const faqs: FAQData[] = [
  // Essential Event Details
  {
    question: 'Why is it called "Forever Fest"?',
    answer: 'Festivals are at the core of Sean and Eva\'s relationship story (See "Our Story" page). Festivals and EDM culture have positively influenced Sean and Eva to be more creative, expressive, social, joyful, and connected, and so they want to bring some of that culture and energy to their wedding. "Forever Fest" is a manifestation of Sean and Eva\'s lifelong commitment together (i.e. "forever") combined with their desire to bring some of the festival/EDM culture to their wedding day (i.e. "fest").',
  },
  {
    question: 'When is the wedding?',
    answer: 'Forever Fest 2026 will take place on Saturday, March 28th, 2026 from 6:00 PM to 11:00 PM CST. Add the event to your calendar using the buttons below ⬇️',
    component: <CalendarEmbedDynamic />,
  },
  {
    question: 'Where is the wedding?',
    answer: 'Both the ceremony and reception will be held at DEC on Dragon, located at 1414 Dragon St, Dallas, TX 75207.',
    component: <MapLinks />,
  },
  {
    question: 'What time should I arrive for the ceremony?',
    answer: 'Please plan to arrive about 30 minutes before the ceremony starts at 6:00 PM to ensure you have time to settle in and find your seat.',
  },

  // Logistics & Practical Concerns
  {
    question: 'What do I do for parking?',
    answer: 'There is free, complimentary valet parking available for all guests! Simply pull up to the address for DEC on dragon, and a valet will take care of the rest.',
  },
  {
    question: 'Are the ceremony and reception indoors or outdoors?',
    answer: 'Our ceremony and reception will take place on the rooftop of DEC on Dragon, an outdoor venue designed for comfort in any weather. It features a retractable roof for open-air enjoyment on clear days, with the option to close it for rain. Heating lamps will also be provided for cooler temperatures. Rest assured, we\'ve planned with the venue to ensure a wonderful celebration, come rain or shine!',
  },
  {
    question: 'I am coming from out of town, where can I stay?',
    answer: 'Check out the Travel page for details and recommendations on where to stay.',
    component: <TravelLink />,
  },

  // Guest Experience & Expectations
  {
    question: 'What is the dress code?',
    answer: 'Funky Semi-Formal Attire! Think semi-formal wear with a fun, creative twist that matches the festive spirit of ✨ Forever Fest ✨. Eclectic colors, bold prints, and unique accessories are all welcome. Colorful suits and dresses are great, but you can also wear whatever makes you feel your best in semi-formal attire. Express yourself in whatever makes you feel confident! 😎',
    component: <PinterestMoodboardLink />,
  },
  {
    question: 'Will there be food at the reception?',
    answer: 'Absolutely! We\'ve got a delicious buffet meal planned for the reception with a cocktail hour with hors d\'oeuvres as well. If you have any dietary restrictions, please let us know in advance in the RSVP form.',
  },
  {
    question: 'Will there be drinks?',
    answer: 'Yes! There will be a bar at the reception and the cocktail hour. The cocktail hour drinks are covered by us, but the reception will have a cash bar that you can pay for at your own discretion.',
  },
  {
    question: 'Can I take photos/videos during the ceremony?',
    answer: 'Yes you can! We will have a photographer to capture the important moments, but when the wedding party is walking up or down the aisle, feel free to take photos or videos. Please do so in as respectful manner to not interrupt the ceremony (i.e. no flash). Go wild during the reception with capturing media! #ForeverFest2026',
  },

  // RSVP & Guest Management
  {
    question: 'Can I bring a plus-one?',
    answer: 'We love that you want to bring someone to celebrate with us! However, due to space constraints, we\'ve limited the guest list to those specifically invited. If your plus one\'s  name was not listed on the invitation, they are not invited. If you have questions about your invite, please reach out.',
  },
  {
    question: 'Are kids invited?',
    answer: 'To ensure everyone can fully immerse themselves in the festival vibes, we\'re making this an adults-only event. Time for the big kids to play!',
  },
  {
    question: 'How can I update my RSVP?',
    answer: 'If you already submitted the RSVP form, you can check your email from Jotform with the edit link to edit/update your RSVP. Simply search for "Response received for Forever Fest 2026" as the subject line, and the "Edit Link" will be in the email. Or, you can text or email Sean/Eva at any time.',
  },
];

export const FaqPage: React.FC = () => {
  const { currentHash } = useRouteHash();

  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>FAQs</h1>
      <div className='space-y-6'>
        <div className='space-y-6 text-left'>
          {faqs.map((faq) => (
            <IndividualFAQ
              key={`faq-${faq.question}`}
              answer={faq.answer}
              component={faq.component}
              highlightedId={currentHash}
              question={faq.question}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

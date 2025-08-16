import MapLinks from '@/components/MapLinks';
import {ExternalLink, Plane, ShoppingBag} from 'lucide-react';
import Link from 'next/link';
import {CalendarEmbedDynamic} from '../home';

// Travel Link Component
function TravelLink() {
  return (
    <Link
      href="/travel"
      className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group text-lg font-league-gothic"
    >
      <Plane className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
      <span>Visit Travel Page</span>
      <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
    </Link>
  );
}

// Registry Link Component
function RegistryLink() {
  return (
    <Link
      href="/registry"
      className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group text-lg font-league-gothic"
    >
      <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
      <span>View Registry</span>
      <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
    </Link>
  );
}

type FAQ = {
  question: string;
  answer: string;
  component?: React.ReactNode;
};

const faqs: FAQ[] = [
  // Essential Event Details
  {
    question: 'When is the wedding?',
    answer: 'Forever Fest 2026 will take place on Saturday, March 28th, 2026 from 6:00 PM to 11:00 PM CST.',
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
    answer: 'The ceremony and reception will take place outside on the rooftop of DEC on Dragon. It has a cover on it in case it rains, otherwise, but if it is a beautiful day, we will have the roof open. If it is cold, there is also heating lamps as well. We will work with the venue to make sure the weather does not affect celebrating our big day!',
  },
  {
    question: 'I am coming from out of town, where can I stay?',
    answer: 'Yes! We\'ll be sharing hotel recommendations and booking information soon. Check back or visit our Travel page for updates.',
    component: <TravelLink />,
  },

  // Guest Experience & Expectations
  {
    question: 'What should I wear?',
    answer: 'The attire is Funky Semi-Formal! Think semi-formal wear with a fun, creative twist that matches the festive spirit of Forever Fest. Eclectic colors, bold prints, and unique accessories are all welcome. Color suits and colorful dresses would be awesome!',
  },
  {
    question: 'Will there be food there?',
    answer: 'Absolutely! We\'ve got a delicious buffet meal planned for the reception with a cocktail hour with hors d\'oeuvres as well. If you have any dietary restrictions, please let us know in advance in the RSVP form.',
  },
  {
    question: 'Will there be drinks or a bar?',
    answer: 'Yes! There will be a bar at the reception and the cocktail hour. We are planning to cover everyone\'s drinks for the cocktail hour reception up until a cap is reached, after which the bar will be a cash bar that you can pay for at your own discretion.',
  },
  {
    question: 'Can I take photos/videos during the ceremony?',
    answer: 'Yes you can! We will have a photographer to capture the important moments, but when the wedding party is walking up or down the aisle, feel free to take photos or videos. Please do so in as respectful manner to not interrupt the ceremony (i.e. no flash). Go wild during the reception with capturing media! #ForeverFest2026',
  },

  // RSVP & Guest Management
  {
    question: 'Can I bring a plus-one?',
    answer: 'We love that you want to bring someone to celebrate with us! However, due to space constraints, we\'ve limited the guest list to those specifically invited. If you have questions about your invite, please reach out.',
  },
  {
    question: 'What should I do if I need to change my RSVP?',
    answer: 'Life happens! If you need to make any changes to your RSVP, please let us know as soon as possible by text or email so that we can plan accordingly.',
  },

  // Gifts & Registry
  {
    question: 'Where can I find your wedding registry?',
    answer: 'You can find links to our registries in the Registry section of this website. Your presence is the best gift we could ask for, but we truly appreciate your generosity!',
    component: <RegistryLink />,
  },
];

export default function FAQsPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">FAQs</h1>
      <div className="space-y-6">
        <p className="text-lg md:text-xl mb-12">
          Frequently asked questions about Forever Fest 2026
        </p>
        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl mb-3 font-league-gothic">{faq.question}</h3>
              <p className="text-lg mb-4">{faq.answer}</p>
              {faq.component && (
                <div className="mt-4 flex justify-center">
                  {faq.component}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ExternalLink, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import MapLinks from '@/components/MapLinks';
import { createPageMetadata } from '@/lib';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Travel',
  description: 'Travel information and accommodations for Forever Fest 2026 - Sean & Eva\'s Wedding.',
});

type HotelOption = {
  description: string;
  highlights: string[];
  image: string;
  link: string;
  name: string;
  tier: string;
  walk: string;
};

const HOTEL_OPTIONS: HotelOption[] = [
  {
    tier: 'High-End',
    name: 'Virgin Hotels Dallas',
    walk: '18 min walk',
    link: 'https://maps.app.goo.gl/qKtXoSY7QaZVB5C28',
    image: '/hotels/virgin.jpg',
    description: 'Design-forward stay with a lively lobby and polished rooms near the Design District.',
    highlights: ['Walkable to venue', 'Upscale vibe', 'Great for weekend stays'],
  },
  {
    tier: 'Mid-Range',
    name: 'Hilton Anatole',
    walk: '24 min walk',
    link: 'https://maps.app.goo.gl/xSwBfLdxFy6mViWc9',
    image: '/hotels/anatole.jpg',
    description: 'Full-service hotel with classic comfort and easy rideshare access to the venue.',
    highlights: ['Spacious rooms', 'Easy rideshare', 'Family friendly'],
  },
  {
    tier: 'Value',
    name: 'Courtyard by Marriott Dallas Medical/Market Center',
    walk: '12 min walk',
    link: 'https://maps.app.goo.gl/J6QdA8MgzVvNgoC87',
    image: '/hotels/courtyard.jpg',
    description: 'Comfortable, streamlined option with the closest walk to the venue.',
    highlights: ['Closest walk', 'Great value'],
  },
];

// eslint-disable-next-line max-lines-per-function -- long page
function TravelPage() {
  return (
    <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>Travel</h1>
      <div className='space-y-8 text-lg md:text-xl'>
        <p>
          {'Planning your trip to Forever Fest 2026? Here\'s everything you need to know.'}
        </p>

        {/* Getting to the Venue by Car */}
        <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
          <h2 className='text-2xl mb-4 font-league-gothic text-center'>Getting to the Venue by Car</h2>

          <div className='space-y-4'>
            <div>
              <div className='mb-4 flex justify-center'>
                <div className='h-130 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5'>
                  <iframe
                    allowFullScreen
                    className='h-full w-full'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.0473219456185!2d-96.8192274!3d32.79100450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9945e1b932f5%3A0x6a6b6e08f2a819ed!2sDEC%20on%20Dragon!5e0!3m2!1sen!2sus!4v1769299179667!5m2!1sen!2sus'
                    title='DEC on Dragon map'
                  />
                </div>
              </div>
              <h2 className='text-xl mb-2 font-league-gothic'>Venue Address</h2>
              <p className='mb-2'>
                DEC on Dragon 1414 Dragon St, Dallas, TX 75207
              </p>
              <p className='mb-4'>
                The venue is located in the
                {' '}
                <a className='underline' href='https://maps.app.goo.gl/jj4joNDuV4Vve27q6'>Design District</a>
                {' '}
                of Dallas.
              </p>
              <div className='flex justify-center'>
                <MapLinks />
              </div>
            </div>

            <div>
              <h2 className='text-xl mb-2 font-league-gothic'>Parking</h2>
              <p className='bg-green-600/20 border border-green-500/30 rounded-lg p-3'>
                <strong>Great news!</strong>
                {' '}
                There is free, complimentary valet parking available
                for all guests! Simply pull up to the address for DEC on Dragon, and a valet will
                take care of the rest.
              </p>
            </div>
          </div>
        </section>

        {/* Getting to Dallas by Air */}
        <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
          <h2 className='text-2xl mb-4 font-league-gothic text-center'>Getting to Dallas by Air</h2>
          <p className='mb-4'>
            Dallas is served by two major airports. We recommend comparing flights to both for
            the best price and convenience.
          </p>

          <div className='space-y-4'>
            <div>
              <h2 className='text-xl mb-2 font-league-gothic'>
                <a
                  aria-label='Link to Dallas Love Field Website'
                  className='hover:text-[#DE1ACE] transition-colors duration-200'
                  href='https://www.dallas-lovefield.com/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Dallas Love Field (DAL)
                </a>
              </h2>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>A smaller airport much closer to the venue (10-15 min drive).</li>
                <li>Primary airline: Southwest.</li>
              </ul>
            </div>

            <div>
              <h2 className='text-xl mb-2 font-league-gothic'>
                <a
                  aria-label='Link to DFW Website'
                  className='hover:text-[#DE1ACE] transition-colors duration-200'
                  href='https://www.dfwairport.com/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Dallas/Fort Worth (DFW)
                </a>
              </h2>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>A large international airport with more flight options (20-30 min drive).</li>
                <li>Primary airline: American Airlines.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hotel Recommendations */}
        <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
          <div className='text-center space-y-3'>
            <h2 className='text-2xl font-league-gothic'>Hotel Recommendations</h2>
            <p className='text-white/80'>
              There is
              {' '}
              <em>no official hotel block</em>
              {' '}
              for our wedding. These nearby options are walkable to the venue and are a great place
              to start.
            </p>
          </div>
          <div className='mt-8 flex flex-col gap-6'>
            {HOTEL_OPTIONS.map((hotel) => (
              <a
                key={hotel.name}
                aria-label={`Open in Google Maps: ${hotel.name}`}
                className='group relative grid overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_20px_40px_-30px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE1ACE]/70 md:grid-cols-[240px_1fr]'
                href={hotel.link}
                rel='noopener noreferrer'
                target='_blank'
                title='Open in Google Maps'
              >
                <span className='absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/90 text-[#DE1ACE] shadow-sm transition duration-300 group-hover:scale-105'>
                  <ExternalLink className='h-4 w-4' />
                </span>
                <div className='relative h-52 w-full overflow-hidden md:h-full'>
                  <Image
                    fill
                    alt={`${hotel.name} exterior illustration`}
                    className='object-cover transition duration-500 group-hover:scale-105'
                    sizes='(min-width: 768px) 240px, 100vw'
                    src={hotel.image}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                  <span className='absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white'>
                    {hotel.tier}
                  </span>
                </div>
                <div className='flex flex-1 flex-col gap-4 p-6 text-[#101048]'>
                  <div>
                    <h3 className='text-2xl font-league-gothic'>{hotel.name}</h3>
                    <p className='mt-2 text-sm text-[#101048]/70'>{hotel.description}</p>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-[#101048]/70'>
                    <MapPin className='h-4 w-4 text-[#DE1ACE]' />
                    <span>{hotel.walk}</span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {hotel.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className='rounded-full border border-[#DE1ACE]/20 bg-[#DE1ACE]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#101048]/80'
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TravelPage;

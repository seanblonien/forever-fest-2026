import { ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';
import entranceMap from '@/docs/images/dec on dragon map view.png';
import entranceStreet from '@/docs/images/dec on dragon street view.png';
import { GUEST_DETAILS } from '@/lib/guestInformation';
import { HOTEL_BLOCK, HOTEL_DETAILS, TRAVEL_DETAILS } from '@/lib/publicWeddingDetails';
import anatoleHotelImage from '@/public/hotels/anatole.jpg';
import courtyardHotelImage from '@/public/hotels/courtyard.jpg';
import virginHotelImage from '@/public/hotels/virgin.jpg';
import MapLinks from '@/components/map-links';
import { createPageMetadata } from '@/lib';
import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Travel',
  description: 'Travel information and accommodations for Forever Fest 2026 - Sean & Eva\'s Wedding.',
});

type HotelOption = {
  description: string;
  highlights: string[];
  image: StaticImageData;
  link: string;
  name: string;
  tier: string;
  walk: string;
};

const HOTEL_IMAGES = [virginHotelImage, anatoleHotelImage, courtyardHotelImage];
const HOTEL_OPTIONS: HotelOption[] = HOTEL_DETAILS.map((hotel, index) => ({ ...hotel, image: HOTEL_IMAGES[index] }));

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
              <h2 className='text-xl mb-2 font-league-gothic'>Venue Address</h2>
              <p className='mb-2'>
                {TRAVEL_DETAILS.venue}
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
              <p className='mt-4 text-base'>{GUEST_DETAILS.entrance}</p>
              <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                <figure>
                  <Image alt='Satellite map showing DEC on Dragon beside Dragon Street' className='h-auto w-full rounded-xl' sizes='(min-width: 640px) 260px, 100vw' src={entranceMap} />
                  <figcaption className='mt-2 text-xs text-white/65'>DEC on Dragon on Dragon Street</figcaption>
                </figure>
                <figure>
                  <Image alt='DEC on Dragon street entrance with the DEC sign above the doors' className='h-auto w-full rounded-xl' sizes='(min-width: 640px) 260px, 100vw' src={entranceStreet} />
                  <figcaption className='mt-2 text-xs text-white/65'>Look for the DEC sign at the entrance</figcaption>
                </figure>
              </div>
            </div>

            <div>
              <h2 className='text-xl mb-2 font-league-gothic'>Parking</h2>
              <p className='bg-green-600/20 border border-green-500/30 rounded-lg p-3'>
                <strong>Great news!</strong>
                {' '}
                {TRAVEL_DETAILS.parking}
              </p>
            </div>
          </div>
        </section>

        {/* Getting to Dallas by Air */}
        <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
          <h2 className='text-2xl mb-4 font-league-gothic text-center'>Getting to Dallas by Air</h2>
          <p className='mb-4'>
            {TRAVEL_DETAILS.airports}
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
                <li>{TRAVEL_DETAILS.dal}</li>
                <li>{TRAVEL_DETAILS.dalAirline}</li>
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
                <li>{TRAVEL_DETAILS.dfw}</li>
                <li>{TRAVEL_DETAILS.dfwAirline}</li>
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
              <em>{HOTEL_BLOCK}</em>
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
                    placeholder='blur'
                    sizes='(min-width: 768px) 240px, 100vw'
                    src={hotel.image}
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
                  <span className='absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white'>
                    {hotel.tier}
                  </span>
                </div>
                <div className='flex flex-1 flex-col gap-4 p-6 text-penn-blue'>
                  <div>
                    <h3 className='text-2xl font-league-gothic'>{hotel.name}</h3>
                    <p className='mt-2 text-sm text-penn-blue/70'>{hotel.description}</p>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-penn-blue/70'>
                    <MapPin className='h-4 w-4 text-[#DE1ACE]' />
                    <span>{hotel.walk}</span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {hotel.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className='rounded-full border border-[#DE1ACE]/20 bg-[#DE1ACE]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-penn-blue/80'
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

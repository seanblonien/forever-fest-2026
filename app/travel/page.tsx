import MapLinks from '@/components/MapLinks';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Travel',
};

// eslint-disable-next-line max-lines-per-function -- long page
const Travel: React.FC = () => (
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
            <h3 className='text-xl mb-2 font-league-gothic'>Venue Address</h3>
            <p className='mb-2'>
              DEC on Dragon 1414 Dragon St, Dallas, TX 75207
            </p>
            <p className='mb-4'>
              The venue is located in the
              {' '}
              <a className='underline' href='https://maps.app.goo.gl/jj4joNDuV4Vve27q6'>Design District</a>
              {' '}
              of Dallas,
            </p>
            <div className='flex justify-center'>
              <MapLinks />
            </div>
          </div>

          <div>
            <h3 className='text-xl mb-2 font-league-gothic'>Parking</h3>
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
            <h3 className='text-xl mb-2 font-league-gothic'>
              <a
                className='hover:text-[#DE1ACE] transition-colors duration-200'
                href='https://www.dallas-lovefield.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                Dallas Love Field (DAL)
              </a>
            </h3>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li>A smaller airport much closer to the venue (10-15 min drive).</li>
              <li>Primary airline: Southwest.</li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl mb-2 font-league-gothic'>
              <a
                className='hover:text-[#DE1ACE] transition-colors duration-200'
                href='https://www.dfwairport.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                Dallas/Fort Worth (DFW)
              </a>
            </h3>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li>A large international airport with more flight options (20-30 min drive).</li>
              <li>Primary airline: American Airlines.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hotel Recommendations */}
      <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
        <h2 className='text-2xl mb-4 font-league-gothic text-center'>Hotel Recommendations</h2>
        <p className='mb-4'>There is <em>no official hotel block</em> for our wedding.
          However, there are many great hotels nearby the venue in the Design district that we do
          recommend within walking distance.
        </p>
        <ul className='list-disc list-inside space-y-2 ml-4'>
          <li>
            <strong>High-End:</strong>
            {' '}
            <a
              className='underline hover:text-[#DE1ACE] transition-colors duration-200'
              href='https://maps.app.goo.gl/qKtXoSY7QaZVB5C28'
              rel='noopener noreferrer'
              target='_blank'
            >
              Virgin Hotels Dallas
            </a>
            , 18 min walk
          </li>
          <li>
            <strong>Mid-Range:</strong>
            {' '}
            <a
              className='underline hover:text-[#DE1ACE] transition-colors duration-200'
              href='https://maps.app.goo.gl/xSwBfLdxFy6mViWc9'
              rel='noopener noreferrer'
              target='_blank'
            >
              Hilton Anatole
            </a>
            , 24 min walk
          </li>
          <li>
            <strong>Value:</strong>
            {' '}
            <a
              className='underline hover:text-[#DE1ACE] transition-colors duration-200'
              href='https://maps.app.goo.gl/J6QdA8MgzVvNgoC87'
              rel='noopener noreferrer'
              target='_blank'
            >
              Courtyard by Marriott Dallas Medical/Market Center
            </a>
            , 12 min walk
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default Travel;

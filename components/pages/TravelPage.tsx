import MapLinks from '@/components/MapLinks';

export const TravelPage: React.FC = () => (
  <div className='w-full max-w-[600px] mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
    <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>Travel</h1>
    <div className='space-y-8 text-lg md:text-xl'>
      <p>
        {'Planning your trip to Forever Fest 2026? Here\'s everything you need to know.'}
      </p>

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

      {/* Hotel Block Details */}
      <section className='bg-white/10 backdrop-blur-xs rounded-lg p-6 text-left'>
        <h2 className='text-2xl mb-4 font-league-gothic text-center'>Hotel Block Details</h2>
        <p>Hotel recommendations and booking information coming soon...</p>
      </section>
    </div>
  </div>
);

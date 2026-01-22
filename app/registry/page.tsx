import { ExternalLink, Heart, ShoppingBag } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Registry',
};

const Registry: React.FC = () => (
  <div className='w-full max-w-150 mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0'>
    <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic'>Registry</h1>
    <div className='space-y-8 text-lg md:text-xl'>
      <p>
        {`Your presence is the greatest gift, but if you'd like to give something special, we've
        made it easy to find the perfect present.`}
      </p>

      {/* Universal Registry */}
      <div className='bg-white/10 backdrop-blur-xs rounded-lg p-8'>
        <h2 className='text-2xl mb-4 font-league-gothic'>Online Registry</h2>
        <a
          aria-label='Go to MyRegistry.com registry page'
          className='inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-6 group text-xl font-league-gothic'
          href='https://www.myregistry.com/giftlist/forever-fest'
          rel='noopener noreferrer'
          target='_blank'
        >
          <ShoppingBag className='w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200' />
          <span>MyRegistry.com</span>
          <ExternalLink className='w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200' />
        </a>
      </div>

      {/* In-Person Gifts Note */}
      <div className='bg-white/10 backdrop-blur-xs rounded-lg p-8'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Heart className='w-6 h-6 text-pink-300' />
          <h2 className='text-2xl font-league-gothic'>In-Person Gifts</h2>
          <Heart className='w-6 h-6 text-pink-300' />
        </div>
        <p className='text-base md:text-lg'>
          {`If you prefer not to shop online/pay fees, in-person gifts at the wedding are absolutely welcome!
          Cards, letters, or any heartfelt gesture you'd like to share with us on our special day
          would mean the world to us. 🫶`}
        </p>
      </div>
    </div>
  </div>
);

export default Registry;

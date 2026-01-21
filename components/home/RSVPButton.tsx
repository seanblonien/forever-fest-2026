/* eslint-disable unicorn/filename-case -- pascal case */
import { Button } from '@/components/ui/button';

export const RSVPButton = () => (
  <div>
    <p className='text-sm md:text-base italic font-arial  max-w-150 mx-auto'>
      📥 If you received your wedding invitation or were expecting one, please fille out the RSVP
      form below
    </p>

    <a href='https://form.jotform.com/253148903936161' rel='noopener noreferrer' target='_blank'>
      <Button
        className='text-2xl md:text-3xl font-black mt-4 py-6 rounded-lg
           bg-linear-to-r from-penn-blue to-steel-pink text-white
           border-2 border-white
           animate-pulse-glow
           hover:scale-120
           transition-all duration-500 ease-out'
        size='lg'
      >
        RSVP Form
      </Button>
    </a>
  </div>
);
/* eslint-enable unicorn/filename-case  */

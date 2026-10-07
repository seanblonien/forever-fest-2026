'use client';

import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import welcomePartyInvite from '@/public/forever-fest-welcome-party-invite.png';

import 'react-medium-image-zoom/dist/styles.css';
import '@/styles/zoom-custom.css';

export function WelcomePartyInvitation() {
  return (
    <figure className='mx-auto mt-6 max-w-100'>
      <Zoom
        a11yNameButtonUnzoom='Close enlarged welcome party invitation'
        a11yNameButtonZoom='Enlarge welcome party invitation'
        classDialog='welcome-party-zoom'
        zoomImg={{ src: welcomePartyInvite.src, srcSet: '', sizes: '' }}
        zoomMargin={24}
      >
        <Image
          alt='Welcome Party invitation honoring Sean & Eva, with pink disco balls and the Dallas skyline'
          className='block h-auto w-full rounded-lg'
          sizes='(max-width: 474px) calc(100vw - 74px), 400px'
          src={welcomePartyInvite}
        />
      </Zoom>
      <figcaption className='mt-2 text-center text-sm text-white/70'>
        Select the invitation to enlarge.
      </figcaption>
    </figure>
  );
}

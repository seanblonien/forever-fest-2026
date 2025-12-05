import Image from 'next/image';
import { DiscoBallsSvg } from '@/components/svgs/DiscoBallsSvg';
import { TitleSvg } from '../svgs';

export const MainTitle = () => (
  <>
    {/* Main Title Section with layered images */}
    <div className='relative py-12 flex items-center justify-center'>
      {/* Couple Photo - Middle layer */}
      <div className='relative z-10 pt-14 md:pt-24'>
        <Image
          priority
          alt='Sean and Eva'
          className='rounded-lg w-48 sm:w-56 md:w-64 h-auto'
          height={320}
          sizes='(max-width: 640px) 192px, (max-width: 768px) 224px, 256px'
          src='/sean_and_eva_banner_photo.webp'
          width={256}
        />
      </div>

      {/* Title SVG - Top layer */}
      <div className='absolute -top-4 bottom-0 left-0 right-0 m-auto z-30 pointer-events-none'>
        <div className='max-w-[600px] mx-auto'>
          <TitleSvg className='max-w-full max-h-full object-contain' />
        </div>
      </div>
      {/* Disco Balls SVG - Background layer */}
      <div className='absolute inset-0 flex items-center justify-center z-20 pointer-events-none'>
        <div className='w-full max-w-[800px] -mt-[180px] md:-mt-[240px] -mx-16'>
          <DiscoBallsSvg className='w-full h-full object-contain' />
        </div>
      </div>
    </div>
  </>
);

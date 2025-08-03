import {DiscoBallsSvg} from '@/components/svgs/DiscoBallsSvg';
import Image from 'next/image';
import {TitleSvg} from '../svgs';

type MainTitleProps = {
  className?: string;
};

export function MainTitle({
  className = '',
}: MainTitleProps) {
  return (
    <div className={className}>
      {/* Main Title Section with layered images */}
      <div className="relative py-12 flex items-center justify-center">
        {/* Couple Photo - Middle layer */}
        <div className="relative z-10 mt-14 md:mt-24">
          <Image
            src="/sean_and_eva_banner_photo.webp"
            alt="Sean and Eva"
            width={256}
            height={320}
            className="object-cover rounded-lg max-w-full h-auto w-48 sm:w-56 md:w-64"
            priority
          />
        </div>

        {/* Title SVG - Top layer */}
        <div className="absolute -top-4 bottom-0 left-0 right-0 m-auto z-30 pointer-events-none">
          <div className="max-w-[600px] mx-auto">
            <TitleSvg className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        {/* Disco Balls SVG - Background layer */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-full max-w-[800px] -mt-[170px] -mx-16">
            <DiscoBallsSvg className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

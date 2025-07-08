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
      <div className="relative my-12 flex items-center justify-center min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">

        {/* Disco Balls SVG - Background layer */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]">
            <DiscoBallsSvg className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Couple Photo - Middle layer */}
        <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px] z-20 mt-12 md:mt-16 lg:mt-20">
          <Image
            src="/sean_and_eva_banner_photo.png"
            alt="Sean and Eva"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Title SVG - Top layer */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="w-64 h-48 md:w-80 md:h-64 lg:w-96 lg:h-80">
            <TitleSvg className="w-full h-full object-contain" />
          </div>
        </div>

      </div>
    </div>
  );
}

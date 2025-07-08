import Image from 'next/image';

interface MainTitleProps {
  className?: string;
}

export default function MainTitle({
  className = '',
}: MainTitleProps) {
  return (
    <div className={className}>

      {/* Main Title Section with layered images */}
      <div className="relative my-8 flex items-center justify-center">
        {/* Couple Photo - Base layer */}
        <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px]">
          <Image
            src="/sean_and_eva_banner_photo.png"
            alt="Sean and Eva"
            fill
            className="object-cover rounded-lg"
            priority
          />

          {/* Title SVG - Positioned above the photo */}
          <div className="absolute -top-16 md:-top-20 lg:-top-24 left-1/2 transform -translate-x-1/2 w-full">
            <div className="relative w-full h-48 md:h-64 lg:h-80">
              <Image
                src="/title.svg"
                alt="Forever Fest Title"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Disco Balls SVG - Overlaid to surround the photo with larger size */}
          <div className="absolute inset-0 -m-16 md:-m-24 lg:-m-32">
            <div className="relative w-full h-full scale-125 md:scale-150 lg:scale-175">
              <Image
                src="/disco_balls.svg"
                alt="Disco Balls Decoration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

interface MainTitleProps {
  title?: string;
  subtitle?: string;
  coupleImageSrc?: string;
  coupleImageAlt?: string;
  className?: string;
}

export default function MainTitle({
  title = 'FOREVER FEST',
  subtitle = 'Presents',
  coupleImageSrc = '/placeholder.svg?height=240&width=192',
  coupleImageAlt = 'Sean and Eva',
  className = ''
}: MainTitleProps) {
  return (
    <div className={className}>
      {/* Presents Text */}
      <div className="text-white text-xl md:text-2xl font-light italic mb-4">
        {subtitle}
      </div>

      {/* Forever Fest Title */}
      <div className="relative mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-forever-fest-title-gradient mb-6">
          {title}
        </h1>

        {/* Couple Photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-40 md:w-48 md:h-60 bg-gray-300 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={coupleImageSrc}
              alt={coupleImageAlt}
              width={192}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

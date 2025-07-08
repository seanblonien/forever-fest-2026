import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

export default function Header({
  className = ''
}: HeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {/* Sean & Eva Skyline Logo */}
      <div className="flex justify-center">
        {/*
          1. Parent must be 'relative'.
          2. Parent needs a defined height or aspect ratio.
             Here, we're setting a fixed height for demonstration.
             Consider using 'aspect-ratio' property if you know the image's ratio.
        */}
        <div className="relative w-full max-h-32 aspect-[512/204]">
          <Image
            src="/sean_and_eva_skyline.svg"
            alt="Sean & Eva with city skyline"
            fill
            className="opacity-80 object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}

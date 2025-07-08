import Image from 'next/image';

interface CitySkylineProps {
  className?: string;
}

export default function CitySkyline({
  className = '',
}: CitySkylineProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-full max-w-[600px] opacity-40">
        <Image
          src="/skyline.svg"
          alt="City skyline silhouette"
          width={1344.93}
          height={327.28}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}

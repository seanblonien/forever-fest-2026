import {SkylineSvg} from '@/components/svgs/SkylineSvg';

type CitySkylineProps = {
  className?: string;
};

export function CitySkyline({
  className = '',
}: CitySkylineProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-full max-w-[600px]">
        <SkylineSvg className="w-full h-auto" />
      </div>
    </div>
  );
}

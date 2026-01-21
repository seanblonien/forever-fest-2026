import { SkylineSvg } from '@/components/svgs/SkylineSvg';

type CitySkylineProps = {
  className?: string;
};

export const CitySkyline = ({
  className = '',
}: CitySkylineProps) => (
  <div className={`flex justify-center ${className}`}>
    <div className='w-full max-w-150'>
      <SkylineSvg className='w-full h-auto' />
    </div>
  </div>
);

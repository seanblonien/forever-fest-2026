import { SkylineSvg } from '@/components/svgs/SkylineSvg';

export function CitySkyline() {
  return (
    <div className='flex justify-center '>
      <div className='w-full max-w-150'>
        <SkylineSvg className='w-full h-auto' />
      </div>
    </div>
  );
}

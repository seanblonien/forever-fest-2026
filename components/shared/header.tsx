import { SkylineHeaderSvg } from '@/components/svgs';

export function Header() {
  return (
    <div className='flex justify-center'>
      <div className='relative w-full max-h-32'>
        <SkylineHeaderSvg className='w-full h-full pt-2' />
      </div>
    </div>
  );
}

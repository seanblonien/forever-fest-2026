import { HOME_DESCRIPTION } from '@/lib/publicWeddingDetails';

export function Description() {
  return (
    <div className='text-white text-lg md:text-xl mb-8 max-w-100 mx-auto leading-relaxed font-arial'>
      <p className='mb-4'>
        {HOME_DESCRIPTION}
      </p>
    </div>
  );
}

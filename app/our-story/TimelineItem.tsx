'use client';

import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '@/styles/zoom-custom.css';

export type TimelineItemData = {
  date: string;
  dateLink?: Route;
  id: number;
  isGrid?: boolean;
  label: string;
  photos?: {
    alt: string;
    id: number;
    isPriority?: boolean;
    src: string;
  }[];
};

type Props = {
  item: TimelineItemData;
};

export const TimelineItem: React.FC<Props> = ({ item }) => {
  const content = (
    <>
      <div className='mb-4'>
        <h2 className='text-2xl font-alex-brush mb-1 transition-transform duration-300 hover:scale-[1.2] origin-left'>
          {item.date}
        </h2>
        <h4 className='text-xl font-league-gothic transition-transform duration-300 hover:scale-[1.2] origin-left'>
          {item.label}
        </h4>
      </div>

      {(item.photos?.length ?? 0) > 0 && (
        <div className={item.isGrid ? 'columns-2 gap-4' : 'space-y-4'}>
          {item.photos?.map((photo) => (
            <Zoom
              key={photo.id}
              a11yNameButtonUnzoom='Close enlarged photo'
              a11yNameButtonZoom='Click to enlarge photo'
            >
              <Image
                alt={photo.alt}
                className={`rounded-lg min-w-full ${item.isGrid ? 'mb-4' : ''}`}
                height={item.isGrid ? 200 : 400}
                priority={photo.isPriority ?? false}
                sizes='(max-width: 768px) 90vw, (max-width: 1200px) 80vw'
                src={photo.src}
                style={{
                  objectFit: 'cover',
                  display: 'block',
                  maxWidth: '100%',
                }}
                width={item.isGrid ? 300 : 600}
              />
            </Zoom>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className='relative'>
      <div className='absolute -left-4 top-4 w-0 h-0 flex items-center justify-center -translate-x-1/2'>
        <span aria-hidden className='text-3xl leading-none cursor-pointer transition-transform duration-houseBpm hover:scale-150 hover:rotate-360 active:scale-150 active:rotate-360'>🪩</span>
      </div>

      <div className='ml-4'>
        {item.dateLink
          ? (
              <Link className='block hover:opacity-80 transition-opacity duration-200' href={item.dateLink}>
                {content}
              </Link>
            )
          : content}
      </div>
    </div>
  );
};

import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '../../styles/zoom-custom.css';

// Timeline data structure
type TimelineItem = {
  id: number;
  date: string;
  label: string;
  grid?: boolean;
  photos?: {
    id: number;
    src: string;
    alt: string;
  }[];
};

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: 'Dec 29th, 2022',
    label: 'First night we met, LAN 2022',
    photos: [
      {id: 1, src: '/timeline1.webp', alt: 'LAN group photo 2022'},
    ],
  },
  {
    id: 2,
    date: 'Feb 11th, 2023',
    label: 'First concert together, Subtronics',
    photos: [
      {id: 2, src: '/timeline2.webp', alt: 'Subtronics group photo'},
    ],
  },
  {
    id: 3,
    date: 'Feb 14th, 2023',
    label: 'First date, Valentines Day',
    photos: [
      {id: 3, src: '/timeline3.webp', alt: 'Valentines kandi bracelet'},
      {id: 4, src: '/timeline4.webp', alt: 'Valentines flower that is slightly wilted'},
    ],
  },
  {
    id: 4,
    date: 'April 13th, 2023',
    label: 'When Sean asked Eva to be his girlfriend',
    photos: [
      {id: 5, src: '/timeline5.webp', alt: 'Facetime screenshot of Eva smiling in the afterglow'},
    ],
  },
  {
    id: 5,
    date: 'April 23rd, 2023',
    label: 'First "I love you", at Ubbi Dubbi',
    photos: [
      {id: 6, src: '/timeline6.webp', alt: 'Sean and Eva selfie at Ubbi Dubbi'},
    ],
  },
  {
    id: 6,
    date: 'May 23rd, 2023',
    label: 'First time meeting family',
    photos: [
      {id: 7, src: '/timeline7.webp', alt: 'Eva and Sean together at the zoo'},
    ],
  },
  {
    id: 7,
    date: 'June 30th, 2023',
    label: 'First family trip to Puerto Rico',
    photos: [
      {id: 8, src: '/timeline8.webp', alt: 'Aubree, Eva, Sean drinking from coconuts in Puerto Rico'},
    ],
  },
  {
    id: 8,
    date: 'Dec 10th, 2023',
    label: 'First marathon together 🏃',
    photos: [
      {id: 9, src: '/timeline9.webp', alt: 'Sean and Eva holding medals from the marathon'},
    ],
  },
  {
    id: 9,
    date: 'Mar 16th, 2024',
    label: 'First camping trip together',
    photos: [
      {id: 10, src: '/timeline10.webp', alt: 'Sean and Eva hiking at Turner Falls'},
    ],
  },
  {
    id: 10,
    date: 'Aug 1st, 2024',
    label: 'Rave Life! 🕺💃',
    grid: true,
    photos: [
      {id: 11, src: '/fest1.webp', alt: ''},
      {id: 12, src: '/fest2.webp', alt: ''},
      {id: 13, src: '/fest3.webp', alt: ''},
      {id: 14, src: '/fest4.webp', alt: ''},
      {id: 15, src: '/fest5.webp', alt: ''},
      {id: 16, src: '/fest6.webp', alt: ''},
      {id: 17, src: '/fest7.webp', alt: ''},
      {id: 18, src: '/fest8.webp', alt: ''},
    ],
  },
  {
    id: 11,
    date: 'Dec 28th, 2024',
    label: 'Sean proposes at LAN 2024 💍',
    photos: [
      {id: 19, src: '/fest9.webp', alt: 'Sean and Eva with the "she said yes" totem right after the proposal in the Marauda moshpit'},
      {id: 20, src: '/fest10.webp', alt: 'Sean and Eva kissing surrounded the disco balls and mirrors with "Lights All Night" in the background'},
    ],
  },
  {
    id: 12,
    date: 'February 9th, 2024',
    label: 'Engagement party celebration',
    photos: [
      {id: 21, src: '/engage1.webp', alt: ''},
      {id: 22, src: '/engage2.webp', alt: ''},
      {id: 23, src: '/engage3.webp', alt: ''},
    ],
  },
  {
    id: 13,
    date: 'March 28th, 2026',
    label: 'Forever Fest 2026!',
  },
];

export default function OurStoryPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-white pt-6 pb-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic text-center">Our Story</h1>

      {/* Timeline Container */}
      <div className="relative pl-8">
        {/* Vertical Line - continuous line for entire timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-papaya-whip"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item) => (
            <div key={item.id} className="relative">
              {/* Disco Ball Point - precisely centered on the vertical line */}
              <div className="absolute -left-4 top-4 w-0 h-0 flex items-center justify-center -translate-x-1/2">
                <span className="text-2xl leading-none">🪩</span>
              </div>

              {/* Content */}
              <div className="ml-4">
                {/* Date and Label */}
                <div className="mb-4">
                  <h3 className="text-2xl font-alex-brush text-papaya-whip mb-1">
                    {item.date}
                  </h3>
                  <h4 className="text-xl font-league-gothic text-papaya-whip">
                    {item.label}
                  </h4>
                </div>

                {/* Photos */}
                {(item.photos?.length ?? 0) > 0 && (
                  <div className={item.grid ? 'columns-2 gap-4' : 'space-y-4'}>
                    {item.photos!.map((photo) => (
                      <Zoom
                        key={photo.id}
                        a11yNameButtonZoom="Click to enlarge photo"
                        a11yNameButtonUnzoom="Close enlarged photo"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={item.grid ? 300 : 600}
                          height={item.grid ? 200 : 400}
                          className={`rounded-lg min-w-full ${item.grid ? 'mb-4' : ''}`}
                          style={{
                            objectFit: 'cover',
                            display: 'block',
                            maxWidth: '100%',
                          }}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw"
                          priority={false}
                        />
                      </Zoom>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

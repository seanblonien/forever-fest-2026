import { Metadata } from 'next';
import { STORY_PARAGRAPHS, STORY_TIMELINE } from '@/lib/publicWeddingDetails';
import { createPageMetadata } from '@/lib';
import { TimelineItem, TimelineItemData } from './timeline-item';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Our Story',
  description: 'The story of how Eva Melendez and Sean Blonien met, fell in love, and created Forever Fest 2026.',
});

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    ...STORY_TIMELINE[0],
    photos: [
      { id: 1, src: '/our-story/lan-group-2022.webp', alt: 'LAN group photo 2022', isPriority: true },
    ],
  },
  {
    id: 2,
    ...STORY_TIMELINE[1],
    photos: [
      { id: 2, src: '/our-story/subtronics-group.webp', alt: 'Subtronics group photo' },
    ],
  },
  {
    id: 3,
    ...STORY_TIMELINE[2],
    photos: [
      { id: 3, src: '/our-story/valentines-kandi.webp', alt: 'Valentines kandi bracelet' },
      { id: 4, src: '/our-story/valentines-flower.webp', alt: 'Valentines flower that is slightly wilted' },
    ],
  },
  {
    id: 4,
    ...STORY_TIMELINE[3],
    photos: [
      { id: 5, src: '/our-story/facetime-eva-smile.webp', alt: 'Facetime screenshot of Eva smiling in the afterglow' },
    ],
  },
  {
    id: 5,
    ...STORY_TIMELINE[4],
    photos: [
      { id: 6, src: '/our-story/sean-eva-ubbi-dubbi.webp', alt: 'Sean and Eva selfie at Ubbi Dubbi' },
    ],
  },
  {
    id: 6,
    ...STORY_TIMELINE[5],
    photos: [
      { id: 7, src: '/our-story/sean-eva-zoo.webp', alt: 'Eva and Sean together at the zoo' },
    ],
  },
  {
    id: 7,
    ...STORY_TIMELINE[6],
    photos: [
      { id: 8, src: '/our-story/puerto-rico-coconuts.webp', alt: 'Aubree, Eva, Sean drinking from coconuts in Puerto Rico' },
    ],
  },
  {
    id: 8,
    ...STORY_TIMELINE[7],
    photos: [
      { id: 9, src: '/our-story/marathon-medals.webp', alt: 'Sean and Eva holding medals from the marathon' },
    ],
  },
  {
    id: 9,
    ...STORY_TIMELINE[8],
    photos: [
      { id: 10, src: '/our-story/turner-falls-hike.webp', alt: 'Sean and Eva hiking at Turner Falls' },
    ],
  },
  {
    id: 10,
    ...STORY_TIMELINE[9],
    isGrid: true,
    photos: [
      { id: 11, src: '/our-story/bass-canyon-2023.webp', alt: 'Eva and Sean at Bass Canyon 2023' },
      { id: 12, src: '/our-story/lights-all-night-2023.webp', alt: 'Eva and Seanat at Lights All Night 2023' },
      { id: 13, src: '/our-story/edc-2024.webp', alt: 'Eva and Sean at EDC 2024' },
      { id: 14, src: '/our-story/svdden-death-2024.webp', alt: 'Eva and Sean at Svdden Death concert 2024' },
      { id: 15, src: '/our-story/shaq-bass-2023.webp', alt: 'Eva and Sean at Shaq Bass All Stars 2023' },
      { id: 16, src: '/our-story/bonnaroo-2024.webp', alt: 'Eva and Sean at Bonnaroo 20024' },
      { id: 17, src: '/our-story/freaky-deaky-2023.webp', alt: 'Eva and Sean at Freaky Deaky 2023' },
      { id: 18, src: '/our-story/lost-lands-2024.webp', alt: 'Eva and Sean at Lost Lands 2024' },
    ],
  },
  {
    id: 11,
    ...STORY_TIMELINE[10],
    photos: [
      { id: 19, src: '/our-story/lan-2024-she-said-yes.webp', alt: 'Sean and Eva with the "she said yes" totem right after the proposal in the Marauda moshpit at LAN 2024' },
      { id: 20, src: '/our-story/lan-2024-disco-kiss.webp', alt: 'Sean and Eva kissing surrounded the disco balls and mirrors with "Lights All Night" in the background at LAN 2024' },
    ],
  },
  {
    id: 12,
    ...STORY_TIMELINE[11],
    photos: [
      { id: 21, src: '/our-story/blonien-family.webp', alt: 'Eva and Sean with the Blonien family' },
      { id: 24, src: '/our-story/both-families.webp', alt: 'Eva and Sean with both of their families' },
      { id: 23, src: '/our-story/sean-eva-friends.webp', alt: 'Eva and Sean with friends' },
    ],
  },
  {
    id: 13,
    ...STORY_TIMELINE[12],
    dateLink: '/faqs#when-is-the-wedding',
  },
];

function OurStoryPage() {
  return (
    <div className='w-full max-w-150 mx-auto text-white pt-6 pb-12 px-2 md:px-0'>
      <h1 className='text-4xl md:text-6xl mb-8 font-league-gothic text-center'>Our Story</h1>

      {/* How We Met Story */}
      <div className='mb-8 space-y-4'>
        <p className='text-papaya-whip leading-relaxed text-justify'>
          {STORY_PARAGRAPHS[0]}
        </p>

        <p className='text-papaya-whip leading-relaxed text-justify'>
          {STORY_PARAGRAPHS[1]}
        </p>
      </div>

      {/* Timeline Container */}
      <div className='relative pl-8'>
        {/* Vertical Line - continuous line for entire timeline */}
        <div className='absolute left-4 top-0 bottom-0 w-0.5 bg-papaya-whip' />

        {/* Timeline Items */}
        <div className='space-y-12'>
          {timelineData.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurStoryPage;

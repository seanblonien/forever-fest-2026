import { Metadata } from 'next';
import { createPageMetadata } from '@/lib';
import { TimelineItem, TimelineItemData } from './timeline-item';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Our Story',
  description: 'The story of how Sean & Eva met and fell in love.',
});

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    date: 'Dec 29th, 2022',
    label: 'First night we met, Lights All Night 2022',
    photos: [
      { id: 1, src: '/our-story/timeline1.webp', alt: 'LAN group photo 2022', isPriority: true },
    ],
  },
  {
    id: 2,
    date: 'Feb 11th, 2023',
    label: 'First concert together, Subtronics',
    photos: [
      { id: 2, src: '/our-story/timeline2.webp', alt: 'Subtronics group photo' },
    ],
  },
  {
    id: 3,
    date: 'Feb 14th, 2023',
    label: 'First date, Valentines Day',
    photos: [
      { id: 3, src: '/our-story/timeline3.webp', alt: 'Valentines kandi bracelet' },
      { id: 4, src: '/our-story/timeline4.webp', alt: 'Valentines flower that is slightly wilted' },
    ],
  },
  {
    id: 4,
    date: 'April 13th, 2023',
    label: 'When Sean asked Eva to be his girlfriend',
    photos: [
      { id: 5, src: '/our-story/timeline5.webp', alt: 'Facetime screenshot of Eva smiling in the afterglow' },
    ],
  },
  {
    id: 5,
    date: 'April 23rd, 2023',
    label: 'First "I love you", at Ubbi Dubbi',
    photos: [
      { id: 6, src: '/our-story/timeline6.webp', alt: 'Sean and Eva selfie at Ubbi Dubbi' },
    ],
  },
  {
    id: 6,
    date: 'May 23rd, 2023',
    label: 'First time meeting family',
    photos: [
      { id: 7, src: '/our-story/timeline7.webp', alt: 'Eva and Sean together at the zoo' },
    ],
  },
  {
    id: 7,
    date: 'June 30th, 2023',
    label: 'First family trip to Puerto Rico',
    photos: [
      { id: 8, src: '/our-story/timeline8.webp', alt: 'Aubree, Eva, Sean drinking from coconuts in Puerto Rico' },
    ],
  },
  {
    id: 8,
    date: 'Dec 10th, 2023',
    label: 'First marathon together 🏃',
    photos: [
      { id: 9, src: '/our-story/timeline9.webp', alt: 'Sean and Eva holding medals from the marathon' },
    ],
  },
  {
    id: 9,
    date: 'Mar 16th, 2024',
    label: 'First camping trip together',
    photos: [
      { id: 10, src: '/our-story/timeline10.webp', alt: 'Sean and Eva hiking at Turner Falls' },
    ],
  },
  {
    id: 10,
    date: 'Aug 1st, 2024',
    label: 'Rave Life! 🕺💃',
    isGrid: true,
    photos: [
      { id: 11, src: '/our-story/fest1.webp', alt: 'Eva and Sean at Bass Canyon 2023' },
      { id: 12, src: '/our-story/fest2.webp', alt: 'Eva and Seanat at Lights All Night 2023' },
      { id: 13, src: '/our-story/fest3.webp', alt: 'Eva and Sean at EDC 2024' },
      { id: 14, src: '/our-story/fest4.webp', alt: 'Eva and Sean at Svdden Death concert 2024' },
      { id: 15, src: '/our-story/fest5.webp', alt: 'Eva and Sean at Shaq Bass All Stars 2023' },
      { id: 16, src: '/our-story/fest6.webp', alt: 'Eva and Sean at Bonnaroo 20024' },
      { id: 17, src: '/our-story/fest7.webp', alt: 'Eva and Sean at Freaky Deaky 2023' },
      { id: 18, src: '/our-story/fest8.webp', alt: 'Eva and Sean at Lost Lands 2024' },
    ],
  },
  {
    id: 11,
    date: 'Dec 28th, 2024',
    label: 'Sean proposes at Lights All Night 2024 💍',
    photos: [
      { id: 19, src: '/our-story/fest9.webp', alt: 'Sean and Eva with the "she said yes" totem right after the proposal in the Marauda moshpit at LAN 2024' },
      { id: 20, src: '/our-story/fest10.webp', alt: 'Sean and Eva kissing surrounded the disco balls and mirrors with "Lights All Night" in the background at LAN 2024' },
    ],
  },
  {
    id: 12,
    date: 'February 9th, 2025',
    label: 'Engagement party celebration',
    photos: [
      { id: 21, src: '/our-story/engage1.webp', alt: 'Eva and Sean with the Blonien family' },
      { id: 24, src: '/our-story/engage4.webp', alt: 'Eva and Sean with both of their families' },
      { id: 23, src: '/our-story/engage3.webp', alt: 'Eva and Sean with friends' },
    ],
  },
  {
    id: 13,
    date: 'March 28th, 2026',
    label: '➡️ Forever Fest 2026!',
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
          {'Eva had just moved back from LA, and was looking for a Rave Fam. She had enjoyed attending the Nocturnal EDM festival in Southern California, and wanted to find that same energy in Dallas. She went out to Green Light Social, a club in Deep Ellum known for dance music, to check it out. Eva spotted a tall man with an immaculate afro in the crowd and introduced herself to Jordyn Dent. Jordyn was Sean\'s roommate at the time, he told her about the ins and outs of the rave scene in Dallas and about the pre-game to the Lights All Night music festival that Sean was throwing. With an invite, Eva showed up to the pre-game in Sean and Jordyn\'s uptown apartment, and quickly stood out to Sean. He knew everyone at his party but this one new gorgeous girl. After chatting for a bit, Eva left early to get to LAN, but on the way out, Sean and Eva had a small yet memorable interaction in the hallway. Eva knew Sean had the LAN map and was the man with the plan, so she was the one who asked for his number. They hugged and briefly gazed into each other\'s eyes as Sean wore a flirty, big smile. There was a hint of curiosity and romance in the air as Eva exited.'}
        </p>

        <p className='text-papaya-whip leading-relaxed text-justify'>
          {'The night was young, and the interactions at Lights All Night between Sean and Eva sparked a fire that has only grown since. They briefly connected in the world of technology and EDM music. A few weeks later, Sean built the confidence to ask Eva out on a date, and the rest was history. They both discovered their values of having a growth mind set and living life to the fullest amongst many other values and beliefs synced seamlessly. Enjoy our picture story timeline revealing how the connection between these two rave bae\'s progressed. We\'re pleased to have you witness the union of our love ❣️'}
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

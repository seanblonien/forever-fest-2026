import { EventJsonLd } from 'next-seo';
import {
  CalendarEmbedDynamic,
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  RSVPButton,
} from '@/components/home';
import { PageLayout } from '@/components/shared/PageLayout';

const ForeverFestPage: React.FC = () => (
  <PageLayout>
    <EventJsonLd
      useAppDir
      description='Join Sean Blonien & Eva Melendez as they celebrate their love at Forever Fest 2026! A wedding celebration featuring ceremony and reception at DEC on Dragon in Dallas, Texas. Attire: Funky Semi-Formal.'
      endDate='2026-03-28T23:00:00-06:00'
      eventAttendanceMode='OfflineEventAttendanceMode'
      eventStatus='EventScheduled'
      images={['https://foreverfest.wedding/sean_and_eva_banner_photo.webp']}
      location={{
        name: 'DEC on Dragon',
        address: {
          addressLocality: 'Dallas',
          addressRegion: 'TX',
          addressCountry: 'US',
        },
      }}
      name="Forever Fest 2026 - Sean & Eva's Wedding"
      organizer={{
        type: 'Person',
        name: 'Sean Blonien & Eva Melendez',
        url: 'https://foreverfest.wedding',
      }}
      startDate='2026-03-28T18:00:00-06:00'
      url='https://foreverfest.wedding'
    />
    <div className='text-center relative'>
      <MainTitle />
      <CitySkyline />

      <EventDetails />
      <Description />
      <CountdownTimer />
      <RSVPButton />
      <CalendarEmbedDynamic isShowTitle />
    </div>
  </PageLayout>
);
export default ForeverFestPage;

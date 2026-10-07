import { CalendarEmbedDynamic } from '@/components/shared/calendar-embed-dynamic';
import { WelcomePartyAnnouncement } from './_components/welcome-party-announcement';
import {
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  QuickActions,
} from './_components';

function HomePage() {
  return (
    <>
      <MainTitle />
      <CitySkyline />

      <EventDetails />
      <Description />
      <WelcomePartyAnnouncement />
      <CountdownTimer />
      <CalendarEmbedDynamic isShowTitle />
      <QuickActions />
    </>
  );
}
export default HomePage;

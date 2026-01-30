// POSTPONED: Uncomment CalendarEmbedDynamic import when new date is confirmed
// import { CalendarEmbedDynamic } from '@/components/shared/calendar-embed-dynamic';
import {
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
} from './_components';

function HomePage() {
  return (
    <>
      <MainTitle />
      <CitySkyline />

      <EventDetails />
      <Description />
      <CountdownTimer />
      {/* POSTPONED: Uncomment when new date is confirmed */}
      {/* <CalendarEmbedDynamic isShowTitle /> */}
      {/* <QuickActions /> */}
    </>
  );
}
export default HomePage;

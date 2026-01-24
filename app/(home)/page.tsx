import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
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
      <CountdownTimer />
      <CalendarEmbedDynamic isShowTitle />
      <QuickActions />
    </>
  );
}
export default HomePage;

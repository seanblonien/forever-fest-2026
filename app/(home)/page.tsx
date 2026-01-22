import { Metadata } from 'next';
import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
import {
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  QuickActions,
} from './_components';

export const metadata: Metadata = {
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  openGraph: {
    title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  },
};

const HomePage: React.FC = () => (
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
export default HomePage;

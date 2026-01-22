import { Metadata } from 'next';
import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
import { createPageMetadata } from '@/lib';
import {
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  QuickActions,
} from './_components';

export const metadata: Metadata = createPageMetadata({
  title: 'Forever Fest 2026 - Sean & Eva\'s Wedding',
  description: 'Join Sean Blonien & Eva Melendez as they celebrate their love at Forever Fest 2026! Save the date for an unforgettable wedding celebration.',
});

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

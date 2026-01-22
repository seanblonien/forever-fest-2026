import { CalendarEmbedDynamic } from '@/components/shared/CalendarEmbedDynamic';
import {
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  QuickActions,
} from './_components';

const ForeverFestPage: React.FC = () => (
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
export default ForeverFestPage;

import {
  CalendarEmbedDynamic,
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
} from '@/components/home';
import { QuickActions } from '@/components/home/QuickActions';

const ForeverFestPage: React.FC = () => (
  <div className='text-center relative'>
    <MainTitle />
    <CitySkyline />

    <EventDetails />
    <Description />
    <CountdownTimer />
    <CalendarEmbedDynamic isShowTitle />
    <QuickActions />
  </div>
);
export default ForeverFestPage;

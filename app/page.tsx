import {
  CalendarEmbedDynamic,
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
} from '@/components/home';
import { QuickActions } from '@/components/home/QuickActions';
import { PageLayout } from '@/components/shared/PageLayout';

const ForeverFestPage: React.FC = () => (
  <PageLayout>
    <div className='text-center relative'>
      <MainTitle />
      <CitySkyline />

      <EventDetails />
      <Description />
      <CountdownTimer />
      <CalendarEmbedDynamic isShowTitle />
      <QuickActions />
    </div>
  </PageLayout>
);
export default ForeverFestPage;

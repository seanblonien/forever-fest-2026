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

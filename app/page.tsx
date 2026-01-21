import {
  CalendarEmbedDynamic,
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  QuickActions,
} from './_components';

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

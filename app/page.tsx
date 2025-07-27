import {
  CalendarEmbed,
  CitySkyline,
  CountdownTimer,
  Description,
  EventDetails,
  MainTitle,
  RSVPButton,
} from '@/components/home';
import PageLayout from '@/components/shared/PageLayout';

export default function ForeverFestPage() {
  return (
    <PageLayout>
      <div className="text-center relative">
        <MainTitle />
        <CitySkyline />

        <EventDetails />
        <Description />
        <CountdownTimer />
        <RSVPButton />
        <CalendarEmbed />
      </div>
    </PageLayout>
  );
}

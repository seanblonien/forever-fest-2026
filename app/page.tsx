import {
  CitySkyline,
  CountdownTimer,
  Description,
  DiscoBalls,
  EventDetails,
  MainTitle,
  RSVPButton
} from '@/components/home';
import PageLayout from '@/components/shared/PageLayout';

export default function ForeverFestPage() {
  return (
    <PageLayout>
      <div className="text-center relative">
        <DiscoBalls />

        <MainTitle />
        <CitySkyline className="mb-8 mt-20" />

        <EventDetails />
        <Description />
        <CountdownTimer />
        <RSVPButton />
      </div>
    </PageLayout>
  );
}

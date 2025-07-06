import {
  Navigation,
  Header,
  DiscoBalls,
  MainTitle,
  CitySkyline,
  EventDetails,
  Description,
  CountdownTimer,
  RSVPButton,
} from "@/components/home"

export default function ForeverFestPage() {

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #101048 0%, #DE1ACE 100%)",
      }}
    >
      <Header />
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative">
        <DiscoBalls />

        <MainTitle />
        <CitySkyline className="mb-8 mt-20" />

        <EventDetails />
        <Description />
        <CountdownTimer />
        <RSVPButton />
      </div>
    </div>
  )
}

export default function TravelPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">Travel</h1>
      <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
        <p>
          Planning your trip to Forever Fest 2026? Here's everything you need to know.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Getting There</h3>
            <p>Transportation information coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Where to Stay</h3>
            <p>Hotel recommendations and booking information coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Local Attractions</h3>
            <p>Things to do and see in the area coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Weather</h3>
            <p>What to expect and how to prepare coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

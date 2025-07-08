export default function TravelPage() {
  return (
    <div className="text-center text-white py-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Travel</h1>
      <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
        <p>
          Planning your trip to Forever Fest 2026? Here's everything you need to know.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Getting There</h3>
            <p>Transportation information coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Where to Stay</h3>
            <p>Hotel recommendations and booking information coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Local Attractions</h3>
            <p>Things to do and see in the area coming soon...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Weather</h3>
            <p>What to expect and how to prepare coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

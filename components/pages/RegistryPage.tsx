export default function RegistryPage() {
  return (
    <div className="text-center text-white py-12">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">Registry</h1>
      <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
        <p>
          Your presence is the greatest gift, but if you'd like to celebrate with us, here are some
          ideas.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Registry Links</h3>
            <p>Coming soon...</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Honeymoon Fund</h3>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

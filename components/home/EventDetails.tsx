export function EventDetails() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12 text-white">
      <div className="text-left md:text-right">
        <div className="text-6xl md:text-8xl font-black mb-2 text-lavender-pink">
          MARCH
        </div>
        <div className="text-6xl md:text-8xl font-black text-lavender-pink">
          2026
          <span className="text-4xl md:text-6xl italic font-light text-white">
            28
          </span>
        </div>
      </div>
      <div className="text-left space-y-2">
        <div className="text-2xl md:text-3xl font-bold">6:00 PM-11:00 PM</div>
        <div className="text-lg md:text-xl">DEC on Dragon 1414 Dragon St</div>
        <div className="text-lg md:text-xl">Dallas, TX, 75207</div>
        <div className="text-lg md:text-xl font-semibold">
          Attire: Funky Formal
        </div>
      </div>
    </div>
  );
}

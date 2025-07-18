export function EventDetails() {
  return (
    <div className="flex flex-col md:flex-row max-w-[600px] mx-auto mb-12 text-white md:items-stretch">
      {/* Left Column - Date */}
      <div className="flex-1 text-left relative">
        {/* Absolutely positioned "28" in Alex Brush font - right aligned */}
        <div className="absolute top-[40px] right-0 text-9xl font-alex-brush text-white z-10">
          28
        </div>

        <div className="text-6xl md:text-8xl font-black mb-2 text-lavender-pink">
          MARCH
        </div>
        <div className="text-6xl md:text-8xl font-black text-lavender-pink">
          2026
        </div>
      </div>

      {/* Vertical separator line */}
      <div className="hidden md:block w-px bg-lavender-pink mx-8"></div>

      {/* Right Column - Event Details */}
      <div className="flex-1 flex flex-col justify-center text-left space-y-2 text-lavender-pink mt-8 md:mt-0">
        <div className="text-3xl md:text-4xl font-bold">6:00 PM-11:00 PM</div>
        <div className="text-xl md:text-2xl">DEC on Dragon 1414 Dragon St</div>
        <div className="text-xl md:text-2xl">Dallas, TX, 75207</div>
        <div className="text-xl md:text-2xl font-semibold">
          Attire: Funky Formal
        </div>
      </div>
    </div>
  );
}

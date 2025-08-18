export function EventDetails() {
  // High-level event info component
  const EventInfo = () => (
    <div className="flex flex-col space-y-2 text-lavender-pink text-center md:text-left font-league-gothic">
      <div className="text-4xl">Dallas, Texas</div>
      <div className="text-lg opacity-80">DEC on Dragon</div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row max-w-[600px] mx-auto px-4 mb-12 text-white items-center md:items-stretch">
      {/* Date Section - responsive layout */}
      <div className="flex-1 text-center md:text-left md:relative mb-6 md:mb-0">
        {/* Mobile: Single line date */}
        <div className="md:hidden text-6xl font-black text-lavender-pink font-league-gothic">
          MARCH
          {' '}
          <span className="font-alex-brush text-7xl text-white">28th</span>
          {' '}
          2026
        </div>

        {/* Desktop: Stacked date with absolute positioned "28" */}
        <div className="hidden md:block">
          <div className="absolute top-[40px] -right-10 text-9xl font-alex-brush text-white z-10">
            28th
          </div>
          <div className="text-8xl font-black mb-2 text-lavender-pink font-league-gothic">
            MARCH
          </div>
          <div className="text-8xl font-black text-lavender-pink font-league-gothic">
            2026
          </div>
        </div>
      </div>

      {/* Vertical separator line - desktop only */}
      <div className="hidden md:block w-px bg-lavender-pink mx-8"></div>

      {/* Event Details Section */}
      <div className="flex-1 flex flex-col justify-center">
        <EventInfo />
      </div>
    </div>
  );
}

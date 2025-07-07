interface EventDetailsProps {
  month?: string;
  year?: string;
  day?: string;
  time?: string;
  venue?: string;
  address?: string;
  city?: string;
  attire?: string;
  className?: string;
}

export default function EventDetails({
  month = 'MARCH',
  year = '2026',
  day = '28',
  time = '6:00 PM-11:00 PM',
  venue = 'DEC on Dragon 1414 Dragon St',
  address = 'Dallas, TX, 75207',
  city = '',
  attire = 'Funky Formal',
  className = ''
}: EventDetailsProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-8 mb-12 text-white ${className}`}>
      <div className="text-left md:text-right">
        <div className="text-6xl md:text-8xl font-black mb-2" style={{ color: '#FCADE7' }}>
          {month}
        </div>
        <div className="text-6xl md:text-8xl font-black" style={{ color: '#FCADE7' }}>
          {year}
          <span className="text-4xl md:text-6xl italic font-light text-white">
            {day}
          </span>
        </div>
      </div>
      <div className="text-left space-y-2">
        <div className="text-2xl md:text-3xl font-bold">{time}</div>
        <div className="text-lg md:text-xl">{venue}</div>
        <div className="text-lg md:text-xl">{address}</div>
        {city && <div className="text-lg md:text-xl">{city}</div>}
        <div className="text-lg md:text-xl font-semibold">
          Attire:
          {attire}
        </div>
      </div>
    </div>
  );
}

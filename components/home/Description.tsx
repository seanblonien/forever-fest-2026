interface DescriptionProps {
  mainText?: string[];
  rsvpNote?: string;
  className?: string;
}

export default function Description({
  mainText = [
    'We\'re getting married! From the dance floor to forever,',
    'we would love for you to join us celebrate our love.',
  ],
  rsvpNote = '**You MUST RSVP to receive your Forever Fest wrist bands to enter the event**.',
  className = '',
}: DescriptionProps) {
  return (
    <div className={`text-white text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${className}`}>
      {mainText.map((text, index) => (
        <p key={index} className="mb-4">
          {text}
        </p>
      ))}
      {rsvpNote && (
        <p className="text-sm md:text-base italic">
          {rsvpNote}
        </p>
      )}
    </div>
  );
}

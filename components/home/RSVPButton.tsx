import {Button} from '@/components/ui/button';

type RSVPButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
};

export function RSVPButton({
  text = 'RSVP',
  onClick,
  className = '',
}: RSVPButtonProps) {
  return (
    <div className={`pb-12 ${className}`}>
      <Button
        size="lg"
        onClick={onClick}
        className="text-2xl md:text-3xl font-black px-12 py-6 rounded-lg border-4 border-black bg-steel-pink text-penn-blue hover:scale-105 transition-transform"
      >
        {text}
      </Button>
    </div>
  );
}

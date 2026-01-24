import { Calendar, CalendarCheck, CircleHelp, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';

type ActionCardProps = {
  description: string;
  href: Route;
  icon: React.ReactNode;
  isPrimary?: boolean;
  label: string;
};

const ActionCard: React.FC<ActionCardProps> = ({
  description,
  href,
  icon,
  isPrimary = false,
  label,
}) => (
  <Link
    className={`
      group relative overflow-hidden rounded-lg p-6
      transition-all duration-300 ease-out
      ${isPrimary
    ? 'bg-linear-to-br from-steel-pink to-lavender-pink border-2 border-white animate-pulse-glow hover:scale-105'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-steel-pink hover:scale-105'
  }
    `}
    href={href}
  >
    <div className='flex flex-col items-center text-center gap-3'>
      <div
        className={`
        transition-transform duration-300 ease-out
        ${isPrimary ? 'group-hover:scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}
      `}
      >
        {icon}
      </div>
      <div>
        <h2 className='text-2xl md:text-3xl font-league-gothic text-white mb-1'>
          {label}
        </h2>
        <p className='text-sm md:text-base text-white/80'>
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export const QuickActions: React.FC = () => (
  <div className='w-full max-w-150 mx-auto px-4 py-8'>
    <div className='grid grid-cols-2 gap-4'>
      <ActionCard
        description="Let us know you're coming"
        href='/rsvp'
        icon={<Calendar className='w-12 h-12 text-white' />}
        label='RSVP Now'
      />
      <ActionCard
        description='View the schedule'
        href='/schedule'
        icon={<CalendarCheck className='w-12 h-12 text-white' />}
        label='Schedule'
      />
      <ActionCard
        description='Location, parking & directions'
        href='/travel'
        icon={<MapPin className='w-12 h-12 text-white' />}
        label='Travel & Venue Info'
      />
      <ActionCard
        description='Check out the FAQ page'
        href='/faqs'
        icon={<CircleHelp className='w-12 h-12 text-white' />}
        label='Got questions?'
      />
    </div>
  </div>
);

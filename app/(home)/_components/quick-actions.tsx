import { CalendarCheck, CircleHelp, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';

type ActionCardProps = {
  description: string;
  href: Route;
  icon: React.ReactNode;
  label: string;
};

function ActionCard({
  description,
  href,
  icon,
  label,
}: ActionCardProps) {
  return (
    <Link
      className='group relative overflow-hidden rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 hover:border-steel-pink hover:bg-white/20 motion-reduce:transform-none'
      href={href}
    >
      <div className='flex flex-col items-center text-center gap-3'>
        <div className='transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 motion-reduce:transform-none'>
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
}

export function QuickActions() {
  return (
    <div className='w-full max-w-150 mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <ActionCard
          description='Welcome party & wedding day'
          href='/schedule'
          icon={<CalendarCheck className='w-12 h-12 text-white' />}
          label='Schedule'
        />
        <ActionCard
          description='Venue, parking & hotels'
          href='/travel'
          icon={<MapPin className='w-12 h-12 text-white' />}
          label='Travel & Venue'
        />
        <ActionCard
          description='Dress code, drinks & more'
          href='/faqs'
          icon={<CircleHelp className='w-12 h-12 text-white' />}
          label='FAQs'
        />
      </div>
    </div>
  );
}

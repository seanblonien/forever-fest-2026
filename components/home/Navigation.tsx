import Link from 'next/link';
import {StyleProps} from '../../lib';

const navItems = [
  {label: 'HOME', href: '/'},
  {label: 'OUR STORY', href: '/our-story'},
  {label: 'TRAVEL', href: '/travel'},
  null,
  {label: 'REGISTRY', href: '/registry'},
  {label: 'FAQS', href: '/faqs'},
  {label: 'RSVP', href: '/rsvp'},
];

export function Navigation({className = ''}: StyleProps) {
  return (
    <nav className={`flex justify-center items-center pb-2 z-[100] ${className}`}>
      <div className="max-w-[600px] w-full">
        {/* Steel pink border above links with subtle glow */}
        <div className="border-t border-steel-pink pb-1 shadow-[0_0_10px_rgba(184,21,158,0.3)]"></div>

        {/* Navigation links */}
        <div className="flex justify-between text-steel-pink text-xl px-2 md:px-4 font-league-gothic">
          {navItems.map((item) => item
            ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-lavender-pink hover:drop-shadow-[0_0_8px_rgba(252,173,231,0.8)]
                           transition-all duration-200 ease-out"
                >
                  {item.label}
                </Link>
              )
            : (
                <div key="null" className="opacity-50"></div>
              ))}
        </div>
      </div>
    </nav>
  );
}

import Link from 'next/link';
import {StyleProps} from '../../lib';

const navItems = [
  {label: 'HOME', href: '/'},
  {label: 'OUR STORY', href: '/our-story'},
  {label: 'RSVP', href: '/rsvp'},
  null,
  {label: 'REGISTRY', href: '/registry'},
  {label: 'FAQS', href: '/faqs'},
  {label: 'TRAVEL', href: '/travel'},
];

export function Navigation({className = ''}: StyleProps) {
  return (
    <nav className={`flex justify-center items-center pb-2 z-[100] ${className}`}>
      <div className="max-w-[600px] w-full">
        {/* Steel pink border above links */}
        <div className="border-t border-[#DE1ACE] pb-1"></div>

        {/* Navigation links */}
        <div className="flex justify-between text-[#DE1ACE] text-sm md:text-base px-4">
          {navItems.map((item) => item
            ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:opacity-80 transition-opacity"
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

import Link from 'next/link';

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className = '' }: NavigationProps) {
  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'OUR STORY', href: '/our-story' },
    { label: 'RSVP', href: '/rsvp' },
    { label: 'REGISTRY', href: '/registry' },
    { label: 'FAQS', href: '/faqs' },
    { label: 'TRAVEL', href: '/travel' },
  ];

  return (
    <nav className={`flex justify-center items-center pb-6 px-4 ${className}`}>
      <div className="max-w-[600px] w-full">
        {/* Steel pink border above links */}
        <div className="border-t border-[#DE1ACE] mb-4"></div>

        {/* Navigation links */}
        <div className="flex justify-between text-[#DE1ACE] font-bold text-sm md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

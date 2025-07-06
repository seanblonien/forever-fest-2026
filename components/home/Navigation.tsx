interface NavigationProps {
  className?: string
}

export default function Navigation({ className = "" }: NavigationProps) {
  const navItems = [
    { label: "HOME", href: "#" },
    { label: "OUR STORY", href: "#" },
    { label: "RSVP", href: "#" },
    { label: "REGISTRY", href: "#" },
    { label: "FAQS", href: "#" },
    { label: "TRAVEL", href: "#" },
  ]

  return (
    <nav className={`flex justify-center items-center py-6 px-4 ${className}`}>
      <div className="flex space-x-8 text-white font-bold text-sm md:text-base">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="hover:text-pink-300 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

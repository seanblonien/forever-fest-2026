import { Sparkles, Globe } from 'lucide-react';

interface DiscoBallsProps {
  className?: string;
}

export default function DiscoBalls({ className = '' }: DiscoBallsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-10 left-10 md:left-20">
        <Globe className="w-16 h-16 md:w-24 md:h-24 text-pink-400 opacity-80" />
        <Sparkles className="w-4 h-4 text-white absolute -top-2 -right-2" />
      </div>
      <div className="absolute top-20 right-10 md:right-20">
        <Globe className="w-12 h-12 md:w-16 md:h-16 text-purple-300 opacity-70" />
        <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1" />
      </div>
      <div className="absolute bottom-40 left-5 md:left-16">
        <Globe className="w-10 h-10 md:w-14 md:h-14 text-white opacity-60" />
      </div>
      <div className="absolute bottom-60 right-5 md:right-16">
        <Globe className="w-20 h-20 md:w-28 md:h-28 text-pink-300 opacity-75" />
        <Sparkles className="w-5 h-5 text-white absolute -top-2 -right-2" />
      </div>
    </div>
  );
}

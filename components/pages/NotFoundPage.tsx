import {Home} from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">404 Not Found</h1>
      <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
        <p className="text-2xl md:text-3xl font-league-gothic mb-6">
          Oops! You've wandered off the dance floor! 💃🕺
        </p>
        <p className="mb-4">
          Looks like you took a wrong turn on your way to Forever Fest 2026.
          This page is more lost than Sean drunk at a festival!
        </p>
        <p className="mb-6">
          Don't worry though - the party is still happening, and you're still invited!
          Let's get you back to where the magic happens.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-6 group text-xl font-league-gothic"
        >
          <Home className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
          <span>Take Me Home to Forever Fest</span>
          <span className="text-2xl">🙏</span>
        </Link>
      </div>
    </div>
  );
}

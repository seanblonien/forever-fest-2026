'use client';
import {LazyLoad} from '@/components/shared';

// Custom loading placeholder for the calendar
function CalendarLoadingPlaceholder() {
  return (
    <div className="max-w-[600px] height-[294px] flex justify-center items-center">
      <div className="animate-pulse bg-white/10 rounded-lg p-8 w-64 h-16 flex items-center justify-center">
        <span className="text-white/60 font-league-gothic">Loading calendar...</span>
      </div>
    </div>
  );
}

export default function CalendarEmbed() {
  return (
    <div className="py-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold font-league-gothic text-papaya-whip mb-2">
        Save the Date
      </h2>

      <LazyLoad
        importFnAction={() =>
          import('./CalendarEmbed').then((module) => ({
            default: module.CalendarEmbedContent,
          }))}
        fallback={<CalendarLoadingPlaceholder />}
        rootMargin="200px"
      />
    </div>
  );
}

import { WEDDING_BAR_MENU, WEDDING_MENU } from '@/lib/guestInformation';

const DETAILS_STYLE = 'w-full rounded-lg border border-white/15 bg-white/5 p-4';
const SUMMARY_STYLE = 'cursor-pointer text-lg font-league-gothic text-lavender-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-pink';

export function WeddingMenu() {
  return (
    <details className={DETAILS_STYLE}>
      <summary className={SUMMARY_STYLE}>View the full menu</summary>
      <div className='mt-4 space-y-4 text-base'>
        {WEDDING_MENU.map(({ course, dishes }) => (
          <div key={course}>
            <h3 className='mb-2 text-xl font-league-gothic text-white'>{course}</h3>
            <ul className='ml-5 list-disc space-y-1'>{dishes.map((dish) => <li key={dish}>{dish}</li>)}</ul>
          </div>
        ))}
      </div>
    </details>
  );
}

export function WeddingBarMenu() {
  return (
    <details className={DETAILS_STYLE}>
      <summary className={SUMMARY_STYLE}>View the wedding bar selection</summary>
      <ul className='mt-4 ml-5 list-disc space-y-2 text-base'>{WEDDING_BAR_MENU.map((item) => <li key={item}>{item}</li>)}</ul>
    </details>
  );
}

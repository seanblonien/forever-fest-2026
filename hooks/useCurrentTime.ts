import { useSyncExternalStore } from 'react';

const REFRESH_INTERVAL_MS = 60_000;

let clockTimestamp = 0;

const subscribeToClock = (onStoreChange: () => void) => {
  const updateCurrentTime = () => {
    clockTimestamp = Date.now();
    onStoreChange();
  };

  updateCurrentTime();
  const timer = window.setInterval(updateCurrentTime, REFRESH_INTERVAL_MS);

  return () => window.clearInterval(timer);
};

const getCurrentTime = () => clockTimestamp;

const getServerTime = () => 0;

/** Current epoch milliseconds, refreshed every minute. Returns 0 during server render. */
export function useCurrentTime(): number {
  return useSyncExternalStore(subscribeToClock, getCurrentTime, getServerTime);
}

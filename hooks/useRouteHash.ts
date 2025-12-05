'use client';
import { useEffect, useState } from 'react';

type UseRouteHashOptions = {
  /**
   * Duration in milliseconds to keep the hash highlighted before clearing it
   * @default 3000
   */
  highlightDuration?: number;

  /**
   * Whether to automatically clear the highlight after the duration
   * @default true
   */
  isAutoClear?: boolean;
};

/**
 * Custom hook to manage URL hash state and highlighting
 *
 * @param options Configuration options for the hook
 * @returns Object containing the current hash value and a function to manually set it
 */
export const useRouteHash = (options: UseRouteHashOptions = {}) => {
  const { highlightDuration = 3000, isAutoClear = true } = options;
  const [currentHash, setCurrentHash] = useState<string | null>(null);

  useEffect(() => {
    // Check for hash in URL on mount and when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        setCurrentHash(hash);

        // Remove highlight after specified duration if autoClear is enabled
        if (isAutoClear) {
          setTimeout(() => setCurrentHash(null), highlightDuration);
        }
      } else {
        // Clear highlight immediately if no hash
        setCurrentHash(null);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [highlightDuration, isAutoClear]);

  /**
   * Manually set the current hash value
   * Useful for programmatically controlling the highlighted state
   */
  const setHash = (hash: string | null) => {
    setCurrentHash(hash);
  };

  return {
    currentHash,
    setHash,
  };
};

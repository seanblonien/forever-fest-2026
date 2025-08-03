'use client';
import {useEffect, useRef, useState} from 'react';

type UseInViewLazyLoadOptions = {
  /**
   * Root margin for the intersection observer
   * @default '200px'
   */
  rootMargin?: string;
  /**
   * Threshold for the intersection observer
   * @default 0
   */
  threshold?: number;
  /**
   * Delay before triggering the load (in milliseconds)
   * @default 100
   */
  loadDelay?: number;
  /**
   * Whether to trigger loading immediately (useful for testing)
   * @default false
   */
  triggerImmediately?: boolean;
};

/**
 * Hook for lazy loading components when they enter the viewport
 *
 * @param options Configuration options for the intersection observer
 * @returns Object containing ref to attach to container, loading states, and manual trigger
 *
 * @example
 * ```tsx
 * const { containerRef, isInView, shouldLoad } = useInViewLazyLoad({
 *   rootMargin: '100px',
 *   loadDelay: 200
 * });
 *
 * return (
 *   <div ref={containerRef}>
 *     {shouldLoad ? <HeavyComponent /> : <Placeholder />}
 *   </div>
 * );
 * ```
 */
export function useInViewLazyLoad(options: UseInViewLazyLoadOptions = {}) {
  const {
    rootMargin = '200px',
    threshold = 0,
    loadDelay = 100,
    triggerImmediately = false,
  } = options;

  const [isInView, setIsInView] = useState(triggerImmediately);
  const [shouldLoad, setShouldLoad] = useState(triggerImmediately);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (triggerImmediately) {
      setIsInView(true);
      setShouldLoad(true);
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // Add delay before triggering load
          timeoutId = setTimeout(() => {
            setShouldLoad(true);
          }, loadDelay);

          // Cleanup observer once loading is triggered
          observer.disconnect();
          observerRef.current = null;
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observerRef.current = observer;

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.disconnect();
      observerRef.current = null;
    };
  }, [rootMargin, threshold, loadDelay, triggerImmediately]);

  // Manual trigger function for testing or special cases
  const triggerLoad = () => {
    setIsInView(true);
    setShouldLoad(true);
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  return {
    containerRef,
    isInView,
    shouldLoad,
    triggerLoad,
  };
}

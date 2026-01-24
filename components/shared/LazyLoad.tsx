'use client';
import { lazy, ReactNode, Suspense } from 'react';
import { useInViewLazyLoad } from '@/hooks/useInViewLazyLoad';

type LazyLoadProps = {
  /**
   * CSS classes for the container
   */
  className?: string;

  /**
   * Props to pass to the lazy-loaded component
   */
  componentProps?: Record<string, unknown>;

  /**
   * Fallback component to show while loading
   */
  fallback?: ReactNode;

  /**
   * Function that returns a dynamic import promise
   * @example () => import('./HeavyComponent')
   */
  importFnAction: () => Promise<{ default: React.ComponentType }>;

  /**
   * Load immediately without waiting for viewport
   * @default false
   */
  isEager?: boolean;

  /**
   * Delay before loading (ms)
   * @default 100
   */
  loadDelay?: number;

  /**
   * Root margin for intersection observer
   * @default '200px'
   */
  rootMargin?: string;

  /**
   * Threshold for intersection observer
   * @default 0
   */
  threshold?: number;
};

/**
 * Generic lazy loading wrapper component
 *
 * @example Basic usage:
 * ```tsx
 * <LazyLoad
 *   importFnAction={() => import('./HeavyComponent')}
 *   fallback={<div>Loading...</div>}
 *   componentProps={{ title: 'Hello' }}
 *   rootMargin="100px"
 * />
 * ```
 *
 * @example With named export:
 * ```tsx
 * <LazyLoad
 *   importFnAction={() =>
 *     import('./MyComponent').then(module => ({
 *       default: module.MyNamedComponent
 *     }))
 *   }
 *   fallback={<Spinner />}
 * />
 * ```
 *
 * @example Eager loading (no intersection observer):
 * ```tsx
 * <LazyLoad
 *   importFnAction={() => import('./Component')}
 *   eager={true}
 * />
 * ```
 */
export function LazyLoad({
  className = '',
  componentProps = {},
  fallback = (
    <div className='animate-pulse bg-white/10 rounded-lg p-8 flex items-center justify-center'>
      <span className='text-white/60'>Loading...</span>
    </div>
  ),
  importFnAction,
  isEager = false,
  loadDelay = 100,
  rootMargin = '200px',
  threshold = 0,
}: LazyLoadProps) {
  const { containerRef, shouldLoad } = useInViewLazyLoad({
    rootMargin,
    threshold,
    loadDelay,
    isTriggerImmediately: isEager,
  });

  // Create the lazy component only when needed
  const LazyComponent = shouldLoad ? lazy(importFnAction) : null;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && LazyComponent
        ? (
            <Suspense fallback={fallback}>
              <LazyComponent {...componentProps} />
            </Suspense>
          )
        : fallback}
    </div>
  );
}

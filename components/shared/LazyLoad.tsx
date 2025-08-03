'use client';
import {useInViewLazyLoad} from '@/hooks/useInViewLazyLoad';
import {lazy, ReactNode, Suspense} from 'react';

type LazyLoadProps = {
  /**
   * Function that returns a dynamic import promise
   * @example () => import('./HeavyComponent')
   */
  importFn: () => Promise<{default: React.ComponentType<any>}>;

  /**
   * Fallback component to show while loading
   */
  fallback?: ReactNode;

  /**
   * Props to pass to the lazy-loaded component
   */
  componentProps?: Record<string, any>;

  /**
   * CSS classes for the container
   */
  className?: string;

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

  /**
   * Delay before loading (ms)
   * @default 100
   */
  loadDelay?: number;

  /**
   * Load immediately without waiting for viewport
   * @default false
   */
  eager?: boolean;
};

/**
 * Generic lazy loading wrapper component
 *
 * @example Basic usage:
 * ```tsx
 * <LazyLoad
 *   importFn={() => import('./HeavyComponent')}
 *   fallback={<div>Loading...</div>}
 *   componentProps={{ title: 'Hello' }}
 *   rootMargin="100px"
 * />
 * ```
 *
 * @example With named export:
 * ```tsx
 * <LazyLoad
 *   importFn={() =>
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
 *   importFn={() => import('./Component')}
 *   eager={true}
 * />
 * ```
 */
export function LazyLoad({
  importFn,
  fallback = <div className="animate-pulse bg-white/10 rounded-lg p-8 flex items-center justify-center">
    <span className="text-white/60">Loading...</span>
  </div>,
  componentProps = {},
  className = '',
  rootMargin = '200px',
  threshold = 0,
  loadDelay = 100,
  eager = false,
}: LazyLoadProps) {
  const {containerRef, shouldLoad} = useInViewLazyLoad({
    rootMargin,
    threshold,
    loadDelay,
    triggerImmediately: eager,
  });

  // Create the lazy component only when needed
  const LazyComponent = shouldLoad ? lazy(importFn) : null;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && LazyComponent
        ? (
            <Suspense fallback={fallback}>
              <LazyComponent {...componentProps} />
            </Suspense>
          )
        : (
            fallback
          )}
    </div>
  );
}

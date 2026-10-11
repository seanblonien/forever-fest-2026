import { useEffect } from 'react';
import type { RefObject } from 'react';

// iOS keyboards resize/pan the visual viewport independently of CSS viewport units.
export function useMobileChatViewport(isOpen: boolean, panel: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!isOpen || !panel.current)
      return;
    const element = panel.current;
    const mobile = window.matchMedia('(width < 640px)');
    let release: (() => void) | undefined;

    function syncMode() {
      release?.();
      release = undefined;
      if (!mobile.matches)
        return;

      const { body, documentElement: root } = document;
      const { scrollX, scrollY } = window;
      const bodyStyles = {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        width: body.style.width,
        overflow: body.style.overflow,
      };
      const rootStyles = {
        overflow: root.style.overflow,
        overscrollBehavior: root.style.overscrollBehavior,
        backgroundColor: root.style.backgroundColor,
      };
      // Overflow alone does not reliably lock document scrolling on iOS.
      Object.assign(body.style, { position: 'fixed', top: `-${scrollY}px`, left: `-${scrollX}px`, width: '100%', overflow: 'hidden' });
      Object.assign(root.style, { overflow: 'hidden', overscrollBehavior: 'none', backgroundColor: '#101048' });

      const viewport = window.visualViewport;
      function updateViewport() {
        element.style.setProperty('--chat-viewport-height', `${viewport?.height ?? window.innerHeight}px`);
        element.style.setProperty('--chat-viewport-top', `${viewport?.offsetTop ?? 0}px`);
      }
      updateViewport();
      viewport?.addEventListener('resize', updateViewport);
      viewport?.addEventListener('scroll', updateViewport);
      window.addEventListener('resize', updateViewport);

      release = () => {
        viewport?.removeEventListener('resize', updateViewport);
        viewport?.removeEventListener('scroll', updateViewport);
        window.removeEventListener('resize', updateViewport);
        element.style.removeProperty('--chat-viewport-height');
        element.style.removeProperty('--chat-viewport-top');
        Object.assign(body.style, bodyStyles);
        Object.assign(root.style, rootStyles);
        window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
      };
    }

    syncMode();
    mobile.addEventListener('change', syncMode);
    return () => {
      mobile.removeEventListener('change', syncMode);
      release?.();
    };
  }, [isOpen, panel]);
}

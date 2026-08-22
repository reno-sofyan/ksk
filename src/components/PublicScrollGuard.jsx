import { useEffect } from 'react';

const PRIVATE_PATH_PREFIXES = ['/dashboard', '/login'];

function isPrivatePath(pathname) {
  return PRIVATE_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function unlockDocumentScroll() {
  if (typeof document === 'undefined') {
    return;
  }

  const targets = [document.documentElement, document.body].filter(Boolean);

  targets.forEach((element) => {
    element.dataset.publicScrollGuard = 'true';

    if (element.style.overflow === 'hidden') {
      element.style.overflow = '';
    }

    if (element.style.overflowY === 'hidden') {
      element.style.overflowY = '';
    }

    if (element.style.position === 'fixed') {
      element.style.position = '';
      element.style.top = '';
      element.style.left = '';
      element.style.right = '';
      element.style.width = '';
    }
  });
}

export const PublicScrollGuardForPath = ({ pathname }) => {
  useEffect(() => {
    if (isPrivatePath(pathname)) {
      return undefined;
    }

    unlockDocumentScroll();

    const eventOptions = { passive: true };
    const eventNames = ['scroll', 'wheel', 'touchmove', 'pointerdown', 'keydown'];
    const intervalId = window.setInterval(unlockDocumentScroll, 500);
    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 30000);

    eventNames.forEach((eventName) => {
      window.addEventListener(eventName, unlockDocumentScroll, eventOptions);
    });

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      eventNames.forEach((eventName) => {
        window.removeEventListener(eventName, unlockDocumentScroll, eventOptions);
      });
    };
  }, [pathname]);

  return null;
};

export default PublicScrollGuardForPath;

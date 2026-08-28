import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HOTJAR_ID = Number(import.meta.env.VITE_HOTJAR_ID || 0);
const HOTJAR_SV = Number(import.meta.env.VITE_HOTJAR_SV || 6);
const ENABLE_LOCAL = import.meta.env.VITE_HOTJAR_ENABLE_LOCAL === 'true';
const ENGAGED_SECTION_MS = 6000;
const SECTION_THRESHOLD = 0.55;
const PRIVATE_PATH_PREFIXES = ['/dashboard', '/login'];

function isLocalHost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function isPrivatePath(pathname) {
  return PRIVATE_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function canTrack(pathname) {
  if (!HOTJAR_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (isPrivatePath(pathname)) {
    return false;
  }

  return ENABLE_LOCAL || !isLocalHost(window.location.hostname);
}

function normalizeEventPart(value) {
  return String(value || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'unknown';
}

function getRouteGroup(pathname) {
  if (pathname === '/' || /^\/cs[1-4]\/?$/.test(pathname)) {
    return 'home';
  }

  if (pathname === '/blog' || pathname === '/blog/') {
    return 'blog_index';
  }

  if (pathname.startsWith('/blog/')) {
    return 'blog_article';
  }

  if (pathname === '/denah' || pathname === '/denah/') {
    return 'denah';
  }

  return normalizeEventPart(pathname);
}

function installHotjar() {
  if (typeof window.hj !== 'function') {
    window.hj = function hotjarQueue() {
      window.hj.q = window.hj.q || [];
      window.hj.q.push(arguments);
    };
  }

  window._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SV };

  if (document.getElementById('hotjar-tracking-code')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'hotjar-tracking-code';
  script.async = true;
  script.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SV}`;
  document.head.appendChild(script);
}

function sendHotjarEvent(eventName) {
  if (typeof window !== 'undefined' && typeof window.hj === 'function') {
    window.hj('event', eventName);
  }
}

export const HotjarTrackerForLocation = ({ location }) => {

  useEffect(() => {
    if (!canTrack(location.pathname)) {
      return;
    }

    installHotjar();
    window.hj('stateChange', `${location.pathname}${location.search}${location.hash}`);
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    if (!canTrack(location.pathname) || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    installHotjar();

    const timers = new Map();
    const viewedSections = new Set();
    const engagedSections = new Set();
    const routeGroup = getRouteGroup(location.pathname);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = normalizeEventPart(entry.target.id);
          const baseEventName = `${routeGroup}_${sectionId}`;

          if (entry.isIntersecting && entry.intersectionRatio >= SECTION_THRESHOLD) {
            if (!viewedSections.has(sectionId)) {
              viewedSections.add(sectionId);
              sendHotjarEvent(`section_view_${baseEventName}`);
            }

            if (!engagedSections.has(sectionId) && !timers.has(sectionId)) {
              const timeoutId = window.setTimeout(() => {
                engagedSections.add(sectionId);
                timers.delete(sectionId);
                sendHotjarEvent(`section_engaged_${baseEventName}`);
              }, ENGAGED_SECTION_MS);

              timers.set(sectionId, timeoutId);
            }

            return;
          }

          if (timers.has(sectionId)) {
            window.clearTimeout(timers.get(sectionId));
            timers.delete(sectionId);
          }
        });
      },
      { threshold: [0, SECTION_THRESHOLD, 0.75] }
    );

    const setupId = window.setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    }, 250);

    return () => {
      window.clearTimeout(setupId);
      timers.forEach((timeoutId) => window.clearTimeout(timeoutId));
      observer.disconnect();
    };
  }, [location.pathname, location.search]);

  return null;
};

const HotjarTracker = () => {
  const location = useLocation();
  return <HotjarTrackerForLocation location={location} />;
};

export default HotjarTracker;

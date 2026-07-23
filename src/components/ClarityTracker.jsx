import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CLARITY_PROJECT_ID = String(import.meta.env.VITE_CLARITY_PROJECT_ID || '').trim();
const ENABLE_LOCAL = import.meta.env.VITE_CLARITY_ENABLE_LOCAL === 'true';
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
  if (!CLARITY_PROJECT_ID || typeof window === 'undefined' || typeof document === 'undefined') {
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

function installClarity() {
  if (typeof window.clarity !== 'function') {
    window.clarity = function clarityQueue() {
      window.clarity.q = window.clarity.q || [];
      window.clarity.q.push(arguments);
    };
  }

  if (document.getElementById('clarity-tracking-code')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'clarity-tracking-code';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_PROJECT_ID)}`;
  document.head.appendChild(script);
}

function sendClarityEvent(eventName) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('event', eventName);
  }
}

function setClarityTag(name, value) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('set', name, value);
  }
}

function stopClarityTracking() {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('consent', false);
  }
}

const ClarityTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (isPrivatePath(location.pathname)) {
      stopClarityTracking();
      return;
    }

    if (!canTrack(location.pathname)) {
      return;
    }

    installClarity();
    setClarityTag('route_group', getRouteGroup(location.pathname));
    setClarityTag('page_path', location.pathname);
    sendClarityEvent(`page_view_${getRouteGroup(location.pathname)}`);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!canTrack(location.pathname) || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    installClarity();

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
              sendClarityEvent(`section_view_${baseEventName}`);
            }

            if (!engagedSections.has(sectionId) && !timers.has(sectionId)) {
              const timeoutId = window.setTimeout(() => {
                engagedSections.add(sectionId);
                timers.delete(sectionId);
                sendClarityEvent(`section_engaged_${baseEventName}`);
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

export default ClarityTracker;

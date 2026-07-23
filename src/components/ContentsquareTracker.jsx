import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CONTENTSQUARE_SCRIPT_ID = 'contentsquare-uxa-tracking-code';
const CONTENTSQUARE_SCRIPT_SRC = 'https://t.contentsquare.net/uxa/66e02fc9bea2b.js';
const ENABLE_LOCAL = import.meta.env.VITE_CONTENTSQUARE_ENABLE_LOCAL === 'true';
const PRIVATE_PATH_PREFIXES = ['/dashboard', '/login'];

function isLocalHost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function isPrivatePath(pathname) {
  return PRIVATE_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function canTrack(pathname) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (isPrivatePath(pathname)) {
    return false;
  }

  return ENABLE_LOCAL || !isLocalHost(window.location.hostname);
}

function getTrackedPath() {
  const hashPath = window.location.hash.replace('#', '?__');
  return `${window.location.pathname}${hashPath}`.slice(0, 255);
}

function installContentsquare() {
  if (document.getElementById(CONTENTSQUARE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = CONTENTSQUARE_SCRIPT_ID;
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = CONTENTSQUARE_SCRIPT_SRC;
  document.head.appendChild(script);
}

function trackContentsquarePageview() {
  window._uxa = window._uxa || [];

  if (typeof window.CS_CONF === 'undefined') {
    window._uxa.push(['setPath', getTrackedPath()]);
    installContentsquare();
    return;
  }

  window._uxa.push(['trackPageview', getTrackedPath()]);
}

const ContentsquareTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!canTrack(location.pathname)) {
      return;
    }

    trackContentsquarePageview();
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default ContentsquareTracker;

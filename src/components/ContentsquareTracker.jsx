import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { injectContentsquareScript } from '@contentsquare/tag-sdk';

const CONTENTSQUARE_TAG_ID = 'd1b163415cfc9';
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

export const ContentsquareTrackerForLocation = ({ location }) => {

  useEffect(() => {
    if (!canTrack(location.pathname)) {
      return;
    }

    injectContentsquareScript({ clientId: CONTENTSQUARE_TAG_ID });
  }, [location.pathname]);

  return null;
};

const ContentsquareTracker = () => {
  const location = useLocation();
  return <ContentsquareTrackerForLocation location={location} />;
};

export default ContentsquareTracker;

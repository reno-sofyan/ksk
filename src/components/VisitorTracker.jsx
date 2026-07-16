import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/visitorAnalytics.js';

const VisitorTracker = () => {
  const location = useLocation();
  const hasSeenInitialPage = useRef(false);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    const title = typeof document !== 'undefined' ? document.title : '';
    trackPageView(path, title);

    if (hasSeenInitialPage.current && typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    hasSeenInitialPage.current = true;
  }, [location.pathname, location.search]);

  return null;
};

export default VisitorTracker;

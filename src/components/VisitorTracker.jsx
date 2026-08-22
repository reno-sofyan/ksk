import { useEffect } from 'react';
import { trackPageView } from '@/lib/visitorAnalytics.js';

export const VisitorTrackerForLocation = ({ location }) => {
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    const title = typeof document !== 'undefined' ? document.title : '';
    trackPageView(path, title);
  }, [location.pathname, location.search]);

  return null;
};

export default VisitorTrackerForLocation;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/visitorAnalytics.js';

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    const title = typeof document !== 'undefined' ? document.title : '';
    trackPageView(path, title);
  }, [location.pathname, location.search]);

  return null;
};

export default VisitorTracker;

import { useLocation } from 'react-router-dom';
import { VisitorTrackerForLocation } from '@/components/VisitorTracker.jsx';

const RoutedVisitorTracker = () => {
	const location = useLocation();
	return <VisitorTrackerForLocation location={location} />;
};

export default RoutedVisitorTracker;

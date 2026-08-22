import { useLocation } from 'react-router-dom';
import { ClarityTrackerForLocation } from '@/components/ClarityTracker.jsx';

const RoutedClarityTracker = () => {
	const location = useLocation();
	return <ClarityTrackerForLocation location={location} />;
};

export default RoutedClarityTracker;

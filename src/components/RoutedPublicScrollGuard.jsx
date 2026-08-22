import { useLocation } from 'react-router-dom';
import { PublicScrollGuardForPath } from '@/components/PublicScrollGuard.jsx';

const RoutedPublicScrollGuard = () => {
	const location = useLocation();
	return <PublicScrollGuardForPath pathname={location.pathname} />;
};

export default RoutedPublicScrollGuard;

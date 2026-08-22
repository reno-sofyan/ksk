import React from 'react';
import { ClarityTrackerForLocation } from '@/components/ClarityTracker.jsx';
import { PublicScrollGuardForPath } from '@/components/PublicScrollGuard.jsx';
import { VisitorTrackerForLocation } from '@/components/VisitorTracker.jsx';
import RoyalRukoPage from '@/pages/RoyalRukoPage.jsx';

const GenericApp = React.lazy(() => import('./App.jsx'));
const GENERIC_PATH_PREFIXES = ['/blog', '/dashboard', '/denah', '/login'];

function usesGenericApp(pathname) {
	return GENERIC_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

const RoyalApp = () => {
	const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
	const location = React.useMemo(() => ({
		pathname,
		search: typeof window === 'undefined' ? '' : window.location.search,
		hash: typeof window === 'undefined' ? '' : window.location.hash,
	}), [pathname]);

	if (usesGenericApp(pathname)) {
		return (
			<React.Suspense fallback={null}>
				<GenericApp />
			</React.Suspense>
		);
	}

	return (
		<>
			<PublicScrollGuardForPath pathname={pathname} />
			<VisitorTrackerForLocation location={location} />
			<ClarityTrackerForLocation location={location} />
			<RoyalRukoPage />
		</>
	);
};

export default RoyalApp;

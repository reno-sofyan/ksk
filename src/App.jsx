import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import PublicScrollGuard from '@/components/RoutedPublicScrollGuard.jsx';
import VisitorTracker from '@/components/RoutedVisitorTracker.jsx';
import ClarityTracker from '@/components/RoutedClarityTracker.jsx';
import HotjarTracker from '@/components/HotjarTracker.jsx';
import ContentsquareTracker from '@/components/ContentsquareTracker.jsx';
import WhatsAppLeadGate from '@/components/WhatsAppLeadGate.jsx';
import HeroShell from '@/components/HeroShell.jsx';
import RoyalRukoPage from '@/pages/RoyalRukoPage.jsx';
import { getRivereUrl, getSiteVariant } from '@/lib/site.js';

const CompanyProfilePage = React.lazy(() => import('@/pages/CompanyProfilePage.jsx'));
const HomePage = React.lazy(() => import('@/pages/HomePage.jsx'));
const SalesLandingPage = React.lazy(() => import('@/pages/SalesLandingPage.jsx'));
const KskPage = React.lazy(() => import('@/pages/KskPage.jsx'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage.jsx'));
const BlogArticlePage = React.lazy(() => import('@/pages/BlogArticlePage.jsx'));
const DenahPage = React.lazy(() => import('@/pages/DenahPage.jsx'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage.jsx'));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage.jsx'));

const ExternalRedirect = ({ to }) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(to);
    }
  }, [to]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-normal text-accent">Mengalihkan</p>
        <h1 className="mt-3 text-3xl font-bold text-primary">Halaman Rivere pindah ke subdomain.</h1>
        <p className="mt-4 text-muted-foreground">
          Buka halaman ini melalui alamat Rivere yang baru.
        </p>
        <a
          href={to}
          className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-primary"
        >
          Buka Rivere
        </a>
      </div>
    </main>
  );
};

function App() {
  const siteVariant = getSiteVariant();
  const isCompanySite = siteVariant === 'company';
  const riverePage = (path) => (
    isCompanySite ? <ExternalRedirect to={getRivereUrl(path)} /> : null
  );
  const standardSalesPage = siteVariant === 'royal' ? <RoyalRukoPage /> : <HomePage />;
  const namedSalesPage = siteVariant === 'royal' ? <RoyalRukoPage /> : <SalesLandingPage />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PublicScrollGuard />
        <VisitorTracker />
        <ClarityTracker />
        <HotjarTracker />
        <ContentsquareTracker />
        <WhatsAppLeadGate />
        <React.Suspense fallback={<HeroShell />}>
          <Routes>
            <Route path="/" element={isCompanySite ? <CompanyProfilePage /> : siteVariant === 'royal' ? <RoyalRukoPage /> : siteVariant === 'ksk' ? <KskPage /> : <HomePage />} />
            <Route path="/cs1" element={isCompanySite ? riverePage('/cs1/') : standardSalesPage} />
            <Route path="/cs2" element={isCompanySite ? riverePage('/cs2/') : standardSalesPage} />
            <Route path="/cs3" element={isCompanySite ? riverePage('/cs3/') : standardSalesPage} />
            <Route path="/cs4" element={isCompanySite ? riverePage('/cs4/') : standardSalesPage} />
            <Route path="/ade" element={isCompanySite ? riverePage('/ade/') : namedSalesPage} />
            <Route path="/nur" element={isCompanySite ? riverePage('/nur/') : namedSalesPage} />
            <Route path="/melin" element={isCompanySite ? riverePage('/melin/') : namedSalesPage} />
            <Route path="/ge" element={isCompanySite ? riverePage('/ge/') : namedSalesPage} />
            <Route path="/andika" element={isCompanySite ? riverePage('/andika/') : namedSalesPage} />
            <Route path="/novan" element={isCompanySite ? riverePage('/novan/') : namedSalesPage} />
            <Route path="/denah" element={isCompanySite ? riverePage('/denah/') : <DenahPage />} />
            <Route path="/blog" element={isCompanySite ? riverePage('/blog/') : <BlogPage />} />
            <Route path="/blog/:slug" element={isCompanySite ? riverePage(typeof window !== 'undefined' ? window.location.pathname : '/blog/') : <BlogArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Navigate to="/login" replace />} />
            <Route path="/verify-email" element={<Navigate to="/login" replace />} />
            <Route path="/forgot-password" element={<Navigate to="/login" replace />} />
            <Route path="/reset-password" element={<Navigate to="/login" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </React.Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

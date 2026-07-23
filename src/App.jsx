import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import PublicScrollGuard from '@/components/PublicScrollGuard.jsx';
import VisitorTracker from '@/components/VisitorTracker.jsx';
import ClarityTracker from '@/components/ClarityTracker.jsx';
import WhatsAppLeadGate from '@/components/WhatsAppLeadGate.jsx';
import CompanyProfilePage from '@/pages/CompanyProfilePage.jsx';
import HomePage from '@/pages/HomePage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogArticlePage from '@/pages/BlogArticlePage.jsx';
import DenahPage from '@/pages/DenahPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import { getRivereUrl, getSiteVariant } from '@/lib/site.js';

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
  const isCompanySite = getSiteVariant() === 'company';
  const riverePage = (path) => (
    isCompanySite ? <ExternalRedirect to={getRivereUrl(path)} /> : null
  );

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PublicScrollGuard />
        <VisitorTracker />
        <ClarityTracker />
        <WhatsAppLeadGate />
        <Routes>
          <Route path="/" element={isCompanySite ? <CompanyProfilePage /> : <HomePage />} />
          <Route path="/cs1" element={isCompanySite ? riverePage('/cs1/') : <HomePage />} />
          <Route path="/cs2" element={isCompanySite ? riverePage('/cs2/') : <HomePage />} />
          <Route path="/cs3" element={isCompanySite ? riverePage('/cs3/') : <HomePage />} />
          <Route path="/cs4" element={isCompanySite ? riverePage('/cs4/') : <HomePage />} />
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

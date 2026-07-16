import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import VisitorTracker from '@/components/VisitorTracker.jsx';
import HomePage from '@/pages/HomePage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogArticlePage from '@/pages/BlogArticlePage.jsx';
import DenahPage from '@/pages/DenahPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <VisitorTracker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/denah" element={<DenahPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
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

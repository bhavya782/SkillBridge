import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExploreProjectsPage from './pages/ExploreProjectsPage';
import ExploreFreelancersPage from './pages/ExploreFreelancersPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ClientDashboard from './pages/ClientDashboard';
import CreateProjectPage from './pages/CreateProjectPage';
import ProposalsReviewPage from './pages/ProposalsReviewPage';
import ContractsPage from './pages/ContractsPage';
import FreelancerDashboard from './pages/FreelancerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-20 text-slate-400 text-xs">Loading authentication state...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/explore/projects" element={<ExploreProjectsPage />} />
              <Route path="/explore/freelancers" element={<ExploreFreelancersPage />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />

              {/* Client Routes */}
              <Route
                path="/client/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['client', 'admin']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/create-project"
                element={
                  <ProtectedRoute allowedRoles={['client', 'admin']}>
                    <CreateProjectPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/projects/:projectId/proposals"
                element={
                  <ProtectedRoute allowedRoles={['client', 'admin']}>
                    <ProposalsReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/contracts"
                element={
                  <ProtectedRoute allowedRoles={['client', 'admin']}>
                    <ContractsPage />
                  </ProtectedRoute>
                }
              />

              {/* Freelancer Routes */}
              <Route
                path="/freelancer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['freelancer', 'admin']}>
                    <FreelancerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/freelancer/contracts"
                element={
                  <ProtectedRoute allowedRoles={['freelancer', 'admin']}>
                    <ContractsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/freelancer/proposals"
                element={
                  <ProtectedRoute allowedRoles={['freelancer', 'admin']}>
                    <ExploreProjectsPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

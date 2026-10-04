/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPortal } from './components/LoginPortal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationBanner } from './components/NotificationBanner';
import { DonationDetailsModal } from './components/DonationDetailsModal';

// 11 Required Pages after login
import { DonorDashboardPage } from './pages/DonorDashboardPage';
import { PostDonationPage } from './pages/PostDonationPage';
import { MyDonationsPage } from './pages/MyDonationsPage';
import { NgoDashboardPage } from './pages/NgoDashboardPage';
import { AvailableDonationsPage } from './pages/AvailableDonationsPage';
import { DonationTrackingPage } from './pages/DonationTrackingPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { DonationManagementPage } from './pages/DonationManagementPage';
import { AboutHelpPage } from './pages/AboutHelpPage';

const AppContent: React.FC = () => {
  const { currentUser, activePage } = useApp();

  // IMPORTANT: LOGIN FIRST - If not logged in, show Login Portal immediately
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <LoginPortal />
        <NotificationBanner />
      </div>
    );
  }

  // After login: Render role-appropriate dashboards and required pages
  const renderActivePage = () => {
    switch (activePage) {
      case 'donor-dashboard':
        return <DonorDashboardPage />;
      case 'post-donation':
      case 'donate':
        return <PostDonationPage />;
      case 'my-donations':
        return <MyDonationsPage />;
      case 'ngo-dashboard':
        return <NgoDashboardPage />;
      case 'available':
        return <AvailableDonationsPage />;
      case 'track':
        return <DonationTrackingPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'user-management':
        return <UserManagementPage />;
      case 'donation-management':
        return <DonationManagementPage />;
      case 'about':
      case 'help':
        return <AboutHelpPage />;
      default:
        // Default to role-specific dashboard
        if (currentUser.role === 'donor') return <DonorDashboardPage />;
        if (currentUser.role === 'ngo') return <NgoDashboardPage />;
        if (currentUser.role === 'admin') return <AdminDashboardPage />;
        return <DonorDashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {renderActivePage()}
      </main>

      <Footer />
      <DonationDetailsModal />
      <NotificationBanner />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

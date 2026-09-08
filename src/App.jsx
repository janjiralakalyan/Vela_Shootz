import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileActionBar } from './components/MobileActionBar';
import { Footer } from './components/Footer';
import { CustomEnquiryModal } from './components/CustomEnquiryModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingWizardPage } from './pages/BookingWizardPage';
import { BookingStatusPage } from './pages/BookingStatusPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

export function App() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  // Support hash routing or direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        setCurrentPage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} />;
      case 'pricing':
        return <PricingPage navigateTo={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'book':
        return <BookingWizardPage navigateTo={navigateTo} />;
      case 'booking-status':
        return <BookingStatusPage navigateTo={navigateTo} />;
      case 'admin':
        return isAuthenticated ? (
          <AdminDashboard navigateTo={navigateTo} />
        ) : (
          <AdminLogin onLoginSuccess={() => setCurrentPage('admin')} navigateTo={navigateTo} />
        );
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  const isAdminPage = currentPage === 'admin' && isAuthenticated;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navbar (hidden in active full admin workspace view) */}
      {!isAdminPage && <Navbar currentPage={currentPage} navigateTo={navigateTo} />}

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      {/* Global Custom Package Enquiry Modal */}
      <CustomEnquiryModal />

      {/* Sticky Mobile Bottom Bar (hidden in admin) */}
      {!isAdminPage && <MobileActionBar navigateTo={navigateTo} />}

      {/* Global Footer (hidden in active admin dashboard) */}
      {!isAdminPage && <Footer navigateTo={navigateTo} />}
    </div>
  );
}
export default App;

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EditorialQuote from './components/EditorialQuote';
import LegacySection from './components/LegacySection';
import BookTransition from './components/BookTransition';
import BookShowcase from './components/BookShowcase';
import PreviewSection from './components/PreviewSection';
import SuccessSection from './components/SuccessSection';
import QuotesSection from './components/QuotesSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import VerificationModal from './components/VerificationModal';
import PreviewModal from './components/PreviewModal';

import './styles/index.css';
import './styles/cinematic.css';

function MainContent() {
  return (
    <div className="page-content-wrapper">
      <BackgroundLayer />
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <EditorialQuote />
        <LegacySection />
        <BookTransition />
        <BookShowcase />
        <PreviewSection />
        <SuccessSection />
        <QuotesSection />
      </main>

      <Footer />

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <VerificationModal />
      <PreviewModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

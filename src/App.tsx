import React, { useEffect } from 'react';
import { FloristProvider, useFlorist } from './context/FloristContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BuilderPage } from './pages/BuilderPage';
import { CardPage } from './pages/CardPage';
import { ReviewPage } from './pages/ReviewPage';

const AppContent: React.FC = () => {
  const { currentTab } = useFlorist();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-200 text-deepBrown-500 font-sans selection:bg-dustyPink-200 selection:text-deepBrown-700">
      <Navbar />

      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && <HomePage />}
        {currentTab === 'catalog' && <CatalogPage />}
        {currentTab === 'builder' && <BuilderPage />}
        {currentTab === 'card' && <CardPage />}
        {currentTab === 'review' && <ReviewPage />}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <FloristProvider>
      <AppContent />
    </FloristProvider>
  );
}

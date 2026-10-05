import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { KidsPage } from './pages/KidsPage';
import { AdultsPage } from './pages/AdultsPage';
import { Footer } from './components/Footer';
import { FloatingQuickChat } from './components/FloatingQuickChat';
import { TrialModal } from './components/TrialModal';

export function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'kids' | 'adults'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('kids');

  // Sync with URL hash for browser history & direct bookmarking (#/kids, #/adults, #/home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/kids') {
        setCurrentView('kids');
      } else if (hash === '#/adults') {
        setCurrentView('adults');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'kids') {
      window.location.hash = '#/kids';
    } else if (view === 'adults') {
      window.location.hash = '#/adults';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrialModal = (audience = 'kids') => {
    setSelectedAudience(audience);
    setIsModalOpen(true);
  };

  const handleSelectAudienceFromHero = (audience) => {
    setSelectedAudience(audience);
    // Smooth scroll to form on home page
    const formElement = document.getElementById('dang-ky');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-charcoal-900 font-sans selection:bg-brand-300">
      {/* 1. Urgency Countdown Announcement Bar */}
      <AnnouncementBar onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      {/* 2. Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)}
            onSelectAudience={handleSelectAudienceFromHero}
            onNavigateKids={() => handleNavigate('kids')}
            onNavigateAdults={() => handleNavigate('adults')}
          />
        )}

        {currentView === 'kids' && (
          <KidsPage
            onOpenTrialModal={() => handleOpenTrialModal('kids')}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'adults' && (
          <AdultsPage
            onOpenTrialModal={() => handleOpenTrialModal('adults')}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer with Branches & Contact */}
      <Footer onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      {/* Floating Quick Chat (Zalo, Messenger, Quick Trial) */}
      <FloatingQuickChat onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      {/* Instant Registration Modal */}
      <TrialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultAudience={selectedAudience}
      />
    </div>
  );
}

export default App;

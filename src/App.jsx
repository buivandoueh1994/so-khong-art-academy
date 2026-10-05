import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSplit } from './components/HeroSplit';
import { ValuePillars } from './components/ValuePillars';
import { RoadmapSection } from './components/RoadmapSection';
import { ArtGallery } from './components/ArtGallery';
import { Testimonials } from './components/Testimonials';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingQuickChat } from './components/FloatingQuickChat';
import { TrialModal } from './components/TrialModal';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('kids');

  const handleOpenTrialModal = (audience = 'kids') => {
    setSelectedAudience(audience);
    setIsModalOpen(true);
  };

  const handleSelectAudienceFromHero = (audience) => {
    setSelectedAudience(audience);
    // Smooth scroll to form
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
      <Navbar onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      <main className="flex-1">
        {/* 3. Hero Section (Dual Audience Split: Kids vs Adults) */}
        <HeroSplit onSelectAudience={handleSelectAudienceFromHero} />

        {/* 4. Value Proposition Bar (5 Core Pillars) */}
        <ValuePillars />

        {/* 5. Optimized 5-Step Learning Roadmap */}
        <RoadmapSection onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

        {/* 6. Social Proof & Student Gallery */}
        <ArtGallery onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

        {/* 7. Student & Parent Testimonials */}
        <Testimonials />

        {/* 8. High-Converting Lead Capture Form */}
        <LeadCaptureForm
          preselectedAudience={selectedAudience}
          onFormSuccess={() => {
            // Callback when form submitted
          }}
        />

        {/* 9. FAQ Section */}
        <FAQSection />
      </main>

      {/* 10. Footer with Branches & Contact */}
      <Footer onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      {/* 11. Floating Quick Chat (Zalo, Messenger, Quick Trial) */}
      <FloatingQuickChat onOpenTrialModal={() => handleOpenTrialModal(selectedAudience)} />

      {/* 12. Instant Registration Modal */}
      <TrialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultAudience={selectedAudience}
      />
    </div>
  );
}

export default App;

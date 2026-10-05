import React from 'react';
import { HeroSplit } from '../components/HeroSplit';
import { StatsScaleSection } from '../components/StatsScaleSection';
import { ValuePillars } from '../components/ValuePillars';
import { RoadmapSection } from '../components/RoadmapSection';
import { ArtGallery } from '../components/ArtGallery';
import { Testimonials } from '../components/Testimonials';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { FAQSection } from '../components/FAQSection';

export const HomePage = ({ onOpenTrialModal, onSelectAudience, onNavigateKids, onNavigateAdults }) => {
  return (
    <>
      {/* 1. Hero Section (Dual Audience Split: Kids vs Adults) */}
      <HeroSplit 
        onSelectAudience={onSelectAudience} 
        onNavigateKids={onNavigateKids}
        onNavigateAdults={onNavigateAdults}
      />

      {/* 2. Stats & Scale Counter Section (5 Centers, 12,500+ Students, 28,000+ Artworks) */}
      <StatsScaleSection />

      {/* 3. 5 Core Value Pillars */}
      <ValuePillars />

      {/* 4. 5-Step Learning Roadmap */}
      <RoadmapSection onOpenTrialModal={onOpenTrialModal} />

      {/* 5. Student Art Gallery */}
      <ArtGallery onOpenTrialModal={onOpenTrialModal} />

      {/* 6. Social Proof & Testimonials */}
      <Testimonials />

      {/* 7. High-Converting Lead Capture Form */}
      <LeadCaptureForm onOpenTrialModal={onOpenTrialModal} />

      {/* 8. FAQs */}
      <FAQSection />
    </>
  );
};

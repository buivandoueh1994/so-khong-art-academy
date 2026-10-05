import React from 'react';
import { HeroSplit } from '../components/HeroSplit';
import { ValuePillars } from '../components/ValuePillars';
import { RoadmapSection } from '../components/RoadmapSection';
import { ArtGallery } from '../components/ArtGallery';
import { Testimonials } from '../components/Testimonials';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { FAQSection } from '../components/FAQSection';

export const HomePage = ({ onOpenTrialModal, onSelectAudience, onNavigateKids, onNavigateAdults }) => {
  return (
    <>
      {/* Hero Section (Dual Audience Split: Kids vs Adults) */}
      <HeroSplit 
        onSelectAudience={onSelectAudience} 
        onNavigateKids={onNavigateKids}
        onNavigateAdults={onNavigateAdults}
      />

      {/* 5 Core Pillars */}
      <ValuePillars />

      {/* 5-Step Learning Roadmap */}
      <RoadmapSection onOpenTrialModal={onOpenTrialModal} />

      {/* Student Art Gallery */}
      <ArtGallery onOpenTrialModal={onOpenTrialModal} />

      {/* Social Proof & Testimonials */}
      <Testimonials />

      {/* High-Converting Lead Capture Form */}
      <LeadCaptureForm onOpenTrialModal={onOpenTrialModal} />

      {/* FAQs */}
      <FAQSection />
    </>
  );
};

import React from 'react';
import { HeroSplit } from '../components/HeroSplit';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
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

      {/* 2. Section Mới: Đặc Quyền Học Viên & Vì Sao Chọn Số Không */}
      <WhyChooseUsSection 
        onOpenTrialModal={onOpenTrialModal}
        onNavigateKids={onNavigateKids}
        onNavigateAdults={onNavigateAdults}
      />

      {/* 3. Stats & Scale Counter Section (5 Centers, 12,500+ Students, 28,000+ Artworks) */}
      <StatsScaleSection />

      {/* 4. 5 Core Value Pillars */}
      <ValuePillars />

      {/* 5. 5-Step Learning Roadmap */}
      <RoadmapSection onOpenTrialModal={onOpenTrialModal} />

      {/* 6. Student Art Gallery */}
      <ArtGallery onOpenTrialModal={onOpenTrialModal} />

      {/* 7. Social Proof & Testimonials */}
      <Testimonials />

      {/* 8. High-Converting Lead Capture Form */}
      <LeadCaptureForm onOpenTrialModal={onOpenTrialModal} />

      {/* 9. FAQs */}
      <FAQSection />
    </>
  );
};

import React from 'react';
import { Hero } from '../components/Hero';
import { UspStrip } from '../components/UspStrip';
import { FeaturedService } from '../components/FeaturedService';
import { HowItWorks } from '../components/HowItWorks';
import { PricingSection } from '../components/PricingSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { IPhonePhilosophy } from '../components/iPhonePhilosophy';
import { WhyVelaShootz } from '../components/WhyVelaShootz';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCta } from '../components/FinalCta';

export function HomePage({ navigateTo }) {
  return (
    <div>
      {/* 1. Cinematic Hero */}
      <Hero navigateTo={navigateTo} />

      {/* 2. USP Strip */}
      <UspStrip />

      {/* 3. Featured Service: Instant Reels Spotlight & Comparison */}
      <FeaturedService navigateTo={navigateTo} />

      {/* 4. How It Works (4 Steps) */}
      <HowItWorks navigateTo={navigateTo} />

      {/* 5. Pricing Preview (Moved here in place of ServicesSection) */}
      <PricingSection navigateTo={navigateTo} />

      {/* 6. Featured Portfolio Gallery */}
      <PortfolioSection navigateTo={navigateTo} />

      {/* 7. "One Device. Endless Moments." iPhone Philosophy */}
      <IPhonePhilosophy />

      {/* 12. Why Vela Shootz (6 Core Benefits) */}
      <WhyVelaShootz />

      {/* 13. Testimonials */}
      <TestimonialsSection />

      {/* 14. FAQ Accordion */}
      <FaqSection />

      {/* 15. Final Dramatic CTA */}
      <FinalCta navigateTo={navigateTo} />
    </div>
  );
}

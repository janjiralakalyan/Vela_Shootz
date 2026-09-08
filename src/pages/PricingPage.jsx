import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCta } from '../components/FinalCta';

export function PricingPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="section-tag">PACKAGES & INVESTMENTS</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
          PLANS FOR EVERY <span className="gold-gradient-text">MOMENT.</span>
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Select an on-spot instant reel package or request a tailored schedule for your wedding or corporate brand launch.
        </p>
      </div>

      <PricingSection navigateTo={navigateTo} />
      <FaqSection />
      <FinalCta navigateTo={navigateTo} />
    </div>
  );
}

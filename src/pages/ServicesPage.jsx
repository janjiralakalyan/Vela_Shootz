import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { FeaturedService } from '../components/FeaturedService';
import { IPhonePhilosophy } from '../components/iPhonePhilosophy';
import { FinalCta } from '../components/FinalCta';

export function ServicesPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="section-tag">WHAT WE DO</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
          SPECIALIZED <span className="gold-gradient-text">MOBILE SERVICES.</span>
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          From spontaneous nightlife parties to 3-day royal weddings, explore our complete suite of instant reels, 4K photography, and social-first production.
        </p>
      </div>

      <ServicesSection navigateTo={navigateTo} />
      <FeaturedService navigateTo={navigateTo} />
      <IPhonePhilosophy />
      <FinalCta navigateTo={navigateTo} />
    </div>
  );
}

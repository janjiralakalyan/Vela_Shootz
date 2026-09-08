import React from 'react';
import { PortfolioSection } from '../components/PortfolioSection';
import { FinalCta } from '../components/FinalCta';

export function PortfolioPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="section-tag">CURATED ARCHIVE</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
          OUR RECENT <span className="gold-gradient-text">CREATIONS.</span>
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Explore full project case studies, client reels, specialized portraits, and deliverable stats.
        </p>
      </div>

      <PortfolioSection navigateTo={navigateTo} />
      <FinalCta navigateTo={navigateTo} />
    </div>
  );
}

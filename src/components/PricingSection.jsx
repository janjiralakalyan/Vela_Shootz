import React, { useState } from 'react';
import { Sparkles, Check, Plus, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function PricingSection({ navigateTo }) {
  const { packages, selectPackage, openCustomEnquiry } = useBooking();
  const [selectedTab, setSelectedTab] = useState('on-spot');

  const tabs = [
    { id: 'on-spot', label: 'ON-SPOT REELS' },
    { id: 'business', label: 'BUSINESS' },
    { id: 'weddings', label: 'WEDDINGS' }
  ];

  const currentPackages = packages.filter(p => p.category === selectedTab);

  const handlePackageClick = (pkg) => {
    if (pkg.isCustom) {
      openCustomEnquiry(pkg.name);
    } else {
      selectPackage(pkg);
      navigateTo('book');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing-section" style={{ padding: '2.4rem 0 2rem 0', backgroundColor: '#22000B' }}>
      <div className="container">
        
        {/* COMPACT SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 1.2rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.74rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem'
            }}
          >
            TRANSPARENT PRICING
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.45rem, 2.4vw, 1.95rem)',
              lineHeight: 1.15,
              marginBottom: '0.35rem',
              color: '#FFF'
            }}
          >
            PRICED FOR SPEED. <br />
            <span className="gold-gradient-text">Built for Quality.</span>
          </h2>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: '1.45',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            Clear, honest pricing with zero hidden studio fees. Choose your package or talk to us for a custom celebration schedule.
          </p>
        </div>

        {/* CATEGORY TABS (COMPACT) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '1.4rem'
          }}
        >
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                style={{
                  padding: '0.45rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--grad-gold)' : 'rgba(56, 2, 20, 0.6)',
                  color: isActive ? '#1A0008' : 'var(--text-primary)',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                  letterSpacing: '0.05em',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--gold-border)'}`,
                  transition: 'all var(--transition-fast)'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* PRICING CARDS GRID (COMPACT) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            alignItems: 'stretch'
          }}
        >
          {currentPackages.map((pkg) => {
            const isPopular = pkg.badge === 'MOST POPULAR' || pkg.badge === 'COMPLETE WEDDING';

            return (
              <div
                key={pkg.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.4rem 1.3rem',
                  border: isPopular ? '2px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                  background: isPopular
                    ? 'linear-gradient(145deg, rgba(75, 4, 28, 0.95) 0%, rgba(35, 0, 12, 0.95) 100%)'
                    : 'var(--grad-wine-card)',
                  boxShadow: isPopular ? '0 8px 28px rgba(229, 173, 54, 0.25)' : 'var(--shadow-md)',
                  position: 'relative'
                }}
              >
                {/* BADGE */}
                {pkg.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.8rem',
                      right: '1rem',
                      background: isPopular ? 'var(--grad-gold)' : 'rgba(229, 173, 54, 0.15)',
                      color: isPopular ? '#1A0008' : 'var(--gold-primary)',
                      border: `1px solid ${isPopular ? 'transparent' : 'var(--gold-border)'}`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.65rem',
                      fontWeight: '900',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.18rem', color: '#FFF', marginBottom: '0.3rem' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.9rem' }}>
                    {pkg.description}
                  </p>

                  {/* PRICE DISPLAY */}
                  <div style={{ marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(229, 173, 54, 0.12)' }}>
                    {pkg.isCustom ? (
                      <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--gold-primary)', lineHeight: 1 }}>
                          CUSTOM
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                          Tailored quote based on needs
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                          <span style={{ fontSize: '1.1rem', color: 'var(--gold-primary)', fontWeight: '700' }}>₹</span>
                          <span style={{ fontSize: '2rem', fontWeight: '900', color: '#FFF', lineHeight: 1 }}>
                            {pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                          {pkg.coverageHours} Hours • {pkg.reelsCount} Reels {pkg.portraitsCount > 0 && `• ${pkg.portraitsCount} Portraits`}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DELIVERABLES LIST */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
                    {pkg.includes.map((inc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <div
                          style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            background: 'rgba(229, 173, 54, 0.15)',
                            color: 'var(--gold-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#FAF0E6' }}>{inc}</span>
                      </div>
                    ))}

                    {/* ADDON DISPLAY */}
                    {pkg.extraAddons && pkg.extraAddons.length > 0 && (
                      <div
                        style={{
                          marginTop: '0.4rem',
                          padding: '0.5rem 0.7rem',
                          background: 'rgba(229, 173, 54, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px dashed var(--gold-border)'
                        }}
                      >
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--gold-bright)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                          Extra supported:
                        </div>
                        {pkg.extraAddons.map(a => (
                          <div key={a.id} style={{ fontSize: '0.76rem', color: '#FFF', fontWeight: '600' }}>
                            {a.name}: ₹{a.price.toLocaleString('en-IN')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA BUTTON */}
                <button
                  onClick={() => handlePackageClick(pkg)}
                  className={isPopular ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    fontSize: '0.82rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

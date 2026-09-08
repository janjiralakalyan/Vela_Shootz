import React, { useState } from 'react';
import { Sparkles, ArrowRight, Video, Briefcase, Heart, Calendar, Users, Smartphone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function ServicesSection({ navigateTo }) {
  const { openCustomEnquiry } = useBooking();
  const [activeTab, setActiveTab] = useState('on-spot');

  const categories = [
    { id: 'on-spot', label: 'On-Spot Reels', icon: Sparkles },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'weddings', label: 'Weddings', icon: Heart },
    { id: 'events', label: 'Events & Fests', icon: Calendar },
    { id: 'creators', label: 'Creator Content', icon: Smartphone }
  ];

  const servicesData = {
    'on-spot': {
      title: 'Instant On-Spot Reels',
      tagline: 'Delivered before the celebration wraps up.',
      description: 'Dynamic, handheld mobile cinematography that captures real raw smiles and party electricity. Edited on site and uploaded to your device.',
      items: [
        'Quick Reels (2 Hours, 2 Reels)',
        'Half-Day Celebration Coverage',
        'Birthday & Milestone Parties',
        'Engagement & Ring Ceremonies',
        'Family Get-Togethers & Poojas',
        'College Cultural Fests',
        'Festival & Festive Gatherings'
      ],
      ctaText: 'VIEW ON-SPOT PACKAGES',
      action: () => navigateTo('pricing')
    },
    'business': {
      title: 'Business & Brand Growth',
      tagline: 'Hook-driven promotional reels tailored for algorithms.',
      description: 'Transform your restaurant, boutique, startup product, or corporate gathering into scroll-stopping commercial reels that convert.',
      items: [
        'Promotional Brand Reels',
        'Cafe & Restaurant Ambience & Food Highlights',
        'Product Teasers & E-Commerce Drops',
        'Corporate Seminars & Summit Highlights',
        'Founder Storytelling & Personal Brand',
        'Monthly Content Retainer Packages'
      ],
      ctaText: 'EXPLORE BUSINESS PROMOTIONS',
      action: () => navigateTo('pricing')
    },
    'weddings': {
      title: 'Modern Social-First Weddings',
      tagline: 'Say goodbye to 3-month video delays.',
      description: 'Your wedding moments deserve to be shared while your guests are still rejoicing. We capture candid emotions and craft cinematic wedding reels ready same-day.',
      items: [
        'Haldi Splashes & Flower Showers',
        'Mehendi & Sangeet Dance Highlights',
        'Varmala & Sacred Vows Cinematic Drops',
        'Couple Portraits & Slow-Motion Moments',
        'Multi-Day Royal Coverage',
        'Dedicated VIP Instagram Content Stations'
      ],
      ctaText: 'VIEW WEDDING PACKAGES',
      action: () => navigateTo('pricing')
    },
    'events': {
      title: 'Concerts, Fests & Public Events',
      tagline: 'Unmatched crowd energy captured from the front row.',
      description: 'Compact iPhone rigs let our shooters dive into crowds, stage pits, and sports tracks without obstructing guests or stage views.',
      items: [
        'College Fests & Student Culturals',
        'Open-Air DJ Concerts & Music Fests',
        'Sports Tournaments & Marathons',
        'Brand Launch Events',
        'Private VIP Gatherings'
      ],
      ctaText: 'VIEW EVENT PACKAGES',
      action: () => navigateTo('pricing')
    },
    'creators': {
      title: 'Influencers & Personal Branding',
      tagline: 'High-frequency aesthetics for creators who post daily.',
      description: 'Batch-shoot high-end 4K reels and YouTube Shorts with trending pacing, seamless cuts, and curated sound designs.',
      items: [
        'Fashion & Streetwear Lookbooks',
        'Fitness & Lifestyle Dynamic Montages',
        'Voiceover & Direct-to-Camera Interviews',
        'Viral Trend Recreations',
        'Creator Fast-Turnaround Packages'
      ],
      ctaText: 'CUSTOM CREATOR ENQUIRY',
      action: () => openCustomEnquiry('Creator Packages')
    }
  };

  const current = servicesData[activeTab];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">OUR SERVICES</span>
          <h2 className="section-title">
            CAPTURED FOR <br />
            <span className="gold-gradient-text">Today's Platforms.</span>
          </h2>
          <p className="section-description">
            Whatever your moment, we produce high-octane 9:16 vertical video and specialized portraits designed specifically for Instagram, Reels and social media.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--grad-gold)' : 'rgba(56, 2, 20, 0.6)',
                  color: isActive ? '#1A0008' : 'var(--text-primary)',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--gold-border)'}`,
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <cat.icon size={16} color={isActive ? '#1A0008' : 'var(--gold-primary)'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE SPOTLIGHT CARD */}
        <div
          className="glass-card"
          style={{
            padding: '3rem',
            border: '1px solid var(--gold-border-hover)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="gold-chip" style={{ marginBottom: '1rem' }}>
                {activeTab.toUpperCase()} SPECIALTY
              </span>
              <h3 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '0.6rem' }}>
                {current.title}
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--gold-bright)', fontWeight: '600', marginBottom: '1.2rem' }}>
                {current.tagline}
              </p>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                {current.description}
              </p>

              <button onClick={current.action} className="btn-primary">
                <span>{current.ctaText}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div
              style={{
                background: 'rgba(30, 0, 10, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gold-border)',
                padding: '2rem'
              }}
            >
              <h4
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '1.4rem'
                }}
              >
                WHAT WE COVER
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {current.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.5rem 0',
                      borderBottom: idx < current.items.length - 1 ? '1px solid rgba(229, 173, 54, 0.1)' : 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--gold-bright)',
                        boxShadow: '0 0 8px var(--gold-bright)'
                      }}
                    />
                    <span style={{ fontSize: '0.92rem', color: '#FAF0E6', fontWeight: '500' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

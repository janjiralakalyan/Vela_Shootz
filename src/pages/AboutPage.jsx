import React from 'react';
import { IPhonePhilosophy } from '../components/iPhonePhilosophy';
import { WhyVelaShootz } from '../components/WhyVelaShootz';
import { FoundersSection } from '../components/FoundersSection';
import { FinalCta } from '../components/FinalCta';
import { Sparkles, Shield, Heart, Zap } from 'lucide-react';

export function AboutPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="section-tag">OUR ORIGIN & ETHOS</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', marginBottom: '1.2rem', color: '#FFF' }}>
          BUILT FOR MOMENTS <br />
          <span className="gold-gradient-text">THAT MOVE FAST.</span>
        </h1>
        <p style={{ maxWidth: '720px', margin: '0 auto', color: '#FAF0E6', fontSize: '1.2rem', lineHeight: '1.7' }}>
          Vela Shootz is a new-generation media brand built for moments that deserve to be experienced, edited and shared instantly.
        </p>
      </div>

      {/* STORY & VALUES SECTION */}
      <section style={{ padding: '2rem 0 5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              marginBottom: '5rem'
            }}
          >
            <div>
              <span className="gold-chip" style={{ marginBottom: '1rem' }}>OUR MISSION</span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '1.2rem' }}>
                We Shoot. We Edit. <br />
                <span className="gold-gradient-text">You Post Instantly.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.4rem' }}>
                For decades, professional event media forced clients into a tedious waiting cycle: heavy cameras, long turnaround times, and months of waiting for footage while the emotional excitement of the event has long passed.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.8' }}>
                We founded Vela Shootz with an uncompromising belief: the best time to relive and share a celebration is right now. By pairing the world's most capable mobile sensors with lightning-fast on-location editing workflows, we deliver high-production vertical cinema within hours of your event.
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                border: '1px solid var(--gold-border-hover)'
              }}
            >
              <h3 style={{ fontSize: '1.3rem', color: 'var(--gold-primary)', marginBottom: '1.5rem' }}>
                OUR PRODUCTION PROMISES
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {[
                  {
                    icon: Zap,
                    title: 'Speed Without Compromise',
                    desc: 'Instant delivery does not mean rushed work. Our color science, framing, and audio cuts follow rigorous professional standards.'
                  },
                  {
                    icon: Shield,
                    title: 'Professional Dress & Conduct',
                    desc: 'Our team arrives punctual, impeccably dressed in dark professional attire, and conducts themselves with dignity.'
                  },
                  {
                    icon: Heart,
                    title: 'Authentic Human Emotion',
                    desc: 'We never force people into awkward unnatural poses. We capture real laughter, spontaneous hugs, and raw celebration.'
                  }
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(229, 173, 54, 0.12)',
                        color: 'var(--gold-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '0.2rem' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <IPhonePhilosophy />
      <WhyVelaShootz />
      <FoundersSection />
      <FinalCta navigateTo={navigateTo} />
    </div>
  );
}

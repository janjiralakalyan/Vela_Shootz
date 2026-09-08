import React, { useState } from 'react';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials array for seamless, infinite looping
  const marqueeItems = [...INITIAL_TESTIMONIALS, ...INITIAL_TESTIMONIALS];

  return (
    <section style={{ padding: '2.4rem 0 2.2rem 0', backgroundColor: '#20000A', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1160px' }}>
        
        {/* COMPACT SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '660px', margin: '0 auto 1.4rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem'
            }}
          >
            REAL REVIEWS
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
              lineHeight: 1.18,
              marginBottom: '0.35rem',
              color: '#FFF'
            }}
          >
            LOVED BY COUPLES, <br />
            <span className="gold-gradient-text">Brands & Creators.</span>
          </h2>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: '1.45',
              maxWidth: '540px',
              margin: '0 auto'
            }}
          >
            Hear from people who experienced our on-spot mobile media coverage and watched their moments go live on the same day.
          </p>
        </div>

        {/* CONTINUOUS HORIZONTAL SCROLLING MARQUEE */}
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
            padding: '0.4rem 0 0.8rem 0'
          }}
        >
          <div
            className={`testimonials-marquee-track ${isPaused ? 'is-paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{
              display: 'flex',
              gap: '1.25rem',
              width: 'max-content',
              animation: 'testimonialsMarquee 40s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
              willChange: 'transform'
            }}
          >
            {marqueeItems.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                className="glass-card"
                style={{
                  flex: '0 0 clamp(300px, 30vw, 345px)',
                  width: 'clamp(300px, 30vw, 345px)',
                  minHeight: '230px',
                  padding: '1.25rem 1.35rem',
                  borderRadius: '16px',
                  border: '1px solid var(--gold-border)',
                  backgroundColor: 'rgba(34, 0, 11, 0.82)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  userSelect: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.85), 0 0 16px rgba(229, 173, 54, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--gold-border)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.65)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.18rem' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="var(--gold-primary)" color="var(--gold-primary)" />
                      ))}
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: '700', marginLeft: '0.35rem' }}>
                        5.0
                      </span>
                    </div>
                    <Quote size={18} color="var(--gold-primary)" opacity={0.35} />
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#FAF0E6', lineHeight: '1.48', fontStyle: 'italic', marginBottom: '1.1rem' }}>
                    "{t.review}"
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(229, 173, 54, 0.12)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#FFF' }}>
                        {t.customerName}
                      </span>
                      <BadgeCheck size={14} color="var(--gold-primary)" />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.1rem' }}>
                      {t.event}
                    </div>
                  </div>

                  {t.instagram && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        color: 'var(--text-dim)'
                      }}
                    >
                      <InstagramIcon size={12} />
                      {t.instagram}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}




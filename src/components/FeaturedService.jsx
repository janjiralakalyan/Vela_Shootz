import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Check } from 'lucide-react';

export function FeaturedService({ navigateTo }) {
  const sectionRef = useRef(null);
  const [scrollShift, setScrollShift] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const distance = windowHeight - rect.top;
            if (distance > 0) {
              // Smooth left-to-right glide as user scrolls down:
              const shift = Math.min(Math.max(distance * 0.08, 0), 75);
              setScrollShift(shift);
            } else {
              setScrollShift(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '2.5rem 0',
        backgroundColor: '#36020D',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '460px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* BACKGROUND IMAGE - SCROLL INTERACTIVE (LEFT TO RIGHT) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/instant-reels-bg.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          transform: `scale(1.1) translateX(${scrollShift}px)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          transformOrigin: 'left center',
          opacity: 1,
          zIndex: 0,
          pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 96%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 96%)'
        }}
      />

      {/* TEXT LAYER DIRECTLY ON TOP (Z-INDEX 10, POSITION RELATIVE) */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/* COPY & ACTIONS DIRECTLY ON THE BG IMAGE (NO FRAME / BORDER / SHADOW) */}
        <div
          style={{
            maxWidth: '540px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.55rem, 2.8vw, 2.1rem)',
              lineHeight: 1.15,
              marginBottom: '0.5rem',
              color: '#FFF',
              textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 4px 25px rgba(0,0,0,0.95)'
            }}
          >
            DON'T WAIT DAYS TO <br />
            <span className="gold-gradient-text">Relive Your Moment.</span>
          </h2>

          <p
            style={{
              fontSize: '0.98rem',
              color: 'var(--gold-light)',
              fontWeight: '700',
              marginBottom: '0.6rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.9)'
            }}
          >
            We shoot. We edit. You post.
          </p>

          <p
            style={{
              fontSize: '0.86rem',
              color: '#FAF0E6',
              lineHeight: '1.55',
              maxWidth: '500px',
              marginBottom: '1.2rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.9)'
            }}
          >
            Traditional studios make you wait weeks. Vela Shootz delivers color-graded, high-energy 4K vertical reels while the excitement is live.
          </p>

          {/* FEATURE BULLETS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))',
              gap: '0.5rem 1rem',
              width: '100%',
              maxWidth: '500px',
              marginBottom: '1.4rem'
            }}
          >
            {[
              'On-location shooting',
              'Fast turnaround (2-4 hrs)',
              'Social-optimized (9:16)',
              'Pro color & audio sync',
              'Upload-ready delivery',
              'iPhone agile workflow'
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    background: 'rgba(229, 173, 54, 0.2)',
                    border: '1px solid var(--gold-border)',
                    color: 'var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#FAF0E6',
                    fontWeight: '500',
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              navigateTo('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{
              padding: '0.75rem 1.7rem',
              fontSize: '0.86rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            <Sparkles size={15} />
            <span>BOOK AN INSTANT REEL</span>
          </button>
        </div>
      </div>
    </section>
  );
}

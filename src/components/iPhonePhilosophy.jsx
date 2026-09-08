import React, { useState, useEffect, useRef } from 'react';

export function IPhonePhilosophy() {
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
              const shift = Math.min(Math.max(distance * 0.08, 0), 65);
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
      id="iphone-philosophy"
      style={{
        padding: '2.2rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--gold-border)',
        borderBottom: '1px solid var(--gold-border)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* 100% OPACITY SCALED BACKGROUND IMAGE - SCROLL INTERACTIVE */}
      <img
        src="/assets/iphone-philosophy-bg.png"
        alt="Vela Shootz iPhone Production Rig"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'left center',
          transform: `scale(1.02) translateX(${scrollShift}px)`,
          transformOrigin: 'left center',
          opacity: 1,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* GRADIENT SHIELD TO ENSURE CRISP TEXT LEGIBILITY ON THE RIGHT BLENDING INTO MAIN BG */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(46, 0, 14, 0.55) 60%, rgba(46, 0, 14, 0.92) 82%, var(--bg-primary) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.2rem',
            alignItems: 'center'
          }}
        >
          {/* LEFT: OPEN SHOWCASE FOR THE SCALED-DOWN ARTWORK */}
          <div style={{ minHeight: '260px' }} />

          {/* RIGHT: TEXT DIRECTLY ON BACKGROUND IMAGE (NO CARD / NO BORDER) */}
          <div
            style={{
              padding: '0.5rem 0',
              zIndex: 2
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                lineHeight: 1.15,
                marginBottom: '0.5rem'
              }}
            >
              <span style={{ color: '#FFF', textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>
                ONE DEVICE.
              </span>
              <br />
              <span 
                className="gold-gradient-text"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85))'
                }}
              >
                Endless Moments.
              </span>
            </h2>

            <p
              style={{
                fontSize: '0.86rem',
                color: '#FAF0E6',
                lineHeight: 1.5,
                marginBottom: '0.5rem',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)'
              }}
            >
              We keep our setup mobile, agile and social-first. Every Vela Shootz production is captured exclusively on iPhone, allowing us to move with the event and create content built for today's platforms.
            </p>

            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.5,
                marginBottom: '1rem',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.9)'
              }}
            >
              Heavy cinema cameras with external monitors create an artificial barrier between subjects and the lens. Our mobile rigs let us dance into wedding Baraats, blend into VIP parties, and move with spontaneous laughter — producing intimate, cinematic content ready to post on the spot.
            </p>

            {/* SEAMLESS INLINE FEATURES (NO SEPARATE BOXES) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem' }}>
              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '0.75rem' }}>
                <div
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    color: 'var(--gold-bright)',
                    marginBottom: '0.15rem',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  Zero Intrusiveness
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.35,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  Guests feel relaxed, resulting in raw, unforced candid moments.
                </div>
              </div>

              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '0.75rem' }}>
                <div
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    color: 'var(--gold-bright)',
                    marginBottom: '0.15rem',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  Native 9:16 Framing
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.35,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  Composed edge-to-edge for smartphone screens from second one.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

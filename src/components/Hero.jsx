import React, { useState, useEffect } from 'react';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

export function Hero({ navigateTo }) {
  const [scrollX, setScrollX] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Smooth horizontal translation responsive to scroll:
          // Scrolling down shifts image, scrolling back up returns it to original
          const shift = Math.min(currentY * 0.18, 90);
          setScrollX(shift);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      // Subtle interactive mouse parallax
      const x = ((e.clientX / window.innerWidth) - 0.5) * 28;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 14;
      setMouseOffset({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 78px)',
        maxHeight: '880px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2.5rem 0 2rem 0'
      }}
    >
      {/* BACKGROUND IMAGE - INTERACTIVE TO SCROLL AND MOUSE (SCALED DOWN) */}
      <div
        className="hero-movie-bg"
        style={{
          position: 'absolute',
          top: '-2%',
          bottom: '-2%',
          left: '-5%',
          width: '110%',
          backgroundImage: 'url(/assets/hero-cinematic.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.08) brightness(0.95) saturate(1.08)',
          transform: `scale(0.94) translate(${ -scrollX - mouseOffset.x }px, ${ -mouseOffset.y }px)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* SUBTLE 35mm ANAMORPHIC FILM VIGNETTE & LETTERBOX GRADE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(15, 0, 5, 0.4) 100%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(20, 0, 6, 0.2) 0%, transparent 15%, transparent 82%, rgba(46, 0, 14, 0.55) 100%)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          paddingLeft: 'clamp(1rem, 4vw, 3.5rem)'
        }}
      >

        {/* HERO MAIN HEADLINE */}
        <div style={{ maxWidth: '780px', margin: '0 0 1rem 0', textAlign: 'left' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#FFF',
              textShadow: '0 4px 25px rgba(0,0,0,0.8)'
            }}
          >
            YOUR MOMENT.<br />
            <span className="gold-gradient-text">Your Reel.</span><br />
            RIGHT NOW.
          </h1>
        </div>

        {/* SUPPORTING TEXT */}
        <p
          style={{
            maxWidth: '580px',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            color: '#FAF0E6',
            lineHeight: 1.55,
            margin: '0 0 1.8rem 0',
            textAlign: 'left',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Fast, professional and social-media-ready reels, photography and event coverage — captured on iPhone and delivered for the moment.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            margin: '0 0 2.2rem 0'
          }}
        >
          <button
            onClick={() => {
              navigateTo('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.9rem',
              letterSpacing: '0.05em'
            }}
          >
            <Sparkles size={16} />
            <span>BOOK YOUR SLOT</span>
          </button>

          <button
            onClick={() => {
              navigateTo('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-secondary"
            style={{
              padding: '0.85rem 1.8rem',
              fontSize: '0.9rem',
              letterSpacing: '0.05em'
            }}
          >
            <Play size={14} fill="var(--gold-primary)" />
            <span>VIEW OUR WORK</span>
          </button>
        </div>

        {/* VISUAL TRANSITION: SHOOT → EDIT → DELIVER → POST */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: '0',
            gap: '0.8rem',
            background: 'rgba(56, 2, 20, 0.65)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-full)',
            padding: '0.55rem 1.3rem',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {[
            { label: 'SHOOT', color: 'var(--gold-light)' },
            { label: 'EDIT', color: 'var(--gold-bright)' },
            { label: 'DELIVER', color: 'var(--gold-primary)' },
            { label: 'POST', color: '#4ADE80' }
          ].map((step, idx, arr) => (
            <React.Fragment key={step.label}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.12em', color: step.color }}>
                {step.label}
              </span>
              {idx < arr.length - 1 && (
                <ArrowRight size={12} color="var(--gold-muted)" opacity={0.6} />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, Video, Wand2, Send } from 'lucide-react';

export function HowItWorks({ navigateTo }) {
  const [activeStep, setActiveStep] = useState(0);
  const [pathLength, setPathLength] = useState(820);
  const pathRef = useRef(null);
  const sectionRef = useRef(null);

  const steps = [
    {
      step: '01',
      action: 'BOOK',
      title: 'Reserve Your Slot',
      desc: 'Choose your package, pick your event date, and lock your production slot in seconds.',
      icon: CalendarCheck
    },
    {
      step: '02',
      action: 'SHOOT',
      title: 'On-Spot Production',
      desc: 'Our professional mobile creators arrive on location equipped with iPhone 4K ProRes setups.',
      icon: Video
    },
    {
      step: '03',
      action: 'EDIT',
      title: 'Rapid Polish',
      desc: 'Your reels are graded, audio-synced, and edited immediately while the energy is alive.',
      icon: Wand2
    },
    {
      step: '04',
      action: 'POST',
      title: 'Instant Delivery',
      desc: 'Receive polished, upload-ready reels directly to your phone. Tap and share with the world.',
      icon: Send,
      isFinal: true
    }
  ];

  // Measure path length dynamically
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len && len > 0) {
          setPathLength(len);
        }
      } catch (e) {
        // fallback to default 820
      }
    }
  }, []);

  // IntersectionObserver to trigger step-by-step filling when user enters section
  useEffect(() => {
    let timers = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Clear any previous
          timers.forEach(clearTimeout);
          timers = [];

          // Step 1 activates immediately:
          setActiveStep(1);

          // Step 2 fills across curve after 750ms:
          timers.push(setTimeout(() => setActiveStep(2), 750));

          // Step 3 fills across curve after 1550ms:
          timers.push(setTimeout(() => setActiveStep(3), 1550));

          // Step 4 fills into final post step after 2350ms:
          timers.push(setTimeout(() => setActiveStep(4), 2350));
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  // Calculate the strokeDashoffset for filling animation
  const getDashOffset = () => {
    if (activeStep === 0) return pathLength;
    if (activeStep === 1) return pathLength * 0.98;
    if (activeStep === 2) return pathLength * 0.67;
    if (activeStep === 3) return pathLength * 0.34;
    return 0; // 100% filled!
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '2.4rem 0 2rem 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* COMPACT SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 1.4rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.74rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem'
            }}
          >
            HOW IT WORKS
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.45rem, 2.4vw, 1.95rem)',
              lineHeight: 1.15,
              marginBottom: '0.35rem',
              color: '#FFF'
            }}
          >
            FROM MOMENT TO REEL <br />
            <span className="gold-gradient-text">In 4 Fast Steps.</span>
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
            We tore down the traditional weeks-long studio turnaround. Our pipeline is engineered for same-day social media impact.
          </p>
        </div>

        {/* CURVED PATHWAY CONTAINER */}
        <div style={{ position: 'relative' }}>
          
          {/* CURVED SVG PATHWAY WITH STEP-BY-STEP FILLING ANIMATION */}
          <svg
            className="pathway-curved-svg"
            viewBox="0 0 1000 70"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '70px',
              zIndex: 1,
              pointerEvents: 'none',
              overflow: 'visible'
            }}
          >
            <defs>
              {/* FAINT BASELINE GRADIENT */}
              <linearGradient id="curveBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(229, 173, 54, 0.15)" />
                <stop offset="60%" stopColor="rgba(229, 173, 54, 0.2)" />
                <stop offset="100%" stopColor="rgba(74, 222, 128, 0.25)" />
              </linearGradient>

              {/* GLOWING FILL GRADIENT */}
              <linearGradient id="curveActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E5AD36" />
                <stop offset="35%" stopColor="#FFF2B2" />
                <stop offset="70%" stopColor="#E5AD36" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>

              {/* GLOW FILTER */}
              <filter id="curveGlow" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. FAINT BASELINE CURVE (GUIDE TRACK) */}
            <path
              d="M 125 35 C 210 10, 290 60, 375 35 C 460 10, 540 60, 625 35 C 710 10, 790 60, 875 35"
              fill="none"
              stroke="url(#curveBaseGrad)"
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />

            {/* 2. GLOWING FILL PATH (DRAWS SEQUENTIALLY STEP-BY-STEP) */}
            <path
              ref={pathRef}
              d="M 125 35 C 210 10, 290 60, 375 35 C 460 10, 540 60, 625 35 C 710 10, 790 60, 875 35"
              fill="none"
              stroke="url(#curveActiveGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#curveGlow)"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: getDashOffset(),
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            />
          </svg>

          {/* 4-STEP PATHWAY GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              position: 'relative',
              zIndex: 2
            }}
          >
            {steps.map((item, idx) => {
              const isPassed = activeStep >= idx + 1;
              const isCurrent = activeStep === idx + 1;

              return (
                <div
                  key={item.step}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigateTo('book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {/* MILESTONE NODE CONTAINER (70px high so center aligns with curve at y=35) */}
                  <div
                    style={{
                      height: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%'
                    }}
                  >
                    {/* CIRCULAR BADGE ON THE CURVED TRACK */}
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: isPassed
                          ? 'linear-gradient(135deg, #420015 0%, #1A0008 100%)'
                          : 'linear-gradient(135deg, #2A000E 0%, #150006 100%)',
                        border: isPassed
                          ? `2px solid ${item.isFinal ? '#4ADE80' : 'var(--gold-primary)'}`
                          : '1px solid rgba(229, 173, 54, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: isPassed
                          ? (item.isFinal
                              ? '0 0 20px rgba(74, 222, 128, 0.55)'
                              : '0 0 18px rgba(229, 173, 54, 0.5)')
                          : '0 0 8px rgba(0,0,0,0.5)',
                        transform: isCurrent ? 'scale(1.12)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      <item.icon
                        size={18}
                        color={isPassed ? (item.isFinal ? '#4ADE80' : 'var(--gold-primary)') : 'var(--gold-muted)'}
                        style={{
                          transition: 'color 0.4s ease'
                        }}
                      />
                      
                      {/* FLOATING STEP NUMBER BADGE */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: isPassed
                            ? (item.isFinal ? '#4ADE80' : 'var(--gold-primary)')
                            : 'rgba(229, 173, 54, 0.3)',
                          color: isPassed ? '#1A0008' : 'var(--gold-light)',
                          fontSize: '0.62rem',
                          fontWeight: '900',
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 5px',
                          borderRadius: 'var(--radius-full)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.7)',
                          lineHeight: '1.2',
                          transition: 'all 0.4s ease'
                        }}
                      >
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* PATHWAY CONTENT CARD */}
                  <div
                    className="glass-card"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1.1rem 1rem',
                      border: isPassed
                        ? `1px solid ${item.isFinal ? 'rgba(74, 222, 128, 0.4)' : 'rgba(229, 173, 54, 0.4)'}`
                        : '1px solid var(--gold-border)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      flex: 1,
                      boxShadow: isPassed
                        ? (item.isFinal
                            ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(74, 222, 128, 0.15)'
                            : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(229, 173, 54, 0.12)')
                        : 'var(--shadow-md)',
                      transform: isCurrent ? 'translateY(-3px)' : 'translateY(0)',
                      transition: 'all 0.35s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.isFinal ? '#4ADE80' : 'var(--gold-bright)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isPassed
                        ? (item.isFinal ? 'rgba(74, 222, 128, 0.4)' : 'rgba(229, 173, 54, 0.4)')
                        : 'var(--gold-border)';
                      e.currentTarget.style.transform = isCurrent ? 'translateY(-3px)' : 'translateY(0)';
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: '800',
                          letterSpacing: '0.1em',
                          color: isPassed ? (item.isFinal ? '#4ADE80' : 'var(--gold-bright)') : 'var(--gold-muted)',
                          textTransform: 'uppercase',
                          marginBottom: '0.25rem',
                          transition: 'color 0.4s ease'
                        }}
                      >
                        STEP {item.step} — {item.action}
                      </div>

                      <h3
                        style={{
                          fontSize: '0.96rem',
                          color: '#FFF',
                          marginBottom: '0.4rem',
                          lineHeight: 1.2
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.76rem',
                          color: 'var(--text-muted)',
                          lineHeight: '1.4',
                          margin: 0
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.45rem',
                        borderTop: '1px solid rgba(229, 173, 54, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: isPassed ? (item.isFinal ? '#4ADE80' : 'var(--text-gold)') : 'var(--gold-muted)',
                          fontWeight: '700',
                          letterSpacing: '0.06em',
                          transition: 'color 0.4s ease'
                        }}
                      >
                        {item.action} &rarr;
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function FinalCta({ navigateTo }) {
  const { openCustomEnquiry } = useBooking();
  const sectionRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate scroll-linked progression as section scrolls into and up the viewport
            const enterDistance = windowHeight - rect.top;
            const targetDistance = windowHeight * 0.9;
            const progress = Math.min(Math.max(enterDistance / targetDistance, 0), 1.2);

            // Scale up effect: scales smoothly from 0.92 to ~1.10 as user scrolls up
            const computedScale = 0.92 + progress * 0.16;
            setScale(Number(computedScale.toFixed(3)));
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
        padding: '5.5rem 0',
        backgroundColor: '#26000C',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* BACKGROUND GLOW THAT SCALES IN TANDEM */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(229, 173, 54, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          {/* SCROLL-LINKED SCALE UP TEXT CONTAINER */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
              willChange: 'transform',
              marginBottom: '2.5rem'
            }}
          >
            <span
              className="section-tag"
              style={{
                marginBottom: '0.85rem',
                display: 'inline-block'
              }}
            >
              READY WHEN YOU ARE
            </span>
            
            <h2
              style={{
                fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)',
                lineHeight: 1.1,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#FFF',
                marginBottom: '1.2rem',
                letterSpacing: '-0.01em'
              }}
            >
              GOT A MOMENT? <br />
              <span className="gold-gradient-text">Let's Turn It Into A Reel.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.22rem)',
                color: '#FAF0E6',
                lineHeight: '1.55',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              Your event is happening once. Your content shouldn't take forever. Lock in your slot with Vela Shootz today.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.2rem'
            }}
          >
            <button
              onClick={() => {
                navigateTo('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ padding: '1.1rem 2.8rem', fontSize: '1.05rem' }}
            >
              <Sparkles size={18} />
              <span>BOOK YOUR SHOOT</span>
            </button>

            <button
              onClick={() => openCustomEnquiry('General Custom Enquiry')}
              className="btn-secondary"
              style={{ padding: '1.1rem 2.4rem', fontSize: '1.05rem' }}
            >
              <MessageCircle size={18} />
              <span>TALK TO US</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


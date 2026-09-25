import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowUpRight, Sparkles, MapPin, Mail, Phone, Shield } from 'lucide-react';
import { InstagramIcon } from './Icons';

export function Footer({ navigateTo }) {
  const logoBannerRef = useRef(null);
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0.4);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (logoBannerRef.current) {
            const rect = logoBannerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // When user scrolls towards the bottom of the page:
            // rect.top approaches windowHeight and scrolls upward into view
            const enterDistance = windowHeight - rect.top;
            const targetDistance = rect.height + 120;
            const progress = Math.min(Math.max(enterDistance / targetDistance, 0), 1.2);

            // Scale up effect: scales smoothly from 0.76 to ~1.06 as user scrolls into it
            // and scales back down when scrolling away
            const computedScale = 0.76 + progress * 0.28;
            const computedOpacity = 0.3 + progress * 0.7;

            setLogoScale(Number(computedScale.toFixed(3)));
            setLogoOpacity(Number(Math.min(computedOpacity, 1).toFixed(3)));
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

  const handleLink = (page) => {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/917095891554?text=' + encodeURIComponent('Hello Vela Shootz! I would like to know more about booking a shoot.'), '_blank');
  };

  return (
    <footer
      style={{
        backgroundColor: '#190008',
        borderTop: '1px solid var(--gold-border)',
        padding: '5rem 0 2rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '250px',
          background: 'radial-gradient(ellipse at top, rgba(229, 173, 54, 0.12), transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* BRAND COLUMN */}
          <div style={{ maxWidth: '340px' }}>
            <img
              src="/assets/my-logo.png"
              alt="Vela Shootz"
              style={{
                height: '46px',
                width: 'auto',
                marginBottom: '1.2rem',
                display: 'block',
                mixBlendMode: 'screen'
              }}
            />
            <p style={{ fontSize: '1.05rem', color: 'var(--text-gold)', fontWeight: '700', marginBottom: '0.4rem' }}>
              Shoot. Edit. Post.
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Your moments move fast. So do we. A new-generation mobile media brand built for moments that deserve to be experienced, edited and shared instantly.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(229, 173, 54, 0.1)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-primary)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <button
                onClick={handleWhatsApp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  color: '#25D366',
                  transition: 'all 0.2s ease'
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div>
            <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.4rem', color: 'var(--gold-primary)' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Home', 'Services', 'Portfolio', 'Pricing'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLink(item.toLowerCase())}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.94rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* BOOKING & TRACKING */}
          <div>
            <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.4rem', color: 'var(--gold-primary)' }}>
              Client Hub
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <button
                  onClick={() => handleLink('book')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Sparkles size={14} color="var(--gold-primary)" />
                  <span>Book a Slot</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('booking-status')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}
                >
                  Check Booking Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('pricing')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}
                >
                  Instant Reels Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}
                >
                  Contact & Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('admin')}
                  style={{
                    color: 'var(--gold-primary)',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.75rem',
                    marginTop: '0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(229, 173, 54, 0.08)',
                    border: '1px solid var(--gold-border)'
                  }}
                  title="Studio Management & Booking Operations"
                >
                  <Shield size={13} color="var(--gold-primary)" />
                  <span>Admin Studio Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* PRODUCTION PHILOSOPHY */}
          <div>
            <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.4rem', color: 'var(--gold-primary)' }}>
              Philosophy
            </h4>
            <div
              style={{
                background: 'rgba(56, 2, 20, 0.45)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem'
              }}
            >
              <div style={{ color: 'var(--gold-primary)', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                SHOT ON iPHONE.
              </div>
              <div style={{ color: '#FAF0E6', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                EDITED FOR THE MOMENT.
              </div>
              <div style={{ color: 'var(--gold-light)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>
                READY TO POST.
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: '1.5' }}>
                Every Vela Shootz production maintains strict dress code, professional conduct, and 4K mobile capture standards.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & COPYRIGHT */}
        <div
          style={{
            borderTop: '1px solid rgba(229, 173, 54, 0.12)',
            paddingTop: '1.8rem',
            paddingBottom: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            © 2026 Vela Shootz. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Privacy Policy: Vela Shootz respects client privacy. Client footage is stored securely and delivered via encrypted private galleries.')}>
              Privacy Policy
            </span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Terms & Conditions: All shoots are booked on a slot-reservation basis. Rescheduling is supported up to 48 hours prior.')}>
              Terms & Conditions
            </span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Cancellation Policy: Cancellations 48h before shoot are eligible for full slot credit towards future booking dates.')}>
              Cancellation Policy
            </span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Refund Policy: Deposits can be credited towards alternate dates in accordance with weather or rescheduling terms.')}>
              Refund Policy
            </span>
          </div>
        </div>

        {/* HORIZONTALLY PADDED BOTTOM BRAND LOGO BANNER (SCROLL-LINKED SCALE UP / DOWN) */}
        <div
          ref={logoBannerRef}
          style={{
            borderTop: '1px solid rgba(229, 173, 54, 0.12)',
            marginTop: '2rem',
            paddingTop: '2.5rem',
            paddingBottom: '1.5rem',
            paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
            paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* SCROLL-ANIMATED LOGO CONTAINER */}
          <div
            style={{
              width: '100%',
              maxWidth: '920px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              transformOrigin: 'center center',
              transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.15s ease',
              willChange: 'transform, opacity'
            }}
          >
            <img
              src="/assets/my-logo.png"
              alt="Vela Shootz Brand Logo"
              style={{
                width: '100%',
                maxWidth: '780px',
                height: 'auto',
                display: 'block',
                mixBlendMode: 'screen',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}


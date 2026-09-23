import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Sparkles, Shield, ChevronRight } from 'lucide-react';

export function Navbar({ currentPage, navigateTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    navigateTo(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="site-header"
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 1000,
        padding: '0 1.25rem',
        width: '100%',
        transition: 'all 0.3s ease'
      }}
    >
      {/* CURVED CAPSULE NAVBAR CONTAINER (BALANCED PADDING & SNUG PROPORTIONS) */}
      <div
        className="navbar-curved-container"
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(0.75rem, 1.8vw, 1.75rem)',
          padding: '0 0.65rem 0 1.15rem',
          borderRadius: '999px',
          backgroundColor: scrolled ? 'rgba(22, 0, 6, 0.96)' : 'rgba(34, 0, 10, 0.90)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--gold-border)',
          boxShadow: scrolled
            ? '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(229, 173, 54, 0.18)'
            : '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 12px rgba(229, 173, 54, 0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* LEFT: BRAND LOGO */}
        <div
          className="nav-left"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <button
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.15rem 0',
              flexShrink: 0
            }}
            aria-label="Vela Shootz Home"
          >
            <img
              src="/assets/my-logo.png"
              alt="Vela Shootz Logo"
              style={{
                height: '35px',
                width: 'auto',
                display: 'block',
                mixBlendMode: 'screen'
              }}
            />
          </button>
        </div>

        {/* CENTER: DESKTOP NAV LINKS */}
        <nav
          className="desktop-nav"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            flexShrink: 0
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '800' : '600',
                  color: isActive ? 'var(--gold-bright)' : 'rgba(255, 255, 255, 0.82)',
                  letterSpacing: '0.02em',
                  padding: '0.42rem 0.85rem',
                  borderRadius: '999px',
                  backgroundColor: isActive ? 'rgba(229, 173, 54, 0.16)' : 'transparent',
                  border: isActive ? '1px solid rgba(229, 173, 54, 0.38)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 14px rgba(229, 173, 54, 0.15)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FFF';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: ACTIONS & CTAS */}
        <div
          className="nav-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.55rem',
            flexShrink: 0
          }}
        >
          {/* TRACK STATUS CTA */}
          <button
            onClick={() => handleNavClick('booking-status')}
            className="btn-secondary track-status-btn"
            style={{
              padding: '0.48rem 0.95rem',
              fontSize: '0.78rem',
              fontWeight: '700',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap'
            }}
          >
            <Calendar size={13} />
            <span>TRACK STATUS</span>
          </button>

          {/* BOOK A SHOOT CTA */}
          <button
            onClick={() => handleNavClick('book')}
            className="btn-primary book-shoot-btn"
            style={{
              padding: '0.52rem 1.25rem',
              fontSize: '0.82rem',
              fontWeight: '800',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(229, 173, 54, 0.28)'
            }}
          >
            <Sparkles size={14} />
            <span>BOOK A SHOOT</span>
          </button>

          {/* ADMIN PORTAL LINK */}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              background: 'rgba(229, 173, 54, 0.08)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-primary)',
              opacity: 0.85,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Shield size={15} />
          </button>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => {
              const newState = !mobileMenuOpen;
              setMobileMenuOpen(newState);
              if (newState) {
                // Redirect to home when menu opens on mobile
                navigateTo('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-primary)',
              background: 'rgba(229, 173, 54, 0.08)',
              border: '1px solid var(--gold-border)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              padding: 0
            }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER WITH MATCHING CURVED CORNERS */}
      {mobileMenuOpen && (
        <div
          style={{
            maxWidth: '1080px',
            margin: '8px auto 0 auto',
            backgroundColor: 'rgba(26, 0, 8, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--gold-border)',
            borderRadius: '24px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(229, 173, 54, 0.15)',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  textAlign: 'left',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '14px',
                  backgroundColor: currentPage === item.id ? 'rgba(229, 173, 54, 0.16)' : 'rgba(56, 2, 20, 0.5)',
                  color: currentPage === item.id ? 'var(--gold-bright)' : 'var(--text-primary)',
                  fontWeight: currentPage === item.id ? '800' : '600',
                  fontSize: '0.88rem',
                  border: `1px solid ${currentPage === item.id ? 'var(--gold-primary)' : 'transparent'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span>{item.label}</span>
                <ChevronRight size={14} opacity={0.6} />
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.4rem' }}>
            <button
              onClick={() => handleNavClick('book')}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', borderRadius: '999px', padding: '0.75rem 1.2rem', fontWeight: '800' }}
            >
              <Sparkles size={16} />
              <span>BOOK YOUR SLOT</span>
            </button>
            <button
              onClick={() => handleNavClick('booking-status')}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderRadius: '999px', padding: '0.7rem 1.2rem', fontWeight: '700' }}
            >
              <Calendar size={15} />
              <span>CHECK BOOKING STATUS</span>
            </button>
          </div>
        </div>
      )}

      {/* MEDIA QUERY STYLES */}
      <style>{`
  @media (min-width: 768px) {
    .desktop-nav { display: flex !important; }
    .mobile-menu-btn { display: none !important; }
  }
  @media (max-width: 767px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .track-status-btn { display: none !important; }
  }
  @media (max-width: 480px) {
    .site-header { top: 8px !important; padding: 0 0.5rem !important; }
    .navbar-curved-container { height: 52px !important; padding: 0 0.5rem 0 0.7rem !important; }
    .book-shoot-btn { padding: 0.38rem 0.7rem !important; font-size: 0.68rem !important; }
  }
  @media (max-width: 600px) {
    .site-header { top: 8px !important; padding: 0 0.65rem !important; }
    .navbar-curved-container { height: 56px !important; border-radius: 999px !important; padding: 0 0.65rem 0 0.85rem !important; }
    .book-shoot-btn { padding: 0.42rem 0.85rem !important; font-size: 0.74rem !important; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>
    </header>
  );
}


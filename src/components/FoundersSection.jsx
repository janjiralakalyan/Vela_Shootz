import React, { useState } from 'react';
import { Sparkles, Award, Camera, CheckCircle2, Maximize2, X } from 'lucide-react';

export function FoundersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="founders"
      style={{
        padding: '3.5rem 0 4rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--gold-border)',
        borderBottom: '1px solid var(--gold-border)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow accents */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(229, 173, 54, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px' }}>
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.4rem auto' }}>
          <span
            className="gold-chip"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '0.75rem',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 800
            }}
          >
            <Sparkles size={13} />
            THE VISIONARIES
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.35rem)',
              lineHeight: 1.2,
              marginBottom: '0.6rem',
              color: '#FFF'
            }}
          >
            PILLARS BEHIND <br />
            <span className="gold-gradient-text">Vela Shootz.</span>
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            Meet the founders leading the mobile cinema revolution — engineering lightning-fast turnaround times, authentic emotion, and vertical storytelling.
          </p>
        </div>

        {/* IMAGE SHOWCASE FRAME */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            padding: '8px',
            background: 'linear-gradient(135deg, rgba(229, 173, 54, 0.45) 0%, rgba(34, 0, 11, 0.9) 50%, rgba(229, 173, 54, 0.25) 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(229, 173, 54, 0.15)',
            marginBottom: '2.5rem',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              backgroundColor: '#1A0007',
              cursor: 'pointer'
            }}
            onClick={() => setIsModalOpen(true)}
            title="Click to view full resolution photo"
          >
            {/* The Founders Photo */}
            <img
              src="/assets/founders.jpg"
              alt="Pillars behind Vela Shootz: Yashwanth Batta (Founder) & Galeeb Mohammad (Co-Founder)"
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '16 / 9',
                display: 'block',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.015)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Click to expand overlay badge */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: 'rgba(28, 0, 8, 0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--gold-border)',
                borderRadius: '50px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold-primary)',
                fontSize: '0.74rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                pointerEvents: 'none'
              }}
            >
              <Maximize2 size={13} />
              <span>Full View</span>
            </div>
          </div>
        </div>

        {/* FOUNDER HIGHLIGHT PROFILES */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.4rem'
          }}
        >
          {/* Yashwanth Batta */}
          <div
            className="glass-card"
            style={{
              padding: '1.4rem 1.6rem',
              borderRadius: '18px',
              border: '1px solid var(--gold-border)',
              backgroundColor: 'rgba(34, 0, 11, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(229, 173, 54, 0.12)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)'
                  }}
                >
                  <Camera size={19} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.12rem', color: '#FFF', fontWeight: 800, margin: 0 }}>
                    Yashwanth Batta
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    FOUNDER
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(46, 204, 113, 0.12)',
                  padding: '3px 9px',
                  borderRadius: '12px',
                  color: '#2ECC71',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                <CheckCircle2 size={12} />
                <span>Creative Lead</span>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Pioneering the mobile cinematography direction and aesthetic grading that powers Vela Shootz’s viral visual identity.
            </p>
          </div>

          {/* Galeeb Mohammad */}
          <div
            className="glass-card"
            style={{
              padding: '1.4rem 1.6rem',
              borderRadius: '18px',
              border: '1px solid var(--gold-border)',
              backgroundColor: 'rgba(34, 0, 11, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(229, 173, 54, 0.12)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)'
                  }}
                >
                  <Award size={19} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.12rem', color: '#FFF', fontWeight: 800, margin: 0 }}>
                    Galeeb Mohammad
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    CO-FOUNDER
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(52, 152, 219, 0.12)',
                  padding: '3px 9px',
                  borderRadius: '12px',
                  color: '#3498DB',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                <CheckCircle2 size={12} />
                <span>Production Lead</span>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Leading on-ground production logistics, rapid turnaround delivery pipelines, and premier client experience management.
            </p>
          </div>
        </div>
      </div>

      {/* FULL-VIEW LIGHTBOX MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 0, 3, 0.94)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(229, 173, 54, 0.15)',
              border: '1px solid var(--gold-border)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <X size={22} />
          </button>

          <div
            style={{
              maxWidth: '1200px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(229, 173, 54, 0.25)',
              border: '1px solid var(--gold-border)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/assets/founders.jpg"
              alt="Pillars behind Vela Shootz: Yashwanth Batta & Galeeb Mohammad"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

import React from 'react';
import { Camera, Clock, Smartphone, CheckCircle } from 'lucide-react';

export function UspStrip() {
  const usps = [
    {
      icon: Camera,
      title: 'ON-SPOT SHOOTS',
      desc: 'Capture the moment while it is happening.'
    },
    {
      icon: Clock,
      title: 'FAST DELIVERY',
      desc: 'Get your reels quickly without waiting for traditional timelines.'
    },
    {
      icon: Smartphone,
      title: 'iPHONE ONLY',
      desc: 'A mobile-first production workflow designed for social media.'
    },
    {
      icon: CheckCircle,
      title: 'READY TO POST',
      desc: 'Receive polished, upload-ready vertical content.'
    }
  ];

  return (
    <section
      style={{
        borderTop: '1px solid var(--gold-border)',
        borderBottom: '1px solid var(--gold-border)',
        backgroundColor: '#22000B',
        padding: '1.25rem 0'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem 1.5rem'
          }}
        >
          {usps.map((usp) => (
            <div
              key={usp.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.3rem 0.5rem',
                transition: 'transform var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(229, 173, 54, 0.12)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-primary)',
                  flexShrink: 0
                }}
              >
                <usp.icon size={16} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    color: '#FFF',
                    marginBottom: '0.15rem',
                    lineHeight: 1.2
                  }}
                >
                  {usp.title}
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: '1.35', margin: 0 }}>
                  {usp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

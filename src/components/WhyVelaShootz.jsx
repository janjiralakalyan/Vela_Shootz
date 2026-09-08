import React from 'react';
import { Zap, Smartphone, Share2, ShieldCheck, Sliders, HeartHandshake } from 'lucide-react';

export function WhyVelaShootz() {
  const benefits = [
    {
      number: '01',
      icon: Zap,
      title: 'FAST',
      desc: 'Quick turnaround designed around today’s social-media culture. No waiting weeks to post.'
    },
    {
      number: '02',
      icon: Smartphone,
      title: 'MOBILE-FIRST',
      desc: 'iPhone-based agile production workflow. Lightweight, unobtrusive, and razor-sharp.'
    },
    {
      number: '03',
      icon: Share2,
      title: 'SOCIAL-READY',
      desc: 'Content natively framed in 9:16 vertical 4K HDR for Instagram Reels, Shorts, and Stories.'
    },
    {
      number: '04',
      icon: ShieldCheck,
      title: 'PROFESSIONAL',
      desc: 'Professional team presentation, punctual arrival, and a strictly maintained dress code.'
    },
    {
      number: '05',
      icon: Sliders,
      title: 'FLEXIBLE',
      desc: 'Adaptable packages from 2-hour quick sessions to full 3-day celebrations.'
    },
    {
      number: '06',
      icon: HeartHandshake,
      title: 'MOMENT-FOCUSED',
      desc: 'We focus on capturing genuine, candid human emotion rather than stiff, staged setups.'
    }
  ];

  return (
    <section style={{ padding: '2.4rem 0 2.2rem 0', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        
        {/* COMPACT SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 1.6rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.2rem'
            }}
          >
            THE VELA STANDARD
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 2.3vw, 1.85rem)',
              lineHeight: 1.15,
              marginBottom: '0.35rem',
              color: '#FFF'
            }}
          >
            WHY CREATORS & FAMILIES <br />
            <span className="gold-gradient-text">Trust Vela Shootz.</span>
          </h2>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: '1.45',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            We are not a traditional photography studio. We are a modern, high-speed mobile media unit built for how people share memories today.
          </p>
        </div>

        {/* ALTERNATING TIMELINE / CENTRAL SPINE CONTAINER */}
        <div style={{ position: 'relative', margin: '0 auto', maxWidth: '1040px' }}>
          
          {/* CENTRAL GLOWING LINE DOWN THE MIDDLE */}
          <div
            className="timeline-spine-line"
            style={{
              position: 'absolute',
              top: '18px',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, var(--gold-primary) 12%, var(--gold-primary) 88%, transparent)',
              boxShadow: '0 0 12px rgba(229, 173, 54, 0.4)',
              zIndex: 1
            }}
          />

          {/* ALTERNATING ROWS (1 LEFT, 1 RIGHT) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {benefits.map((b, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={b.number}
                  className="timeline-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    zIndex: 2
                  }}
                >
                  {/* LEFT COLUMN */}
                  <div
                    className="timeline-col-left"
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: isLeft ? 'flex-end' : 'flex-start',
                      paddingRight: isLeft ? '1.85rem' : '0'
                    }}
                  >
                    {isLeft && (
                      <div
                        className="glass-card timeline-card"
                        style={{
                          width: '100%',
                          maxWidth: '470px',
                          padding: '1.15rem 1.45rem',
                          borderRadius: '16px',
                          border: '1px solid var(--gold-border)',
                          backgroundColor: 'rgba(34, 0, 11, 0.82)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.7)',
                          position: 'relative',
                          transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.borderColor = 'var(--gold-primary)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(229, 173, 54, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'var(--gold-border)';
                          e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.7)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.35rem' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '10px',
                              background: 'rgba(229, 173, 54, 0.12)',
                              border: '1px solid var(--gold-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--gold-primary)',
                              flexShrink: 0
                            }}
                          >
                            <b.icon size={19} />
                          </div>
                          <h3 style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: '800', letterSpacing: '0.04em', margin: 0 }}>
                            {b.title}
                          </h3>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.48', margin: 0, paddingLeft: '3.2rem' }}>
                          {b.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CENTER NODE (NUMBERING ON THE LINE) */}
                  <div
                    className="timeline-center-node"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#1C0008',
                      border: '2px solid var(--gold-primary)',
                      boxShadow: '0 0 16px rgba(229, 173, 54, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.82rem',
                      fontWeight: '900',
                      color: 'var(--gold-primary)',
                      flexShrink: 0,
                      zIndex: 3
                    }}
                  >
                    {b.number}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div
                    className="timeline-col-right"
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: !isLeft ? 'flex-start' : 'flex-end',
                      paddingLeft: !isLeft ? '1.85rem' : '0'
                    }}
                  >
                    {!isLeft && (
                      <div
                        className="glass-card timeline-card"
                        style={{
                          width: '100%',
                          maxWidth: '470px',
                          padding: '1.15rem 1.45rem',
                          borderRadius: '16px',
                          border: '1px solid var(--gold-border)',
                          backgroundColor: 'rgba(34, 0, 11, 0.82)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.7)',
                          position: 'relative',
                          transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.borderColor = 'var(--gold-primary)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(229, 173, 54, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'var(--gold-border)';
                          e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.7)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.35rem' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '10px',
                              background: 'rgba(229, 173, 54, 0.12)',
                              border: '1px solid var(--gold-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--gold-primary)',
                              flexShrink: 0
                            }}
                          >
                            <b.icon size={19} />
                          </div>
                          <h3 style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: '800', letterSpacing: '0.04em', margin: 0 }}>
                            {b.title}
                          </h3>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.48', margin: 0, paddingLeft: '3.2rem' }}>
                          {b.desc}
                        </p>
                      </div>
                    )}
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

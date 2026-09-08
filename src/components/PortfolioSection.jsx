import React, { useState, useRef, useEffect } from 'react';
import { Play, X, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { getPortfolio } from '../data/storage';
import { useBooking } from '../context/BookingContext';

export function PortfolioSection({ navigateTo }) {
  const portfolio = getPortfolio();
  const { selectPackage, packages } = useBooking();
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(false);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef(null);
  const scrollXRef = useRef(0);

  const handleBookStyle = (project) => {
    let targetPkg = packages.find(p => p.category.toLowerCase() === project.categorySlug) || packages[0];
    selectPackage(targetPkg);
    setActiveModalProject(null);
    navigateTo('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4x repetition for seamless, infinite horizontal loop
  const loopedProjects = [...portfolio, ...portfolio, ...portfolio, ...portfolio];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const cardWidth = 232;
    const cardGap = 20;
    const singleItemWidth = cardWidth + cardGap;
    const singleLoopWidth = portfolio.length * singleItemWidth;

    let lastTime = performance.now();
    const speed = 38; // Smooth, slow gliding speed in pixels per second

    const animate = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isHoveredRef.current) {
        scrollXRef.current += speed * delta;
        if (scrollXRef.current >= singleLoopWidth) {
          scrollXRef.current -= singleLoopWidth;
        }
      }

      // Move the track horizontally
      track.style.transform = `translate3d(-${scrollXRef.current}px, 0, 0)`;

      // Flashoot Curved Arc calculation:
      // Computes each card's offset relative to the center of the container
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const halfWidth = containerRect.width / 2 || 1;
      const cardNodes = track.children;

      for (let i = 0; i < cardNodes.length; i++) {
        const cardWrapper = cardNodes[i];
        const cardRect = cardWrapper.getBoundingClientRect();

        // Skip cards far out of view
        if (cardRect.right < containerRect.left - 250 || cardRect.left > containerRect.right + 250) {
          continue;
        }

        const cardCenter = cardRect.left + cardRect.width / 2;
        const normalizedDist = (cardCenter - centerX) / halfWidth;
        const clampedDist = Math.max(-1.5, Math.min(1.5, normalizedDist));

        // Exact Flashoot fan rotation & vertical parabolic arc:
        const rotateDeg = clampedDist * 7.2; // -7.2deg on left to +7.2deg on right
        const translateY = Math.pow(Math.abs(clampedDist), 1.55) * 58; // Pushed down at outer edges

        const innerCard = cardWrapper.firstElementChild;
        if (innerCard) {
          innerCard.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotateDeg}deg)`;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [portfolio.length]);

  return (
    <section 
      id="portfolio-section" 
      style={{ 
        padding: '2.5rem 0 3.8rem 0', 
        background: 'radial-gradient(ellipse 120% 85% at 50% 15%, #2a000e 0%, #180008 55%, #080003 100%)', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '100%', padding: 0 }}>
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 1.5rem auto', padding: '0 1rem' }}>
          <span
            style={{
              color: 'var(--gold-primary)',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.25rem'
            }}
          >
            OUR WORK
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.45rem, 2.3vw, 1.95rem)',
              lineHeight: 1.15,
              marginBottom: '0.3rem',
              color: '#FFF'
            }}
          >
            MOMENTS CAPTURED. <span className="gold-gradient-text">Posted Instantly.</span>
          </h2>
        </div>

        {/* FLASHOOT-STYLE CURVED ARC HORIZONTAL REELS CONTAINER */}
        <div
          ref={containerRef}
          className="reels-curved-container"
          style={{
            position: 'relative',
            width: '100%',
            height: '510px',
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            setIsPaused(false);
          }}
        >
          {/* CONTINUOUS TRACK */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '20px',
              width: 'max-content',
              position: 'absolute',
              top: '15px',
              left: 0,
              willChange: 'transform'
            }}
          >
            {loopedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                style={{
                  width: '232px',
                  height: '410px',
                  flexShrink: 0,
                  perspective: '1000px'
                }}
              >
                {/* INNER CARD WITH DYNAMIC 3D ARCHED ROTATION & TRANSLATE */}
                <div
                  className="flashoot-card"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#120006',
                    boxShadow: '0 24px 50px rgba(0, 0, 0, 0.85), 0 0 1px rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transformOrigin: 'center center',
                    willChange: 'transform',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                  onClick={() => setActiveModalProject(project)}
                >
                  {/* 100% FULL-BLEED CLEAN 9:16 VERTICAL VIDEO */}
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* FLASHOOT-STYLE BRAND WATERMARK OVERLAY */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '16px',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: 0.45,
                      pointerEvents: 'none'
                    }}
                  >
                    <span 
                      style={{ 
                        fontSize: '0.58rem', 
                        fontWeight: '900', 
                        letterSpacing: '0.14em', 
                        color: '#FFF', 
                        textTransform: 'uppercase',
                        textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                      }}
                    >
                      VELASHOOTZ
                    </span>
                  </div>

                  {/* HOVER PLAY BUTTON OVERLAY */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.25s ease',
                      zIndex: 12
                    }}
                    className="card-hover-overlay"
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(46, 0, 14, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid var(--gold-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.7)'
                      }}
                    >
                      <Play size={20} fill="var(--gold-primary)" color="var(--gold-primary)" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeModalProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3000,
              backgroundColor: 'rgba(12, 0, 4, 0.94)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setActiveModalProject(null)}
          >
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '780px',
                padding: 0,
                overflow: 'hidden',
                border: '1.5px solid var(--gold-border-hover)',
                backgroundColor: '#160007',
                borderRadius: '18px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* VIDEO PLAYER & CONTROLS */}
              <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#000', overflow: 'hidden' }}>
                <video
                  src={activeModalProject.videoUrl}
                  autoPlay
                  loop
                  muted={isModalMuted}
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000' }}
                />

                {/* SOUND TOGGLE */}
                <button
                  onClick={() => setIsModalMuted(!isModalMuted)}
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                  title={isModalMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isModalMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="var(--gold-primary)" />}
                </button>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* DETAILS & DIRECT BOOKING ACTION */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span className="gold-chip">{activeModalProject.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeModalProject.date}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '0.4rem' }}>
                  {activeModalProject.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.2rem' }}>
                  {activeModalProject.highlight} Delivered on-location: {activeModalProject.services}.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.8rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(229, 173, 54, 0.15)'
                  }}
                >
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-gold)', fontWeight: '700' }}>
                    Deliverables: {activeModalProject.reelsCount} Instant Reels • {activeModalProject.portraitsCount} Portraits
                  </div>

                  <button
                    onClick={() => handleBookStyle(activeModalProject)}
                    className="btn-primary"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
                  >
                    <Sparkles size={15} />
                    <span>BOOK THIS STYLE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

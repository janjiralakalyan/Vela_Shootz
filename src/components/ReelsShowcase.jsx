import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function ReelsShowcase({ navigateTo }) {
  const { selectPackage, packages } = useBooking();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);

  const reels = [
    {
      id: 'reel-1',
      title: 'College Fest 2026 Mosh Pit Drop',
      category: 'ON-SPOT REELS',
      project: 'National Youth Fest 2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-party-crowd-raising-their-hands-in-a-concert-40898-large.mp4',
      views: '142K',
      likes: '18.4K',
      sound: 'Trending Bass Drop (Vela Speed Edit)',
      targetPkgId: 'pkg-half-day'
    },
    {
      id: 'reel-2',
      title: 'Royal Haldi Flower Shower Slow-Mo',
      category: 'WEDDINGS',
      project: 'Sneha & Aditya Vows',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-throwing-colorful-powder-in-the-air-40879-large.mp4',
      views: '320K',
      likes: '45.1K',
      sound: 'Kudmayi Cinematic Reverb',
      targetPkgId: 'pkg-wedding-essentials'
    },
    {
      id: 'reel-3',
      title: 'Artisan Cafe Latte Art Hook Drop',
      category: 'BUSINESS',
      project: 'Kaviar Cafe Launch',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-into-coffee-cup-42410-large.mp4',
      views: '89K',
      likes: '9.2K',
      sound: 'Lo-Fi Chill Beats Commercial',
      targetPkgId: 'pkg-promotions'
    }
  ];

  const currentReel = reels[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
    setLiked(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
    setLiked(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleBookThisReel = () => {
    const pkg = packages.find(p => p.id === currentReel.targetPkgId) || packages[0];
    selectPackage(pkg);
    navigateTo('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#1A0008', position: 'relative' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">REELS SHOWCASE</span>
          <h2 className="section-title">
            WATCH THE <span className="gold-gradient-text">Moments.</span>
          </h2>
          <p className="section-description">
            A few moments we've already turned into reels. Designed exclusively for 9:16 mobile feeds.
          </p>
        </div>

        {/* 9:16 REEL CONTAINER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {/* PREV BUTTON */}
          <button
            onClick={handlePrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(56, 2, 20, 0.7)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-primary)',
              cursor: 'pointer'
            }}
            aria-label="Previous reel"
          >
            <ChevronLeft size={24} />
          </button>

          {/* VERTICAL PHONE FRAME */}
          <div
            style={{
              width: '100%',
              maxWidth: '340px',
              height: '600px',
              borderRadius: '36px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#000',
              border: '4px solid rgba(229, 173, 54, 0.45)',
              boxShadow: '0 0 50px rgba(229, 173, 54, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
            }}
          >
            {/* VIDEO PLAYER */}
            <video
              ref={videoRef}
              key={currentReel.videoUrl}
              src={currentReel.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onClick={togglePlay}
            />

            {/* OVERLAY CONTROLS */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
                zIndex: 10
              }}
            >
              <span className="gold-chip" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                {currentReel.category}
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={toggleMute}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={togglePlay}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Play/Pause"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>

            {/* RIGHT FLOATING ENGAGEMENT STRIP */}
            <div
              style={{
                position: 'absolute',
                right: '1rem',
                bottom: '5.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
                zIndex: 10
              }}
            >
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                  color: liked ? '#E74C3C' : '#FFF'
                }}
              >
                <Heart size={26} fill={liked ? '#E74C3C' : 'none'} />
                <span style={{ fontSize: '0.72rem', fontWeight: '700' }}>{currentReel.likes}</span>
              </button>

              <button
                onClick={() => alert(`Sharing "${currentReel.title}"`)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                  color: '#FFF'
                }}
              >
                <Share2 size={24} />
                <span style={{ fontSize: '0.72rem', fontWeight: '700' }}>{currentReel.views}</span>
              </button>
            </div>

            {/* BOTTOM REEL INFO & ACTION */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.2rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
                zIndex: 10
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: '700', marginBottom: '0.2rem' }}>
                {currentReel.project}
              </div>
              <h4 style={{ fontSize: '0.96rem', color: '#FFF', fontWeight: '700', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                {currentReel.title}
              </h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <span>🎵</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentReel.sound}</span>
              </div>

              <button
                onClick={handleBookThisReel}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em'
                }}
              >
                <Sparkles size={14} />
                <span>BOOK THIS STYLE</span>
              </button>
            </div>
          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(56, 2, 20, 0.7)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-primary)',
              cursor: 'pointer'
            }}
            aria-label="Next reel"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* INDICATOR DOTS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {reels.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: currentIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentIndex === idx ? 'var(--gold-primary)' : 'rgba(229, 173, 54, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function MobileActionBar({ navigateTo }) {
  const { selectedPackage } = useBooking();

  const handleWhatsApp = () => {
    const phone = '917095891554';
    let text = 'Hello Vela Shootz! I would like to enquire about booking a shoot.';
    if (selectedPackage) {
      text = `Hello Vela Shootz! I am interested in booking the "${selectedPackage.name}" package. Are slots open for an upcoming date?`;
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <aside
      className="mobile-action-bar"
      aria-label="Mobile quick actions"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: 'rgba(26, 0, 8, 0.96)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--gold-border)',
        padding: '0.65rem 1rem',
        boxShadow: '0 -8px 25px rgba(0, 0, 0, 0.7)',
        display: 'none',
        alignItems: 'center',
        gap: '0.75rem'
      }}
    >
      <button
        onClick={() => {
          navigateTo('book');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="btn-primary"
        style={{
          flex: 1,
          padding: '0.75rem 1rem',
          fontSize: '0.88rem',
          letterSpacing: '0.04em'
        }}
      >
        <Sparkles size={16} />
        <span>BOOK NOW</span>
      </button>

      <button
        onClick={handleWhatsApp}
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          background: 'rgba(37, 211, 102, 0.15)',
          color: '#25D366',
          border: '1px solid rgba(37, 211, 102, 0.4)',
          borderRadius: 'var(--radius-full)',
          padding: '0.75rem 1rem',
          fontWeight: '700',
          fontSize: '0.88rem',
          letterSpacing: '0.04em'
        }}
      >
        <MessageCircle size={16} />
        <span>WHATSAPP</span>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-action-bar {
            display: flex !important;
          }
        }
      `}</style>
    </aside>
  );
}

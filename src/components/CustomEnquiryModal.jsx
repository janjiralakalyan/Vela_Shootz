import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { createEnquiry } from '../data/storage';

export function CustomEnquiryModal() {
  const { customEnquiryModalOpen, setCustomEnquiryModalOpen, customEnquiryType } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: customEnquiryType || 'Family Event',
    eventDate: '',
    location: '',
    expectedCoverage: 'Half Day (4 Hours)',
    requiredReels: '3-5 Reels',
    requiredPortraits: '10-20 Portraits',
    budgetRange: '₹5,000 - ₹15,000',
    specialRequirements: '',
    referenceLink: ''
  });

  if (!customEnquiryModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry({
        ...formData,
        type: customEnquiryType
      });
    } catch (err) {
      console.error('Enquiry submit error:', err);
    }
    setSubmitted(true);
  };

  const handleWhatsAppHandoff = () => {
    const text = `Hello Vela Shootz! I just submitted a custom package enquiry:\nName: ${formData.name}\nType: ${formData.eventType}\nDate: ${formData.eventDate || 'TBD'}\nLocation: ${formData.location || 'Local'}\nBudget: ${formData.budgetRange}`;
    window.open(`https://wa.me/917095891554?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClose = () => {
    setCustomEnquiryModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 0, 5, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          border: '1px solid var(--gold-border-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(229, 173, 54, 0.1)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span className="gold-chip">{customEnquiryType}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Custom Package Enquiry</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Let's Have A Talk.</h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', marginBottom: '1.8rem', lineHeight: '1.5' }}>
              Tell us what you're planning and we'll build a bespoke production package around your event.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    EVENT DATE
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    LOCATION / VENUE *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City / Venue name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    BUDGET RANGE
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  >
                    <option value="Under ₹5,000">Under ₹5,000</option>
                    <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                    <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                    <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                    <option value="₹75,000+ (Luxury / Multi-Day)">₹75,000+ (Luxury / Multi-Day)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    REQUIRED REELS
                  </label>
                  <input
                    type="text"
                    name="requiredReels"
                    value={formData.requiredReels}
                    onChange={handleChange}
                    placeholder="e.g. 3-5 reels"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    SPECIALIZED PORTRAITS
                  </label>
                  <input
                    type="text"
                    name="requiredPortraits"
                    value={formData.requiredPortraits}
                    onChange={handleChange}
                    placeholder="e.g. 15-20 portraits"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(34, 0, 11, 0.8)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                  SPECIAL REQUIREMENTS / VISION
                </label>
                <textarea
                  name="specialRequirements"
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="Tell us about the vibe, specific moments, timeline or aesthetic you are aiming for..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(34, 0, 11, 0.8)',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    fontSize: '0.92rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                  REFERENCE / MOODBOARD LINK (OPTIONAL)
                </label>
                <input
                  type="url"
                  name="referenceLink"
                  value={formData.referenceLink}
                  onChange={handleChange}
                  placeholder="https://instagram.com/reel/... or Google Drive"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(34, 0, 11, 0.8)',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                <Send size={18} />
                <span>SEND ENQUIRY</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(46, 204, 113, 0.15)',
                color: '#2ECC71',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '0.8rem' }}>Enquiry Received!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Thanks! The Vela Shootz team will get in touch with you shortly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button
                onClick={handleWhatsAppHandoff}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  background: 'rgba(37, 211, 102, 0.2)',
                  color: '#25D366',
                  border: '1px solid rgba(37, 211, 102, 0.5)',
                  padding: '0.9rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700'
                }}
              >
                <MessageCircle size={18} />
                <span>CHAT ON WHATSAPP DIRECTLY</span>
              </button>
              <button onClick={handleClose} className="btn-secondary" style={{ width: '100%' }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

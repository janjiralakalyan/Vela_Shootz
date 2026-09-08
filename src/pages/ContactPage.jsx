import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { createEnquiry } from '../data/storage';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Event Reels',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry({
        ...formData,
        specialRequirements: formData.message,
        type: 'Contact Form Lead'
      });
    } catch (err) {
      console.error('Contact form error:', err);
    }
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = 'Hello Vela Shootz! I would like to enquire about your availability for an upcoming shoot.';
    window.open(`https://wa.me/917095891554?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">GET IN TOUCH</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', marginBottom: '1rem', color: '#FFF' }}>
            LET'S CREATE SOMETHING <br />
            <span className="gold-gradient-text">WORTH POSTING.</span>
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Ready to capture your event? Send a message, give us a call, or start an instant WhatsApp conversation with our production leads.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* CONTACT INFO & DIRECT CHANNELS */}
          <div>
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                border: '1px solid var(--gold-border)',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '1.5rem' }}>
                Direct Communication
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>WhatsApp Chat</div>
                    <button
                      onClick={handleWhatsAppDirect}
                      style={{ color: '#25D366', fontWeight: '700', fontSize: '1rem', textAlign: 'left' }}
                    >
                      +91 70958 91554 (Instant Response)
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(229, 173, 54, 0.12)',
                      color: 'var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <InstagramIcon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Instagram DM</div>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#FFF', fontWeight: '600', fontSize: '1rem' }}
                    >
                      @velashootz.official
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(229, 173, 54, 0.12)',
                      color: 'var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Email Inquiries</div>
                    <div style={{ color: '#FFF', fontWeight: '600', fontSize: '1rem' }}>
                      hello@velashootz.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OPERATIONAL INFO */}
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                border: '1px solid var(--gold-border)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <MapPin size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#FFF' }}>Operating Locations</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      Bangalore & Outstation Travel across South India (Weddings & Corporate Fests).
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <Clock size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#FFF' }}>Production Hours</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      Available 7 days a week, 08:00 AM to 11:30 PM (Pre-booked slots only).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INQUIRY FORM */}
          <div
            className="glass-card"
            style={{
              padding: '2.8rem',
              border: '1px solid var(--gold-border-hover)'
            }}
          >
            {!submitted ? (
              <div>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                  Start A Conversation
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
                  Tell us about your upcoming event and we'll reply with options and availability.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
                      placeholder="e.g. Ananya Patel"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(34, 0, 11, 0.8)',
                        border: '1px solid var(--gold-border)',
                        color: '#FFF',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                        PHONE / WHATSAPP *
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
                          padding: '0.8rem 1rem',
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
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ananya@email.com"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
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
                      EVENT TYPE
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(34, 0, 11, 0.8)',
                        border: '1px solid var(--gold-border)',
                        color: '#FFF',
                        fontSize: '0.92rem'
                      }}
                    >
                      <option value="On-Spot Reels">On-Spot Quick Reels</option>
                      <option value="Wedding Coverage">Wedding / Reception</option>
                      <option value="College Fest">College Cultural Fest</option>
                      <option value="Business Promotion">Business Promo / Brand Launch</option>
                      <option value="Private Celebration">Private Birthday / Family Event</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                      MESSAGE / QUESTIONS
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your event dates, venue location, or any specific questions..."
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(34, 0, 11, 0.8)',
                        border: '1px solid var(--gold-border)',
                        color: '#FFF',
                        fontSize: '0.92rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '0.95rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
                  >
                    <Send size={16} />
                    <span>START A CONVERSATION</span>
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(46, 204, 113, 0.15)',
                    color: '#2ECC71',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.2rem auto'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.6rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thank you! Our creative lead will get back to you within 2 business hours.
                </p>
                <button
                  onClick={handleWhatsAppDirect}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'rgba(37, 211, 102, 0.2)',
                    color: '#25D366',
                    border: '1px solid rgba(37, 211, 102, 0.5)',
                    padding: '0.8rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '700',
                    fontSize: '0.88rem'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>INSTANT CHAT ON WHATSAPP</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

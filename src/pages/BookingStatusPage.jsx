import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Smartphone, Video, Wand2, Download, AlertCircle, Calendar, MapPin, User, ShieldCheck } from 'lucide-react';
import { findBookingByReference } from '../data/storage';

export function BookingStatusPage({ navigateTo }) {
  const [referenceId, setReferenceId] = useState('VS-2026-00124'); // default sample seed
  const [contactVerify, setContactVerify] = useState('');
  const [searched, setSearched] = useState(false);
  const [booking, setBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!referenceId.trim()) {
      setErrorMsg('Please enter a booking reference ID.');
      return;
    }

    const found = findBookingByReference(referenceId, contactVerify);
    if (found) {
      setBooking(found);
      setSearched(true);
    } else {
      setBooking(null);
      setSearched(true);
      setErrorMsg('No booking found matching that Reference ID and verification. Please check and try again.');
    }
  };

  const milestones = [
    { key: 'Confirmed', label: 'Booking Confirmed' },
    { key: 'Payment Received', label: 'Payment Received' },
    { key: 'Scheduled', label: 'Shoot Scheduled' },
    { key: 'Team Assigned', label: 'Team Assigned' },
    { key: 'Shoot Completed', label: 'Shoot Completed' },
    { key: 'Editing', label: 'In Rapid Editing' },
    { key: 'Reels Ready', label: 'Reels Ready' },
    { key: 'Delivered', label: 'Delivered / Completed' }
  ];

  const getMilestoneIndex = (status) => {
    if (!status) return 0;
    const s = status.toLowerCase();
    if (s.includes('delivered') || s.includes('complete')) return 7;
    if (s.includes('ready')) return 6;
    if (s.includes('edit')) return 5;
    if (s.includes('completed')) return 4;
    if (s.includes('team') || s.includes('assign')) return 3;
    if (s.includes('sched')) return 2;
    if (s.includes('pay')) return 1;
    return 0;
  };

  const activeIndex = booking ? getMilestoneIndex(booking.status) : 0;

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
      <div className="container-narrow">
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">LIVE STATUS TRACKER</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFF', marginBottom: '0.6rem' }}>
            CHECK BOOKING <span className="gold-gradient-text">STATUS.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Track your shoot schedule, crew assignment, live editing progress, and download ready reels.
          </p>
        </div>

        {/* SEARCH FORM */}
        <div
          className="glass-card"
          style={{
            padding: '2rem',
            border: '1px solid var(--gold-border)',
            marginBottom: '3rem'
          }}
        >
          <form onSubmit={handleSearch}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                  BOOKING REFERENCE ID *
                </label>
                <input
                  type="text"
                  required
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                  placeholder="e.g. VS-2026-00124"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(34, 0, 11, 0.9)',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: '700'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                  PHONE OR EMAIL (VERIFICATION)
                </label>
                <input
                  type="text"
                  value={contactVerify}
                  onChange={(e) => setContactVerify(e.target.value)}
                  placeholder="Optional verification"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(34, 0, 11, 0.9)',
                    border: '1px solid var(--gold-border)',
                    color: '#FFF',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.9rem 1.6rem', height: '48px', fontSize: '0.92rem' }}
              >
                <Search size={16} />
                <span>TRACK STATUS</span>
              </button>
            </div>
          </form>

          {errorMsg && (
            <div style={{ marginTop: '1.2rem', color: '#FF6B6B', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* BOOKING TRACKING RESULTS */}
        {booking && (
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              border: '1px solid var(--gold-border-hover)'
            }}
          >
            {/* TOP HEADER SUMMARY */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(229, 173, 54, 0.15)',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>BOOKING REFERENCE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: '900', color: 'var(--gold-bright)' }}>
                  {booking.bookingReference}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#FAF0E6', marginTop: '0.2rem' }}>
                  Client: {booking.customerName} ({booking.phone})
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(46, 204, 113, 0.15)',
                    border: '1px solid #2ECC71',
                    color: '#2ECC71',
                    padding: '0.35rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}
                >
                  CURRENT STATUS: {booking.status}
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
                  Payment: {booking.paymentStatus} (₹{booking.totalAmount.toLocaleString('en-IN')})
                </div>
              </div>
            </div>

            {/* MILESTONE PROGRESS STEPPER */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-primary)', marginBottom: '1.8rem' }}>
                PRODUCTION PROGRESS TIMELINE
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.8rem',
                  position: 'relative'
                }}
              >
                {milestones.map((m, idx) => {
                  const isDone = idx <= activeIndex;
                  const isCurrent = idx === activeIndex;

                  return (
                    <div
                      key={m.key}
                      style={{
                        padding: '1rem 0.8rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isCurrent
                          ? 'rgba(229, 173, 54, 0.15)'
                          : isDone
                          ? 'rgba(46, 204, 113, 0.1)'
                          : 'rgba(34, 0, 11, 0.5)',
                        border: isCurrent
                          ? '1px solid var(--gold-primary)'
                          : isDone
                          ? '1px solid rgba(46, 204, 113, 0.4)'
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: isDone ? '#2ECC71' : 'rgba(255, 255, 255, 0.1)',
                          color: '#1A0008',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '900'
                        }}
                      >
                        {isDone ? <CheckCircle2 size={16} color="#FFF" /> : idx + 1}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: isCurrent ? '800' : '600',
                          color: isCurrent ? 'var(--gold-bright)' : isDone ? '#FFF' : 'var(--text-dim)'
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EVENT SPECS GRID */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                background: 'rgba(34, 0, 11, 0.6)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gold-border)',
                marginBottom: '2rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Package</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{booking.packageName}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {booking.duration}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Shoot Date & Slot</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{booking.date}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)' }}>{booking.startTime}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Location</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF' }}>{booking.location}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Event: {booking.eventType}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Assigned Crew</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--gold-bright)' }}>
                  {booking.assignedTo || 'Assigning Lead Shooter'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4ADE80' }}>Equipment: iPhone 4K ProRes</div>
              </div>
            </div>

            {/* REELS READY DOWNLOAD BOX (APPEARS WHEN READY/DELIVERED) */}
            {activeIndex >= 6 && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(80, 4, 30, 0.95), rgba(40, 0, 14, 0.95))',
                  border: '2px solid var(--gold-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-gold)'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--grad-gold)', color: '#1A0008', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Download size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '0.4rem' }}>
                  Your Edited Reels Are Ready to Post!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Tap below to open your secure cloud gallery and download high-bitrate 4K vertical exports.
                </p>
                <button
                  onClick={() => alert(`Downloading deliverables for ${booking.bookingReference}`)}
                  className="btn-primary"
                  style={{ padding: '0.9rem 2.2rem' }}
                >
                  <Download size={18} />
                  <span>DOWNLOAD REELS & PORTRAITS</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

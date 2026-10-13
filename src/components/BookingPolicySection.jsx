import React, { useState } from 'react';
import {
  Film,
  Camera,
  Edit3,
  HardDrive,
  MapPin,
  Clock,
  AlertCircle,
  CreditCard,
  Calendar,
  XCircle,
  RefreshCw,
  CloudRain,
  Send,
  ShieldAlert,
  Lock,
  ChevronDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Search
} from 'lucide-react';
import {
  BOOKING_POLICIES,
  PACKAGE_COMPARISON_TABLE,
  SIMPLE_PACKAGE_GUIDE,
  INITIAL_PACKAGES
} from '../data/initialData';
import { useBooking } from '../context/BookingContext';

export function BookingPolicySection({ navigateTo }) {
  const { selectPackage } = useBooking();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPolicyId, setExpandedPolicyId] = useState('policy-payment');

  const policyIcons = {
    Film: Film,
    Camera: Camera,
    Edit3: Edit3,
    HardDrive: HardDrive,
    MapPin: MapPin,
    Clock: Clock,
    AlertCircle: AlertCircle,
    CreditCard: CreditCard,
    Calendar: Calendar,
    XCircle: XCircle,
    RefreshCw: RefreshCw,
    CloudRain: CloudRain,
    Send: Send,
    ShieldAlert: ShieldAlert,
    Lock: Lock
  };

  const categories = [
    { id: 'all', label: 'All Policies' },
    { id: 'payment', label: 'Payment & 50% Advance' },
    { id: 'deliverables', label: 'Reels, Portraits & Turnaround' },
    { id: 'rules', label: 'Shooting Windows & Revisions' },
    { id: 'scope', label: 'Exclusions & Scope' }
  ];

  const getPolicyCategory = (id) => {
    if (id.includes('payment') || id.includes('cancellation') || id.includes('reservation') || id.includes('rescheduling')) return 'payment';
    if (id.includes('reel') || id.includes('portrait') || id.includes('delivery') || id.includes('raw')) return 'deliverables';
    if (id.includes('revision') || id.includes('shooting-time') || id.includes('overtime') || id.includes('location') || id.includes('weather')) return 'rules';
    return 'scope';
  };

  const filteredPolicies = BOOKING_POLICIES.filter((policy) => {
    const matchesCategory = activeCategory === 'all' || getPolicyCategory(policy.id) === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectPackageFromGuide = (packageId) => {
    const pkg = INITIAL_PACKAGES.find((p) => p.id === packageId);
    if (pkg) {
      selectPackage(pkg);
      if (navigateTo) navigateTo('book');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="policy-section" style={{ padding: '3.5rem 0', backgroundColor: '#1A0008', position: 'relative' }}>
      <div className="container">

        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.5rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem'
            }}
          >
            OFFICIAL BOOKING POLICY & GUIDELINES
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.6rem)',
              lineHeight: 1.15,
              marginBottom: '0.7rem',
              color: '#FFF'
            }}
          >
            CLEAR TERMS. <br />
            <span className="gold-gradient-text">Zero Surprises. Guaranteed Standards.</span>
          </h2>
          <p
            style={{
              fontSize: '0.94rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              maxWidth: '640px',
              margin: '0 auto'
            }}
          >
            Professional mobile content creation for creators, brands, businesses, and weddings.
            Review our shoot deliverables, 50% advance date reservation, turnaround times, and revision guidelines.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 1. SIMPLE PACKAGE GUIDE (QUICK DECISION CARDS) */}
        {/* ============================================================ */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
            <span className="gold-chip">WHICH PACKAGE FITS YOU BEST?</span>
            <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginTop: '0.4rem' }}>
              Simple Package Guide
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            {SIMPLE_PACKAGE_GUIDE.map((guide, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--gold-border)',
                  background: 'rgba(34, 0, 11, 0.75)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.5rem', minHeight: '38px' }}>
                    {guide.question}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--gold-bright)', marginBottom: '0.2rem' }}>
                    {guide.recommendation}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#FFF', marginBottom: '0.4rem' }}>
                    {guide.price}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.1rem' }}>
                    {guide.desc}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPackageFromGuide(guide.packageId)}
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.8rem',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>Select {guide.recommendation}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. COMPLETE COMPARISON MATRIX TABLE */}
        {/* ============================================================ */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <span className="gold-chip">PACKAGE COMPARISON</span>
            <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginTop: '0.4rem' }}>
              Deliverables & Turnaround Matrix
            </h3>
          </div>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gold-border)',
              background: 'rgba(28, 0, 9, 0.9)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                minWidth: '680px',
                fontSize: '0.88rem'
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gold-border)', background: 'rgba(229, 173, 54, 0.08)' }}>
                  <th style={{ padding: '0.9rem 1.2rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Package</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Investment</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Coverage</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Reels</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Portraits</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Delivery</th>
                  <th style={{ padding: '0.9rem 1.2rem', color: 'var(--gold-primary)', fontWeight: '800' }}>Best For</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {PACKAGE_COMPARISON_TABLE.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: '1px solid rgba(229, 173, 54, 0.1)',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <td style={{ padding: '1rem 1.2rem', fontWeight: '800', color: '#FFF', whiteSpace: 'nowrap' }}>
                      <span style={{ marginRight: '0.5rem' }}>{row.icon}</span>
                      {row.name}
                    </td>
                    <td style={{ padding: '1rem 1rem', fontWeight: '900', color: 'var(--gold-bright)' }}>
                      {row.priceLabel}
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#FAF0E6' }}>{row.coverage}</td>
                    <td style={{ padding: '1rem 1rem', color: '#FAF0E6', fontWeight: '700' }}>{row.reels}</td>
                    <td style={{ padding: '1rem 1rem', color: row.portraits === '—' ? 'var(--text-dim)' : 'var(--gold-primary)' }}>
                      {row.portraits}
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#4ADE80', fontWeight: '600' }}>{row.delivery}</td>
                    <td style={{ padding: '1rem 1.2rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      {row.bestFor}
                    </td>
                    <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleSelectPackageFromGuide(row.id)}
                        className="btn-primary"
                        style={{
                          padding: '0.4rem 0.85rem',
                          fontSize: '0.75rem',
                          letterSpacing: '0.04em'
                        }}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. SEARCH & CATEGORY FILTER FOR POLICIES */}
        {/* ============================================================ */}
        <div style={{ marginBottom: '1.6rem' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.2rem'
            }}
          >
            {/* Category tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--grad-gold)' : 'rgba(56, 2, 20, 0.6)',
                      color: isActive ? '#1A0008' : 'var(--text-primary)',
                      fontWeight: '700',
                      fontSize: '0.78rem',
                      border: `1px solid ${isActive ? 'transparent' : 'var(--gold-border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Policy Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(34, 0, 11, 0.8)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                minWidth: '220px'
              }}
            >
              <Search size={14} color="var(--gold-primary)" />
              <input
                type="text"
                placeholder="Search policy rule..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '0.82rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. EXPANDABLE POLICY ACCORDION CARDS */}
        {/* ============================================================ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {filteredPolicies.map((policy) => {
            const isExpanded = expandedPolicyId === policy.id;
            const IconComponent = policyIcons[policy.icon] || HelpCircle;

            return (
              <div
                key={policy.id}
                className="glass-card"
                style={{
                  padding: 0,
                  borderRadius: '12px',
                  border: isExpanded ? '1px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                  backgroundColor: isExpanded ? 'rgba(45, 0, 15, 0.95)' : 'rgba(28, 0, 9, 0.75)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease'
                }}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => setExpandedPolicyId(isExpanded ? null : policy.id)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: isExpanded ? 'var(--grad-gold)' : 'rgba(229, 173, 54, 0.12)',
                        color: isExpanded ? '#1A0008' : 'var(--gold-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={17} strokeWidth={2.4} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: isExpanded ? 'var(--gold-bright)' : '#FFF', marginBottom: '0.2rem' }}>
                        {policy.title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                        {policy.summary}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--gold-primary)',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0.9rem 1.4rem 1.3rem 3.8rem',
                      borderTop: '1px solid rgba(229, 173, 54, 0.12)',
                      background: 'rgba(20, 0, 6, 0.6)'
                    }}
                  >
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {policy.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          style={{
                            fontSize: '0.85rem',
                            color: '#FAF0E6',
                            lineHeight: '1.55',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.6rem'
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--gold-primary)',
                              marginTop: '0.45rem',
                              flexShrink: 0
                            }}
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 5. SUMMARY BANNER: 50% ADVANCE & SCOPE REASSURANCE */}
        {/* ============================================================ */}
        <div
          style={{
            marginTop: '3rem',
            padding: '1.8rem 2rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(75, 4, 28, 0.95), rgba(35, 0, 12, 0.95))',
            border: '2px solid var(--gold-primary)',
            boxShadow: 'var(--shadow-gold)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <CreditCard size={18} color="var(--gold-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.12em', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
                50% ADVANCE DATE RESERVATION
              </span>
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '0.4rem' }}>
              Reserve Your Date with Complete Confidence.
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
              All slots are locked on a first-come advance payment basis. Every package comes with 1 minor revision per reel, professional color grading, and guaranteed delivery turnaround.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                if (navigateTo) navigateTo('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.86rem' }}
            >
              <Sparkles size={15} />
              <span>BOOK A SHOOT NOW</span>
            </button>
            <button
              onClick={() => {
                const msg = encodeURIComponent('Hello Vela Shootz! I have a question regarding your shoot packages and booking policy.');
                window.open(`https://wa.me/918978270208?text=${msg}`, '_blank');
              }}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.86rem' }}
            >
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

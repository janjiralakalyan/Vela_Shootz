import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  DollarSign,
  Briefcase,
  Users,
  Film,
  Tag,
  LogOut,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import {
  getBookings,
  saveBookings,
  updateBookingStatus,
  getEnquiries,
  updateEnquiryStatus,
  getPackages,
  savePackages,
  updatePackage,
  getPortfolio,
  addPortfolioItem,
  deletePortfolioItem,
  getPromotions,
  addPromotion,
  deletePromotion,
  getEvents,
  getBlockedSlots,
  toggleSlotBlock
} from '../../data/storage';
import { TIME_SLOTS } from '../../data/initialData';

export function AdminDashboard({ navigateTo }) {
  const { adminUser, logout } = useAuth();
  const { refreshPackages } = useBooking();

  const [activeTab, setActiveTab] = useState('overview'); // overview, bookings, calendar, pricing, crm, portfolio, promotions
  const [bookingsList, setBookingsList] = useState(getBookings());
  const [enquiriesList, setEnquiriesList] = useState(getEnquiries());
  const [packagesList, setPackagesList] = useState(getPackages());
  const [portfolioList, setPortfolioList] = useState(getPortfolio());
  const [promotionsList, setPromotionsList] = useState(getPromotions());
  const [blockedSlotsList, setBlockedSlotsList] = useState(getBlockedSlots());

  // Editing state for pricing
  const [editingPkg, setEditingPkg] = useState(null);

  // Calendar slot blocker date
  const [calendarDate, setCalendarDate] = useState(new Date().toISOString().split('T')[0]);

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigateTo('home');
  };

  // Status changer for bookings
  const handleStatusChange = (bookingId, newStatus) => {
    const updated = updateBookingStatus(bookingId, newStatus);
    setBookingsList([...updated]);
  };

  // Team assign for bookings
  const handleTeamAssign = (bookingId, teamName) => {
    const updated = updateBookingStatus(bookingId, undefined, { assignedTo: teamName });
    setBookingsList([...updated]);
  };

  // Payment status changer
  const handlePaymentChange = (bookingId, newPaymentStatus) => {
    const updated = updateBookingStatus(bookingId, undefined, { paymentStatus: newPaymentStatus });
    setBookingsList([...updated]);
  };

  // Package edit save
  const handleSavePackage = (e) => {
    e.preventDefault();
    if (!editingPkg) return;
    const updated = updatePackage(editingPkg);
    setPackagesList([...updated]);
    refreshPackages();
    setEditingPkg(null);
    alert('Package updated successfully! Live website and booking wizard updated.');
  };

  // Toggle slot block
  const handleSlotToggle = (slot) => {
    const updated = toggleSlotBlock(calendarDate, slot, 'Admin Manual Block');
    setBlockedSlotsList([...updated]);
  };

  // CRM status change
  const handleCrmStatusChange = (enqId, status) => {
    const updated = updateEnquiryStatus(enqId, status);
    setEnquiriesList([...updated]);
  };

  // KPI Calculations
  const totalRevenue = bookingsList
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const confirmedCount = bookingsList.filter(b => b.status !== 'Cancelled').length;
  const newEnquiriesCount = enquiriesList.filter(e => e.status === 'New').length;

  return (
    <div style={{ minHeight: '90vh', padding: '1.5rem 0 5rem 0' }}>
      <div className="container-wide">
        
        {/* ADMIN TOP BAR */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--gold-border)',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="gold-chip">STUDIO PORTAL</span>
              <span style={{ fontSize: '0.8rem', color: '#4ADE80' }}>● LOGGED IN ({adminUser?.email})</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '0.3rem' }}>
              Vela Shootz Admin Suite
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => navigateTo('home')}
              className="btn-secondary"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}
            >
              Public Website
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(231, 76, 60, 0.15)',
                color: '#FF6B6B',
                border: '1px solid rgba(231, 76, 60, 0.4)',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1.2rem',
                fontSize: '0.82rem',
                fontWeight: '700'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '2.5rem',
            background: 'rgba(34, 0, 11, 0.6)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--gold-border)'
          }}
        >
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
            { id: 'bookings', label: `Bookings (${bookingsList.length})`, icon: CalendarCheck },
            { id: 'calendar', label: 'Calendar & Slots', icon: Calendar },
            { id: 'pricing', label: 'Packages & Pricing', icon: DollarSign },
            { id: 'crm', label: `Enquiries CRM (${newEnquiriesCount} New)`, icon: Users },
            { id: 'portfolio', label: 'Portfolio CMS', icon: Film },
            { id: 'promotions', label: 'Promotions', icon: Tag }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.2rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--grad-gold)' : 'transparent',
                  color: isActive ? '#1A0008' : '#FAF0E6',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '0.85rem'
                }}
              >
                <tab.icon size={15} color={isActive ? '#1A0008' : 'var(--gold-primary)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI STAT CARDS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}
            >
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Total Bookings Revenue</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--gold-bright)', marginTop: '0.2rem' }}>
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4ADE80', marginTop: '0.4rem' }}>
                  {confirmedCount} confirmed events
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Active Shoots</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFF', marginTop: '0.2rem' }}>
                  {bookingsList.filter(b => b.status === 'Confirmed' || b.status === 'Scheduled' || b.status === 'Team Assigned').length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', marginTop: '0.4rem' }}>
                  Upcoming in queue
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>In Rapid Editing</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFF', marginTop: '0.2rem' }}>
                  {bookingsList.filter(b => b.status === 'Editing' || b.status === 'Shoot Completed').length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', marginTop: '0.4rem' }}>
                  Reel turnaround active
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Pending Custom Enquiries</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFF', marginTop: '0.2rem' }}>
                  {newEnquiriesCount}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#E74C3C', marginTop: '0.4rem' }}>
                  Requires follow up
                </div>
              </div>
            </div>

            {/* RECENT BOOKINGS SUMMARY */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
                  View All &rarr;
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--text-gold)' }}>
                      <th style={{ padding: '0.8rem' }}>REF ID</th>
                      <th style={{ padding: '0.8rem' }}>CLIENT</th>
                      <th style={{ padding: '0.8rem' }}>PACKAGE</th>
                      <th style={{ padding: '0.8rem' }}>DATE / SLOT</th>
                      <th style={{ padding: '0.8rem' }}>AMOUNT</th>
                      <th style={{ padding: '0.8rem' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.slice(0, 5).map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid rgba(229, 173, 54, 0.08)' }}>
                        <td style={{ padding: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--gold-bright)' }}>
                          {b.bookingReference}
                        </td>
                        <td style={{ padding: '0.8rem', color: '#FFF' }}>{b.customerName}</td>
                        <td style={{ padding: '0.8rem' }}>{b.packageName}</td>
                        <td style={{ padding: '0.8rem' }}>{b.date} • {b.startTime}</td>
                        <td style={{ padding: '0.8rem', fontWeight: '700' }}>₹{b.totalAmount.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.8rem' }}>
                          <span className="gold-chip" style={{ fontSize: '0.72rem' }}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT (SECTION 32) */}
        {activeTab === 'bookings' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '1.5rem' }}>
              Booking Management & Status Controller
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--text-gold)' }}>
                    <th style={{ padding: '0.8rem' }}>REF ID</th>
                    <th style={{ padding: '0.8rem' }}>CLIENT DETAILS</th>
                    <th style={{ padding: '0.8rem' }}>PACKAGE & EVENT</th>
                    <th style={{ padding: '0.8rem' }}>DATE & VENUE</th>
                    <th style={{ padding: '0.8rem' }}>ASSIGNED CREW</th>
                    <th style={{ padding: '0.8rem' }}>PAYMENT</th>
                    <th style={{ padding: '0.8rem' }}>MILESTONE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsList.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(229, 173, 54, 0.1)', verticalAlign: 'top' }}>
                      <td style={{ padding: '1rem 0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--gold-bright)' }}>
                        {b.bookingReference}
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: '#FFF' }}>{b.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{b.email}</div>
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--gold-primary)' }}>{b.packageName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.eventType}</div>
                        {b.requirements && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontStyle: 'italic', maxWidth: '200px' }}>
                            "{b.requirements}"
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: '#FFF' }}>{b.date} ({b.startTime})</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.location}</div>
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <select
                          value={b.assignedTo || 'Unassigned'}
                          onChange={(e) => handleTeamAssign(b.id, e.target.value)}
                          style={{
                            background: 'rgba(34, 0, 11, 0.9)',
                            border: '1px solid var(--gold-border)',
                            color: '#FFF',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem'
                          }}
                        >
                          <option value="Unassigned">Assign Shooter...</option>
                          <option value="Aryan (Lead Shooter)">Aryan (Lead Shooter)</option>
                          <option value="Kavya (Mobile Cam)">Kavya (Mobile Cam)</option>
                          <option value="Rohan (Rapid Editor)">Rohan (Rapid Editor)</option>
                          <option value="Sameer (Gimbal Spec)">Sameer (Gimbal Spec)</option>
                        </select>
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: '#FFF', marginBottom: '0.3rem' }}>
                          ₹{b.totalAmount?.toLocaleString('en-IN')}
                        </div>
                        <select
                          value={b.paymentStatus || 'Pending'}
                          onChange={(e) => handlePaymentChange(b.id, e.target.value)}
                          style={{
                            background: 'rgba(34, 0, 11, 0.9)',
                            border: '1px solid var(--gold-border)',
                            color: b.paymentStatus === 'Full Paid' ? '#4ADE80' : 'var(--gold-primary)',
                            padding: '0.3rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.76rem'
                          }}
                        >
                          <option value="Advance Received">Advance Received</option>
                          <option value="Full Paid">Full Paid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          style={{
                            background: 'rgba(34, 0, 11, 0.9)',
                            border: '1px solid var(--gold-border)',
                            color: '#FFF',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '700',
                            fontSize: '0.82rem'
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Team Assigned">Team Assigned</option>
                          <option value="Shoot Completed">Shoot Completed</option>
                          <option value="Editing">Editing</option>
                          <option value="Reels Ready">Reels Ready</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR & SLOT BLOCKER (SECTION 32) */}
        {activeTab === 'calendar' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '0.4rem' }}>
              Shoot Calendar & Slot Blocker
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Inspect scheduled shoots by date, or manually lock out slots so clients cannot book them.
            </p>

            <div style={{ maxWidth: '300px', marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                SELECT DATE TO VIEW & MANAGE SLOTS
              </label>
              <input
                type="date"
                value={calendarDate}
                onChange={(e) => setCalendarDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34, 0, 11, 0.9)',
                  border: '1px solid var(--gold-border)',
                  color: '#FFF',
                  fontSize: '1rem',
                  fontWeight: '700'
                }}
              />
            </div>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-primary)', marginBottom: '1rem' }}>
              Slots for {calendarDate}:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {TIME_SLOTS.map((slot) => {
                const bookingForSlot = bookingsList.find(b => b.date === calendarDate && b.startTime === slot && b.status !== 'Cancelled');
                const isManuallyBlocked = blockedSlotsList.some(item => item.date === calendarDate && item.slot === slot);

                return (
                  <div
                    key={slot}
                    style={{
                      padding: '1.2rem',
                      borderRadius: 'var(--radius-md)',
                      background: bookingForSlot
                        ? 'rgba(46, 204, 113, 0.12)'
                        : isManuallyBlocked
                        ? 'rgba(231, 76, 60, 0.12)'
                        : 'rgba(34, 0, 11, 0.6)',
                      border: bookingForSlot
                        ? '1px solid #2ECC71'
                        : isManuallyBlocked
                        ? '1px solid #E74C3C'
                        : '1px solid var(--gold-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.8rem'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF' }}>{slot}</div>
                      <div style={{ fontSize: '0.78rem', color: bookingForSlot ? '#4ADE80' : isManuallyBlocked ? '#FF6B6B' : 'var(--gold-primary)', fontWeight: '700' }}>
                        {bookingForSlot ? `BOOKED (${bookingForSlot.bookingReference})` : isManuallyBlocked ? 'LOCKED / BLOCKED' : 'AVAILABLE'}
                      </div>
                      {bookingForSlot && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                          Client: {bookingForSlot.customerName}
                        </div>
                      )}
                    </div>

                    {!bookingForSlot && (
                      <button
                        onClick={() => handleSlotToggle(slot)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: isManuallyBlocked ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)',
                          color: isManuallyBlocked ? '#4ADE80' : '#FF6B6B',
                          border: `1px solid ${isManuallyBlocked ? '#4ADE80' : '#FF6B6B'}`
                        }}
                      >
                        {isManuallyBlocked ? 'Unlock Slot' : 'Block Slot'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: PACKAGES & PRICING MANAGER (SECTION 34 - NOT HARDCODED!) */}
        {activeTab === 'pricing' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '0.2rem' }}>
                  Dynamic Package & Pricing Manager
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Edit rates, hours, reel counts, and badges without touching code. Changes apply immediately to website and booking engine.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {packagesList.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    padding: '1.6rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(34, 0, 11, 0.6)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span className="gold-chip">{pkg.categoryName}</span>
                      {pkg.badge && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--gold-bright)', fontWeight: '800' }}>
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.4rem' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--gold-bright)', marginBottom: '0.6rem' }}>
                      {pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : 'Custom Pricing'}
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                      {pkg.description}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      Hours: {pkg.coverageHours} • Reels: {pkg.reelsCount}
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingPkg({ ...pkg })}
                    className="btn-secondary"
                    style={{ marginTop: '1.2rem', padding: '0.6rem', width: '100%', fontSize: '0.82rem' }}
                  >
                    <Edit2 size={14} />
                    <span>Edit Package & Rate</span>
                  </button>
                </div>
              ))}
            </div>

            {/* EDIT PACKAGE MODAL */}
            {editingPkg && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 3000,
                  backgroundColor: 'rgba(12, 0, 4, 0.88)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem'
                }}
              >
                <div
                  className="glass-card"
                  style={{ width: '100%', maxWidth: '540px', padding: '2.5rem', border: '1px solid var(--gold-border-hover)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>Edit Package: {editingPkg.name}</h3>
                    <button onClick={() => setEditingPkg(null)} style={{ color: 'var(--text-muted)' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSavePackage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                        PACKAGE NAME
                      </label>
                      <input
                        type="text"
                        value={editingPkg.name}
                        onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                      />
                    </div>

                    {!editingPkg.isCustom && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                            PRICE (₹)
                          </label>
                          <input
                            type="number"
                            value={editingPkg.price || 0}
                            onChange={(e) => setEditingPkg({ ...editingPkg, price: parseInt(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                            COVERAGE HOURS
                          </label>
                          <input
                            type="number"
                            value={editingPkg.coverageHours || 2}
                            onChange={(e) => setEditingPkg({ ...editingPkg, coverageHours: parseInt(e.target.value) || 1 })}
                            style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                          />
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                          REELS COUNT
                        </label>
                        <input
                          type="text"
                          value={editingPkg.reelsCount || ''}
                          onChange={(e) => setEditingPkg({ ...editingPkg, reelsCount: e.target.value })}
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                          BADGE TEXT
                        </label>
                        <input
                          type="text"
                          value={editingPkg.badge || ''}
                          onChange={(e) => setEditingPkg({ ...editingPkg, badge: e.target.value })}
                          placeholder="e.g. MOST POPULAR"
                          style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.3rem' }}>
                        DESCRIPTION
                      </label>
                      <textarea
                        rows={2}
                        value={editingPkg.description}
                        onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', background: 'rgba(34, 0, 11, 0.8)', border: '1px solid var(--gold-border)', color: '#FFF' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                      <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.8rem' }}>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </button>
                      <button type="button" onClick={() => setEditingPkg(null)} className="btn-secondary" style={{ padding: '0.8rem' }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CRM ENQUIRIES (SECTION 37) */}
        {activeTab === 'crm' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '1.5rem' }}>
              Custom Package Enquiry Pipeline (CRM)
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--text-gold)' }}>
                    <th style={{ padding: '0.8rem' }}>CLIENT</th>
                    <th style={{ padding: '0.8rem' }}>EVENT & DATE</th>
                    <th style={{ padding: '0.8rem' }}>REQUIREMENTS</th>
                    <th style={{ padding: '0.8rem' }}>BUDGET</th>
                    <th style={{ padding: '0.8rem' }}>PIPELINE STAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiriesList.map((enq) => (
                    <tr key={enq.id} style={{ borderBottom: '1px solid rgba(229, 173, 54, 0.1)', verticalAlign: 'top' }}>
                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: '#FFF' }}>{enq.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enq.phone}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{enq.email}</div>
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--gold-primary)' }}>{enq.eventType}</div>
                        <div style={{ fontSize: '0.78rem', color: '#FFF' }}>Date: {enq.eventDate || 'TBD'}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Venue: {enq.location || 'Local'}</div>
                      </td>

                      <td style={{ padding: '1rem 0.8rem', maxWidth: '280px' }}>
                        <div style={{ fontSize: '0.82rem', color: '#FAF0E6' }}>{enq.specialRequirements || 'Custom setup'}</div>
                        {enq.requiredReels && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--gold-bright)', marginTop: '0.2rem' }}>
                            Deliverables: {enq.requiredReels} • {enq.requiredPortraits}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '1rem 0.8rem', fontWeight: '700', color: 'var(--gold-bright)' }}>
                        {enq.budgetRange || 'Flexible'}
                      </td>

                      <td style={{ padding: '1rem 0.8rem' }}>
                        <select
                          value={enq.status || 'New'}
                          onChange={(e) => handleCrmStatusChange(enq.id, e.target.value)}
                          style={{
                            background: 'rgba(34, 0, 11, 0.9)',
                            border: '1px solid var(--gold-border)',
                            color: enq.status === 'Confirmed' ? '#4ADE80' : enq.status === 'New' ? 'var(--gold-bright)' : '#FFF',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '700',
                            fontSize: '0.82rem'
                          }}
                        >
                          <option value="New">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Lost">Lost</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PORTFOLIO CMS (SECTION 33) */}
        {activeTab === 'portfolio' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#FFF' }}>
                Portfolio Projects Manager
              </h2>
              <button
                onClick={() => {
                  const title = prompt('Project Title:');
                  if (!title) return;
                  const cat = prompt('Category (Weddings, Events, Business, Instant Reels):') || 'Events';
                  const updated = addPortfolioItem({
                    title,
                    category: cat,
                    categorySlug: cat.toLowerCase().replace(/\s+/g, '-'),
                    date: new Date().toISOString().split('T')[0],
                    location: 'Local Venue',
                    services: 'Mobile Instant Reels',
                    reelsCount: 3,
                    portraitsCount: 10,
                    image: '/assets/hero-cinematic.jpg',
                    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-party-crowd-raising-their-hands-in-a-concert-40898-large.mp4',
                    featured: true,
                    highlight: 'Instant mobile reels captured and delivered same day.'
                  });
                  setPortfolioList([...updated]);
                }}
                className="btn-primary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                <Plus size={15} />
                <span>Add Project</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {portfolioList.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: '1.2rem',
                    background: 'rgba(34, 0, 11, 0.6)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span className="gold-chip" style={{ fontSize: '0.7rem' }}>{p.category}</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '0.5rem 0' }}>{p.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.location} • {p.date}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-gold)', marginTop: '0.4rem' }}>
                      {p.reelsCount} Reels • {p.portraitsCount} Portraits
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${p.title}"?`)) {
                        const updated = deletePortfolioItem(p.id);
                        setPortfolioList([...updated]);
                      }
                    }}
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#FF6B6B',
                      fontSize: '0.78rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Delete Project</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PROMOTIONS & EVENTS (SECTIONS 35, 36) */}
        {activeTab === 'promotions' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#FFF' }}>
                Active Campaign Promotions
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {promotionsList.map((promo) => (
                <div
                  key={promo.id}
                  style={{
                    padding: '1.4rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(34, 0, 11, 0.6)',
                    border: '1px solid var(--gold-border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span className="gold-chip">{promo.category}</span>
                    <span style={{ color: '#4ADE80', fontWeight: '800', fontSize: '0.8rem' }}>{promo.discount}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.4rem' }}>{promo.title}</h3>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--gold-bright)' }}>
                    ₹{promo.finalPrice.toLocaleString('en-IN')}{' '}
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                      ₹{promo.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.6rem' }}>
                    Valid until: {promo.validUntil?.split('T')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

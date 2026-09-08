import React, { useState } from 'react';
import {
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Upload,
  Link2,
  Phone,
  Mail,
  User,
  MapPin,
  CheckCircle2,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../context/BookingContext';
import { TIME_SLOTS } from '../data/initialData';
import { isSlotBookedOrBlocked, createBooking } from '../data/storage';

export function BookingWizardPage({ navigateTo }) {
  const {
    packages,
    selectedCategory,
    setSelectedCategory,
    selectedPackage,
    selectPackage,
    selectedAddons,
    toggleAddon,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    appliedPromotion,
    eventDetails,
    setEventDetails,
    references,
    setReferences,
    calculateTotal,
    resetBooking
  } = useBooking();

  // Wizard current step: 1 through 8
  const [currentStep, setCurrentStep] = useState(selectedPackage ? 3 : 1);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [validationError, setValidationError] = useState('');

  const categories = [
    { id: 'on-spot', label: 'On-Spot Reels' },
    { id: 'business', label: 'Business' },
    { id: 'weddings', label: 'Weddings' }
  ];

  const filteredPackages = packages.filter(
    (p) => !p.isCustom && p.category === selectedCategory
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
    setValidationError('');
  };

  const handleTimeSelect = (slot) => {
    if (!selectedDate) {
      setValidationError('Please choose an event date first.');
      return;
    }
    if (isSlotBookedOrBlocked(selectedDate, slot)) {
      return;
    }
    setSelectedTime(slot);
    setValidationError('');
  };

  const handleInputChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleRefChange = (e) => {
    setReferences({ ...references, [e.target.name]: e.target.value });
  };

  const validateCurrentStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      return true;
    }
    if (currentStep === 2) {
      if (!selectedPackage) {
        setValidationError('Please choose a package to proceed.');
        return false;
      }
      return true;
    }
    if (currentStep === 3) {
      if (!selectedDate) {
        setValidationError('Please select an event date.');
        return false;
      }
      return true;
    }
    if (currentStep === 4) {
      if (!selectedTime) {
        setValidationError('Please select an available time slot.');
        return false;
      }
      return true;
    }
    if (currentStep === 5) {
      if (!eventDetails.customerName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!eventDetails.phone.trim() || eventDetails.phone.length < 8) {
        setValidationError('Please enter a valid phone number.');
        return false;
      }
      if (!eventDetails.email.trim() || !eventDetails.email.includes('@')) {
        setValidationError('Please enter a valid email address.');
        return false;
      }
      if (!eventDetails.location.trim()) {
        setValidationError('Please provide the event venue / location.');
        return false;
      }
      return true;
    }
    return true;
  };

  const goNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 8));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setValidationError('');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalConfirm = () => {
    const totalAmount = calculateTotal();
    const newBooking = createBooking({
      customerName: eventDetails.customerName,
      phone: eventDetails.phone,
      email: eventDetails.email,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      eventType: eventDetails.eventType,
      date: selectedDate,
      startTime: selectedTime,
      duration: `${selectedPackage.coverageHours} Hours`,
      location: eventDetails.location,
      peopleCount: eventDetails.peopleCount,
      instagram: eventDetails.instagram,
      requirements: eventDetails.requirements,
      referenceLinks: references.moodboardUrl || references.referenceReelUrl || '',
      addons: selectedAddons,
      appliedPromotion: appliedPromotion ? appliedPromotion.title : null,
      totalAmount
    });

    setConfirmedBooking(newBooking);
    setCurrentStep(8);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E5AD36', '#FFF0BD', '#F7CA64', '#FAF0E6']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleWhatsAppBookingNotification = () => {
    if (!confirmedBooking) return;
    const msg = `Hello Vela Shootz! I have reserved a booking on your website.\n\n*Reference ID:* ${confirmedBooking.bookingReference}\n*Name:* ${confirmedBooking.customerName}\n*Package:* ${confirmedBooking.packageName}\n*Date:* ${confirmedBooking.date}\n*Slot:* ${confirmedBooking.startTime}\n*Venue:* ${confirmedBooking.location}\n*Total:* ₹${confirmedBooking.totalAmount.toLocaleString('en-IN')}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const stepLabels = [
    'Category',
    'Package',
    'Date',
    'Time Slot',
    'Details',
    'References',
    'Summary',
    'Confirmation'
  ];

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
      <div className="container-narrow">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">SLOT RESERVATION SYSTEM</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFF', marginBottom: '0.6rem' }}>
            BOOK YOUR <span className="gold-gradient-text">CREATIVE SHOOT.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Fast, transparent, and confirmed in minutes. No endless email chains.
          </p>
        </div>

        {/* PROGRESS STEPPER (SECTION 51 REQUIREMENT) */}
        {currentStep < 8 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              overflowX: 'auto',
              paddingBottom: '0.8rem'
            }}
          >
            {stepLabels.slice(0, 7).map((label, idx) => {
              const stepNumber = idx + 1;
              const isPast = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem',
                    flexShrink: 0,
                    cursor: isPast ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (isPast) setCurrentStep(stepNumber);
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCurrent
                        ? 'var(--grad-gold)'
                        : isPast
                        ? 'rgba(46, 204, 113, 0.2)'
                        : 'rgba(56, 2, 20, 0.6)',
                      color: isCurrent ? '#1A0008' : isPast ? '#2ECC71' : 'var(--text-dim)',
                      border: `1px solid ${isCurrent ? 'transparent' : isPast ? '#2ECC71' : 'var(--gold-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.82rem',
                      fontWeight: '800'
                    }}
                  >
                    {isPast ? <Check size={16} strokeWidth={3} /> : stepNumber}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: isCurrent ? '700' : '500',
                      color: isCurrent ? 'var(--gold-primary)' : isPast ? '#FFF' : 'var(--text-dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* VALIDATION ERROR ALERT */}
        {validationError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid rgba(231, 76, 60, 0.4)',
              color: '#FF6B6B',
              borderRadius: 'var(--radius-md)',
              padding: '0.8rem 1.2rem',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}
          >
            <AlertCircle size={18} />
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP CONTENT CONTAINER */}
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            border: '1px solid var(--gold-border-hover)'
          }}
        >
          {/* STEP 1: SELECT CATEGORY */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                Step 1 — Choose Shoot Category
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                What kind of moment are we capturing?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        // reset selected package if it belongs to different category
                        if (selectedPackage && selectedPackage.category !== cat.id) {
                          selectPackage(null);
                        }
                      }}
                      style={{
                        padding: '2rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected
                          ? 'linear-gradient(145deg, rgba(80, 4, 30, 0.95), rgba(40, 0, 14, 0.95))'
                          : 'rgba(40, 0, 14, 0.5)',
                        border: isSelected ? '2px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                        color: isSelected ? 'var(--gold-primary)' : '#FFF',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Sparkles size={28} color={isSelected ? 'var(--gold-bright)' : 'var(--gold-muted)'} />
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '0.04em' }}>
                        {cat.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PACKAGE */}
          {currentStep === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.2rem' }}>
                    Step 2 — Select Your Package
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Showing {categories.find((c) => c.id === selectedCategory)?.label} options:
                  </p>
                </div>
                {appliedPromotion && (
                  <span className="gold-chip">Promo Applied: {appliedPromotion.discount}</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
                {filteredPackages.map((pkg) => {
                  const isSelected = selectedPackage && selectedPackage.id === pkg.id;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => selectPackage(pkg)}
                      style={{
                        padding: '1.6rem 1.8rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected
                          ? 'linear-gradient(145deg, rgba(85, 4, 32, 0.95), rgba(45, 0, 16, 0.95))'
                          : 'rgba(35, 0, 12, 0.6)',
                        border: isSelected ? '2px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.2rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 25px rgba(229, 173, 54, 0.2)' : 'none'
                      }}
                    >
                      <div style={{ maxWidth: '460px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFF' }}>
                            {pkg.name}
                          </span>
                          {pkg.badge && <span className="gold-chip">{pkg.badge}</span>}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                          {pkg.description}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)' }}>
                          {pkg.coverageHours} Hours Coverage • {pkg.reelsCount} Polished Reels
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div>
                          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF' }}>
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Base Deliverable</div>
                        </div>

                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--gold-primary)' : 'var(--gold-border)'}`,
                            background: isSelected ? 'var(--gold-primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isSelected && <Check size={14} color="#1A0008" strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* OPTIONAL ADD-ONS */}
              {selectedPackage && selectedPackage.extraAddons && selectedPackage.extraAddons.length > 0 && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(229, 173, 54, 0.12)' }}>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--gold-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                    Available Package Add-Ons:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {selectedPackage.extraAddons.map((addon) => {
                      const isAdded = selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.6rem 1.1rem',
                            borderRadius: 'var(--radius-full)',
                            background: isAdded ? 'rgba(229, 173, 54, 0.2)' : 'rgba(34, 0, 11, 0.6)',
                            border: `1px solid ${isAdded ? 'var(--gold-primary)' : 'var(--gold-border)'}`,
                            color: isAdded ? 'var(--gold-bright)' : '#FAF0E6',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}
                        >
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '4px',
                              background: isAdded ? 'var(--gold-primary)' : 'transparent',
                              border: '1px solid var(--gold-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isAdded && <Check size={12} color="#1A0008" strokeWidth={3} />}
                          </div>
                          <span>
                            {addon.name} (+₹{addon.price.toLocaleString('en-IN')})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SELECT DATE */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                Step 3 — Pick Event Date
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                When is your event taking place?
              </p>

              <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.6rem' }}>
                  EVENT DATE
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.4rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(34, 0, 11, 0.9)',
                      border: '1px solid var(--gold-border)',
                      color: '#FFF',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '0.8rem' }}>
                  * All dates are subject to slot availability. For multi-day weddings, pick your Day 1 start date.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: TIME SLOT PICKER (UNAVAILABLE DISABLED) */}
          {currentStep === 4 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#FFF' }}>
                  Step 4 — Select Available Time Slot
                </h2>
                <span className="gold-chip">{selectedDate}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Choose when our mobile crew should arrive on site.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1rem'
                }}
              >
                {TIME_SLOTS.map((slot) => {
                  const isBooked = isSlotBookedOrBlocked(selectedDate, slot);
                  const isSelected = selectedTime === slot;

                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      onClick={() => handleTimeSelect(slot)}
                      style={{
                        padding: '1.2rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: isBooked
                          ? 'rgba(30, 0, 10, 0.3)'
                          : isSelected
                          ? 'var(--grad-gold)'
                          : 'rgba(40, 0, 14, 0.7)',
                        border: isBooked
                          ? '1px solid rgba(255, 255, 255, 0.05)'
                          : isSelected
                          ? '2px solid var(--gold-primary)'
                          : '1px solid var(--gold-border)',
                        color: isBooked
                          ? '#665045'
                          : isSelected
                          ? '#1A0008'
                          : '#FFF',
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease',
                        opacity: isBooked ? 0.45 : 1
                      }}
                    >
                      <Clock size={18} color={isSelected ? '#1A0008' : isBooked ? '#665045' : 'var(--gold-primary)'} />
                      <div style={{ fontSize: '1rem', fontWeight: '800' }}>{slot}</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>
                        {isBooked ? 'UNAVAILABLE' : isSelected ? 'SELECTED' : 'AVAILABLE'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedTime && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#4ADE80', fontSize: '0.9rem', fontWeight: '700' }}>
                  ✓ Slot {selectedTime} on {selectedDate} is available and held for your booking.
                </div>
              )}
            </div>
          )}

          {/* STEP 5: EVENT INFORMATION */}
          {currentStep === 5 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                Step 5 — Event & Contact Information
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Where and for whom are we creating this cinematic content?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={eventDetails.customerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Vikram Mehta"
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
                      PHONE / WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={eventDetails.phone}
                      onChange={handleInputChange}
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
                      value={eventDetails.email}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
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
                      INSTAGRAM HANDLE
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={eventDetails.instagram}
                      onChange={handleInputChange}
                      placeholder="@handle (to tag in deliveries)"
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

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                      EVENT VENUE / LOCATION *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={eventDetails.location}
                      onChange={handleInputChange}
                      placeholder="Full venue name, hall or address"
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
                      GUEST COUNT
                    </label>
                    <input
                      type="text"
                      name="peopleCount"
                      value={eventDetails.peopleCount}
                      onChange={handleInputChange}
                      placeholder="e.g. 50-100"
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
                    SPECIAL REQUIREMENTS / KEY MOMENTS TO FOCUS ON
                  </label>
                  <textarea
                    name="requirements"
                    rows={3}
                    value={eventDetails.requirements}
                    onChange={handleInputChange}
                    placeholder="Specific rituals, surprise entry song, guest of honor, lighting preferences..."
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
              </div>
            </div>
          )}

          {/* STEP 6: REFERENCES & MOODBOARD */}
          {currentStep === 6 && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                Step 6 — Creative References (Optional)
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Have an Instagram reel or aesthetic in mind? Share links so our editor matches your exact vibe.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
                    REFERENCE REEL LINK
                  </label>
                  <input
                    type="url"
                    name="referenceReelUrl"
                    value={references.referenceReelUrl}
                    onChange={handleRefChange}
                    placeholder="https://instagram.com/reel/..."
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
                    MOODBOARD / DRIVE LINK
                  </label>
                  <input
                    type="url"
                    name="moodboardUrl"
                    value={references.moodboardUrl}
                    onChange={handleRefChange}
                    placeholder="https://pinterest.com/... or Google Drive link"
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
                    ADDITIONAL NOTES FOR OUR TEAM
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={references.notes}
                    onChange={handleRefChange}
                    placeholder="Any music tracks, favorite song drops, or color styles you prefer..."
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
            </div>
          )}

          {/* STEP 7: SUMMARY & PRICE REVIEW */}
          {currentStep === 7 && selectedPackage && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '0.4rem' }}>
                Step 7 — Review Booking Summary
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Please check the slot, package, and venue details before confirming.
              </p>

              <div
                style={{
                  background: 'rgba(34, 0, 11, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--gold-border)',
                  padding: '1.8rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(229, 173, 54, 0.12)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Selected Package</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{selectedPackage.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gold-primary)' }}>
                      {selectedPackage.coverageHours} Hours • {selectedPackage.reelsCount} Reels
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Date & Slot</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{selectedDate}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gold-bright)' }}>{selectedTime}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Event Venue</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFF' }}>{eventDetails.location}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Contact: {eventDetails.phone}</div>
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{selectedPackage.name} Base Rate</span>
                    <span style={{ color: '#FFF', fontWeight: '700' }}>₹{selectedPackage.price.toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAddons.map((a) => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>+ Addon: {a.name}</span>
                      <span style={{ color: '#FFF', fontWeight: '700' }}>₹{a.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}

                  {appliedPromotion && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#4ADE80' }}>
                      <span>Promotion Discount ({appliedPromotion.discount})</span>
                      <span>- ₹{(appliedPromotion.originalPrice - appliedPromotion.finalPrice).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--gold-border)'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--gold-primary)' }}>
                      Total Investment
                    </span>
                    <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--gold-bright)' }}>
                      ₹{calculateTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={18} color="#4ADE80" />
                <span>Slot is reserved immediately upon confirmation. Advance payment recorded transparently.</span>
              </div>
            </div>
          )}

          {/* STEP 8: CONFIRMATION & LIVE TRACKER (SECTION 23) */}
          {currentStep === 8 && confirmedBooking && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'rgba(46, 204, 113, 0.18)',
                  color: '#2ECC71',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: '2px solid #2ECC71'
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <span className="gold-chip" style={{ marginBottom: '0.8rem' }}>SLOT CONFIRMED</span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.5rem' }}>
                Your Shoot is Booked!
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 1.8rem auto', lineHeight: '1.6' }}>
                We've locked your slot for <strong style={{ color: '#FFF' }}>{confirmedBooking.date} at {confirmedBooking.startTime}</strong>.
              </p>

              {/* BOOKING REFERENCE ID BOX */}
              <div
                style={{
                  maxWidth: '400px',
                  margin: '0 auto 2.5rem auto',
                  padding: '1.5rem',
                  background: 'rgba(34, 0, 11, 0.9)',
                  border: '1px solid var(--gold-border-hover)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-gold)'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  YOUR UNIQUE BOOKING REFERENCE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.8rem',
                    fontWeight: '900',
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.08em'
                  }}
                >
                  {confirmedBooking.bookingReference}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.6rem' }}>
                  Save this reference number to track live editing and reel delivery status.
                </p>
              </div>

              {/* CTAS: STATUS & WHATSAPP NOTIFICATION */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <button
                  onClick={() => {
                    navigateTo('booking-status');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-primary"
                  style={{ padding: '0.95rem 2rem' }}
                >
                  <span>CHECK BOOKING STATUS</span>
                </button>

                <button
                  onClick={handleWhatsAppBookingNotification}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'rgba(37, 211, 102, 0.2)',
                    color: '#25D366',
                    border: '1px solid rgba(37, 211, 102, 0.5)',
                    padding: '0.95rem 1.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '700',
                    fontSize: '0.92rem'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>SHARE CONFIRMATION ON WHATSAPP</span>
                </button>
              </div>
            </div>
          )}

          {/* WIZARD NAVIGATION CONTROLS (STEPS 1-7) */}
          {currentStep < 8 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(229, 173, 54, 0.12)'
              }}
            >
              {currentStep > 1 ? (
                <button
                  onClick={goBack}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}
                >
                  <ChevronLeft size={16} />
                  <span>BACK</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 7 ? (
                <button
                  onClick={goNext}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.8rem', fontSize: '0.88rem' }}
                >
                  <span>CONTINUE</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleFinalConfirm}
                  className="btn-primary"
                  style={{
                    padding: '0.95rem 2.4rem',
                    fontSize: '1rem',
                    boxShadow: '0 0 35px rgba(229, 173, 54, 0.5)'
                  }}
                >
                  <Sparkles size={18} />
                  <span>CONFIRM & LOCK SLOT</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

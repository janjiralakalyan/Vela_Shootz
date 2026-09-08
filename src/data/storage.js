// Storage management for Vela Shootz
// Handles reactive local storage persistence with initial seeds fallback

import {
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_EVENTS,
  INITIAL_PROMOTIONS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_BOOKINGS,
  INITIAL_ENQUIRIES,
  TIME_SLOTS
} from './initialData';

const STORAGE_KEYS = {
  PACKAGES: 'vs_packages_v1',
  PORTFOLIO: 'vs_portfolio_v1',
  EVENTS: 'vs_events_v1',
  PROMOTIONS: 'vs_promotions_v1',
  BOOKINGS: 'vs_bookings_v1',
  ENQUIRIES: 'vs_enquiries_v1',
  BLOCKED_SLOTS: 'vs_blocked_slots_v1',
  ADMIN_AUTH: 'vs_admin_auth_v1'
};

function getItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage getItem error:', e);
    return fallback;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage setItem error:', e);
  }
}

// PACKAGES & PRICING
export const getPackages = () => getItem(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);

export const savePackages = (packages) => setItem(STORAGE_KEYS.PACKAGES, packages);

export const updatePackage = (updatedPkg) => {
  const pkgs = getPackages().map(p => p.id === updatedPkg.id ? updatedPkg : p);
  savePackages(pkgs);
  return pkgs;
};

// PORTFOLIO
export const getPortfolio = () => getItem(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);

export const savePortfolio = (items) => setItem(STORAGE_KEYS.PORTFOLIO, items);

export const addPortfolioItem = (newItem) => {
  const current = getPortfolio();
  const updated = [{ ...newItem, id: 'proj-' + Date.now() }, ...current];
  savePortfolio(updated);
  return updated;
};

export const deletePortfolioItem = (id) => {
  const updated = getPortfolio().filter(p => p.id !== id);
  savePortfolio(updated);
  return updated;
};

// EVENTS
export const getEvents = () => getItem(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);

export const saveEvents = (events) => setItem(STORAGE_KEYS.EVENTS, events);

export const addEvent = (event) => {
  const current = getEvents();
  const updated = [{ ...event, id: 'evt-' + Date.now() }, ...current];
  saveEvents(updated);
  return updated;
};

export const updateEvent = (event) => {
  const updated = getEvents().map(e => e.id === event.id ? event : e);
  saveEvents(updated);
  return updated;
};

export const deleteEvent = (id) => {
  const updated = getEvents().filter(e => e.id !== id);
  saveEvents(updated);
  return updated;
};

// PROMOTIONS
export const getPromotions = () => getItem(STORAGE_KEYS.PROMOTIONS, INITIAL_PROMOTIONS);

export const savePromotions = (promos) => setItem(STORAGE_KEYS.PROMOTIONS, promos);

export const addPromotion = (promo) => {
  const current = getPromotions();
  const updated = [{ ...promo, id: 'promo-' + Date.now() }, ...current];
  savePromotions(updated);
  return updated;
};

export const updatePromotion = (promo) => {
  const updated = getPromotions().map(p => p.id === promo.id ? promo : p);
  savePromotions(updated);
  return updated;
};

export const deletePromotion = (id) => {
  const updated = getPromotions().filter(p => p.id !== id);
  savePromotions(updated);
  return updated;
};

// BOOKINGS
export const getBookings = () => getItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);

export const saveBookings = (bookings) => setItem(STORAGE_KEYS.BOOKINGS, bookings);

export const generateBookingReference = () => {
  const count = getBookings().length + 126;
  return `VS-2026-${String(count).padStart(5, '0')}`;
};

export const createBooking = (bookingData) => {
  const ref = generateBookingReference();
  const newBooking = {
    ...bookingData,
    id: 'b-' + Date.now(),
    bookingReference: ref,
    status: 'Confirmed',
    paymentStatus: 'Advance Received',
    createdAt: new Date().toISOString()
  };
  const updated = [newBooking, ...getBookings()];
  saveBookings(updated);
  return newBooking;
};

export const updateBookingStatus = (id, status, extraFields = {}) => {
  const updated = getBookings().map(b => {
    if (b.id === id) {
      return { ...b, status, ...extraFields };
    }
    return b;
  });
  saveBookings(updated);
  return updated;
};

export const findBookingByReference = (reference, contactVerification) => {
  const bookings = getBookings();
  const cleanRef = reference.trim().toUpperCase();
  const cleanContact = contactVerification ? contactVerification.trim().toLowerCase().replace(/\s+/g, '') : '';

  return bookings.find(b => {
    const matchRef = b.bookingReference.toUpperCase() === cleanRef;
    if (!matchRef) return false;
    if (!cleanContact) return true;
    const bEmail = (b.email || '').toLowerCase().trim();
    const bPhone = (b.phone || '').replace(/\s+/g, '');
    return bEmail.includes(cleanContact) || bPhone.includes(cleanContact);
  });
};

// BLOCKED SLOTS
export const getBlockedSlots = () => getItem(STORAGE_KEYS.BLOCKED_SLOTS, [
  { date: '2026-03-15', slot: '05:00 PM', reason: 'Booked (VS-2026-00124)' },
  { date: '2026-03-22', slot: '10:00 AM', reason: 'Booked (VS-2026-00125)' }
]);

export const isSlotBookedOrBlocked = (dateStr, slotTime) => {
  // Check in bookings
  const bookings = getBookings();
  const hasBooking = bookings.some(b => b.date === dateStr && b.startTime === slotTime && b.status !== 'Cancelled');
  if (hasBooking) return true;

  // Check in blocked slots
  const blocked = getBlockedSlots();
  return blocked.some(item => item.date === dateStr && item.slot === slotTime);
};

export const toggleSlotBlock = (dateStr, slotTime, reason = 'Admin Blocked') => {
  const current = getBlockedSlots();
  const exists = current.some(item => item.date === dateStr && item.slot === slotTime);
  let updated;
  if (exists) {
    updated = current.filter(item => !(item.date === dateStr && item.slot === slotTime));
  } else {
    updated = [...current, { date: dateStr, slot: slotTime, reason }];
  }
  setItem(STORAGE_KEYS.BLOCKED_SLOTS, updated);
  return updated;
};

// ENQUIRIES (CRM)
export const getEnquiries = () => getItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);

export const saveEnquiries = (enquiries) => setItem(STORAGE_KEYS.ENQUIRIES, enquiries);

export const createEnquiry = (enquiryData) => {
  const newEnq = {
    ...enquiryData,
    id: 'enq-' + Date.now(),
    status: 'New',
    notes: 'Inquiry received via website.',
    createdAt: new Date().toISOString()
  };
  const updated = [newEnq, ...getEnquiries()];
  saveEnquiries(updated);
  return newEnq;
};

export const updateEnquiryStatus = (id, status, notes) => {
  const updated = getEnquiries().map(e => {
    if (e.id === id) {
      return {
        ...e,
        status: status || e.status,
        notes: notes !== undefined ? notes : e.notes
      };
    }
    return e;
  });
  saveEnquiries(updated);
  return updated;
};

// ADMIN AUTH
export const getAdminAuth = () => {
  try {
    const auth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
};

export const setAdminAuth = (user) => {
  try {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
};

export const clearAdminAuth = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  } catch (e) {
    console.error(e);
  }
};

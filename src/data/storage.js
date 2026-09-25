// ============================================================
// VELA SHOOTZ — SUPABASE STORAGE LAYER
// All data operations go through Supabase instead of localStorage
// ============================================================

import { supabase } from '../lib/supabase';
import { INITIAL_PACKAGES, INITIAL_PORTFOLIO, INITIAL_EVENTS, TIME_SLOTS } from './initialData';
import { sendAdminWhatsAppAlert } from '../services/whatsappAlert';
import { sendBookingConfirmationEmail, sendEnquiryConfirmationEmail } from '../services/emailService';

// Re-export TIME_SLOTS for consumers
export { TIME_SLOTS };

// ============================================================
// PACKAGES
// ============================================================
export const getPackages = async () => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data || data.length === 0) {
    // Fallback to initial data if DB is empty or errored
    return INITIAL_PACKAGES;
  }

  // Map snake_case DB columns back to camelCase for the UI
  return data.map(mapPackageFromDb);
};

export const savePackages = async (packages) => {
  // Upsert each package
  const rows = packages.map(mapPackageToDb);
  const { error } = await supabase.from('packages').upsert(rows, { onConflict: 'id' });
  if (error) console.error('savePackages error:', error);
};

export const updatePackage = async (updatedPkg) => {
  const { error } = await supabase
    .from('packages')
    .upsert(mapPackageToDb(updatedPkg), { onConflict: 'id' });
  if (error) console.error('updatePackage error:', error);
  return getPackages();
};

// ============================================================
// BOOKINGS
// ============================================================
export const getBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getBookings error:', error);
    return [];
  }
  return (data || []).map(mapBookingFromDb);
};

export const createBooking = async (bookingData) => {
  // Generate unique booking reference via DB function with fallback
  let bookingRef = null;
  try {
    const { data: refData, error: refError } = await supabase
      .rpc('generate_booking_reference');
    if (!refError && refData) {
      bookingRef = refData;
    } else if (refError) {
      console.warn('generate_booking_reference RPC notice, using fallback reference:', refError);
    }
  } catch (rpcErr) {
    console.warn('generate_booking_reference exception, using fallback reference:', rpcErr);
  }

  if (!bookingRef) {
    const randNum = Math.floor(10000 + Math.random() * 90000);
    bookingRef = `VS-${new Date().getFullYear()}-${randNum}`;
  }

  const bookingId = 'b-' + Date.now();

  const newBooking = {
    id: bookingId,
    booking_reference: bookingRef,
    customer_name: bookingData.customerName,
    phone: bookingData.phone,
    email: bookingData.email,
    package_id: bookingData.packageId,
    package_name: bookingData.packageName,
    event_type: bookingData.eventType,
    date: bookingData.date,
    start_time: bookingData.startTime,
    duration: bookingData.duration,
    location: bookingData.location,
    people_count: bookingData.peopleCount,
    instagram: bookingData.instagram,
    requirements: bookingData.requirements,
    reference_links: bookingData.referenceLinks,
    addons: bookingData.addons || [],
    applied_promotion: bookingData.appliedPromotion,
    total_amount: bookingData.totalAmount,
    status: 'Confirmed',
    payment_status: 'Advance Received',
    assigned_to: null,
    reels_ready_url: '',
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert(newBooking)
    .select()
    .single();

  if (error) {
    console.error('createBooking error:', error);
    throw error;
  }

  const mappedBooking = mapBookingFromDb(data);
  // Trigger free automated WhatsApp alert to admin phone asynchronously
  sendAdminWhatsAppAlert(mappedBooking).catch(err => console.warn('[WhatsApp Alert Error]', err));
  // Trigger transactional confirmation email to customer + admin alert asynchronously
  sendBookingConfirmationEmail(mappedBooking).catch(err => console.warn('[Email Alert Error]', err));

  return mappedBooking;
};

export const updateBookingStatus = async (id, status, extraFields = {}) => {
  const updateData = { status };
  if (extraFields.assignedTo !== undefined) updateData.assigned_to = extraFields.assignedTo;
  if (extraFields.paymentStatus !== undefined) updateData.payment_status = extraFields.paymentStatus;
  if (extraFields.reelsReadyUrl !== undefined) updateData.reels_ready_url = extraFields.reelsReadyUrl;
  if (extraFields.notes !== undefined) updateData.notes = extraFields.notes;

  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', id);

  if (error) console.error('updateBookingStatus error:', error);
  return getBookings();
};

export const findBookingByReference = async (reference, contactVerification = '') => {
  const cleanRef = reference.trim().toUpperCase();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_reference', cleanRef)
    .single();

  if (error || !data) return null;

  // Optional contact verification
  if (contactVerification && contactVerification.trim()) {
    const cleanContact = contactVerification.trim().toLowerCase().replace(/\s+/g, '');
    const bEmail = (data.email || '').toLowerCase().trim();
    const bPhone = (data.phone || '').replace(/\s+/g, '');
    if (!bEmail.includes(cleanContact) && !bPhone.includes(cleanContact)) {
      return null;
    }
  }

  return mapBookingFromDb(data);
};

export const deleteBooking = async (id) => {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) console.error('deleteBooking error:', error);
};

// ============================================================
// SLOT AVAILABILITY
// ============================================================
export const isSlotBookedOrBlocked = async (dateStr, slotTime) => {
  if (!dateStr || !slotTime) return false;

  // Check bookings
  const { data: bookingData } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', dateStr)
    .eq('start_time', slotTime)
    .neq('status', 'Cancelled')
    .limit(1);

  if (bookingData && bookingData.length > 0) return true;

  // Check blocked slots
  const { data: blockedData } = await supabase
    .from('blocked_slots')
    .select('id')
    .eq('date', dateStr)
    .eq('slot', slotTime)
    .limit(1);

  return !!(blockedData && blockedData.length > 0);
};

// Get all booked/blocked slots for a given date (used for realtime UI)
export const getBookedSlotsForDate = async (dateStr) => {
  if (!dateStr) return [];

  const bookedSlots = new Set();

  const { data: bookingData } = await supabase
    .from('bookings')
    .select('start_time')
    .eq('date', dateStr)
    .neq('status', 'Cancelled');

  (bookingData || []).forEach(b => bookedSlots.add(b.start_time));

  const { data: blockedData } = await supabase
    .from('blocked_slots')
    .select('slot')
    .eq('date', dateStr);

  (blockedData || []).forEach(b => bookedSlots.add(b.slot));

  return Array.from(bookedSlots);
};

export const toggleSlotBlock = async (dateStr, slotTime, reason = 'Admin Blocked') => {
  // Check if already blocked
  const { data: existing } = await supabase
    .from('blocked_slots')
    .select('id')
    .eq('date', dateStr)
    .eq('slot', slotTime)
    .limit(1);

  if (existing && existing.length > 0) {
    await supabase.from('blocked_slots').delete().eq('date', dateStr).eq('slot', slotTime);
  } else {
    await supabase.from('blocked_slots').insert({ date: dateStr, slot: slotTime, reason });
  }
};

// ============================================================
// PROMOTIONS
// ============================================================
export const getPromotions = async () => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPromotions error:', error);
    return [];
  }
  return (data || []).map(mapPromotionFromDb);
};

export const addPromotion = async (promo) => {
  const row = {
    id: 'promo-' + Date.now(),
    title: promo.title,
    category: promo.category,
    discount: promo.discount,
    original_price: promo.originalPrice,
    final_price: promo.finalPrice,
    target_package_id: promo.targetPackageId,
    valid_until: promo.validUntil,
    description: promo.description,
    terms: promo.terms,
    badge: promo.badge,
    active: promo.active !== false
  };
  const { error } = await supabase.from('promotions').insert(row);
  if (error) console.error('addPromotion error:', error);
  return getPromotions();
};

export const updatePromotion = async (promo) => {
  const { error } = await supabase
    .from('promotions')
    .update(mapPromotionToDb(promo))
    .eq('id', promo.id);
  if (error) console.error('updatePromotion error:', error);
  return getPromotions();
};

export const deletePromotion = async (id) => {
  const { error } = await supabase.from('promotions').delete().eq('id', id);
  if (error) console.error('deletePromotion error:', error);
};

// ============================================================
// ENQUIRIES
// ============================================================
export const getEnquiries = async () => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getEnquiries error:', error);
    return [];
  }
  return (data || []).map(mapEnquiryFromDb);
};

export const createEnquiry = async (enquiryData) => {
  const row = {
    id: 'enq-' + Date.now(),
    name: enquiryData.name,
    phone: enquiryData.phone,
    email: enquiryData.email,
    event_type: enquiryData.eventType,
    event_date: enquiryData.eventDate || null,
    location: enquiryData.location,
    expected_coverage: enquiryData.expectedCoverage,
    required_reels: enquiryData.requiredReels,
    required_portraits: enquiryData.requiredPortraits,
    budget_range: enquiryData.budgetRange,
    special_requirements: enquiryData.specialRequirements,
    status: 'New',
    notes: 'Inquiry received via website.'
  };

  const { data, error } = await supabase
    .from('enquiries')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error('createEnquiry error:', error);
    throw error;
  }
  
  const mappedEnquiry = mapEnquiryFromDb(data);
  // Trigger email asynchronously
  sendEnquiryConfirmationEmail(data).catch(err => console.warn('[Email Service Error]', err));

  return mappedEnquiry;
};

export const updateEnquiryStatus = async (id, status, notes) => {
  const updateData = {};
  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;

  const { error } = await supabase
    .from('enquiries')
    .update(updateData)
    .eq('id', id);

  if (error) console.error('updateEnquiryStatus error:', error);
  return getEnquiries();
};

// ============================================================
// ADMIN AUTH (session-based, unchanged)
// ============================================================
const ADMIN_AUTH_KEY = 'vs_admin_auth_v1';

export const getAdminAuth = () => {
  try {
    const auth = sessionStorage.getItem(ADMIN_AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
};

export const setAdminAuth = (user) => {
  try {
    sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
};

export const clearAdminAuth = () => {
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  } catch (e) {
    console.error(e);
  }
};

// ============================================================
// REALTIME SUBSCRIPTIONS
// ============================================================
export const subscribeToSlotChanges = (callback) => {
  const channel = supabase
    .channel('slot-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, callback)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_slots' }, callback)
    .subscribe();

  return () => supabase.removeChannel(channel);
};

export const subscribeToBookings = (callback) => {
  const channel = supabase
    .channel('bookings-admin-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, callback)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_slots' }, callback)
    .subscribe();

  return () => supabase.removeChannel(channel);
};

// ============================================================
// DB → UI MAPPERS (snake_case → camelCase)
// ============================================================
function mapPackageFromDb(row) {
  return {
    id: row.id,
    category: row.category,
    categoryName: row.category_name,
    name: row.name,
    price: row.price,
    isCustom: row.is_custom,
    badge: row.badge,
    featured: row.featured,
    coverageHours: row.coverage_hours,
    reelsCount: row.reels_count,
    portraitsCount: row.portraits_count,
    description: row.description,
    includes: row.includes || [],
    extraAddons: row.extra_addons || [],
    cta: row.cta
  };
}

function mapPackageToDb(pkg) {
  return {
    id: pkg.id,
    category: pkg.category,
    category_name: pkg.categoryName,
    name: pkg.name,
    price: pkg.price,
    is_custom: pkg.isCustom,
    badge: pkg.badge,
    featured: pkg.featured,
    coverage_hours: pkg.coverageHours?.toString(),
    reels_count: pkg.reelsCount?.toString(),
    portraits_count: pkg.portraitsCount?.toString(),
    description: pkg.description,
    includes: pkg.includes || [],
    extra_addons: pkg.extraAddons || [],
    cta: pkg.cta
  };
}

function mapBookingFromDb(row) {
  return {
    id: row.id,
    bookingReference: row.booking_reference,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    packageId: row.package_id,
    packageName: row.package_name,
    eventType: row.event_type,
    date: row.date,
    startTime: row.start_time,
    duration: row.duration,
    location: row.location,
    peopleCount: row.people_count,
    instagram: row.instagram,
    requirements: row.requirements,
    referenceLinks: row.reference_links,
    addons: row.addons || [],
    appliedPromotion: row.applied_promotion,
    totalAmount: row.total_amount,
    status: row.status,
    paymentStatus: row.payment_status,
    assignedTo: row.assigned_to,
    reelsReadyUrl: row.reels_ready_url,
    notes: row.notes,
    createdAt: row.created_at
  };
}

function mapEnquiryFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    eventType: row.event_type,
    eventDate: row.event_date,
    location: row.location,
    expectedCoverage: row.expected_coverage,
    requiredReels: row.required_reels,
    requiredPortraits: row.required_portraits,
    budgetRange: row.budget_range,
    specialRequirements: row.special_requirements,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at
  };
}

function mapPromotionFromDb(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    discount: row.discount,
    originalPrice: row.original_price,
    finalPrice: row.final_price,
    targetPackageId: row.target_package_id,
    validUntil: row.valid_until,
    description: row.description,
    terms: row.terms,
    badge: row.badge,
    active: row.active
  };
}

function mapPromotionToDb(promo) {
  return {
    title: promo.title,
    category: promo.category,
    discount: promo.discount,
    original_price: promo.originalPrice,
    final_price: promo.finalPrice,
    target_package_id: promo.targetPackageId,
    valid_until: promo.validUntil,
    description: promo.description,
    terms: promo.terms,
    badge: promo.badge,
    active: promo.active
  };
}

// Legacy no-op for getBlockedSlots (still exported for compatibility)
export const getBlockedSlots = async () => {
  const { data } = await supabase.from('blocked_slots').select('*');
  return (data || []).map(r => ({ date: r.date, slot: r.slot, reason: r.reason }));
};

// Portfolio — served from static initial data (no DB table needed)
export const getPortfolio = () => INITIAL_PORTFOLIO;
export const addPortfolioItem = (item) => ({ ...item, id: 'proj-' + Date.now() });
export const deletePortfolioItem = (id) => id;
export const savePortfolio = () => {};

// Events — served from static initial data (no DB table needed)
export const getEvents = () => INITIAL_EVENTS;

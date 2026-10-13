// ============================================================
// VELA SHOOTZ — EMAIL NOTIFICATION SERVICE
// Sends transactional emails via the Vela Mailer Server
// (a secure middleware that proxies calls to Brevo API).
//
// ⚠️  We no longer call Brevo directly from the browser —
//     the API key is now kept safe on the server.
//
// Mailer Server repo: d:\VelaShootz\vela-mailer-server
// ============================================================

// Endpoints for Vela Mailer Server:
// Local: http://localhost:3001
// Deployed Vercel: https://vela-shortz-gky.vercel.app
const REMOTE_MAILER_URL = import.meta.env.VITE_MAILER_URL || 'https://vela-shortz-gky.vercel.app';
const LOCAL_MAILER_URL  = 'http://localhost:3001';

/**
 * Internal helper — POST data to the mailer server.
 * Tries local first in development mode, falling back to remote URL (or vice-versa in production).
 *
 * @param {string} endpoint - e.g. '/api/send-booking-email'
 * @param {object} payload  - JSON body to send
 * @returns {Promise<object>}
 */
async function postToMailer(endpoint, payload) {
  const isDev = import.meta.env.DEV;
  // In development, prefer local mailer server first; in production prefer remote
  const candidates = isDev
    ? [LOCAL_MAILER_URL, REMOTE_MAILER_URL]
    : [REMOTE_MAILER_URL, LOCAL_MAILER_URL];

  // Remove duplicates
  const targetUrls = [...new Set(candidates.filter(Boolean))];
  let lastError = null;

  for (const baseUrl of targetUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
        signal:  controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return await response.json();
      }

      const errText = await response.text();
      lastError = new Error(`Mailer (${baseUrl}) returned ${response.status}: ${errText}`);
    } catch (err) {
      lastError = err;
      console.warn(`[Email Service] Attempt at ${baseUrl}${endpoint} failed (${err.message}). Trying fallback...`);
    }
  }

  throw lastError || new Error('All mailer server endpoints failed.');
}

/**
 * Send booking confirmation email to the customer + alert email to admin.
 * Called after a new booking is successfully created.
 * This is fire-and-forget — it should never block the booking UI.
 *
 * @param {Object} booking - The booking object from createBooking()
 */
export const sendBookingConfirmationEmail = async (booking) => {
  try {
    const result = await postToMailer('/api/send-booking-email', booking);
    console.log('[Email Service] Booking emails dispatched:', result);
    return result.results;
  } catch (err) {
    console.error('[Email Service] Failed to dispatch booking emails:', err.message);
    return { customerEmail: { success: false, error: err.message }, adminEmail: { success: false, error: err.message } };
  }
};

/**
 * Send an enquiry confirmation email to the customer + alert to admin.
 *
 * @param {Object} enquiry - The enquiry form data
 */
export const sendEnquiryConfirmationEmail = async (enquiry) => {
  try {
    const result = await postToMailer('/api/send-enquiry-email', enquiry);
    console.log('[Email Service] Enquiry emails dispatched:', result);
    return result.results;
  } catch (err) {
    console.error('[Email Service] Failed to dispatch enquiry emails:', err.message);
    return { customerEmail: { success: false, error: err.message }, adminEmail: { success: false, error: err.message } };
  }
};

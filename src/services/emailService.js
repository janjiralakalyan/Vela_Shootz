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

// Base URL of the deployed Vela Mailer Server.
// For local development:  http://localhost:3001
// For production:         https://vela-mailer-server.vercel.app  (update after deploy)
const MAILER_BASE_URL = import.meta.env.VITE_MAILER_URL || 'http://localhost:3001';

/**
 * Internal helper — POST data to the mailer server.
 *
 * @param {string} endpoint - e.g. '/api/send-booking-email'
 * @param {object} payload  - JSON body to send
 * @returns {Promise<object>}
 */
async function postToMailer(endpoint, payload) {
  const response = await fetch(`${MAILER_BASE_URL}${endpoint}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Mailer server error (${response.status}): ${errText}`);
  }

  return response.json();
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

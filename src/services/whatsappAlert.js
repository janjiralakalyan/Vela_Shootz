// ============================================================
// VELA SHOOTZ - FREE AUTOMATED WHATSAPP ALERTS SERVICE
// Uses CallMeBot Free WhatsApp API to send instant booking pings
// to the admin's phone (+91 70958 91554) with zero subscription fees.
// ============================================================

export const ADMIN_PHONE = '917095891554';
const STORAGE_KEY = 'vs_callmebot_apikey';

export const getCallMeBotApiKey = () => {
  return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_CALLMEBOT_API_KEY || '';
};

export const setCallMeBotApiKey = (key) => {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Send an automated WhatsApp alert to the admin phone (+91 70958 91554)
 * whenever a new client booking is submitted.
 */
export const sendAdminWhatsAppAlert = async (booking) => {
  const apiKey = getCallMeBotApiKey();
  if (!apiKey) {
    console.info('[WhatsApp Alert] CallMeBot API key not configured yet. Skipping automated alert.');
    return { success: false, reason: 'No API Key configured' };
  }

  const phone = ADMIN_PHONE;
  const msg = 
`🚨 *NEW VELA SHOOTZ BOOKING!* 🎬
━━━━━━━━━━━━━━━━━━━
📌 *Ref ID:* ${booking.bookingReference || 'VS-NEW'}
👤 *Client:* ${booking.customerName}
📞 *Phone:* ${booking.phone}
✉️ *Email:* ${booking.email || 'N/A'}
📦 *Package:* ${booking.packageName}
🎉 *Event:* ${booking.eventType || 'Event Shoot'}
📅 *Date:* ${booking.date}
⏰ *Time:* ${booking.startTime}
📍 *Venue:* ${booking.location}
💰 *Total Amount:* ₹${Number(booking.totalAmount || 0).toLocaleString('en-IN')}
${booking.requirements ? `📝 *Notes:* "${booking.requirements}"\n` : ''}━━━━━━━━━━━━━━━━━━━
👉 Log in to Studio Portal to assign crew!`;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=+${phone}&text=${encodeURIComponent(msg)}&apikey=${encodeURIComponent(apiKey)}`;
    
    // mode: 'no-cors' allows browser to dispatch GET request without CORS blocks
    await fetch(url, { method: 'GET', mode: 'no-cors' });
    console.log('[WhatsApp Alert] Alert dispatched to admin phone +91 70958 91554');
    return { success: true };
  } catch (err) {
    console.error('[WhatsApp Alert] Failed to send alert:', err);
    return { success: false, error: err };
  }
};

/**
 * Send a test WhatsApp alert to verify the API key and admin phone
 */
export const sendTestWhatsAppAlert = async (testApiKey) => {
  const apiKey = testApiKey || getCallMeBotApiKey();
  if (!apiKey) {
    throw new Error('Please provide an API Key to test.');
  }

  const phone = ADMIN_PHONE;
  const msg = `🔔 *Vela Shootz WhatsApp Alert Test*\n\nYour automated WhatsApp booking alerts are now ACTIVE for phone: +91 70958 91554!\n\nWhenever a client reserves a shoot slot, you will receive an instant ping here. 🚀`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=+${phone}&text=${encodeURIComponent(msg)}&apikey=${encodeURIComponent(apiKey)}`;
  
  await fetch(url, { method: 'GET', mode: 'no-cors' });
  return { success: true };
};

function getDataLayer() {
  if (typeof window === 'undefined') return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function normalizeEnhancedConversionEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function normalizeEnhancedConversionPhone(value, defaultCountryCode = '62') {
  let digits = String(value || '').replace(/\D/g, '');

  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = `${defaultCountryCode}${digits.slice(1)}`;
  if (digits.startsWith('8')) digits = `${defaultCountryCode}${digits}`;

  return /^\d{10,15}$/.test(digits) ? `+${digits}` : null;
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== null && item !== undefined && item !== '')
  );
}

export function pushEnhancedConversionLead({
  email,
  phone,
  eventId,
  leadSourceCode,
  leadSourcePage,
  ctaLabel
}) {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;

  dataLayer.push({
    event: 'kinara_generate_lead',
    event_id: eventId,
    lead_source_code: leadSourceCode,
    lead_source_page: leadSourcePage,
    cta_label: ctaLabel,
    user_data: compactObject({
      email_address: normalizeEnhancedConversionEmail(email),
      phone_number: normalizeEnhancedConversionPhone(phone)
    })
  });
}

export function pushOnlineOrder(customerData = {}) {
  const dataLayer = getDataLayer();
  if (!dataLayer) return false;

  const transactionId = String(customerData.order_id || '').trim();
  const value = Number(customerData.total_price);
  if (!transactionId || !Number.isFinite(value) || value < 0) return false;

  dataLayer.push({
    event: 'kinara_purchase',
    ecommerce: {
      transaction_id: transactionId,
      value,
      currency: String(customerData.currency || 'IDR').toUpperCase()
    },
    user_data: compactObject({
      email_address: normalizeEnhancedConversionEmail(customerData.email),
      phone_number: normalizeEnhancedConversionPhone(customerData.phone)
    })
  });

  return true;
}

if (typeof window !== 'undefined') {
  window.kinaraAnalytics = {
    ...(window.kinaraAnalytics || {}),
    pushOnlineOrder
  };
}

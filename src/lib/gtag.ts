export const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'G-P9X4V50V9';
export const GADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || 'AW-11374923270';
export const FORM_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_LABEL || 'c7xECMzR474ZEIac_q8q';
export const FORM_CONVERSION_SEND_TO = `${GADS_ID}/${FORM_CONVERSION_LABEL}`;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
}

export function grantConsent() {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

export function denyConsent() {
  gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

/** Telefon-Klick – eigene Google Ads Conversion sobald vorhanden */
export function trackPhoneClick() {
  gtag('event', 'phone_click', { event_category: 'contact' });
}

/** Formular-Conversion – nur auf /danke auslösen, nicht direkt aufrufen */
export function trackFormConversion() {
  gtag('event', 'conversion', { send_to: FORM_CONVERSION_SEND_TO });
}

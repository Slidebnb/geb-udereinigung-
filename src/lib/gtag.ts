export const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'G-P9XY4V50W9';

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

export function trackPhoneClick() {
  gtag('event', 'phone_click', { event_category: 'contact' });
}

export function trackContactForm() {
  gtag('event', 'generate_lead', { event_category: 'contact_form' });
}

export function trackQuoteForm() {
  gtag('event', 'generate_lead', { event_category: 'quote_form' });
}

export function trackAngebotClick() {
  gtag('event', 'click', { event_category: 'cta', event_label: 'angebot_anfragen' });
}

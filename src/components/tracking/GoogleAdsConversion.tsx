'use client';

import { useEffect } from 'react';
import { trackFormConversion } from '@/lib/gtag';

const SESSION_KEY = 'huwa_conversion_fired';

/**
 * Feuert die Google Ads Formular-Conversion einmalig pro Session.
 * Nur auf /danke einbinden – niemals global in layout.tsx.
 */
export default function GoogleAdsConversion() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      trackFormConversion();
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage nicht verfügbar → trotzdem feuern
      trackFormConversion();
    }
  }, []);

  return null;
}

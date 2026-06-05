'use client';

import { useEffect } from 'react';
import { consumeFormSubmittedForConversion, trackFormConversion } from '@/lib/gtag';

/**
 * Feuert die Google Ads Formular-Conversion nur nach echter Formularweiterleitung.
 * Voraussetzung: Kontakt- oder Angebotsformular setzt vorher den Session-Marker.
 * Nur auf /danke einbinden – niemals global in layout.tsx.
 */
export default function GoogleAdsConversion() {
  useEffect(() => {
    if (!consumeFormSubmittedForConversion()) return;
    trackFormConversion();
  }, []);

  return null;
}

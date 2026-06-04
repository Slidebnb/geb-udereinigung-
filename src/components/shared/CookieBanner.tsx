'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { grantConsent, denyConsent } from '@/lib/gtag';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept  = () => { localStorage.setItem('cookie-consent', 'accepted');  grantConsent(); setVisible(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); denyConsent();  setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60]" style={{ background: 'linear-gradient(to top, rgba(5,13,26,0.98), rgba(5,13,26,0.95))', borderTop: '1px solid rgba(75,184,245,0.15)', backdropFilter: 'blur(12px)' }}>
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 px-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-0.5">Datenschutz & Cookies</p>
            <p className="text-blue-300/60 text-xs leading-relaxed">
              Wir verwenden Cookies für eine bessere Nutzererfahrung.{' '}
              <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="text-sm font-semibold text-blue-300/60 hover:text-white transition-colors px-4 py-2 rounded-xl border border-white/10 hover:border-white/20">
            Ablehnen
          </button>
          <button onClick={accept} className="btn-primary text-sm py-2 px-5">
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

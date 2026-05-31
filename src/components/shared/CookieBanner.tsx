'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setVisible(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-gray-800 mb-1">🍪 Wir verwenden Cookies</p>
          <p className="text-sm text-gray-600">
            Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern und anonyme Nutzungsstatistiken zu erheben.
            Weitere Informationen finden Sie in unserer{' '}
            <Link href="/datenschutz" className="text-primary underline hover:no-underline">Datenschutzerklärung</Link>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="btn-secondary text-sm px-4 py-2">Ablehnen</button>
          <button onClick={accept} className="btn-primary text-sm px-4 py-2">Alle akzeptieren</button>
        </div>
      </div>
    </div>
  );
}

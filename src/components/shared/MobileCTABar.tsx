'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/site';

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex shadow-2xl border-t border-white/10" style={{ background: 'linear-gradient(90deg, #0C2340 0%, #1B3E62 100%)' }}>
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white text-sm font-bold border-r border-white/10 active:bg-white/10"
        >
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          Anrufen
        </a>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Angebot%20anfragen.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white text-sm font-bold active:bg-white/10"
        >
          <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 00.606.665l5.765-1.512A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.875a9.864 9.864 0 01-5.022-1.373l-.36-.214-3.73.978.996-3.639-.235-.374A9.864 9.864 0 012.125 12C2.125 6.554 6.554 2.125 12 2.125S21.875 6.554 21.875 12 17.446 21.875 12 21.875z"/>
          </svg>
          WhatsApp
        </a>
        <a
          href="/angebot"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-l border-white/10 active:opacity-90"
          style={{ background: 'linear-gradient(90deg, #4BB8F5, #2DC94E)', color: '#0C2340' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Angebot
        </a>
      </div>
    </div>
  );
}

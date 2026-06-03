'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/site';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const url = `https://wa.me/${siteConfig.whatsapp}?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Reinigungsdienstleistungen.`;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-[1.05] transition-all duration-500 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 00.606.665l5.765-1.512A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.875a9.864 9.864 0 01-5.022-1.373l-.36-.214-3.73.978.996-3.639-.235-.374A9.864 9.864 0 012.125 12C2.125 6.554 6.554 2.125 12 2.125S21.875 6.554 21.875 12 17.446 21.875 12 21.875z"/>
      </svg>
      <span className="text-sm font-bold whitespace-nowrap">WhatsApp</span>
    </a>
  );
}

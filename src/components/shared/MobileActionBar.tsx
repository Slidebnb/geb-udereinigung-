'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { quoteUrl } from '@/lib/quote-url';

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-3">
        <a
          href={`tel:${siteConfig.phone}`}
          aria-label="Jetzt anrufen"
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 text-primary"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link href={quoteUrl({ source: 'mobile-action-bar' })} className="btn-primary h-12 justify-center">
          Angebot anfragen
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { SiteSettings } from '@/lib/get-settings';
import { siteConfig } from '@/lib/site';
import { quoteUrl } from '@/lib/quote-url';

const services = [
  { name: 'Gebäudereinigung', href: '/leistungen/gebaeudereinigung', icon: '🏢' },
  { name: 'Büroreinigung',    href: '/leistungen/bueroeinigung',    icon: '💼' },
  { name: 'Glasreinigung',    href: '/leistungen/glasreinigung',    icon: '🪟' },
  { name: 'Grundreinigung',   href: '/leistungen/grundreinigung',   icon: '✨' },
  { name: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung', icon: '🔄' },
  { name: 'Baureinigung',     href: '/leistungen/baureinigung',     icon: '🏗️' },
  { name: 'Treppenhausreinigung', href: '/leistungen/treppenhausreinigung', icon: '🏠' },
  { name: 'Hausmeisterdienste', href: '/leistungen/hausmeisterdienste', icon: '🔧' },
  { name: 'Winterdienst',     href: '/leistungen/winterdienst',     icon: '❄️' },
  { name: 'Gartenarbeiten',   href: '/leistungen/gartenarbeiten',   icon: '🌿' },
];

interface HeaderProps {
  settings?: SiteSettings;
  reviewRating?: number | null;
  reviewCount?: number;
}

export default function Header({ settings = {}, reviewRating = null, reviewCount = 0 }: HeaderProps) {
  const [open,         setOpen]         = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  const phone       = settings.phone || siteConfig.phone;
  const companyName = settings.site_title || siteConfig.name;
  const openingHours = settings.opening_hours || 'Mo–Fr 07:00–18:00 Uhr';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      {/* Top bar */}
      <div className="bg-dark text-white text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-2 gap-2">
          <div className="flex items-center gap-5">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              {phone}
            </a>
            <a href={`mailto:${settings.contact_email || siteConfig.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              {settings.contact_email || siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-blue-200/70">
            <span>{openingHours}</span>
            {reviewRating !== null && reviewCount > 0 ? (
              <span className="hidden sm:inline text-primary font-semibold">
                ★ {reviewRating.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/5 Kundenbewertungen
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={siteConfig.logoPath} alt={companyName} className="h-14 w-auto rounded-md bg-[#071525] px-2.5 py-1.5 object-contain shadow-sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Leistungen dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">
              Leistungen
              <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-card-hover rounded-2xl border border-gray-100/80 p-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-1">
              <Link href="/leistungen" className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-brand text-white font-semibold text-sm mb-2">
                Alle Leistungen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
              <div className="grid grid-cols-2 gap-1">
                {services.map(s => (
                  <Link key={s.href} href={s.href} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                    <span className="text-base">{s.icon}</span>
                    <span className="font-medium">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {[['Über uns','/ueber-uns'],['Blog','/blog'],['FAQ','/faq'],['Saison 2026/27','/winterdienst-anmeldung-2026'],['Kontakt','/kontakt']].map(([label,href]) => (
            <Link key={href} href={href} className="font-semibold text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5">
              {label}
            </Link>
          ))}
          <Link href="/preisrechner" className="btn-outline ml-2 py-2.5 px-4 text-sm">
            Preis schätzen
          </Link>
          <Link href={quoteUrl({ source: 'header' })} className="btn-primary ml-2 py-2.5 px-5 text-sm">
            Angebot anfragen
          </Link>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setOpen(!open)} aria-label="Menü">
          <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md pb-6">
          <div className="container mx-auto pt-2">
            <button className="flex items-center justify-between w-full py-3 px-2 font-semibold text-gray-700 rounded-xl hover:bg-gray-50" onClick={() => setServicesOpen(!servicesOpen)}>
              <span>Leistungen</span>
              <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {servicesOpen && (
              <div className="grid grid-cols-2 gap-1 px-2 mb-2">
                {services.map(s => (
                  <Link key={s.href} href={s.href} className="flex items-center gap-2 p-2.5 text-sm text-gray-600 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors" onClick={() => setOpen(false)}>
                    <span>{s.icon}</span><span className="font-medium">{s.name}</span>
                  </Link>
                ))}
              </div>
            )}
            {[['Über uns','/ueber-uns'],['Blog','/blog'],['FAQ','/faq'],['Winterdienst 2026/2027','/winterdienst-anmeldung-2026'],['Gartenpflege 2026/2027','/gartenpflege-anmeldung-2026'],['Kontakt','/kontakt'],['Preisrechner','/preisrechner']].map(([label,href]) => (
              <Link key={href} href={href} className="block py-3 px-2 font-semibold text-gray-700 border-t border-gray-50 hover:text-primary transition-colors" onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <div className="mt-4 px-2 flex flex-col gap-3">
              <Link href="/preisrechner" className="btn-outline w-full justify-center" onClick={() => setOpen(false)}>Preis schätzen</Link>
              <Link href={quoteUrl({ source: 'mobile-menu' })} className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>Kostenloses Angebot anfragen</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

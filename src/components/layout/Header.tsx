'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { siteConfig } from '@/lib/site';
import type { SiteSettings } from '@/lib/get-settings';
import { getPhone, getEmail, getCompanyName } from '@/lib/get-settings';

const services = [
  { name: 'Gebäudereinigung', href: '/leistungen/gebaeudereinigung' },
  { name: 'Büroreinigung', href: '/leistungen/bueroeinigung' },
  { name: 'Treppenhausreinigung', href: '/leistungen/treppenhausreinigung' },
  { name: 'Glasreinigung', href: '/leistungen/glasreinigung' },
  { name: 'Grundreinigung', href: '/leistungen/grundreinigung' },
  { name: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung' },
  { name: 'Baureinigung', href: '/leistungen/baureinigung' },
  { name: 'Hausmeisterdienste', href: '/leistungen/hausmeisterdienste' },
  { name: 'Winterdienst', href: '/leistungen/winterdienst' },
  { name: 'Gartenarbeiten', href: '/leistungen/gartenarbeiten' },
];

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings = {} }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const phone = getPhone(settings);
  const email = getEmail(settings);
  const companyName = getCompanyName(settings);
  const logoUrl = settings.logo_url || '';
  const rating = settings.google_rating || '4.9';
  const reviewCount = settings.review_count || '';
  const openingHours = settings.opening_hours || 'Mo–Fr 07:00–18:00 Uhr';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-1.5 gap-2">
          <div className="flex items-center gap-4">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              {email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>{openingHours}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-accent font-medium">
              ★ {rating}/5 Google Bewertung{reviewCount ? ` (${reviewCount})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image src={logoUrl} alt={companyName} width={40} height={40} className="w-10 h-10 object-contain rounded-lg" />
          ) : (
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
            </div>
          )}
          <div>
            <div className="font-bold text-primary text-lg leading-tight">{companyName.split(' ')[0] || 'HUWA'}</div>
            <div className="text-xs text-gray-500 leading-tight">Gebäudereinigung & Hausmeister</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors py-2">
              Leistungen
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 p-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/leistungen" className="block font-semibold text-primary mb-2 pb-2 border-b border-gray-100 hover:text-accent transition-colors">
                Alle Leistungen →
              </Link>
              {services.map(s => (
                <Link key={s.href} href={s.href} className="block py-1.5 text-sm text-gray-600 hover:text-primary hover:font-medium transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/ueber-uns" className="font-medium text-gray-700 hover:text-primary transition-colors">Über uns</Link>
          <Link href="/referenzen" className="font-medium text-gray-700 hover:text-primary transition-colors">Referenzen</Link>
          <Link href="/blog" className="font-medium text-gray-700 hover:text-primary transition-colors">Blog</Link>
          <Link href="/faq" className="font-medium text-gray-700 hover:text-primary transition-colors">FAQ</Link>
          <Link href="/kontakt" className="font-medium text-gray-700 hover:text-primary transition-colors">Kontakt</Link>
          <Link href="/angebot" className="btn-primary">Angebot anfragen</Link>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menü">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white pb-4">
          <div className="container mx-auto">
            <button
              className="flex items-center justify-between w-full py-3 font-medium text-gray-700"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Leistungen</span>
              <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
            {servicesOpen && (
              <div className="pl-4 mb-2">
                <Link href="/leistungen" className="block py-2 text-primary font-semibold" onClick={() => setOpen(false)}>Alle Leistungen</Link>
                {services.map(sv => (
                  <Link key={sv.href} href={sv.href} className="block py-1.5 text-sm text-gray-600" onClick={() => setOpen(false)}>{sv.name}</Link>
                ))}
              </div>
            )}
            {[['Über uns', '/ueber-uns'], ['Referenzen', '/referenzen'], ['Blog', '/blog'], ['FAQ', '/faq'], ['Kontakt', '/kontakt']].map(([label, href]) => (
              <Link key={href} href={href} className="block py-3 font-medium text-gray-700 border-t border-gray-50" onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <div className="mt-4">
              <Link href="/angebot" className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>Kostenloses Angebot</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

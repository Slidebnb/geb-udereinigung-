'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { SiteSettings } from '@/lib/get-settings';
import { getPhone } from '@/lib/get-settings';
import { siteConfig } from '@/lib/site';
import { trackPhoneClick } from '@/lib/gtag';

const NAV_LINKS = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Über uns',   href: '/ueber-uns' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Kontakt',    href: '/kontakt' },
];

const MOBILE_SERVICES = [
  { label: 'Gebäudereinigung',    href: '/leistungen/gebaeudereinigung' },
  { label: 'Büroreinigung',       href: '/leistungen/bueroeinigung' },
  { label: 'Glasreinigung',       href: '/leistungen/glasreinigung' },
  { label: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung' },
  { label: 'Hausmeisterdienste',  href: '/leistungen/hausmeisterdienste' },
  { label: 'Winterdienst',        href: '/leistungen/winterdienst' },
];

interface HeaderProps { settings?: SiteSettings; }

export default function Header({ settings = {} }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phone = getPhone(settings);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0D1008]/95 backdrop-blur-md border-b border-white/8 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setOpen(false)}>
            <svg width="38" height="34" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 2L6 16h6v18h18V16h6L21 2z" fill="#4BB8F5" opacity="0.95"/>
              <path d="M21 2L30 11l8 5-7-7-10-7z" fill="#2DC94E"/>
            </svg>
            <div>
              <div className="font-extrabold text-white text-lg leading-none tracking-widest">HUWA</div>
              <div className="text-[9px] text-white/40 leading-none tracking-[0.2em] uppercase mt-0.5">Gebäudereinigung</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              onClick={trackPhoneClick}
              className="text-sm text-white/50 hover:text-primary transition-colors duration-300 font-medium"
            >
              {phone}
            </a>
            <Link
              href="/angebot"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Objekt anfragen
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                open ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-height panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(13,16,8,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col h-full pt-24 pb-10 px-6 overflow-y-auto">

          {/* Main links */}
          <nav className="flex flex-col gap-1 mb-8">
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold text-white/90 hover:text-primary py-3 border-b border-white/8 transition-all duration-300"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : '0ms',
                  transform: open ? 'translateY(0)' : 'translateY(24px)',
                  opacity: open ? 1 : 0,
                  transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, color 300ms`,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Services sub-links */}
          <div
            className="mb-8"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) 300ms, transform 500ms cubic-bezier(0.22,1,0.36,1) 300ms`,
            }}
          >
            <p className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-3">Unsere Leistungen</p>
            <div className="grid grid-cols-2 gap-2">
              {MOBILE_SERVICES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/60 hover:text-primary py-2 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-auto"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) 360ms, transform 500ms cubic-bezier(0.22,1,0.36,1) 360ms`,
            }}
          >
            <Link
              href="/angebot"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center mb-3"
            >
              Objekt anfragen
            </Link>
            <a
              href={`tel:${phone}`}
              onClick={trackPhoneClick}
              className="flex items-center justify-center gap-2 text-white/50 hover:text-white text-sm transition-colors py-3"
            >
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              {phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

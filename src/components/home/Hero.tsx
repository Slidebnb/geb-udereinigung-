'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '@/lib/site';
import HeroBg from './HeroCanvas';

export interface HeroData {
  badge?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  subtitle?: string;
  stats?: { val: string; label: string }[];
  services?: { icon: string; title: string }[];
}

const defaultHero: Required<HeroData> = {
  badge: `Seit ${siteConfig.foundingYear} – Ihr Partner in ${siteConfig.address.city}`,
  h1: 'Professionelle',
  h2: 'Gebäudereinigung',
  h3: '& Hausmeister',
  subtitle: 'Sauberkeit auf höchstem Niveau – für Büros, Wohnhäuser und Gewerbe in Neuwied, Koblenz & Bendorf. Zuverlässig, gründlich, fair.',
  stats: [
    { val: '500+', label: 'zufriedene Kunden' },
    { val: '15+',  label: 'Jahre Erfahrung' },
    { val: '4.9★', label: 'Google Bewertung' },
  ],
  services: [
    { icon: '🏢', title: 'Gebäudereinigung' },
    { icon: '💼', title: 'Büroreinigung' },
    { icon: '🪟', title: 'Glasreinigung' },
    { icon: '🏠', title: 'Treppenhausreinigung' },
    { icon: '🏗️', title: 'Baureinigung' },
    { icon: '🔧', title: 'Hausmeisterdienste' },
    { icon: '❄️', title: 'Winterdienst' },
    { icon: '🌿', title: 'Gartenarbeiten' },
  ],
};

export default function Hero({ data }: { data?: HeroData }) {
  const d = { ...defaultHero, ...data };

  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(badgeRef.current,    { opacity: 0, y: 15, duration: 0.5 })
      .from(headlineRef.current, { opacity: 0, y: 30, duration: 0.7 }, '-=0.2')
      .from(subRef.current,      { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from(ctaRef.current,      { opacity: 0, y: 15, duration: 0.5 }, '-=0.3')
      .from(statsRef.current,    { opacity: 0, y: 15, duration: 0.5 }, '-=0.2');
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
      <HeroBg />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            {d.badge}
          </div>

          {/* Headline */}
          <div ref={headlineRef}>
            <h1 className="text-white mb-1 leading-[1.1]">{d.h1}</h1>
            <h1 className="gradient-text mb-1 leading-[1.1]">{d.h2}</h1>
            <h1 className="text-white leading-[1.1]">{d.h3}</h1>
          </div>

          <p ref={subRef} className="text-slate-300 text-lg mt-6 mb-10 leading-relaxed max-w-lg">
            {d.subtitle}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link href="/angebot" className="btn-primary text-base px-8 py-4 text-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Kostenloses Angebot
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-white text-base px-8 py-4 text-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
              {siteConfig.phone}
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-6">
            {d.stats.map(({ val, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-white">{val}</span>
                <span className="text-slate-400 text-xs mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: service list */}
        <div className="hidden lg:block">
          <div className="bg-white/8 border border-white/12 rounded-2xl p-8">
            <p className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-6">Unsere Leistungen</p>
            <div className="grid grid-cols-2 gap-3">
              {d.services.map(({ icon, title }) => (
                <div key={title} className="flex items-center gap-2.5 text-slate-300 text-sm">
                  <span className="text-lg">{icon}</span>
                  {title}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              <span className="text-slate-300 text-sm">Kostenlose Beratung & Festpreisangebot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-slate-400/60 text-xs">
        <span>Scrollen</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </section>
  );
}

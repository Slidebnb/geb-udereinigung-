'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Building2, Briefcase, AppWindow, Home, HardHat,
  Wrench, Snowflake, Leaf, ShieldCheck, Clock, MapPin, UserCheck, type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { quoteUrl } from '@/lib/quote-url';
import { whatsappUrl } from '@/lib/whatsapp';
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

const heroIconMap: Record<string, LucideIcon> = {
  building2: Building2,
  briefcase: Briefcase,
  appwindow: AppWindow,
  home:      Home,
  hardhat:   HardHat,
  wrench:    Wrench,
  snowflake: Snowflake,
  leaf:      Leaf,
};

const defaultHero: Required<HeroData> = {
  badge: `Seit ${siteConfig.foundingYear} – Ihr Partner in ${siteConfig.address.city}`,
  h1: 'Professionelle',
  h2: 'Gebäudereinigung',
  h3: '& Hausmeisterdienste',
  subtitle:
    'Kostenloses Angebot für Hausverwaltungen, Gewerbe, Büros und Wohnanlagen in Neuwied, Koblenz, Westerwald und Haiger – mit persönlicher Rückmeldung innerhalb von 24 Stunden.',
  stats: [
    { val: '100+', label: 'Kunden' },
    { val: '6', label: 'Jahre Erfahrung' },
    { val: '24 h', label: 'Rückmeldung' },
  ],
  services: [
    { icon: 'building2', title: 'Gebäudereinigung' },
    { icon: 'briefcase', title: 'Büroreinigung' },
    { icon: 'appwindow', title: 'Glasreinigung' },
    { icon: 'home',      title: 'Treppenhausreinigung' },
    { icon: 'hardhat',   title: 'Baureinigung' },
    { icon: 'wrench',    title: 'Hausmeisterdienste' },
    { icon: 'snowflake', title: 'Winterdienst' },
    { icon: 'leaf',      title: 'Gartenarbeiten' },
  ],
};

const trustItems = [
  { icon: Clock, label: 'Rückmeldung in 24 h' },
  { icon: ShieldCheck, label: 'Vollversichert' },
  { icon: UserCheck, label: 'Fester Ansprechpartner' },
  { icon: MapPin, label: 'Regional vor Ort' },
];

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
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #071529 0%, #0E2240 60%, #0B1D35 100%)' }}
    >
      <HeroBg />

      {/* Decorative glow – top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30,95,216,0.18) 0%, transparent 65%)',
          transform: 'translate(20%, -20%)',
        }}
      />
      {/* Decorative glow – bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 65%)',
          transform: 'translate(-20%, 20%)',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 text-white/70 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              {d.badge}
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-7">
            <p className="text-primary text-sm font-bold font-display uppercase tracking-[0.22em] mb-3">
              {d.h1}
            </p>
            <h1 className="leading-[1.0] mb-2">
              <span className="gradient-text block">{d.h2}</span>
              <span className="block text-white/85 text-3xl md:text-4xl lg:text-5xl font-bold mt-1">
                {d.h3}
              </span>
            </h1>
          </div>

          <p ref={subRef} className="text-slate-300 text-lg leading-relaxed max-w-lg mb-10">
            {d.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mb-8">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
                <Icon className="h-4 w-4 flex-shrink-0 text-green" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link href={quoteUrl({ source: 'hero' })} className="btn-primary text-base px-8 py-4 text-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Kostenloses Angebot
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-white text-base px-8 py-4 text-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              {siteConfig.phone}
            </a>
            <a
              href={whatsappUrl('Hallo, ich möchte ein kostenloses Angebot anfragen.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white text-base px-8 py-4 text-center"
            >
              WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8">
            {d.stats.map(({ val, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-extrabold font-display text-white leading-none">{val}</span>
                <span className="text-slate-400 text-xs mt-1 font-medium tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: service list */}
        <div className="hidden lg:block">
          <div className="card-glass p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-0.5 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #1E5FD8, #059669)' }} />
              <p className="text-white/75 text-sm font-semibold font-display uppercase tracking-wider">Unsere Leistungen</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {d.services.map(({ icon, title }) => {
                const Icon = heroIconMap[icon] ?? Building2;
                return (
                  <div key={title} className="flex items-center gap-2.5 text-slate-300 text-sm py-1">
                    <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {title}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-300 text-sm">Kostenlose Beratung & Festpreisangebot in 24 Stunden</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-slate-400/40 text-xs">
        <span className="tracking-[0.2em] uppercase text-[10px]">Scrollen</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

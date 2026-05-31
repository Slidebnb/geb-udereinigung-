'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '@/lib/site';
import HeroBg from './HeroCanvas';

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(badgeRef.current,    { opacity: 0, y: 20, duration: 0.6 })
      .from(headlineRef.current, { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
      .from(subRef.current,      { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
      .from(ctaRef.current,      { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from(statsRef.current,    { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 60% 40%, #112B4A 0%, #050D1A 65%)' }}>
      <HeroBg />

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            Seit {siteConfig.foundingYear} – Ihr Partner in {siteConfig.address.city}
          </div>

          {/* Headline */}
          <div ref={headlineRef}>
            <h1 className="text-white mb-2 leading-[1.1]">
              Professionelle
            </h1>
            <h1 className="gradient-text mb-2 leading-[1.1]">
              Gebäudereinigung
            </h1>
            <h1 className="text-white leading-[1.1]">
              & Hausmeister
            </h1>
          </div>

          <p ref={subRef} className="text-blue-200/80 text-lg md:text-xl mt-6 mb-10 leading-relaxed max-w-lg">
            Sauberkeit auf höchstem Niveau – für Büros, Wohnhäuser und Gewerbe in Neuwied, Koblenz & Bendorf. Zuverlässig, gründlich, fair.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-14">
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
          <div ref={statsRef} className="grid grid-cols-3 gap-4">
            {[
              { val: '500+', label: 'Kunden', color: 'text-primary' },
              { val: '15+',  label: 'Jahre Erfahrung', color: 'text-green' },
              { val: '4.9★', label: 'Google', color: 'text-yellow-400' },
            ].map(({ val, label, color }) => (
              <div key={label} className="card-glass rounded-2xl p-4 text-center">
                <div className={`text-2xl md:text-3xl font-black ${color}`}>{val}</div>
                <div className="text-blue-200/70 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: feature cards */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[
            { icon: '🏢', title: 'Gebäudereinigung', desc: 'Innen & Außen', color: 'from-primary/20 to-primary/5' },
            { icon: '🪟', title: 'Glasreinigung',    desc: 'Kristallklar',  color: 'from-green/20 to-green/5' },
            { icon: '🏗️', title: 'Baureinigung',     desc: 'Endreinigung', color: 'from-primary/20 to-primary/5' },
            { icon: '🔧', title: 'Hausmeister',      desc: 'Alles aus einer Hand', color: 'from-green/20 to-green/5' },
            { icon: '❄️', title: 'Winterdienst',     desc: 'Räumen & Streuen', color: 'from-primary/20 to-primary/5' },
            { icon: '🌿', title: 'Gartenarbeiten',   desc: 'Pflege & Gestaltung', color: 'from-green/20 to-green/5' },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className={`card-glass bg-gradient-to-br ${color} p-5 hover:scale-[1.04] cursor-default group`}>
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
              <div className="text-white font-semibold">{title}</div>
              <div className="text-blue-300/60 text-sm mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-blue-300/50 text-xs animate-float">
        <span>Scrollen</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </section>
  );
}

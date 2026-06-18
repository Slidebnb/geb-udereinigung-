'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/lib/site';
import { quoteUrl } from '@/lib/quote-url';

gsap.registerPlugin(ScrollTrigger);

export interface CTAData {
  headline?: string;
  headline_gradient?: string;
  subtitle?: string;
  benefits?: string[];
}

const defaultCTA: Required<CTAData> = {
  headline: 'Bereit für',
  headline_gradient: 'makellose Sauberkeit',
  subtitle: 'Fordern Sie Ihr kostenloses Angebot an. Wir prüfen Objekt, Intervall und Aufwand und melden uns innerhalb von 24 Stunden persönlich bei Ihnen.',
  benefits: ['Antwort in 24 h', 'Kostenlose Beratung', 'Festpreisgarantie', 'Vollversichert'],
};

export default function CTABanner({ data }: { data?: CTAData }) {
  const d = { ...defaultCTA, ...data };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 30, duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
      <div className="cta-content relative z-10 container mx-auto text-center">
        <div className="section-label mx-auto w-fit mb-6">Jetzt starten</div>
        <h2 className="text-white mb-4 max-w-3xl mx-auto">
          {d.headline} <span className="gradient-text">{d.headline_gradient}</span>?
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          {d.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href={quoteUrl({ source: 'cta-banner' })} className="btn-primary text-base px-10 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Kostenloses Angebot
          </Link>
          <Link href="/preisrechner" className="btn-white text-base px-10 py-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            Preis schätzen
          </Link>
          <a href={`tel:${siteConfig.phone}`} className="btn-white text-base px-10 py-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            {siteConfig.phone}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {d.benefits.map(item => (
            <div key={item} className="flex items-center gap-2 text-slate-300/70 text-sm font-medium">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

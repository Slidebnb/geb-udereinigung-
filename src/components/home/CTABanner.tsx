'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/lib/site';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 50%, #112B4A 0%, #050D1A 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="cta-content relative z-10 container mx-auto text-center">
        <div className="section-label-dark mx-auto w-fit mb-6">Jetzt starten</div>
        <h2 className="text-white mb-4 max-w-3xl mx-auto">
          Bereit für <span className="gradient-text">makellose Sauberkeit</span>?
        </h2>
        <p className="text-blue-200/70 text-lg mb-10 max-w-xl mx-auto">
          Fordern Sie Ihr kostenloses Angebot an – wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/angebot" className="btn-primary text-base px-10 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Kostenloses Angebot
          </Link>
          <a href={`tel:${siteConfig.phone}`} className="btn-white text-base px-10 py-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            {siteConfig.phone}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {['Antwort in 24 h', 'Kostenlose Beratung', 'Festpreisgarantie', 'Vollversichert'].map(item => (
            <div key={item} className="flex items-center gap-2 text-blue-200/60 text-sm font-medium">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

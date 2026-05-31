'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { val: 500, suffix: '+', label: 'Zufriedene Kunden',  color: 'text-primary' },
  { val: 15,  suffix: '+', label: 'Jahre Erfahrung',    color: 'text-green' },
  { val: 10,  suffix: '',  label: 'Leistungsbereiche',  color: 'text-primary' },
  { val: 100, suffix: '%', label: 'Weiterempfehlung',   color: 'text-green' },
];

const reasons = [
  { icon: '⏰', title: 'Pünktlich & Zuverlässig',    desc: 'Wir erscheinen zur vereinbarten Zeit – ohne Ausreden. Darauf können Sie sich verlassen.' },
  { icon: '🏆', title: 'Höchste Qualität',            desc: 'DGUV-geschultes Personal, geprüfte Reinigungsmittel und strukturierte Qualitätsprozesse.' },
  { icon: '💰', title: 'Faire Festpreise',             desc: 'Transparente Kalkulation, keine versteckten Kosten. Ihr Angebot gilt – genau wie vereinbart.' },
  { icon: '🌍', title: 'Regional verwurzelt',         desc: 'Seit Jahren in Neuwied, Koblenz und Bendorf aktiv – wir kennen die Region und Ihre Bedürfnisse.' },
  { icon: '📞', title: 'Direkter Ansprechpartner',    desc: 'Kein Call-Center, kein Ticket-System. Sie erreichen uns direkt und persönlich.' },
  { icon: '🔒', title: 'Vollversichert & Seriös',     desc: 'Betriebshaftpflicht, zertifizierte Mitarbeiter und DSGVO-konforme Abwicklung.' },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = document.querySelector(`.stat-val-${i}`);
        if (!el) return;
        const obj = { val: s.val };
        el.textContent = s.val + s.suffix;
        gsap.fromTo(obj, { val: 0 }, {
          val: s.val, duration: 2, ease: 'power2.out', snap: { val: 1 },
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
          onStart() { obj.val = 0; },
          onUpdate() { el.textContent = Math.round(obj.val) + s.suffix; },
        });
      });
      gsap.from('.why-card', {
        y: 40, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%', once: true },
      });
      gsap.from('.why-title', {
        y: 30, duration: 0.7,
        scrollTrigger: { trigger: '.why-title', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-slate-50">
      <div className="container mx-auto">
        {/* Animated stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((s, i) => (
            <div key={s.label} className="card rounded-2xl p-8 text-center cursor-default">
              <div className={`text-5xl font-black ${s.color} mb-2 stat-val-${i}`}>{s.val}{s.suffix}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="why-title text-center mb-16">
          <div className="section-label mx-auto w-fit">Warum Huwa?</div>
          <h2 className="mb-4">
            Der Unterschied, den Sie{' '}
            <span className="gradient-text">spüren werden</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Wir sind nicht das günstigste Unternehmen – aber das zuverlässigste. Und das merken unsere Kunden nach dem ersten Auftrag.
          </p>
        </div>

        {/* Reasons */}
        <div className="why-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div key={r.title} className="why-card card rounded-2xl p-7 group hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/8 border border-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {r.icon}
              </div>
              <h4 className="text-slate-800 font-bold mb-3">{r.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 divider-gradient mb-10" />
        <div className="flex flex-wrap justify-center gap-8">
          {['DGUV Ausgebildet', 'Betriebshaftpflicht', 'Innungsmitglied', 'DSGVO Konform', 'Geprüfte Qualität'].map(cert => (
            <div key={cert} className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

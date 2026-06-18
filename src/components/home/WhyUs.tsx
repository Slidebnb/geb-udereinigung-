'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Trophy, Banknote, MapPin, Phone, ShieldCheck, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasonIconMap: Record<string, LucideIcon> = {
  clock:       Clock,
  trophy:      Trophy,
  banknote:    Banknote,
  mappin:      MapPin,
  phone:       Phone,
  shieldcheck: ShieldCheck,
};

export interface WhyUsData {
  stats?: { val: number; suffix: string; label: string }[];
  headline?: string;
  subtitle?: string;
  reasons?: { icon: string; title: string; desc: string }[];
}

const defaultWhyUs: Required<WhyUsData> = {
  stats: [
    { val: 100, suffix: '+', label: 'Kunden' },
    { val: 6,   suffix: '', label: 'Jahre Erfahrung' },
    { val: 10,  suffix: '',  label: 'Leistungsbereiche' },
    { val: 24, suffix: ' h', label: 'Rückmeldung' },
  ],
  headline: 'Der Unterschied, den Sie spüren werden',
  subtitle:
    'Wir sind nicht das günstigste Unternehmen – aber das zuverlässigste. Und das merken unsere Kunden nach dem ersten Auftrag.',
  reasons: [
    { icon: 'clock',       title: 'Pünktlich & Zuverlässig',  desc: 'Wir erscheinen zur vereinbarten Zeit – ohne Ausreden. Darauf können Sie sich verlassen.' },
    { icon: 'trophy',      title: 'Saubere Qualität',          desc: 'Klare Absprachen, strukturierte Abläufe und kontrollierte Ergebnisse nach jedem Einsatz.' },
    { icon: 'banknote',    title: 'Faire Festpreise',           desc: 'Transparente Kalkulation, keine versteckten Kosten. Ihr Angebot gilt – genau wie vereinbart.' },
    { icon: 'mappin',      title: 'Regional verwurzelt',        desc: 'In Neuwied, Koblenz und Bendorf aktiv – mit kurzen Wegen und persönlicher Betreuung.' },
    { icon: 'phone',       title: 'Direkter Ansprechpartner',   desc: 'Kein Call-Center, kein Ticket-System. Sie erreichen uns direkt und persönlich.' },
    { icon: 'shieldcheck', title: 'Seriös & verbindlich',       desc: 'Diskrete Abwicklung, saubere Dokumentation und verlässliche Kommunikation.' },
  ],
};

const statColors = ['#1E5FD8', '#059669', '#1E5FD8', '#059669'];

export default function WhyUs({ data }: { data?: WhyUsData }) {
  const d = { ...defaultWhyUs, ...data };
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      d.stats.forEach((s, i) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto">
        {/* Animated stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {d.stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-8 text-center cursor-default border border-slate-100 hover:shadow-[0_8px_32px_rgba(5,13,26,0.1)] hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: '#F8F7F4' }}
            >
              <div
                className={`text-5xl font-black font-display mb-2 stat-val-${i}`}
                style={{ color: statColors[i % statColors.length] }}
              >
                {s.val}{s.suffix}
              </div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="why-title text-center mb-16">
          <div className="section-label mx-auto w-fit">Warum Huwa?</div>
          <h2 className="mb-4">
            <span className="gradient-text">{d.headline}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">{d.subtitle}</p>
        </div>

        {/* Reasons */}
        <div className="why-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {d.reasons.map((r) => {
            const Icon = reasonIconMap[r.icon] ?? ShieldCheck;
            return (
              <div
                key={r.title}
                className="why-card relative bg-white rounded-2xl p-7 border border-slate-100 overflow-hidden group hover:shadow-[0_8px_32px_rgba(5,13,26,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to bottom, #1E5FD8, #059669)' }}
                />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(30,95,216,0.08)' }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-slate-800 font-bold mb-3" style={{ fontFamily: 'var(--font-jakarta)' }}>{r.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 divider-gradient mb-10" />
        <div className="flex flex-wrap justify-center gap-8">
          {['Persönliche Abstimmung', 'Klare Angebote', 'Regionale Betreuung', 'Diskrete Arbeitsweise', 'Strukturierte Abläufe'].map(cert => (
            <div key={cert} className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
              <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ServicesData {
  headline?: string;
  subtitle?: string;
  items?: { icon: string; title: string; desc: string; href: string }[];
}

const defaultServices: Required<ServicesData> = {
  headline: '10 Leistungsbereiche',
  subtitle: 'Von der täglichen Unterhaltsreinigung bis zum kompletten Hausmeisterservice – Ihr verlässlicher Partner in Neuwied, Koblenz und Bendorf.',
  items: [
    { icon: '🏢', title: 'Gebäudereinigung',    desc: 'Professionelle Reinigung aller Gebäudetypen – innen und außen.',        href: '/leistungen/gebaeudereinigung' },
    { icon: '💼', title: 'Büroreinigung',        desc: 'Saubere Arbeitsumgebung für mehr Produktivität und Wohlbefinden.',      href: '/leistungen/bueroeinigung' },
    { icon: '🪟', title: 'Glasreinigung',        desc: 'Kristallklare Fenster und Fassaden – perfekter erster Eindruck.',       href: '/leistungen/glasreinigung' },
    { icon: '✨', title: 'Grundreinigung',       desc: 'Intensive Tiefenreinigung – gründlich, schnell, nachhaltig.',           href: '/leistungen/grundreinigung' },
    { icon: '🔄', title: 'Unterhaltsreinigung',  desc: 'Regelmäßige Pflege nach festem Zeitplan, damit alles glänzt.',          href: '/leistungen/unterhaltsreinigung' },
    { icon: '🏗️', title: 'Baureinigung',        desc: 'Endreinigung nach Bauprojekten – Bauschutt weg, Sauberkeit rein.',     href: '/leistungen/baureinigung' },
    { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Gepflegte Treppenhäuser steigern Wohnwert und Wohlfühlgefühl.',        href: '/leistungen/treppenhausreinigung' },
    { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Rund-um-Service für Gebäude und Grundstück – alles aus einer Hand.',   href: '/leistungen/hausmeisterdienste' },
    { icon: '❄️', title: 'Winterdienst',         desc: 'Räumen & Streuen – damit Sie sicher durch den Winter kommen.',         href: '/leistungen/winterdienst' },
    { icon: '🌿', title: 'Gartenarbeiten',       desc: 'Grünpflege, Rasenmähen und Gartengestaltung aus einer Hand.',          href: '/leistungen/gartenarbeiten' },
  ],
};

export default function Services({ data }: { data?: ServicesData }) {
  const d = { ...defaultServices, ...data };
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40, duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
      });
      gsap.from('.service-card', {
        y: 50, scale: 0.97, duration: 0.5, stagger: 0.06,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <div className="section-label mx-auto w-fit">Unsere Leistungen</div>
          <h2 className="mb-4">
            Alles aus einer Hand –{' '}
            <span className="gradient-text">{d.headline}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">{d.subtitle}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {d.items.map((s, idx) => {
            const accent = idx % 2 === 0;
            return (
            <Link
              key={s.href}
              href={s.href}
              className={`service-card card group flex flex-col gap-3 p-6 border ${
                accent ? 'border-primary/10 hover:border-primary/40' : 'border-green/10 hover:border-green/40'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 ${
                accent ? 'bg-primary/10' : 'bg-green/10'
              }`}>
                {s.icon}
              </div>
              <h4 className={`font-bold text-dark text-base transition-colors ${
                accent ? 'group-hover:text-primary' : 'group-hover:text-green'
              }`}>{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
              <span className={`text-sm font-semibold flex items-center gap-1 ${
                accent ? 'text-primary' : 'text-green'
              }`}>
                Mehr erfahren
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/leistungen" className="btn-outline inline-flex">
            Alle Leistungen ansehen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

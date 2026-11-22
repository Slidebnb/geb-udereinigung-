import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AngebotForm from './AngebotForm';

export const metadata: Metadata = {
  title: 'Kostenlose Objektbesichtigung anfragen — Neuwied & Koblenz | Huwa',
  description:
    'Festpreisangebot für Hausverwaltungen, WEGs und Gewerbe in Neuwied und Koblenz. Kostenlose Besichtigung, Antwort in 24 Stunden. Jetzt anfragen.',
  alternates: { canonical: `${siteConfig.url}/angebot` },
  openGraph: {
    title: 'Kostenlose Objektbesichtigung anfragen | Huwa Gebäudereinigung',
    description: 'Festpreisangebot für gewerbliche Objekte in Neuwied & Koblenz. Kostenlos und unverbindlich.',
    url: `${siteConfig.url}/angebot`,
  },
};

const TRUST_BADGES = [
  'Antwort in 24 Stunden',
  'Kostenlose Objektbesichtigung',
  'Transparentes Festpreisangebot',
  'Für Hausverwaltungen, WEGs & Gewerbe',
];

export default function AngebotPage() {
  return (
    <>
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Angebot anfragen' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label mb-4">Angebot anfragen</div>
            <h1 className="text-white mb-4">
              Kostenlose Objektbesichtigung anfragen — <span className="gradient-text">Neuwied & Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              Beschreiben Sie kurz Ihr Objekt. Wir prüfen Aufwand, Reinigungsintervall und
              Besonderheiten und melden uns persönlich mit einer realistischen Einschätzung.
            </p>
            <div className="flex flex-wrap gap-4">
              {TRUST_BADGES.map(item => (
                <div key={item} className="flex items-center gap-2 text-slate-300/80 text-sm">
                  <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AngebotForm />
    </>
  );
}

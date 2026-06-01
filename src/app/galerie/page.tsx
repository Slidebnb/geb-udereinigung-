import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BeforeAfter from '@/components/shared/BeforeAfter';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vorher/Nachher Galerie | Gebäudereinigung Neuwied | Huwa',
  description:
    'Echte Vorher/Nachher-Ergebnisse: Treppenhausreinigung, Büroreinigung, Glasreinigung in Neuwied & Koblenz. Überzeugen Sie sich von unserer Arbeit.',
  alternates: { canonical: `${siteConfig.url}/galerie` },
};

const items = [
  {
    title: 'Treppenhaus Reinigung',
    location: 'Neuwied',
    before:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Büroreinigung',
    location: 'Koblenz',
    before:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Glasreinigung',
    location: 'Neuwied',
    before:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Grundreinigung nach Auszug',
    location: 'Bendorf',
    before:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Treppenhausreinigung WEG',
    location: 'Koblenz',
    before:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Gartenarbeiten',
    location: 'Neuwied',
    before:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    after:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function GaleriePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Galerie' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Galerie</div>
            <h1 className="text-white mb-4">
              Unsere Ergebnisse{' '}
              <span className="gradient-text">sprechen für sich</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Wischen Sie den Slider, um den Unterschied zu sehen. Echte Vorher-Nachher-Aufnahmen
              aus unseren Projekten in Neuwied, Koblenz und Bendorf.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit">Vorher / Nachher</div>
            <h2 className="mt-4">
              Der Unterschied, den{' '}
              <span className="gradient-text">professionelle Reinigung</span> macht
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Bewegen Sie den Regler in jedem Bild, um die Transformation zu erleben. Jedes Ergebnis
              wurde von unserem Team in der Region erzielt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item) => (
              <div key={`${item.title}-${item.location}`} className="space-y-3">
                <BeforeAfter
                  before={item.before}
                  after={item.after}
                  alt={`${item.title} in ${item.location}`}
                />
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-base font-bold text-dark">{item.title}</h3>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="section-padding-sm bg-slate-50">
        <div className="container mx-auto">
          <div className="card p-10 text-center max-w-2xl mx-auto">
            <div className="section-label mx-auto w-fit mb-4">Ihr Objekt</div>
            <h2 className="mb-4">
              Ihr Objekt soll auch{' '}
              <span className="gradient-text">so aussehen?</span>
            </h2>
            <p className="text-gray-500 mb-8">
              Wir besichtigen kostenlos und erstellen Ihnen ein unverbindliches Festpreisangebot –
              damit Sie wissen, was Sie erwartet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/angebot" className="btn-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Kostenloses Angebot anfragen
              </Link>
              <Link href="/preisrechner" className="btn-outline">
                Preis schätzen lassen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

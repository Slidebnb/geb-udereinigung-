import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Büroreinigung Andernach | Huwa – Ihr lokaler Partner',
  description: 'Professionelle Büroreinigung in Andernach: Regelmäßige Unterhaltsreinigung für Büros, Praxen & Gewerberäume. Festes Team, Reinigungsprotokoll, Festpreis.',
  alternates: { canonical: `${siteConfig.url}/bueroreinigung-andernach` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Büroreinigung in Andernach und Umgebung',
  url: `${siteConfig.url}/bueroreinigung-andernach`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: 'Andernach',
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Andernach' },
  priceRange: '€€',
};

export default function BueroeinigungAndernach() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Büroreinigung Andernach' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Andernach & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Büroreinigung <span className="gradient-text">Andernach</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Saubere Büros in Andernach – zuverlässig, termingerecht und mit festem Reinigungsteam. Wir übernehmen die regelmäßige Unterhaltsreinigung Ihrer Büroflächen, Sanitäranlagen und Sozialräume.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-white px-8 py-3.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + FAQ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label">Büroreinigung in Andernach – was Sie erwartet</div>
            <h2 className="mt-4 mb-6">Lokale Präsenz –<br /><span className="gradient-text">persönlicher Service</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Andernach liegt direkt am Rhein zwischen Neuwied und Koblenz. Historische Innenstadt, Wohnanlagen am Rheinufer und gewachsene Gewerbegebiete prägen das Stadtbild.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir betreuen Bürogebäude, Praxen, Kanzleien und Gewerbeeinheiten in Stadtmitte, Namedy, Miesenheim, Kell und Eich. Jedes Objekt hat ein fest zugeteiltes Reinigungsteam und einen Objektleiter als direkten Ansprechpartner.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Reinigungsprotokolle geben Ihnen jederzeit Transparenz. Auf Wunsch erweitern wir die Büroreinigung in Andernach um Glasreinigung, Grundreinigung oder Winterdienst.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {[
                { val: '50+', label: 'Kunden in der Region' },
                { val: '3+',  label: 'Jahre Erfahrung' },
                { val: 'DGUV', label: 'Zertifiziert' },
              ].map(s => (
                <div key={s.label} className="card p-5 text-center">
                  <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                  <div className="text-slate-500 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Wie oft wird mein Büro in Andernach gereinigt?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Je nach Bedarf täglich, 3× pro Woche oder wöchentlich. Wir erstellen einen individuellen Reinigungsplan für Ihr Büro in Andernach.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Wird immer dasselbe Team geschickt?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Ja – jedes Bürogebäude in Andernach hat ein festes Reinigungsteam. Sicherheit und Vertrauen sind uns wichtig.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Können Sie auch Praxen oder Kanzleien in Andernach reinigen?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Ja, wir reinigen Arztpraxen, Zahnarztpraxen, Rechtsanwaltskanzleien und andere Gewerbebetriebe in Andernach nach individuellen Hygienestandards.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Was kostet die Büroreinigung in Andernach?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Der Preis richtet sich nach Fläche, Intervall und Umfang. Wir erstellen ein transparentes Festpreisangebot nach kostenloser Besichtigung in Andernach.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Leistungen in Andernach</div>
            <h2 className="mt-4">Was wir in Andernach <span className="gradient-text">anbieten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🗄️', title: 'Schreibtische & Arbeitsflächen', desc: 'Staubwischen, Desinfizieren, Ordnung herstellen.', accent: true },
              { icon: '🚿', title: 'Sanitäranlagen', desc: 'Desinfektion, Reinigung und Auffüllung von Seifen- und Papierspendern.', accent: false },
              { icon: '🍽️', title: 'Küche & Sozialräume', desc: 'Reinigung von Kühlschrank, Mikrowelle, Spüle und Arbeitsflächen.', accent: true },
              { icon: '🪟', title: 'Fenster & Glasflächen', desc: 'Auf Wunsch regelmäßige Fensterreinigung innen.', accent: false },
              { icon: '🏢', title: 'Eingangsbereiche', desc: 'Empfang, Foyer und Aufzüge – immer sauber für Besucher.', accent: true },
              { icon: '📋', title: 'Reinigungsprotokoll', desc: 'Lückenlose Dokumentation jedes Einsatzes in Andernach.', accent: false }
            ].map((s) => (
              <div key={s.title} className={`card p-6 hover:border-${s.accent ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${s.accent ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/leistungen" className="btn-outline inline-flex">Alle Leistungen ansehen</Link>
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Kostenloser Download</div>
            <h3 className="text-lg font-bold text-dark">12-Punkte Haustechnik-Checkliste für Hausverwaltungen</h3>
            <p className="text-gray-500 text-sm mt-1">Was muss wann geprüft werden? Jetzt kostenlos herunterladen.</p>
          </div>
          <Link href="/checkliste" className="btn-primary whitespace-nowrap shrink-0">Kostenlos herunterladen →</Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

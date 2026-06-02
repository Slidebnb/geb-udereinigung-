import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Treppenhausreinigung Andernach | Huwa – Ihr lokaler Partner',
  description: 'Treppenhausreinigung in Andernach: Zuverlässige, wöchentliche Reinigung von Treppenhäusern, Eingangsbereichen & Aufzügen. Mit Protokoll für WEGs & Hausverwaltungen.',
  alternates: { canonical: `${siteConfig.url}/treppenhausreinigung-andernach` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Treppenhausreinigung in Andernach und Umgebung',
  url: `${siteConfig.url}/treppenhausreinigung-andernach`,
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

export default function TreppenhausreinigungAndernach() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Treppenhausreinigung Andernach' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Andernach & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Treppenhausreinigung <span className="gradient-text">Andernach</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Gepflegte Treppenhäuser in Andernach – pünktlich, gründlich und mit Protokoll. Wir übernehmen die regelmäßige Reinigung von Treppenhäusern, Eingängen und Gemeinschaftsflächen für WEGs und Hausverwaltungen.
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
            <div className="section-label">Treppenhausreinigung in Andernach</div>
            <h2 className="mt-4 mb-6">Lokale Präsenz –<br /><span className="gradient-text">persönlicher Service</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Andernach liegt direkt am Rhein zwischen Neuwied und Koblenz. Historische Innenstadt, Wohnanlagen am Rheinufer und gewachsene Gewerbegebiete prägen das Stadtbild.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Saubere Treppenhäuser steigern den Wert und das Wohnklima einer Immobilie. Wir betreuen Wohnanlagen in Stadtmitte, Namedy, Miesenheim, Kell und Eich mit zuverlässigem, wöchentlichem Reinigungsrhythmus und Dokumentation.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Jede Reinigung in Andernach wird protokolliert und im Objekt hinterlegt – Transparenz für Eigentümer, Verwalter und Mieter. Auf Wunsch erweitern wir den Service um Kellerreinigung oder Tiefgaragenpflege.
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
                <span>Wie oft wird das Treppenhaus in Andernach gereinigt?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">In der Regel wöchentlich – auf Wunsch auch zweiwöchentlich. Wir passen den Rhythmus an Ihre Wohnanlage in Andernach an.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Gibt es ein Reinigungsprotokoll?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Ja – nach jedem Einsatz in Andernach wird ein Protokoll ausgefüllt und im Objekt hinterlegt. So haben Verwalter und Eigentümer jederzeit Überblick.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Was ist alles in der Treppenhausreinigung enthalten?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Standardmäßig: Treppenabsätze, Handläufe, Eingangstür, Briefkastenanlage und Aufzug (sofern vorhanden). Kellerreinigung auf Anfrage.</p>
            </details>
            <details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>Betreuen Sie WEGs in Andernach?</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">Ja, wir sind langjähriger Partner von Hausverwaltungen und WEGs in Andernach und den Stadtteilen Namedy, Miesenheim und Kell. Wir kennen die gesetzlichen Anforderungen an Gemeinschaftsflächen.</p>
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
              { icon: '🪜', title: 'Treppenabsätze & Stufen', desc: 'Wischen, Kehren und Grundreinigung auf Anfrage.', accent: true },
              { icon: '🚪', title: 'Eingangsbereich', desc: 'Türen, Briefkastenanlage und Fußmatten sauber halten.', accent: false },
              { icon: '🛗', title: 'Aufzug', desc: 'Wände, Boden und Türen des Aufzugs regelmäßig gereinigt.', accent: true },
              { icon: '🏠', title: 'Handläufe & Geländer', desc: 'Desinfektion und Pflege aller Handläufe.', accent: false },
              { icon: '🕷️', title: 'Spinnwebenkontrolle', desc: 'Decken und Ecken frei von Spinnweben halten.', accent: true },
              { icon: '📋', title: 'Reinigungsprotokoll', desc: 'Lückenlose Dokumentation im Objekt – auf Wunsch digital.', accent: false }
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

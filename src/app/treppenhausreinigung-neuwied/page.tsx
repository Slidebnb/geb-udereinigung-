import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Treppenhausreinigung in Neuwied | Huwa Gebäudereinigung',
  description: 'Zuverlässige Treppenhausreinigung in Neuwied für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/treppenhausreinigung-neuwied` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Treppenhausreinigung in Neuwied für Hausverwaltungen, WEGs und Vermieter',
  url: `${siteConfig.url}/treppenhausreinigung-neuwied`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: 'Neuwied',
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Neuwied' },
  priceRange: '€€',
};

const services = [
  { icon: '🏠', title: 'Treppenhaus',          desc: 'Wöchentliche Reinigung aller Stufen, Podeste und Zwischenpodeste – Staub wischen, feucht wischen, Ecken und Übergänge inklusive.' },
  { icon: '🔩', title: 'Geländer & Handläufe', desc: 'Desinfizierende Reinigung aller Geländerstäbe und Handläufe – besonders an Kontaktflächen gründlich und regelmäßig.' },
  { icon: '🚪', title: 'Eingang & Briefkästen', desc: 'Eingangstür, Türklinken, Briefkastenanlage und Fußmatte werden gereinigt und gepflegt – der erste Eindruck Ihres Hauses zählt.' },
  { icon: '🛗', title: 'Aufzug',               desc: 'Reinigung von Aufzugkabine, Türen und Bedienfeldern – Böden, Wände und Spiegel werden wöchentlich gereinigt und auf Mängel kontrolliert.' },
  { icon: '🗑️', title: 'Müllbereiche',         desc: 'Reinigung und Desinfektion der Mülltonnenstandplätze, Kellerflure und Abstellräume nach Bedarf.' },
  { icon: '📋', title: 'Dokumentation',         desc: 'Monatliches Reinigungsprotokoll für Hausverwaltungen – als Nachweis für WEGs, Vermieter oder behördliche Kontrollen.' },
];

const faqs = [
  {
    q: 'Wie oft wird das Treppenhaus in Neuwied gereinigt?',
    a: 'Die Standardfrequenz ist wöchentlich – das ist in den meisten Mietverträgen und WEG-Beschlüssen so vorgesehen. Für stark frequentierte Häuser bieten wir auch zweimal wöchentliche Reinigung an. In ruhigen Einzelhäusern ist in manchen Fällen ein 14-tägiger Rhythmus möglich.',
  },
  {
    q: 'Was kostet die Treppenhausreinigung als Monatspauschale in Neuwied?',
    a: 'Der Preis hängt von der Anzahl der Stockwerke, der Fläche, der Reinigungsfrequenz und dem Ausstattungsumfang (z.B. Aufzug, Müllbereich) ab. Wir erstellen nach einer kostenlosen Besichtigung ein transparentes Festpreisangebot. Bei mehreren Objekten unter einer Hausverwaltung bieten wir attraktive Sammelrabatte.',
  },
  {
    q: 'Muss ein langfristiger Vertrag abgeschlossen werden?',
    a: 'Nein. Wir bieten flexible Vertragslaufzeiten an. Für Hausverwaltungen mit mehreren Objekten in Neuwied empfehlen sich Jahresverträge wegen der besseren Planbarkeit und günstigeren Preise. Kürzere Laufzeiten sind auf Anfrage möglich.',
  },
  {
    q: 'Wie wird die Reinigung dokumentiert?',
    a: 'Auf Wunsch erhalten Sie monatliche Reinigungsprotokolle mit Datum, Uhrzeit und durchgeführten Arbeiten. Dies ist besonders für WEGs und professionelle Hausverwaltungen wichtig, die gegenüber Eigentümern Rechenschaft schulden.',
  },
];

export default function TreppenhausreinigungNeuwied() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Treppenhausreinigung Neuwied' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Neuwied & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Treppenhausreinigung <span className="gradient-text">Neuwied</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässige Treppenhausreinigung für Hausverwaltungen, WEGs und Vermieter in Neuwied. Wir reinigen wöchentlich nach festem Ablauf, dokumentieren alle Einsätze und sind ein verlässlicher Partner für Ihre Wohnanlage – in allen Neuwieder Stadtteilen.
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

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label">Treppenhausreinigung in Neuwied</div>
            <h2 className="mt-4 mb-6">Gepflegte Treppenhäuser –<br /><span className="gradient-text">verlässlich & dokumentiert</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Das Treppenhaus ist die Visitenkarte jedes Mietshauses. Ein gepflegtes Treppenhaus schafft Wohlbefinden, vermeidet Mieterkonflikte und steigert den Wert Ihrer Immobilie. Wir übernehmen die regelmäßige Reinigung für Hausverwaltungen, WEGs und private Vermieter in ganz Neuwied.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir sind in allen Neuwieder Stadtteilen tätig: Heddesdorf, Heimbach-Weis, Engers, Gladbach, Irlich und der Innenstadt. Unsere festen Reinigungsteams kennen Ihre Objekte und kommen zuverlässig zum vereinbarten Termin.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Jeder Einsatz wird protokolliert. Auf Anfrage erhalten Hausverwaltungen monatliche Berichte über alle gereinigten Objekte – als Nachweis für Eigentümerversammlungen und zur internen Qualitätssicherung.
            </p>
            <Link href="/leistungen/treppenhausreinigung" className="btn-outline inline-flex">
              Zur Leistungsseite Treppenhausreinigung
            </Link>
          </div>
          <div className="space-y-4">
            {faqs.map(item => (
              <details key={item.q} className="card p-5 group cursor-pointer">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                  <span>{item.q}</span>
                  <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Leistungen in Neuwied</div>
            <h2 className="mt-4">Was die Treppenhausreinigung <span className="gradient-text">umfasst</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/angebot" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Treppenhausreinigung auch in <span className="gradient-text">Koblenz & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/treppenhausreinigung-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Treppenhausreinigung Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen und WEGs in Koblenz</p>
            </Link>
            <Link href="/treppenhausreinigung-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Treppenhausreinigung Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Für Wohnanlagen und Mehrfamilienhäuser in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

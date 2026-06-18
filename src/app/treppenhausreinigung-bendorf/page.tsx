import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Treppenhausreinigung in Bendorf | Huwa Gebäudedienste',
  description: 'Zuverlässige Treppenhausreinigung in Bendorf für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/treppenhausreinigung-bendorf` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Treppenhausreinigung in Bendorf für Wohnanlagen und Mehrfamilienhäuser',
  url: `${siteConfig.url}/treppenhausreinigung-bendorf`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Bendorf' },
  priceRange: '€€',
};

const services = [
  { icon: '🏠', title: 'Treppenhaus',          desc: 'Wöchentliche Reinigung aller Treppenstufen, Podeste und Kellerflure – passend für Bendorfs typische Wohnanlagen und Mehrfamilienhäuser.' },
  { icon: '🔩', title: 'Geländer & Handläufe', desc: 'Gründliche Reinigung und Desinfektion aller Geländer und Handläufe – regelmäßig und zuverlässig nach festem Plan.' },
  { icon: '🚪', title: 'Eingang & Hausflur',   desc: 'Gepflegter Eingangsbereich als erster Eindruck Ihrer Immobilie – Fußmatten, Türen, Klingelanlagen und Briefkästen werden mitbetreut.' },
  { icon: '🛗', title: 'Aufzüge',              desc: 'Wo vorhanden: Reinigung von Aufzugkabinen, Türen und Bedienfeldern – hygienisch und nach Reinigungsprotokoll.' },
  { icon: '🗑️', title: 'Nebenräume',           desc: 'Reinigung von Fahrradkellern, Abstellräumen und Müllbereichen – auf Wunsch in den wöchentlichen Reinigungsrhythmus integriert.' },
  { icon: '📋', title: 'Protokollierung',      desc: 'Schriftliche Dokumentation jedes Einsatzes – für Hausverwaltungen in Bendorf, die gegenüber Eigentümern transparente Leistungsnachweise benötigen.' },
];

const faqs = [
  {
    q: 'Reinigen Sie auch in Sayn und Mülhofen?',
    a: 'Ja. Wir sind in Bendorf-Kernstadt sowie in den Ortsteilen Sayn, Mülhofen und Stromberg tätig. Als regionaler Anbieter aus Neuwied kennen wir die Bendorfer Wohnlagen gut und sind schnell vor Ort.',
  },
  {
    q: 'Wie wird die Treppenhausreinigung in Bendorf abgerechnet?',
    a: 'Wir arbeiten mit Monatspauschalen. Der Preis richtet sich nach Anzahl der Etagen, Quadratmetern, Reinigungsfrequenz und dem Leistungsumfang (z.B. mit oder ohne Aufzug, Müllbereich). Die genaue Kalkulation erfolgt nach einer kostenlosen Besichtigung.',
  },
  {
    q: 'Was passiert, wenn unsere Reinigungskraft krank ist?',
    a: 'Bei Krankheit oder Urlaub stellen wir eine Vertretungskraft, die vorab eingewiesen wurde und das Objekt kennt. Ihr Treppenhaus wird also auch in solchen Fällen verlässlich gereinigt – ohne dass Sie sich darum kümmern müssen.',
  },
  {
    q: 'Können Sie kurzfristig bei einer Verschmutzung in Bendorf helfen?',
    a: 'Für dringende Fälle wie starke Verschmutzungen nach Umzügen, Wasserschäden oder Vandalismus versuchen wir schnellstmöglich einen Sondereinsatz zu organisieren. Sprechen Sie uns einfach direkt an.',
  },
];

export default function TreppenhausreinigungBendorf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Treppenhausreinigung Bendorf' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Bendorf & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Treppenhausreinigung <span className="gradient-text">Bendorf</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Professionelle Treppenhausreinigung für Wohnanlagen, Mehrfamilienhäuser und WEGs in Bendorf. Wir sind in Sayn, Mülhofen, Stromberg und der Bendorfer Kernstadt tätig – mit festem Reinigungsplan, Protokollen und persönlichem Ansprechpartner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot?service=Treppenhausreinigung&city=Bendorf&source=regional-page" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
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
            <div className="section-label">Ihr Partner in Bendorf</div>
            <h2 className="mt-4 mb-6">Treppenhausreinigung in Bendorf –<br /><span className="gradient-text">nah, zuverlässig, dokumentiert</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bendorf und seine Ortsteile sind geprägt von gewachsenen Wohnquartieren mit Mehrfamilienhäusern aus verschiedenen Bauphasen. Ob gründerzeitlicher Altbau mit Natursteintreppe in Sayn oder moderner Neubau in Mülhofen – wir passen unsere Reinigungsleistung an die Anforderungen Ihres Objektes an.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Für private Vermieter, WEGs und Hausverwaltungen in Bendorf sind wir ein verlässlicher Partner: feste Reinigungstermine, kein Ausfall ohne Ersatz und transparente monatliche Abrechnung. Unsere kurzen Anfahrtswege aus Neuwied ermöglichen schnelle Reaktion auch bei kurzfristigen Anfragen.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Wir reinigen nicht nur Treppenhäuser – auf Wunsch übernehmen wir auch die Außenanlage, den Winterdienst oder die Grünflächenpflege und bündeln alle Dienstleistungen in einem übersichtlichen Vertrag.
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
            <div className="section-label mx-auto w-fit">Leistungen in Bendorf</div>
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
            <Link href="/angebot?service=Treppenhausreinigung&city=Bendorf&source=regional-page" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Treppenhausreinigung auch in <span className="gradient-text">Neuwied & Koblenz</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/treppenhausreinigung-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Treppenhausreinigung Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen, WEGs und Vermieter in Neuwied</p>
            </Link>
            <Link href="/treppenhausreinigung-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Treppenhausreinigung Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen und WEGs in Koblenz</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Winterdienst in Bendorf | Huwa Gebäudereinigung',
  description: 'Zuverlässiger Winterdienst in Bendorf für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/winterdienst-bendorf` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Winterdienst in Bendorf – Schneeräumung und Streudienst für Eigentümer und Hausverwaltungen',
  url: `${siteConfig.url}/winterdienst-bendorf`,
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
  { icon: '❄️', title: 'Schneeräumung',             desc: 'Manuelles und maschinelles Räumen von Gehwegen, Zufahrten und Eingängen in Bendorf, Sayn, Mülhofen und Stromberg – bei Schneefall pünktlich und zuverlässig.' },
  { icon: '🧂', title: 'Streudienst',               desc: 'Ausbringen von Streumitteln bei Glätte und Eisbildung – auf Gehwegen und Privatflächen nach Bedarf und gemäß kommunaler Vorschriften.' },
  { icon: '📋', title: 'Dokumentation',              desc: 'Schriftliche Erfassung jedes Winterdiensteinsatzes in Bendorf – Datum, Uhrzeit, Streumittelart und behandelte Flächen als Haftungsnachweis.' },
  { icon: '⚖️', title: 'Verkehrssicherungspflicht', desc: 'Wir übernehmen Ihre Räum- und Streupflicht für Ihr Bendorfer Objekt – rechtssicher, mit Protokoll und Haftungsübernahme durch unseren Betrieb.' },
  { icon: '🏘️', title: 'Wohnanlagen',              desc: 'Winterdienst für Mehrfamilienhäuser, WEGs und Wohnanlagen in Bendorf – einschließlich Kellereingang, Müllstandplatz und Tiefgaragenzufahrt.' },
  { icon: '📅', title: 'Saisonvertrag',              desc: 'Monatspauschale für die gesamte Wintersaison – faire Festpreise, keine Einzelabrechnung je Einsatz, volle Planungssicherheit für Eigentümer in Bendorf.' },
];

const faqs = [
  {
    q: 'Wann wird in Bendorf mit dem Räumen begonnen?',
    a: 'Bei Schneefall oder Glättewarnung starten wir in der Regel ab 6:00 Uhr. Bei angekündigten starken Schneefällen rücken wir früher aus. Für Gewerbeobjekte mit früheren Öffnungszeiten stimmen wir individuelle Startzeiten ab – auch schon ab 5:00 Uhr morgens.',
  },
  {
    q: 'Welche Bendorfer Ortsteile decken Sie ab?',
    a: 'Wir sind in Bendorf-Kernstadt, Sayn, Mülhofen und Stromberg tätig. Als Dienstleister aus Neuwied liegen alle Bendorfer Lagen direkt in unserem Kerngebiet – kurze Anfahrtswege, schnelle Reaktionszeiten.',
  },
  {
    q: 'Wie wird die Verkehrssicherungspflicht in Bendorf geregelt?',
    a: 'Grundstückseigentümer in Bendorf sind gemäß der Straßenreinigungssatzung verpflichtet, angrenzende Gehwege zu räumen und bei Glätte zu streuen. Durch unseren Saisonvertrag übernehmen wir diese Pflicht rechtswirksam für Sie. Unser Dokumentationsprotokoll dient als Nachweis, falls es doch einmal zu einem Streitfall kommen sollte.',
  },
  {
    q: 'Können wir Winterdienst und Hausmeisterservice kombinieren?',
    a: 'Ja, und das empfehlen wir sogar. Als Kombipaket aus Hausmeisterservice und Winterdienst bieten wir bessere Konditionen als zwei separate Aufträge. Sie haben einen Ansprechpartner für alle Außendienstleistungen rund um Ihre Bendorfer Immobilie.',
  },
];

export default function WinterdienstBendorf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Winterdienst Bendorf' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Bendorf & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Winterdienst <span className="gradient-text">Bendorf</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässiger Winterdienst für Eigentümer, Hausverwaltungen und WEGs in Bendorf. Wir räumen und streuen pünktlich vor Arbeitsbeginn in Bendorf-Kernstadt, Sayn, Mülhofen und Stromberg – und übernehmen Ihre gesamte Verkehrssicherungspflicht.
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
            <div className="section-label">Winterdienst in Bendorf</div>
            <h2 className="mt-4 mb-6">Sichere Wege in Bendorf –<br /><span className="gradient-text">auch im härtesten Winter</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Die Räum- und Streupflicht gilt auch in Bendorf für alle Grundstückseigentümer. Wer nicht oder zu spät räumt, haftet bei Unfällen. Mit unserem Winterdienst übergeben Sie diese Verantwortung vollständig an uns – lückenlos dokumentiert und zu einem fairen Saisonpreis.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bendorf liegt geografisch nahe an Neuwied, und unsere Winterdienstrouten führen direkt durch die Bendorfer Ortsteile. Das bedeutet für Sie: kurze Wartezeiten, frühe Einsatzzeiten und schnelle Reaktion auch bei überraschendem Schneefall in der Nacht.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Wir dokumentieren jeden Einsatz sorgfältig. Auf Anfrage erhalten Sie eine monatliche Übersicht aller Winterdiensteinsätze – als rechtssicherer Nachweis gegenüber Versicherungen oder in Haftungsfällen.
            </p>
            <Link href="/leistungen/winterdienst" className="btn-outline inline-flex">
              Zur Leistungsseite Winterdienst
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
            <h2 className="mt-4">Was der Winterdienst <span className="gradient-text">umfasst</span></h2>
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
          <h2 className="mb-8">Winterdienst auch in <span className="gradient-text">Neuwied & Koblenz</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/winterdienst-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Schneeräumung für Eigentümer und Gewerbe in Neuwied</p>
            </Link>
            <Link href="/winterdienst-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">❄️</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Winterdienst Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Schneeräumung für Wohn- und Gewerbeobjekte in Koblenz</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hausmeisterservice in Koblenz | Huwa Gebäudereinigung',
  description: 'Zuverlässiger Hausmeisterservice in Koblenz für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/hausmeisterservice-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professioneller Hausmeisterservice in Koblenz für Hausverwaltungen, WEGs und Gewerbeobjekte',
  url: `${siteConfig.url}/hausmeisterservice-koblenz`,
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
  areaServed: { '@type': 'City', name: 'Koblenz' },
  priceRange: '€€',
};

const services = [
  { icon: '🔧', title: 'Instandhaltung',       desc: 'Regelmäßige Begehungen und Behebung von Kleinschäden – Beleuchtung, Türen, Schlösser und sichtbare Mängel werden dokumentiert und behoben.' },
  { icon: '🌿', title: 'Außenanlagen Koblenz',  desc: 'Pflege von Grünflächen, Bepflanzungen, Wegen und Außenanlagen rund um Wohn- und Gewerbeobjekte in Koblenz – saisonal angepasst.' },
  { icon: '🗑️', title: 'Müllbewirtschaftung',  desc: 'Bereitstellen und Rückstellen der Mülltonnen, Sauberhalten der Entsorgungsbereiche und Beseitigung von Fehlwürfen in Ihrer Koblenzer Anlage.' },
  { icon: '❄️', title: 'Winterdienst',          desc: 'Schneeräumung und Streudienst für Wohn- und Gewerbeobjekte in Koblenz – verlässlich, auch früh morgens und an Wochenenden und Feiertagen.' },
  { icon: '🔍', title: 'Objektkontrolle',       desc: 'Systematische Rundgänge mit Fotodokumentation – für Hausverwaltungen in Koblenz, die einen lückenlosen Überblick über ihre Objekte benötigen.' },
  { icon: '🛠️', title: 'Handwerkliche Dienste', desc: 'Montage- und Reparaturarbeiten im Kleinbereich: Schilder, Beleuchtungsmittel, Scharniere, Briefkasteneinrichtung und ähnliche Tätigkeiten.' },
];

const faqs = [
  {
    q: 'Für welche Objekttypen bieten Sie Hausmeisterservice in Koblenz an?',
    a: 'Wir betreuen Wohnanlagen, Mehrfamilienhäuser, Gewerbeobjekte, Bürogebäude und gemischt genutzte Immobilien in ganz Koblenz. Sowohl einzelne Objekte als auch größere Portfolios von Hausverwaltungen können wir übernehmen.',
  },
  {
    q: 'In welchen Koblenzer Stadtteilen sind Sie tätig?',
    a: 'Wir sind in der gesamten Stadt Koblenz tätig – von der Altstadt über Güls, Metternich, Moselweiß, Lützel und Kesselheim bis zu den Außenlagen. Keine Koblenzer Lage ist zu weit für unseren Hausmeisterservice.',
  },
  {
    q: 'Wie läuft die Zusammenarbeit mit Hausverwaltungen ab?',
    a: 'Wir arbeiten eng mit Hausverwaltungen zusammen und stimmen alle Leistungen auf ihre Prozesse ab. Meldungen, Berichte und Rückmeldungen erfolgen direkt an den zuständigen Verwalter. Auf Wunsch nutzen wir Ihre bevorzugten Kommunikationskanäle oder digitalen Verwaltungstools.',
  },
  {
    q: 'Können wir den Hausmeisterservice probeweise für einen Monat beauftragen?',
    a: 'Ja. Für Neukunden bieten wir nach der kostenlosen Besichtigung einen Probemonat an, damit Sie unser Service ohne Risiko kennenlernen können. Anschließend können wir einen Jahresvertrag mit besserem Preis abschließen.',
  },
];

export default function HausmeisterserviceKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Hausmeisterservice Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Hausmeisterservice <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässiger Hausmeisterservice für Wohnanlagen, Bürogebäude und Gewerbeobjekte in Koblenz. Wir sind das verlässliche Bindeglied zwischen Hausverwaltung und Objekt – mit festen Teams, strukturierten Abläufen und lückenloser Dokumentation.
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
            <div className="section-label">Hausmeisterservice in Koblenz</div>
            <h2 className="mt-4 mb-6">Objektbetreuung für<br /><span className="gradient-text">Koblenz & alle Stadtteile</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz als Oberzentrum hat eine vielfältige Immobilienlandschaft: Gründerzeitliche Wohnhäuser in der Altstadt, moderne Wohnanlagen in Metternich, Bürokomplexe im Gewerbepark und Mehrfamilienhäuser in Güls und Moselweiß. Für alle diese Objekte bieten wir einen maßgeschneiderten Hausmeisterservice.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir sind nicht nur reaktiv tätig, wenn etwas kaputt ist – sondern präventiv. Unsere regelmäßigen Begehungen erkennen Schäden früh und verhindern teure Reparaturen. Das spart Hausverwaltungen Zeit und Kosten.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Für Koblenzer Hausverwaltungen, die mehrere Objekte unter sich haben, erstellen wir monatliche Sammelberichte und bieten einheitliche Preiskonditionen über alle Objekte hinweg.
            </p>
            <Link href="/leistungen/hausmeisterdienste" className="btn-outline inline-flex">
              Zur Leistungsseite Hausmeisterdienste
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
            <div className="section-label mx-auto w-fit">Leistungen in Koblenz</div>
            <h2 className="mt-4">Was der Hausmeisterservice <span className="gradient-text">übernimmt</span></h2>
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
          <h2 className="mb-8">Hausmeisterservice auch in <span className="gradient-text">Neuwied & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/hausmeisterservice-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen, WEGs und Eigentümer in Neuwied</p>
            </Link>
            <Link href="/hausmeisterservice-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Hausmeisterservice Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Hausmeisterdienste für Eigentümer und WEGs in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

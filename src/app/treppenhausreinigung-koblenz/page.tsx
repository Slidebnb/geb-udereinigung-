import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Treppenhausreinigung in Koblenz | Huwa Gebäudedienste',
  description: 'Zuverlässige Treppenhausreinigung in Koblenz für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/treppenhausreinigung-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Treppenhausreinigung in Koblenz für Hausverwaltungen und Wohnungseigentümergemeinschaften',
  url: `${siteConfig.url}/treppenhausreinigung-koblenz`,
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
  { icon: '🏠', title: 'Treppenhaus',          desc: 'Gründliche wöchentliche Reinigung aller Treppen, Podeste und Zwischenebenen – trocken- und feuchtwischen mit geeigneten Reinigungsmitteln für jeden Bodenbelag.' },
  { icon: '🔩', title: 'Geländer & Handläufe', desc: 'Vollständige Reinigung aller Metallgeländer, Holzhandläufe und Balustraden – gründlich an Griffzonen und schwer zugänglichen Stellen.' },
  { icon: '🚪', title: 'Eingang & Klingeln',   desc: 'Eingangsbereich, Klingelanlage, Sprechanlagen und Briefkästen werden gepflegt und auf Verschmutzungen oder Beschädigungen kontrolliert.' },
  { icon: '🛗', title: 'Aufzuganlagen',        desc: 'Innenreinigung von Aufzugkabinen inkl. Wänden, Böden, Beleuchtung und Bedienfeldern – wöchentlich oder nach Bedarf.' },
  { icon: '🗑️', title: 'Müllstandplätze',      desc: 'Reinigung und Desinfektion von Mülltonnenstellplätzen, Kellergängen und gemeinschaftlich genutzten Abstellflächen.' },
  { icon: '📋', title: 'Reinigungsprotokoll',  desc: 'Lückenlose Dokumentation aller Einsätze mit Datum und Uhrzeit – für WEG-Protokolle, Hausverwaltungen und Eigentümerversammlungen.' },
];

const faqs = [
  {
    q: 'Betreuen Sie Hausverwaltungen mit mehreren Objekten in Koblenz?',
    a: 'Ja – wir sind bevorzugter Partner mehrerer Hausverwaltungen in Koblenz und betreuen für diese Verwaltungen mehrere Treppenhäuser gleichzeitig. Das ermöglicht einheitliche Standards, eine zentrale Ansprechperson und günstigere Sammelkonditionen.',
  },
  {
    q: 'In welchen Koblenzer Stadtteilen sind Sie tätig?',
    a: 'Wir reinigen Treppenhäuser in der gesamten Stadt Koblenz – in Güls, Metternich, Moselweiß, Lützel, Kesselheim, der Altstadt, Ehrenbreitstein und allen weiteren Stadtteilen. Keine Lage ist für uns zu weit.',
  },
  {
    q: 'Übernehmen Sie auch die Reinigung nach dem Einzug neuer Mieter?',
    a: 'Ja. Wir bieten auf Wunsch Sonderreinigungen nach Mieterwechsel, Renovierungen oder Umzügen an – damit das Treppenhaus für die neuen Bewohner einwandfrei sauber ist. Diese Einmalleistungen rechnen wir separat ab.',
  },
  {
    q: 'Sind Ihre Reinigungskräfte versichert?',
    a: 'Selbstverständlich. Alle unsere Mitarbeiter sind sozialversicherungspflichtig beschäftigt und durch unsere Betriebshaftpflichtversicherung abgesichert. Im seltenen Fall eines Schadens sind Sie bei uns auf der sicheren Seite.',
  },
];

export default function TreppenhausreinigungKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Treppenhausreinigung Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Treppenhausreinigung <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Verlässliche Treppenhausreinigung für Hausverwaltungen und WEGs in Koblenz – in allen Stadtteilen von Güls bis Kesselheim. Feste Reinigungsteams, wöchentlicher Ablaufplan und monatliche Reinigungsprotokolle sorgen für Transparenz und Qualität.
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
            <div className="section-label">Treppenhausreinigung in Koblenz</div>
            <h2 className="mt-4 mb-6">Für Hausverwaltungen &<br /><span className="gradient-text">WEGs in Koblenz</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Als Dienstleister für Koblenzer Hausverwaltungen wissen wir, wie wichtig ein einheitlich gepflegtes Erscheinungsbild aller betreuten Objekte ist. Wir reinigen Treppenhäuser in Mehrfamilienhäusern, Wohnanlagen und Geschäftshäusern – professionell, verlässlich und zum vereinbarten Festpreis.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Besonders in dicht bebauten Stadtteilen wie Lützel, Metternich und Kesselheim sowie in der Koblenzer Altstadt betreuen wir zahlreiche Wohnhäuser mit anspruchsvollen Bewohnern und hohen Qualitätserwartungen. Jedes Haus hat eine feste Reinigungsmannschaft.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Die lückenlose Dokumentation aller Reinigungseinsätze ist für uns selbstverständlich – damit Sie als Hausverwaltung jederzeit nachweisen können, dass der vertraglich vereinbarte Service erbracht wurde.
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
            <div className="section-label mx-auto w-fit">Leistungen in Koblenz</div>
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
          <h2 className="mb-8">Treppenhausreinigung auch in <span className="gradient-text">Neuwied & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/treppenhausreinigung-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Treppenhausreinigung Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Hausverwaltungen, WEGs und Vermieter in Neuwied</p>
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

import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Bendorf | Huwa – Lokal & Zuverlässig',
  description: 'Gebäudereinigung in Bendorf: Treppenhausreinigung, Büroreinigung, Winterdienst & Hausmeisterdienste. Lokaler Anbieter aus der Region – Festpreisangebot.',
  alternates: { canonical: `${siteConfig.url}/gebaudereinigung-bendorf` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Gebäudereinigung in Bendorf und Umgebung',
  url: `${siteConfig.url}/gebaudereinigung-bendorf`,
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
  { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Wöchentliche Treppenhausreinigung für Wohnanlagen und Mehrfamilienhäuser in Bendorf mit Protokoll.' },
  { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Komplette Objektbetreuung für Hausverwaltungen und Eigentümer in Bendorf und den Ortsteilen.' },
  { icon: '❄️', title: 'Winterdienst',         desc: 'Räum- und Streudienst in Bendorf – verlässlich ab den frühen Morgenstunden, auch an Feiertagen.' },
  { icon: '🏢', title: 'Gebäudereinigung',    desc: 'Regelmäßige Reinigung von Gewerbeobjekten, Praxen und Büros in Bendorf und Sayn.' },
  { icon: '✨', title: 'Grundreinigung',       desc: 'Tiefenreinigung nach Mieterwechsel, Renovierung oder Neubau – bezugsfertig übergeben.' },
  { icon: '🌿', title: 'Gartenarbeiten',       desc: 'Grünpflege, Rasenmähen und Außenanlagenbetreuung für Wohnquartiere und Gewerbeanlagen in Bendorf.' },
];

export default function GebaudereinigungBendorf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Gebäudereinigung Bendorf' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Bendorf & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Gebäudereinigung <span className="gradient-text">Bendorf</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Professionelle Gebäudereinigung und Hausmeisterdienste in Bendorf – von der Treppenhausreinigung für Wohnanlagen bis zum Winterdienst für Gewerbeobjekte. Direkt aus der Region, mit festem Ansprechpartner und klaren Festpreisen.
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
            <div className="section-label">Ihr Partner in Bendorf</div>
            <h2 className="mt-4 mb-6">Reinigung für Bendorf –<br /><span className="gradient-text">nah, schnell, verlässlich</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bendorf und seine Ortsteile Sayn, Mülhofen, Stromberg und Weißenthurm liegen direkt in unserem Kerngebiet. Kurze Anfahrtswege ermöglichen uns schnelle Reaktionen – bei regelmäßigen Einsätzen ebenso wie bei kurzfristigen Anfragen.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Besonders gefragt in Bendorf: Treppenhausreinigung für Wohnanlagen und Mehrfamilienhäuser, Hausmeisterdienste für Eigentümergemeinschaften und Winterdienst für Gewerbeobjekte entlang der Rheinstraße.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Alle unsere Einsätze werden sorgfältig dokumentiert. Auf Wunsch erhalten Hausverwaltungen ein monatliches Protokoll für alle durchgeführten Arbeiten.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Reinigen Sie in Bendorf und den Ortsteilen?', a: 'Ja – wir sind in Bendorf-Kernstadt, Sayn, Mülhofen, Stromberg, Weißenthurm und der Umgebung tätig.' },
              { q: 'Können Sie auch kurzfristig in Bendorf helfen?', a: 'Für dringende Anfragen aus Bendorf versuchen wir schnellstmöglich eine Lösung zu finden. Nehmen Sie einfach Kontakt auf.' },
              { q: 'Wie läuft ein Auftrag in Bendorf ab?', a: 'Nach Ihrer Anfrage vereinbaren wir einen kostenlosen Vor-Ort-Termin, erstellen ein Festpreisangebot und starten dann nach Ihrer Freigabe – meist innerhalb einer Woche.' },
              { q: 'Bieten Sie Winterdienst in Bendorf an?', a: 'Ja. Wir übernehmen die Räum- und Streupflicht für Ihr Bendorfer Objekt – ab den frühen Morgenstunden, auch am Wochenende.' },
            ].map(item => (
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
            <h2 className="mt-4">Was wir in Bendorf <span className="gradient-text">anbieten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title} Bendorf</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/leistungen" className="btn-outline inline-flex">Alle Leistungen ansehen</Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

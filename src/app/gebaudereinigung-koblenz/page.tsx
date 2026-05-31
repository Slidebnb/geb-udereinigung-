import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gebäudereinigung Koblenz | Huwa – Zuverlässig & Regional',
  description: 'Professionelle Gebäudereinigung in Koblenz: Büroreinigung, Glasreinigung, Treppenhausreinigung, Grundreinigung & Hausmeisterdienste. Festpreisangebot anfordern.',
  alternates: { canonical: `${siteConfig.url}/gebaudereinigung-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Gebäudereinigung in Koblenz und Umgebung',
  url: `${siteConfig.url}/gebaudereinigung-koblenz`,
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
  { icon: '💼', title: 'Büroreinigung',        desc: 'Tägliche oder wöchentliche Büroreinigung für Verwaltungsgebäude, Arztpraxen und Kanzleien in Koblenz.' },
  { icon: '🪟', title: 'Glasreinigung',        desc: 'Fassadenreinigung und Fensterreinigung für Geschäftshäuser und Bürokomplexe in Koblenz-City und Umgebung.' },
  { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Wöchentliche Treppenhausreinigung für Wohnanlagen und WEGs in Koblenz – mit Reinigungsprotokoll.' },
  { icon: '✨', title: 'Grundreinigung',       desc: 'Intensive Tiefenreinigung nach Auszug, Renovierung oder Neubau – bezugsfertig übergeben.' },
  { icon: '🏗️', title: 'Baureinigung',        desc: 'Grob- und Feinreinigung nach Bauprojekten in Koblenz – für Übergabe an Mieter oder Käufer.' },
  { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Objektbetreuung und Hausmeisterservice für Hausverwaltungen und Eigentümergemeinschaften in Koblenz.' },
];

export default function GebaudereinigungKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Gebäudereinigung Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Gebäudereinigung <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Professionelle Gebäudereinigung und Hausmeisterdienste in Koblenz. Von der täglichen Büroreinigung bis zur Glasfassadenreinigung für Geschäftshäuser – wir betreuen Ihr Objekt zuverlässig, mit festem Ansprechpartner und transparentem Festpreis.
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
            <div className="section-label">Gebäudereinigung in Koblenz</div>
            <h2 className="mt-4 mb-6">Für Büros, Wohnanlagen<br /><span className="gradient-text">& Gewerbeobjekte</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz als Wirtschafts- und Verwaltungsstandort stellt hohe Anforderungen an Sauberkeit und Professionalität. Wir reinigen Bürogebäude, Praxen, Kanzleien, Wohnanlagen und Gewerbeobjekte in der gesamten Stadt – von der Koblenzer Altstadt bis Güls, Metternich und Moselweiß.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Besonders für Hausverwaltungen bieten wir strukturierte Reinigungsabläufe mit Protokollierung, festen Reinigungsmannschaften und einem direkten Ansprechpartner für alle Rückfragen.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Alle Reinigungsarbeiten in Koblenz werden nach festem Ablaufplan durchgeführt – pünktlich, gründlich und zum vereinbarten Festpreis.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Reinigen Sie in ganz Koblenz?', a: 'Ja – wir sind in der gesamten Stadt tätig, inklusive aller Stadtteile wie Güls, Metternich, Moselweiß, Lützel, Kesselheim und weiteren.' },
              { q: 'Betreuen Sie auch Hausverwaltungen in Koblenz?', a: 'Ja. Wir arbeiten mit mehreren Hausverwaltungen in Koblenz zusammen und bieten strukturierte Reinigungsabläufe mit Protokollen und festem Ansprechpartner.' },
              { q: 'Wie läuft die Angebotsstellung in Koblenz ab?', a: 'Wir besichtigen Ihr Objekt kostenlos und unverbindlich und erstellen ein transparentes Festpreisangebot – in der Regel innerhalb von 24 Stunden.' },
              { q: 'Übernehmen Sie auch Glasfassadenreinigung in Koblenz?', a: 'Ja. Wir reinigen Glasfassaden und -fronten per Osmose-Technik – streifenfrei, ohne chemische Zusätze.' },
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
            <div className="section-label mx-auto w-fit">Leistungen in Koblenz</div>
            <h2 className="mt-4">Was wir in Koblenz <span className="gradient-text">anbieten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`card p-6 hover:border-${i % 2 === 0 ? 'primary' : 'green'}/30 transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${i % 2 === 0 ? 'bg-primary/8' : 'bg-green/8'}`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title} Koblenz</h3>
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

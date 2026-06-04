import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Fensterreinigung Koblenz | Huwa – Streifenfrei & Professionell',
  description: 'Professionelle Fensterreinigung in Koblenz für Büros, Geschäftshäuser und Wohnanlagen. Innen & außen, Osmose-Technik, Festpreis. Jetzt Angebot anfordern.',
  alternates: { canonical: `${siteConfig.url}/fensterreinigung-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Fensterreinigung in Koblenz – streifenfrei, gründlich und termingerecht',
  url: `${siteConfig.url}/fensterreinigung-koblenz`,
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
  { icon: '🪟', title: 'Büro- & Gewerbefenster', desc: 'Streifenfreie Reinigung von Bürofenstern und Schaufronten – innen und außen, in regelmäßigen Abständen oder als Einmalreinigung.' },
  { icon: '🏗️', title: 'Fassadenverglasungen',   desc: 'Reinigung großflächiger Glasfassaden und Glasdächer mit professioneller Ausrüstung und Sicherheitsstandards nach DGUV.' },
  { icon: '💧', title: 'Osmose-Technik',          desc: 'Kalkfreie Fensterreinigung mit vollentsalztem Wasser für besonders saubere, langanhaltende Ergebnisse ohne chemische Rückstände.' },
  { icon: '🏠', title: 'Privatgebäude & WEGs',    desc: 'Fenster in Wohnanlagen, Mehrfamilienhäusern und Reihenhäusern – termingerecht und zu günstigen Sammelpreisen für Hausverwaltungen.' },
  { icon: '🔲', title: 'Rahmen & Dichtungen',     desc: 'Gründliche Reinigung von Fensterrahmen, Silikondichtungen und Fensterbänken – innen und außen, bei jedem Reinigungseinsatz inklusive.' },
  { icon: '📋', title: 'Dokumentierter Service',  desc: 'Auf Wunsch Reinigungsprotokoll nach jedem Einsatz – für Hausverwaltungen, WEGs und Gewerbekunden mit Qualitätsstandards.' },
];

const faqs = [
  {
    q: 'Wie oft sollten Gewerbefenster in Koblenz gereinigt werden?',
    a: 'Das hängt vom Standort und der Nutzung ab. Schaufronten in der Koblenzer Innenstadt oder am Deutschen Eck sollten monatlich gereinigt werden. Bürofenster in ruhigeren Lagen alle 4–6 Wochen. Wir beraten Sie gerne nach einer kostenlosen Besichtigung.',
  },
  {
    q: 'Reinigen Sie auch sehr hohe oder schwer zugängliche Fenster in Koblenz?',
    a: 'Ja. Für hohe Fassaden und schwer zugängliche Glasflächen setzen wir auf Teleskopstangen mit Osmose-System sowie auf professionelle Höhenarbeiten gemäß DGUV-Richtlinien. Wir arbeiten sicher und versichert.',
  },
  {
    q: 'Was kostet die Fensterreinigung in Koblenz?',
    a: 'Der Preis hängt von der Anzahl der Fenster, der Etage und der Zugänglichkeit ab. Für Gewerbe und WEGs bieten wir transparente Pauschalen an. Nach kostenloser Besichtigung erhalten Sie ein verbindliches Festpreisangebot.',
  },
  {
    q: 'Können Sie Fenster auch im laufenden Betrieb reinigen?',
    a: 'Ja, das ist unser Standard. Bürofenster reinigen wir bevorzugt früh morgens oder abends, damit der Betrieb nicht gestört wird. Für Schaufronten und Gewerbeobjekte passen wir uns Ihren Öffnungszeiten an.',
  },
];

export default function FensterreinigungKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Fensterreinigung Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Fensterreinigung <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Streifenfreie Fensterreinigung für Büros, Geschäftshäuser, Wohnanlagen und Gewerbeobjekte in Koblenz. Wir reinigen innen und außen – mit modernster Osmose-Technik, termingerecht und zu einem transparenten Festpreis.
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
            <div className="section-label">Fensterreinigung in Koblenz</div>
            <h2 className="mt-4 mb-6">Klare Sicht für<br /><span className="gradient-text">Koblenzer Gewerbeobjekte</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz bietet als Handels- und Tourismusstandort ein vielgestaltiges Stadtbild – von historischen Gebäuden in der Altstadt und am Deutschen Eck bis hin zu modernen Bürokomplexen in den Gewerbegebieten. Saubere Fenster sind für den ersten Eindruck bei Kunden, Gästen und Geschäftspartnern entscheidend.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir reinigen Fenster in der Koblenzer Innenstadt, in Güls, Metternich, Moselweiß und Kesselheim sowie in Gewerbeparks und Wohnanlagen. Mit unserer Osmose-Technik erzielen wir dauerhaft streifenfreie Ergebnisse ohne chemische Rückstände – auch bei mineralischen Wasserflecken.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Für Hausverwaltungen bieten wir Sammelangebote für mehrere Objekte – einheitliche Qualität, ein fester Ansprechpartner, ein transparentes Angebot.
            </p>
            <Link href="/leistungen/glasreinigung" className="btn-outline inline-flex">
              Zur Leistungsseite Glas- & Fensterreinigung
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
            <h2 className="mt-4">Was die Fensterreinigung <span className="gradient-text">umfasst</span></h2>
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

      {/* Nearby / related */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Weitere Reinigungsleistungen in Koblenz</div>
          <h2 className="mb-8">Auch diese Leistungen bieten wir<br /><span className="gradient-text">in Koblenz</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/bueroreinigung-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Regelmäßige Büroreinigung für Unternehmen in Koblenz</p>
            </Link>
            <Link href="/gebaudereinigung-koblenz" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏢</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Gebäudereinigung Koblenz</h3>
              <p className="text-slate-500 text-sm mt-1">Alle Reinigungsleistungen für Koblenz im Überblick</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

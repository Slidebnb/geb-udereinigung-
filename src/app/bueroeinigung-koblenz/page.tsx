import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Büroreinigung in Koblenz | Huwa Gebäudedienste',
  description: 'Zuverlässige Büroreinigung in Koblenz für Hausverwaltungen, Gewerbe und Wohnanlagen. Feste Abläufe, klare Absprachen und kostenloses Angebot.',
  alternates: { canonical: `${siteConfig.url}/bueroeinigung-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Büroreinigung in Koblenz für Unternehmen, Behörden und Arztpraxen',
  url: `${siteConfig.url}/bueroeinigung-koblenz`,
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
  { icon: '💼', title: 'Büroreinigung',        desc: 'Tägliche oder wöchentliche Unterhaltsreinigung für Verwaltungsgebäude, Bürokomplexe und Behörden – gründlich und pünktlich nach Ablaufplan.' },
  { icon: '🚿', title: 'Sanitäranlagen',       desc: 'Desinfizierende Reinigung von WC-Bereichen, Waschräumen und Armaturen – besonders wichtig für Arztpraxen und Kanzleien mit Publikumsverkehr.' },
  { icon: '☕', title: 'Teeküche & Meetingräume', desc: 'Hygienische Reinigung von Aufenthaltsräumen, Küchenbereichen und Besprechungsräumen – täglich frisch für Ihr Team und Ihre Gäste.' },
  { icon: '🏛️', title: 'Empfang & Lobby',     desc: 'Repräsentativer Eingangsbereich und Wartezonen immer in makellosem Zustand – erster Eindruck zählt, besonders bei Behörden und Kanzleien in Koblenz.' },
  { icon: '🧹', title: 'Bodenreinigung',       desc: 'Maschinelle Pflege von Naturstein, Parkett, Teppich und PVC – wir kennen die richtigen Mittel und Methoden für jeden Belag.' },
  { icon: '🪟', title: 'Fensterreinigung',     desc: 'Streifenfreie Fensterreinigung für Büros und Geschäftshäuser in Koblenz – innen und außen, auf Wunsch mit Osmose-Technik.' },
];

const faqs = [
  {
    q: 'Reinigen Sie in allen Koblenzer Stadtteilen?',
    a: 'Ja – wir sind in der gesamten Stadt Koblenz aktiv, darunter Güls, Metternich, Moselweiß, Lützel, Kesselheim und der Innenstadt. Auch Randlagen und Gewerbegebiete gehören zu unserem Einsatzgebiet.',
  },
  {
    q: 'Wie läuft die erste Besichtigung in Koblenz ab?',
    a: 'Wir besichtigen Ihr Büro oder Ihre Gewerbefläche kostenlos und unverbindlich. Dabei erfassen wir alle relevanten Bereiche, Ihre Wünsche und Besonderheiten. Auf dieser Basis erstellen wir ein transparentes Festpreisangebot – in der Regel innerhalb von 24 Stunden.',
  },
  {
    q: 'Können Sie auch Arztpraxen und Kanzleien in Koblenz reinigen?',
    a: 'Ja. Wir reinigen regelmäßig Arztpraxen, Zahnarztpraxen, Steuerberaterkanzleien und Anwaltsbüros in Koblenz. Dabei legen wir besonderen Wert auf Hygiene, Diskretion und zuverlässige Einhaltung der Reinigungszeiten.',
  },
  {
    q: 'Gibt es Rahmenverträge für regelmäßige Büroreinigung in Koblenz?',
    a: 'Ja. Wir schließen gerne Jahresverträge ab, die Ihnen Planungssicherheit und stabile Preise garantieren. Monatliche Kündigungsoptionen sind auf Wunsch ebenfalls möglich.',
  },
];

export default function BueroeinigungKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Büroreinigung Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Büroreinigung <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Zuverlässige Büroreinigung für Unternehmen, Behörden, Arztpraxen und Kanzleien in Koblenz. Wir übernehmen die komplette Unterhaltsreinigung Ihrer Flächen – zu festen Zeiten, mit dokumentierten Abläufen und einem persönlichen Ansprechpartner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot?service=B%C3%BCroreinigung&city=Koblenz&source=regional-page" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
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
            <div className="section-label">Büroreinigung in Koblenz</div>
            <h2 className="mt-4 mb-6">Für Büros, Praxen &<br /><span className="gradient-text">Behörden in Koblenz</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz ist ein bedeutender Wirtschafts- und Verwaltungsstandort. Von Bundesbehörden über mittelständische Unternehmen bis hin zu Arztpraxen und Steuerberaterkanzleien – wir reinigen Büroflächen jeder Größe und Branche in der gesamten Stadt.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Besonders erfahren sind wir in der Reinigung von Praxen mit erhöhten Hygieneanforderungen sowie in der diskreten Betreuung von Kanzleien, bei denen Pünktlichkeit und Verlässlichkeit an erster Stelle stehen. Wir sind in Stadtteilen wie Güls, Metternich, Moselweiß, Lützel und Kesselheim tätig.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Alle Einsätze laufen nach einem festen Ablaufplan. Auf Wunsch erhalten Sie monatliche Reinigungsprotokolle als Nachweis für Ihre Buchhaltung oder Qualitätssicherung.
            </p>
            <Link href="/leistungen/bueroeinigung" className="btn-outline inline-flex">
              Zur Leistungsseite Büroreinigung
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
            <h2 className="mt-4">Was wir bei der Büroreinigung <span className="gradient-text">übernehmen</span></h2>
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
            <Link href="/angebot?service=B%C3%BCroreinigung&city=Koblenz&source=regional-page" className="btn-primary inline-flex">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      <section className="section-padding bg-white">
        <div className="container mx-auto text-center">
          <div className="section-label mx-auto w-fit mb-4">Auch in Ihrer Nähe verfügbar</div>
          <h2 className="mb-8">Büroreinigung auch in <span className="gradient-text">Neuwied & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/bueroeinigung-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Büros, Arztpraxen und Kanzleien in Neuwied</p>
            </Link>
            <Link href="/bueroeinigung-bendorf" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Bendorf</h3>
              <p className="text-slate-500 text-sm mt-1">Für Büros, Praxen und Gewerbe in Bendorf</p>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

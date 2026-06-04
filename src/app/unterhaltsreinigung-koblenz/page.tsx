import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Unterhaltsreinigung Koblenz | Huwa – Zuverlässig & Regelmäßig',
  description: 'Professionelle Unterhaltsreinigung in Koblenz für Büros, Verwaltungsgebäude und Gewerbeimmobilien. Feste Teams, klare Abläufe, Festpreisangebot. Jetzt anfragen.',
  alternates: { canonical: `${siteConfig.url}/unterhaltsreinigung-koblenz` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: 'Professionelle Unterhaltsreinigung in Koblenz für Gewerbe, Büros und Verwaltungsgebäude',
  url: `${siteConfig.url}/unterhaltsreinigung-koblenz`,
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
  { icon: '🏢', title: 'Büroflächen',         desc: 'Tägliche oder wöchentliche Reinigung aller Arbeitsplätze, Besprechungsräume und Gemeinschaftsflächen – nach festem Ablaufplan und dokumentiert.' },
  { icon: '🚿', title: 'Sanitäranlagen',       desc: 'Hygienische Desinfektion von WC-Bereichen, Waschräumen und Armaturen – besonders wichtig in öffentlich genutzten Gebäuden.' },
  { icon: '🛗', title: 'Aufzüge & Flure',      desc: 'Saubere Verkehrsflächen, Aufzugkabinen und Treppenhäuser – regelmäßig gepflegt für Mitarbeiter und Besucher.' },
  { icon: '☕', title: 'Küche & Sozialräume',  desc: 'Küchenbereiche, Pausenräume und Kantinen werden gründlich gereinigt und hygienisch gehalten.' },
  { icon: '🧹', title: 'Bodenreinigung',       desc: 'Maschinelle Pflege von Hartböden, Teppich und Laminat – täglich, wöchentlich oder nach individuellem Intervall.' },
  { icon: '📋', title: 'Reinigungsprotokoll',  desc: 'Lückenlose Dokumentation aller Einsätze – für Qualitätssicherung, Hausverwaltungen und Betriebsprüfungen.' },
];

const faqs = [
  {
    q: 'Was ist der Unterschied zwischen Unterhaltsreinigung und Grundreinigung?',
    a: 'Die Unterhaltsreinigung findet regelmäßig statt – täglich, wöchentlich oder in einem vereinbarten Rhythmus – um den laufenden Sauberkeitsstandard zu erhalten. Die Grundreinigung ist eine intensive Einmalreinigung, z. B. nach Einzug, Renovierung oder Jahresabschluss.',
  },
  {
    q: 'In welchen Koblenzer Gewerbegebieten sind Sie tätig?',
    a: 'Wir betreuen Gewerbeobjekte in ganz Koblenz – in Gewerbepark Koblenz (Güls), Kesselheim, Metternich, Lützel sowie in der Innenstadt und in Ehrenbreitstein. Auch Behörden und Verwaltungsgebäude gehören zu unserem Kundenstamm.',
  },
  {
    q: 'Können Sie außerhalb der Bürozeiten reinigen?',
    a: 'Ja. Wir reinigen bevorzugt früh morgens vor Arbeitsbeginn oder abends nach Büroschluss. Das vermeidet Störungen im laufenden Betrieb. Nacht- und Wochenendtermine sind auf Anfrage möglich.',
  },
  {
    q: 'Wie wird der Preis für die Unterhaltsreinigung in Koblenz berechnet?',
    a: 'Der Preis richtet sich nach der Fläche in m², dem Reinigungsintervall und dem Leistungsumfang. Nach einer kostenlosen Besichtigung erhalten Sie ein transparentes Festpreisangebot ohne versteckte Kosten.',
  },
];

export default function UnterhaltsreinigungKoblenz() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Unterhaltsreinigung Koblenz' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Koblenz & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              Unterhaltsreinigung <span className="gradient-text">Koblenz</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Regelmäßige Unterhaltsreinigung für Büros, Verwaltungsgebäude, Arztpraxen und Gewerbeimmobilien in Koblenz. Mit festem Reinigungsteam, dokumentierten Abläufen und einem persönlichen Ansprechpartner – verlässlich und zu einem transparenten Festpreis.
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
            <div className="section-label">Unterhaltsreinigung in Koblenz</div>
            <h2 className="mt-4 mb-6">Für Büros, Gewerbe &<br /><span className="gradient-text">Verwaltungen in Koblenz</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Koblenz ist ein bedeutender Verwaltungs- und Wirtschaftsstandort am Deutschen Eck. Von Bundesbehörden über mittelständische Unternehmen bis hin zu Arztpraxen – die Anforderungen an regelmäßige Unterhaltsreinigung sind hoch und vielfältig.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Wir betreuen Büroflächen, Verwaltungsgebäude, Industrieanlagen und Praxen in der gesamten Stadt – in Güls, Metternich, Moselweiß, Lützel, Kesselheim und der Innenstadt. Jedes Objekt erhält ein festes Reinigungsteam mit einem Objektleiter als direktem Ansprechpartner.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Auf Wunsch erstellen wir monatliche Reinigungsprotokolle als Nachweis für Ihre Qualitätssicherung, Buchhaltung oder Betriebsprüfung.
            </p>
            <Link href="/leistungen/unterhaltsreinigung" className="btn-outline inline-flex">
              Zur Leistungsseite Unterhaltsreinigung
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
            <h2 className="mt-4">Was die Unterhaltsreinigung <span className="gradient-text">umfasst</span></h2>
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
          <h2 className="mb-8">Unterhaltsreinigung auch in <span className="gradient-text">Neuwied & Bendorf</span></h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <Link href="/bueroreinigung-neuwied" className="card p-6 hover:border-primary/30 transition-all text-left group">
              <div className="text-2xl mb-3">🏢</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">Büroreinigung Neuwied</h3>
              <p className="text-slate-500 text-sm mt-1">Für Büros, Arztpraxen und Kanzleien in Neuwied</p>
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

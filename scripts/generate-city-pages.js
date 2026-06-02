#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'app');

const cities = [
  {
    name: 'Andernach', slug: 'andernach', zip: '56626',
    intro: 'Andernach liegt direkt am Rhein zwischen Neuwied und Koblenz. Historische Innenstadt, Wohnanlagen am Rheinufer und gewachsene Gewerbegebiete prägen das Stadtbild.',
    local: 'Stadtmitte, Namedy, Miesenheim, Kell und Eich',
    context: 'am Rhein südlich von Neuwied',
    faq_location: 'Andernach und den Stadtteilen Namedy, Miesenheim und Kell',
  },
  {
    name: 'Mayen', slug: 'mayen', zip: '56727',
    intro: 'Mayen ist das Zentrum der Eifelregion und vereint historische Altstadt mit modernen Gewerbegebieten. Praxen, Büros und Wohnanlagen stellen vielfältige Reinigungsanforderungen.',
    local: 'Stadtmitte, Hausen, Kürrenberg und Alzheim',
    context: 'in der Eifel',
    faq_location: 'Mayen und den Ortsteilen Hausen, Kürrenberg und Alzheim',
  },
  {
    name: 'Bad Neuenahr-Ahrweiler', slug: 'bad-neuenahr-ahrweiler', zip: '53474',
    intro: 'Bad Neuenahr-Ahrweiler vereint Kurstadt und Weinbaugebiet im Ahrtal. Hotels, Praxen, Verwaltungsgebäude und Wohnanlagen benötigen zuverlässige Reinigungsdienste.',
    local: 'Bad Neuenahr, Ahrweiler, Bachem und Heimersheim',
    context: 'im Ahrtal',
    faq_location: 'Bad Neuenahr-Ahrweiler mit allen Stadtteilen wie Ahrweiler, Bachem und Heimersheim',
  },
  {
    name: 'Lahnstein', slug: 'lahnstein', zip: '56112',
    intro: 'Lahnstein liegt am Zusammenfluss von Lahn und Rhein, direkt neben Koblenz. Wohn-, Gewerbe- und historische Objekte in Ober- und Niederlahnstein erfordern professionelle Pflege.',
    local: 'Oberlahnstein, Niederlahnstein und Friedrichssegen',
    context: 'am Rhein-Lahn-Eck',
    faq_location: 'Lahnstein (Oberlahnstein und Niederlahnstein)',
  },
  {
    name: 'Boppard', slug: 'boppard', zip: '56154',
    intro: 'Boppard liegt im UNESCO-Welterbe Oberes Mittelrheintal. Hotellerie, Gastronomie, Wohn- und Gewerbeobjekte stellen besondere Anforderungen an Sauberkeit und regelmäßige Pflege.',
    local: 'Boppard Stadt, Bad Salzig, Buchholz und Hirzenach',
    context: 'im Mittelrheintal',
    faq_location: 'Boppard und den Ortsteilen Bad Salzig, Buchholz und Hirzenach',
  },
];

const services = [
  {
    slug: 'gebaudereinigung',
    title: 'Gebäudereinigung',
    metaDesc: (c) => `Professionelle Gebäudereinigung in ${c.name}: Büroreinigung, Treppenhausreinigung, Glasreinigung, Hausmeisterdienste & Winterdienst. Kostenlose Besichtigung & Festpreisangebot.`,
    heroText: (c) => `Ihr zuverlässiger Partner für professionelle Gebäudereinigung, Hausmeisterdienste und Winterdienst in ${c.name}. Wir kennen die Region ${c.context} – und die Bedürfnisse von Hausverwaltungen, Gewerbetreibenden und Eigentümergemeinschaften vor Ort.`,
    whyTitle: (c) => `Warum Huwa in ${c.name}?`,
    whyIntro: (c) => `Als Reinigungsunternehmen mit Sitz in Neuwied sind wir schnell in ${c.name} – ohne lange Anfahrtswege und mit einem festen Ansprechpartner für Ihr Objekt. Wir betreuen Büros, Wohnanlagen, Praxen und Treppenhäuser in ${c.local}.`,
    whyP2: (c) => `Jeder Auftrag in ${c.name} wird von einem Objektleiter begleitet – kein Call-Center, kein Weiterverbinden. Direkt, persönlich, verlässlich.`,
    svcItems: (c) => [
      { icon: '🏢', title: 'Gebäudereinigung',    desc: `Außen- und Innenbereiche von Büro- und Gewerbegebäuden in ${c.name}.` },
      { icon: '💼', title: 'Büroreinigung',        desc: `Regelmäßige Unterhaltsreinigung von Büroflächen und Gemeinschaftsbereichen.` },
      { icon: '🏠', title: 'Treppenhausreinigung', desc: `Wöchentliche Treppenhausreinigung mit Protokoll für WEGs und Hausverwaltungen.` },
      { icon: '🪟', title: 'Glasreinigung',        desc: `Fenster und Glasfassaden – streifenfrei, auch per Osmose-Technik.` },
      { icon: '🔧', title: 'Hausmeisterdienste',   desc: `Objektbetreuung und Kleinreparaturen für Gebäude in ${c.name}.` },
      { icon: '❄️', title: 'Winterdienst',         desc: `Räumen und Streuen auf Zufahrten und Gehwegen – auch früh morgens.` },
    ],
    faq: (c) => [
      { q: `Wie schnell können Sie in ${c.name} starten?`, a: `Nach einem Vor-Ort-Termin und Auftragserteilung starten wir in der Regel innerhalb weniger Tage. Bei dringenden Anfragen aus ${c.name} finden wir meist eine schnelle Lösung.` },
      { q: `Betreuen Sie auch kleinere Objekte in ${c.name}?`, a: `Ja – wir reinigen Objekte aller Größen in ${c.name}, vom einzelnen Treppenhaus über kleine Büros bis zu größeren Gewerbekomplexen.` },
      { q: `Gibt es einen festen Ansprechpartner für ${c.name}?`, a: `Für jedes Objekt in ${c.name} gibt es einen festen Objektleiter, der Ihr Gebäude und Ihre Anforderungen genau kennt.` },
      { q: `Welche Stadtteile in ${c.name} betreuen Sie?`, a: `Wir sind in ganz ${c.faq_location} aktiv und betreuen Objekte im gesamten Einzugsgebiet.` },
    ],
  },
  {
    slug: 'bueroeinigung',
    title: 'Büroreinigung',
    metaDesc: (c) => `Professionelle Büroreinigung in ${c.name}: Regelmäßige Unterhaltsreinigung für Büros, Praxen & Gewerberäume. Festes Team, Reinigungsprotokoll, Festpreis.`,
    heroText: (c) => `Saubere Büros in ${c.name} – zuverlässig, termingerecht und mit festem Reinigungsteam. Wir übernehmen die regelmäßige Unterhaltsreinigung Ihrer Büroflächen, Sanitäranlagen und Sozialräume.`,
    whyTitle: (c) => `Büroreinigung in ${c.name} – was Sie erwartet`,
    whyIntro: (c) => `Wir betreuen Bürogebäude, Praxen, Kanzleien und Gewerbeeinheiten in ${c.local}. Jedes Objekt hat ein fest zugeteiltes Reinigungsteam und einen Objektleiter als direkten Ansprechpartner.`,
    whyP2: (c) => `Reinigungsprotokolle geben Ihnen jederzeit Transparenz. Auf Wunsch erweitern wir die Büroreinigung in ${c.name} um Glasreinigung, Grundreinigung oder Winterdienst.`,
    svcItems: (c) => [
      { icon: '🗄️', title: 'Schreibtische & Arbeitsflächen', desc: `Staubwischen, Desinfizieren, Ordnung herstellen.` },
      { icon: '🚿', title: 'Sanitäranlagen',                  desc: `Desinfektion, Reinigung und Auffüllung von Seifen- und Papierspendern.` },
      { icon: '🍽️', title: 'Küche & Sozialräume',            desc: `Reinigung von Kühlschrank, Mikrowelle, Spüle und Arbeitsflächen.` },
      { icon: '🪟', title: 'Fenster & Glasflächen',           desc: `Auf Wunsch regelmäßige Fensterreinigung innen.` },
      { icon: '🏢', title: 'Eingangsbereiche',                desc: `Empfang, Foyer und Aufzüge – immer sauber für Besucher.` },
      { icon: '📋', title: 'Reinigungsprotokoll',             desc: `Lückenlose Dokumentation jedes Einsatzes in ${c.name}.` },
    ],
    faq: (c) => [
      { q: `Wie oft wird mein Büro in ${c.name} gereinigt?`, a: `Je nach Bedarf täglich, 3× pro Woche oder wöchentlich. Wir erstellen einen individuellen Reinigungsplan für Ihr Büro in ${c.name}.` },
      { q: `Wird immer dasselbe Team geschickt?`, a: `Ja – jedes Bürogebäude in ${c.name} hat ein festes Reinigungsteam. Sicherheit und Vertrauen sind uns wichtig.` },
      { q: `Können Sie auch Praxen oder Kanzleien in ${c.name} reinigen?`, a: `Ja, wir reinigen Arztpraxen, Zahnarztpraxen, Rechtsanwaltskanzleien und andere Gewerbebetriebe in ${c.name} nach individuellen Hygienestandards.` },
      { q: `Was kostet die Büroreinigung in ${c.name}?`, a: `Der Preis richtet sich nach Fläche, Intervall und Umfang. Wir erstellen ein transparentes Festpreisangebot nach kostenloser Besichtigung in ${c.name}.` },
    ],
  },
  {
    slug: 'treppenhausreinigung',
    title: 'Treppenhausreinigung',
    metaDesc: (c) => `Treppenhausreinigung in ${c.name}: Zuverlässige, wöchentliche Reinigung von Treppenhäusern, Eingangsbereichen & Aufzügen. Mit Protokoll für WEGs & Hausverwaltungen.`,
    heroText: (c) => `Gepflegte Treppenhäuser in ${c.name} – pünktlich, gründlich und mit Protokoll. Wir übernehmen die regelmäßige Reinigung von Treppenhäusern, Eingängen und Gemeinschaftsflächen für WEGs und Hausverwaltungen.`,
    whyTitle: (c) => `Treppenhausreinigung in ${c.name}`,
    whyIntro: (c) => `Saubere Treppenhäuser steigern den Wert und das Wohnklima einer Immobilie. Wir betreuen Wohnanlagen in ${c.local} mit zuverlässigem, wöchentlichem Reinigungsrhythmus und Dokumentation.`,
    whyP2: (c) => `Jede Reinigung in ${c.name} wird protokolliert und im Objekt hinterlegt – Transparenz für Eigentümer, Verwalter und Mieter. Auf Wunsch erweitern wir den Service um Kellerreinigung oder Tiefgaragenpflege.`,
    svcItems: (c) => [
      { icon: '🪜', title: 'Treppenabsätze & Stufen', desc: `Wischen, Kehren und Grundreinigung auf Anfrage.` },
      { icon: '🚪', title: 'Eingangsbereich',          desc: `Türen, Briefkastenanlage und Fußmatten sauber halten.` },
      { icon: '🛗', title: 'Aufzug',                   desc: `Wände, Boden und Türen des Aufzugs regelmäßig gereinigt.` },
      { icon: '🏠', title: 'Handläufe & Geländer',    desc: `Desinfektion und Pflege aller Handläufe.` },
      { icon: '🕷️', title: 'Spinnwebenkontrolle',     desc: `Decken und Ecken frei von Spinnweben halten.` },
      { icon: '📋', title: 'Reinigungsprotokoll',      desc: `Lückenlose Dokumentation im Objekt – auf Wunsch digital.` },
    ],
    faq: (c) => [
      { q: `Wie oft wird das Treppenhaus in ${c.name} gereinigt?`, a: `In der Regel wöchentlich – auf Wunsch auch zweiwöchentlich. Wir passen den Rhythmus an Ihre Wohnanlage in ${c.name} an.` },
      { q: `Gibt es ein Reinigungsprotokoll?`, a: `Ja – nach jedem Einsatz in ${c.name} wird ein Protokoll ausgefüllt und im Objekt hinterlegt. So haben Verwalter und Eigentümer jederzeit Überblick.` },
      { q: `Was ist alles in der Treppenhausreinigung enthalten?`, a: `Standardmäßig: Treppenabsätze, Handläufe, Eingangstür, Briefkastenanlage und Aufzug (sofern vorhanden). Kellerreinigung auf Anfrage.` },
      { q: `Betreuen Sie WEGs in ${c.name}?`, a: `Ja, wir sind langjähriger Partner von Hausverwaltungen und WEGs in ${c.faq_location}. Wir kennen die gesetzlichen Anforderungen an Gemeinschaftsflächen.` },
    ],
  },
  {
    slug: 'hausmeisterservice',
    title: 'Hausmeisterservice',
    metaDesc: (c) => `Hausmeisterservice in ${c.name}: Zuverlässige Objektbetreuung, Kleinreparaturen, Müllentsorgung & Winterdienst. Für WEGs, Hausverwaltungen & Privatvermieter.`,
    heroText: (c) => `Zuverlässiger Hausmeisterservice in ${c.name} – von der Glühbirne bis zum Winterdienst. Wir übernehmen die komplette Objektbetreuung für Wohnanlagen, Büros und Gewerbeimmobilien.`,
    whyTitle: (c) => `Hausmeisterservice in ${c.name}`,
    whyIntro: (c) => `Wir betreuen Objekte in ${c.local} mit festen Ansprechpartnern und schneller Reaktionszeit. Ob regelmäßige Kontrollgänge, Kleinreparaturen oder dringende Einsätze – wir sind für Sie da.`,
    whyP2: (c) => `Als lokales Unternehmen ${c.context} kennen wir die Besonderheiten der Region und sind schnell vor Ort. Alle Einsätze werden dokumentiert und können jederzeit abgerufen werden.`,
    svcItems: (c) => [
      { icon: '🔧', title: 'Kleinreparaturen',       desc: `Glühbirnen, Türschlösser, Dichtungen – schnell erledigt.` },
      { icon: '🗑️', title: 'Müllentsorgung',         desc: `Tonnen bereitstellen, Müllraum pflegen, Sperrmüll organisieren.` },
      { icon: '❄️', title: 'Winterdienst',           desc: `Räumen und Streuen auf Zufahrten und Gehwegen ${c.context}.` },
      { icon: '🌿', title: 'Außenanlage',            desc: `Grünpflege, Laubbeseitigung und Pflasterreinigung.` },
      { icon: '👁️', title: 'Kontrollgänge',          desc: `Regelmäßige Sichtkontrolle von Gebäude, Keller und Außenanlagen.` },
      { icon: '📋', title: 'Protokollierung',        desc: `Alle Einsätze werden dokumentiert – für Eigentümer und Verwalter.` },
    ],
    faq: (c) => [
      { q: `Was gehört alles zum Hausmeisterservice in ${c.name}?`, a: `Zu unserem Standardpaket in ${c.name} gehören Kontrollgänge, Kleinreparaturen, Müllentsorgung, Winterdienst und Grünpflege. Wir erstellen ein individuelles Paket für Ihr Objekt.` },
      { q: `Wie schnell reagieren Sie bei dringenden Einsätzen in ${c.name}?`, a: `Für Bestandskunden in ${c.name} garantieren wir schnelle Reaktionszeiten. Bei Notfällen melden wir uns innerhalb weniger Stunden.` },
      { q: `Können Sie auch den Winterdienst in ${c.name} übernehmen?`, a: `Ja – wir übernehmen Räum- und Streupflicht für Zufahrten, Gehwege und Parkplätze in ${c.name}. Bereitschaft ab 4 Uhr, auch an Wochenenden.` },
      { q: `Für wen ist der Hausmeisterservice in ${c.name} geeignet?`, a: `Unser Service in ${c.name} ist ideal für Hausverwaltungen, WEGs, Privatvermieter und Unternehmen, die eine professionelle Objektbetreuung ohne eigenes Personal benötigen.` },
    ],
  },
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generatePage(city, svc) {
  const fnName = `${capitalize(svc.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()))}${city.name.replace(/[^a-zA-Z]/g, '')}`;

  const svcItems = svc.svcItems(city);
  const faqItems = svc.faq(city);

  return `import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '${svc.title} ${city.name} | Huwa – Ihr lokaler Partner',
  description: '${svc.metaDesc(city)}',
  alternates: { canonical: \`\${siteConfig.url}/${svc.slug}-${city.slug}\` },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: '${svc.title} in ${city.name} und Umgebung',
  url: \`\${siteConfig.url}/${svc.slug}-${city.slug}\`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: '${city.name}',
    addressRegion: 'Rheinland-Pfalz',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: '${city.name}' },
  priceRange: '€€',
};

export default function ${fnName}() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: '${svc.title} ${city.name}' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">${city.name} & Umgebung</div>
            <h1 className="text-white mb-4 leading-tight">
              ${svc.title} <span className="gradient-text">${city.name}</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              ${svc.heroText(city)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/angebot" className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
              <a href={\`tel:\${siteConfig.phone}\`} className="btn-white px-8 py-3.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + FAQ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label">${svc.whyTitle(city)}</div>
            <h2 className="mt-4 mb-6">Lokale Präsenz –<br /><span className="gradient-text">persönlicher Service</span></h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              ${city.intro}
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              ${svc.whyIntro(city)}
            </p>
            <p className="text-slate-600 leading-relaxed">
              ${svc.whyP2(city)}
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {[
                { val: '50+', label: 'Kunden in der Region' },
                { val: '3+',  label: 'Jahre Erfahrung' },
                { val: 'DGUV', label: 'Zertifiziert' },
              ].map(s => (
                <div key={s.label} className="card p-5 text-center">
                  <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                  <div className="text-slate-500 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            ${faqItems.map(f => `<details className="card p-5 group cursor-pointer">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                <span>${f.q}</span>
                <svg className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">${f.a}</p>
            </details>`).join('\n            ')}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Leistungen in ${city.name}</div>
            <h2 className="mt-4">Was wir in ${city.name} <span className="gradient-text">anbieten</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ${svcItems.map((s, i) => `{ icon: '${s.icon}', title: '${s.title}', desc: '${s.desc.replace(/'/g, "\\'")}', accent: ${i % 2 === 0} }`).join(',\n              ')}
            ].map((s) => (
              <div key={s.title} className={\`card p-6 hover:border-\${s.accent ? 'primary' : 'green'}/30 transition-all\`}>
                <div className={\`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 \${s.accent ? 'bg-primary/8' : 'bg-green/8'}\`}>{s.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/leistungen" className="btn-outline inline-flex">Alle Leistungen ansehen</Link>
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Kostenloser Download</div>
            <h3 className="text-lg font-bold text-dark">12-Punkte Haustechnik-Checkliste für Hausverwaltungen</h3>
            <p className="text-gray-500 text-sm mt-1">Was muss wann geprüft werden? Jetzt kostenlos herunterladen.</p>
          </div>
          <Link href="/checkliste" className="btn-primary whitespace-nowrap shrink-0">Kostenlos herunterladen →</Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
`;
}

let created = 0;
for (const city of cities) {
  for (const svc of services) {
    const dir = path.join(BASE, `${svc.slug}-${city.slug}`);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'page.tsx');
    fs.writeFileSync(file, generatePage(city, svc), 'utf8');
    console.log(`✓ ${svc.slug}-${city.slug}`);
    created++;
  }
}
console.log(`\n✅ ${created} Seiten erstellt.`);

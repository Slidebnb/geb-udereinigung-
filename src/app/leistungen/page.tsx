import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: `${siteConfig.url}/leistungen` },
  title: 'Alle Leistungen | Huwa Gebäudereinigung & Hausmeisterdienste',
  description: 'Entdecken Sie alle Reinigungsleistungen von Huwa: Büroreinigung, Glasreinigung, Grundreinigung, Hausmeisterdienste, Winterdienst und mehr – in Neuwied, Koblenz, Westerwald und Haiger.',
};

const services = [
  { icon: '🏢', title: 'Gebäudereinigung',    desc: 'Professionelle Reinigung von Bürogebäuden, Wohnhäusern und Gewerbeimmobilien – innen und außen.', href: '/leistungen/gebaeudereinigung',    highlights: ['Außenfassaden', 'Eingangsbereiche', 'Tiefgaragen', 'Keller & Lager'],        accent: true },
  { icon: '💼', title: 'Büroreinigung',        desc: 'Saubere Büros fördern Produktivität und hinterlassen bei Besuchern einen professionellen Eindruck.',   href: '/leistungen/bueroeinigung',         highlights: ['Schreibtische', 'Sanitäranlagen', 'Küchenbereiche', 'Bodenreinigung'],       accent: false },
  { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Gepflegte Treppenhäuser und Gemeinschaftsflächen steigern den Wert und das Wohnklima Ihrer Immobilie.', href: '/leistungen/treppenhausreinigung',  highlights: ['Treppen & Absätze', 'Briefkastenanlage', 'Gemeinschaftsräume', 'Klingeln'], accent: true },
  { icon: '🪟', title: 'Glasreinigung',        desc: 'Streifenfreie, glänzende Fenster und Glasflächen – auch Schaufenster und Glasfassaden in jeder Höhe.', href: '/leistungen/glasreinigung',         highlights: ['Fenster innen & außen', 'Schaufenster', 'Glasdächer', 'Wintergärten'],     accent: false },
  { icon: '✨', title: 'Grundreinigung',       desc: 'Intensive Tiefenreinigung für einen makellosen Neustart – ideal nach Einzug, Auszug oder Renovierung.', href: '/leistungen/grundreinigung',        highlights: ['Tiefenreinigung', 'Bodenaufbereitung', 'Sanitärdesinfektion', 'Küche'],    accent: true },
  { icon: '🔄', title: 'Unterhaltsreinigung',  desc: 'Regelmäßige Reinigung nach individuellem Plan – täglich, wöchentlich oder zweiwöchentlich.',           href: '/leistungen/unterhaltsreinigung',   highlights: ['Flexible Intervalle', 'Gleichbleibendes Team', 'Protokolle', 'Kontrolle'],  accent: false },
  { icon: '🏗️', title: 'Baureinigung',        desc: 'Fachgerechte Baugrob- und Baufeinreinigung – damit Ihr Objekt nach dem Bau bezugsfertig übergeben wird.', href: '/leistungen/baureinigung',        highlights: ['Grobreinigung', 'Feinreinigung', 'Glasreinigung', 'Entsorgung'],           accent: true },
  { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Von kleinen Reparaturen bis zur vollständigen Objektbetreuung – schnell, zuverlässig und günstig.',     href: '/leistungen/hausmeisterdienste',    highlights: ['Reparaturen', 'Glühbirnen', 'Müllentsorgung', 'Inspektion'],               accent: false },
  { icon: '❄️', title: 'Winterdienst',        desc: 'Wir übernehmen Ihre Räum- und Streupflicht – zuverlässig auch früh morgens, am Wochenende und Feiertagen.', href: '/leistungen/winterdienst',       highlights: ['Schneeräumung', 'Streuen & Sichern', 'Dokumentation', 'Haftungsschutz'], accent: true },
  { icon: '🌿', title: 'Gartenarbeiten',      desc: 'Professionelle Gartenpflege das ganze Jahr – Rasenmähen, Heckenschnitt, Laubbeseitigung und mehr.',     href: '/leistungen/gartenarbeiten',        highlights: ['Rasenpflege', 'Heckenschnitt', 'Laubentsorgung', 'Beetpflege'],           accent: false },
];

export default function LeistungenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Leistungen' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Unsere Leistungen</div>
            <h1 className="text-white mb-4">Alles aus einer Hand –<br /><span className="gradient-text">10 Leistungsbereiche</span></h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Von der täglichen Unterhaltsreinigung bis zum kompletten Hausmeisterservice. Ihr verlässlicher Partner in Neuwied, Koblenz, Westerwald und Haiger.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => (
            <div key={s.href} className={`card flex flex-col p-7 hover:border-${s.accent ? 'primary' : 'green'}/30 transition-all duration-200 group`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 ${s.accent ? 'bg-primary/8' : 'bg-green/8'}`}>
                {s.icon}
              </div>
              <h2 className={`text-lg font-bold text-dark mb-3 transition-colors ${s.accent ? 'group-hover:text-primary' : 'group-hover:text-green'}`}>{s.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className={`w-4 h-4 flex-shrink-0 ${s.accent ? 'text-primary' : 'text-green'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {h}
                  </li>
                ))}
              </ul>
              <Link href={s.href} className={`btn-outline justify-center text-sm py-2.5 ${s.accent ? '' : 'border-green/30 text-green hover:bg-green hover:border-green hover:text-white'}`}>Details ansehen</Link>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}

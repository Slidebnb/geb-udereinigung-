import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Alle Leistungen | Gebäudereinigung & Hausmeisterdienste',
  description: 'Entdecken Sie alle Reinigungsleistungen von Huwa: Büroreinigung, Glasreinigung, Grundreinigung, Hausmeisterdienste, Winterdienst und mehr. Jetzt Angebot anfragen!',
};

const services = [
  { icon: '🏢', title: 'Gebäudereinigung', desc: 'Professionelle Reinigung von Bürogebäuden, Wohnhäusern und Gewerbeimmobilien – innen und außen. Wir sorgen für ein sauberes und einladendes Erscheinungsbild Ihrer Immobilie.', href: '/leistungen/gebaeudereinigung', highlights: ['Außenfassaden', 'Eingangsbereiche', 'Tiefgaragen', 'Keller & Lager'] },
  { icon: '💼', title: 'Büroreinigung', desc: 'Saubere Büros fördern Produktivität, reduzieren Krankheitstage und hinterlassen bei Besuchern einen professionellen Eindruck. Täglich, wöchentlich oder nach Bedarf.', href: '/leistungen/bueroeinigung', highlights: ['Schreibtische & Oberflächen', 'Sanitäranlagen', 'Küchenbereiche', 'Bodenreinigung'] },
  { icon: '🏗️', title: 'Treppenhausreinigung', desc: 'Gepflegte Treppenhäuser und Gemeinschaftsflächen steigern den Wert Ihrer Immobilie und sorgen für ein angenehmes Wohnklima. Regelmäßige Reinigung nach Plan.', href: '/leistungen/treppenhausreinigung', highlights: ['Treppen & Absätze', 'Briefkastenanlage', 'Gemeinschaftsräume', 'Klingelanlage'] },
  { icon: '🪟', title: 'Glasreinigung', desc: 'Streifenfreie, glänzende Fenster und Glasflächen durch professionelle Technik. Wir reinigen Fenster in jeder Höhe – auch Schaufenster und Glasfassaden.', href: '/leistungen/glasreinigung', highlights: ['Fenster innen & außen', 'Schaufenster', 'Glasdächer', 'Wintergärten'] },
  { icon: '✨', title: 'Grundreinigung', desc: 'Intensive Tiefenreinigung für einen makellosen Neustart. Ideal nach Einzug, vor Auszug oder nach langer Vernachlässigung. Wir reinigen bis in den letzten Winkel.', href: '/leistungen/grundreinigung', highlights: ['Komplette Tiefenreinigung', 'Bodenaufbereitung', 'Sanitärdesinfektion', 'Küchengründlichkeit'] },
  { icon: '🔄', title: 'Unterhaltsreinigung', desc: 'Regelmäßige Reinigung nach individuellem Plan. Wir kommen täglich, wöchentlich oder zweiwöchentlich – je nach Bedarf und Budget.', href: '/leistungen/unterhaltsreinigung', highlights: ['Flexible Intervalle', 'Gleichbleibendes Team', 'Protokollierte Reinigung', 'Qualitätskontrolle'] },
  { icon: '🔨', title: 'Baureinigung', desc: 'Nach Baumaßnahmen, Renovierungen oder Umbauten sorgen wir für eine fachgerechte Baufein- und Grobreinigung – damit Ihr Objekt bezugsfertig ist.', href: '/leistungen/baureinigung', highlights: ['Grobreinigung', 'Feinreinigung', 'Glasreinigung nach Bau', 'Bauschutt-Entsorgung'] },
  { icon: '🔧', title: 'Hausmeisterdienste', desc: 'Von kleinen Reparaturen bis zur vollständigen Objektbetreuung – Ihr Hausmeister auf Abruf. Schnell, zuverlässig und kostengünstig.', href: '/leistungen/hausmeisterdienste', highlights: ['Kleine Reparaturen', 'Glühbirnenwechsel', 'Müllentsorgung', 'Objektinspektion'] },
  { icon: '❄️', title: 'Winterdienst', desc: 'Wir übernehmen Ihre gesetzliche Räum- und Streupflicht. Zuverlässig auch früh morgens, am Wochenende und an Feiertagen.', href: '/leistungen/winterdienst', highlights: ['Schneeräumung', 'Streuen & Sichern', 'Dokumentation', 'Haftungsschutz'] },
  { icon: '🌿', title: 'Gartenarbeiten', desc: 'Professionelle Gartenpflege das ganze Jahr – Rasenmähen, Heckenschnitt, Laubbeseitigung und mehr. Ihr Garten bleibt immer gepflegt.', href: '/leistungen/gartenarbeiten', highlights: ['Rasenpflege', 'Heckenschnitt', 'Laubentsorgung', 'Beetpflege'] },
];

export default function LeistungenPage() {
  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Leistungen' }]} />
          <h1 className="mt-4 mb-2">Unsere Leistungen</h1>
          <p className="text-gray-600 max-w-2xl">Professionelle Gebäudereinigung und Hausmeisterdienste in Düsseldorf und dem Rheinland – alles aus einer Hand.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(s => (
            <div key={s.href} className="card p-6 flex flex-col">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h2 className="text-xl mb-3">{s.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {s.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {h}
                  </li>
                ))}
              </ul>
              <Link href={s.href} className="btn-primary justify-center">Details ansehen</Link>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  { icon: '🏢', title: 'Gebäudereinigung',    desc: 'Professionelle Reinigung von Bürogebäuden, Wohnhäusern und Gewerbeimmobilien – innen und außen.', href: '/leistungen/gebaeudereinigung',    highlights: ['Außenfassaden', 'Eingangsbereiche', 'Tiefgaragen', 'Keller & Lager'],        accent: true, tag: 'Reinigung' },
  { icon: '💼', title: 'Büroreinigung',        desc: 'Saubere Büros fördern Produktivität und hinterlassen bei Besuchern einen professionellen Eindruck.',   href: '/leistungen/bueroeinigung',         highlights: ['Schreibtische', 'Sanitäranlagen', 'Küchenbereiche', 'Bodenreinigung'],       accent: false, tag: 'Reinigung' },
  { icon: '🏠', title: 'Treppenhausreinigung', desc: 'Gepflegte Treppenhäuser und Gemeinschaftsflächen steigern den Wert und das Wohnklima Ihrer Immobilie.', href: '/leistungen/treppenhausreinigung',  highlights: ['Treppen & Absätze', 'Briefkastenanlage', 'Gemeinschaftsräume', 'Klingeln'], accent: true, tag: 'Reinigung' },
  { icon: '🪟', title: 'Glasreinigung',        desc: 'Streifenfreie, glänzende Fenster und Glasflächen – auch Schaufenster und Glasfassaden in jeder Höhe.', href: '/leistungen/glasreinigung',         highlights: ['Fenster innen & außen', 'Schaufenster', 'Glasdächer', 'Wintergärten'],     accent: false, tag: 'Reinigung' },
  { icon: '✨', title: 'Grundreinigung',       desc: 'Intensive Tiefenreinigung für einen makellosen Neustart – ideal nach Einzug, Auszug oder Renovierung.', href: '/leistungen/grundreinigung',        highlights: ['Tiefenreinigung', 'Bodenaufbereitung', 'Sanitärdesinfektion', 'Küche'],    accent: true, tag: 'Reinigung' },
  { icon: '🔄', title: 'Unterhaltsreinigung',  desc: 'Regelmäßige Reinigung nach individuellem Plan – täglich, wöchentlich oder zweiwöchentlich.',           href: '/leistungen/unterhaltsreinigung',   highlights: ['Flexible Intervalle', 'Gleichbleibendes Team', 'Protokolle', 'Kontrolle'],  accent: false, tag: 'Reinigung' },
  { icon: '🏗️', title: 'Baureinigung',        desc: 'Fachgerechte Baugrob- und Baufeinreinigung – damit Ihr Objekt nach dem Bau bezugsfertig übergeben wird.', href: '/leistungen/baureinigung',        highlights: ['Grobreinigung', 'Feinreinigung', 'Glasreinigung', 'Entsorgung'],           accent: true, tag: 'Reinigung' },
  { icon: '🔧', title: 'Hausmeisterdienste',   desc: 'Von kleinen Reparaturen bis zur vollständigen Objektbetreuung – schnell, zuverlässig und günstig.',     href: '/leistungen/hausmeisterdienste',    highlights: ['Reparaturen', 'Glühbirnen', 'Müllentsorgung', 'Inspektion'],               accent: false, tag: 'Hausmeister' },
  { icon: '❄️', title: 'Winterdienst',        desc: 'Wir übernehmen Ihre Räum- und Streupflicht – zuverlässig auch früh morgens, am Wochenende und Feiertagen.', href: '/leistungen/winterdienst',       highlights: ['Schneeräumung', 'Streuen & Sichern', 'Dokumentation', 'Haftungsschutz'], accent: true, tag: 'Saisonal' },
  { icon: '🌿', title: 'Gartenarbeiten',      desc: 'Professionelle Gartenpflege das ganze Jahr – Rasenmähen, Heckenschnitt, Laubbeseitigung und mehr.',     href: '/leistungen/gartenarbeiten',        highlights: ['Rasenpflege', 'Heckenschnitt', 'Laubentsorgung', 'Beetpflege'],           accent: false, tag: 'Saisonal' },
];

const tags = ['Alle', 'Reinigung', 'Hausmeister', 'Saisonal'];

export default function LeistungenGrid() {
  const [active, setActive] = useState('Alle');
  const filtered = active === 'Alle' ? services : services.filter(s => s.tag === active);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              active === tag
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary'
            }`}
          >
            {tag} {active !== tag && <span className="text-xs opacity-60">({services.filter(s => tag === 'Alle' ? true : s.tag === tag).length})</span>}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(s => (
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
    </div>
  );
}

import Link from 'next/link';

const services = [
  { icon: '🏢', title: 'Gebäudereinigung', desc: 'Professionelle Reinigung von Gebäuden aller Art – innen und außen, zuverlässig und gründlich.', href: '/leistungen/gebaeudereinigung', color: 'bg-blue-50 text-blue-600' },
  { icon: '💼', title: 'Büroreinigung', desc: 'Saubere Arbeitsplätze fördern Produktivität. Tägliche oder wöchentliche Reinigung nach Ihrem Bedarf.', href: '/leistungen/bueroeinigung', color: 'bg-purple-50 text-purple-600' },
  { icon: '🏗️', title: 'Treppenhausreinigung', desc: 'Gepflegte Treppenhäuser und Gemeinschaftsflächen für Mehrfamilienhäuser und Gewerbeimmobilien.', href: '/leistungen/treppenhausreinigung', color: 'bg-orange-50 text-orange-600' },
  { icon: '🪟', title: 'Glasreinigung', desc: 'Streifenfreie Fenster und Glasflächen durch unsere professionelle Glasreinigungstechnik.', href: '/leistungen/glasreinigung', color: 'bg-sky-50 text-sky-600' },
  { icon: '✨', title: 'Grundreinigung', desc: 'Intensive Tiefenreinigung für einen perfekten Neustart – ideal bei Einzug, Auszug oder nach Renovierung.', href: '/leistungen/grundreinigung', color: 'bg-green-50 text-green-600' },
  { icon: '🔄', title: 'Unterhaltsreinigung', desc: 'Regelmäßige Reinigung nach Plan, damit Ihre Räume dauerhaft gepflegt und hygienisch bleiben.', href: '/leistungen/unterhaltsreinigung', color: 'bg-teal-50 text-teal-600' },
  { icon: '🔨', title: 'Baureinigung', desc: 'Baufeinreinigung und Grobeinigung nach Baumaßnahmen – für die Übergabe bereit.', href: '/leistungen/baureinigung', color: 'bg-amber-50 text-amber-600' },
  { icon: '🔧', title: 'Hausmeisterdienste', desc: 'Von kleinen Reparaturen bis zur vollständigen Hausverwaltung – Ihr Hausmeister auf Abruf.', href: '/leistungen/hausmeisterdienste', color: 'bg-red-50 text-red-600' },
  { icon: '❄️', title: 'Winterdienst', desc: 'Räumen, Streuen, Sichern – wir übernehmen Ihre gesetzliche Verkehrssicherungspflicht.', href: '/leistungen/winterdienst', color: 'bg-indigo-50 text-indigo-600' },
  { icon: '🌿', title: 'Gartenarbeiten', desc: 'Rasenmähen, Heckenschnitt, Laubbeseitigung – professionelle Gartenpflege das ganze Jahr.', href: '/leistungen/gartenarbeiten', color: 'bg-emerald-50 text-emerald-600' },
];

export default function Services() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="badge bg-primary-50 text-primary mb-3">Unsere Leistungen</span>
          <h2 className="mb-4">Alles aus einer Hand</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Von der Büroreinigung bis zum Winterdienst – wir bieten Ihnen das komplette Spektrum professioneller Gebäudereinigung und Hausmeisterdienste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map(s => (
            <Link key={s.href} href={s.href} className="card p-6 group cursor-pointer flex flex-col gap-3">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-2xl`}>
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.desc}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Mehr erfahren
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/leistungen" className="btn-secondary">Alle Leistungen ansehen</Link>
        </div>
      </div>
    </section>
  );
}

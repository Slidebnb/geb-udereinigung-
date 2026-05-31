export default function WhyUs() {
  const reasons = [
    { icon: '🏆', title: 'Über 15 Jahre Erfahrung', desc: 'Seit 2009 vertrauen uns Unternehmen, Hausverwaltungen und Privatpersonen in ganz NRW.' },
    { icon: '✅', title: 'Geprüfte Fachkräfte', desc: 'Alle unsere Mitarbeiter sind geschult, zuverlässig und nach DGUV-Standards ausgebildet.' },
    { icon: '📋', title: 'Maßgeschneiderte Angebote', desc: 'Kein Pauschalpreis – wir erstellen individuelle Angebote auf Ihre Bedürfnisse und Ihr Budget.' },
    { icon: '⏰', title: 'Pünktlich & Zuverlässig', desc: 'Wir halten Termine ein. Immer. Unsere Kunden können sich auf uns verlassen.' },
    { icon: '🌱', title: 'Umweltfreundlich', desc: 'Wir verwenden ökologische Reinigungsmittel, die sowohl effektiv als auch umweltschonend sind.' },
    { icon: '📞', title: '24/7 Erreichbar', desc: 'Bei Notfällen sind wir rund um die Uhr für Sie da – auch am Wochenende und an Feiertagen.' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="badge bg-accent-50 text-accent-600 mb-4">Warum Huwa?</span>
            <h2 className="mb-4">Ihr Partner für professionelle Sauberkeit</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bei Huwa stehen Qualität, Zuverlässigkeit und Kundenzufriedenheit an erster Stelle. Wir sind nicht nur ein Reinigungsunternehmen – wir sind Ihr langfristiger Partner für gepflegte Immobilien.
            </p>

            <div className="space-y-4">
              {[
                'Versichert und haftpflichtversichert',
                'Flexible Verträge – monatlich kündbar',
                'Kostenlose Erstbesichtigung und Beratung',
                'Eigenes Personal – kein Outsourcing',
                'Regelmäßige Qualitätskontrollen',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {reasons.map(r => (
              <div key={r.title} className="bg-gray-50 rounded-2xl p-5 hover:bg-primary-50 transition-colors group">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{r.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

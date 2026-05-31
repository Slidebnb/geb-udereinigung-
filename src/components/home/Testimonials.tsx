'use client';

import { useState } from 'react';

const reviews = [
  { name: 'Markus Weber', role: 'Geschäftsführer, Weber GmbH', content: 'Huwa reinigt seit 3 Jahren unsere Büroräume. Pünktlich, gründlich und sehr zuverlässig. Wir sind rundum zufrieden!', rating: 5, location: 'Düsseldorf' },
  { name: 'Sandra Müller', role: 'Hausverwalterin, Immobilia', content: 'Ausgezeichneter Hausmeisterservice. Das Team reagiert sofort auf Anfragen und arbeitet sehr professionell.', rating: 5, location: 'Köln' },
  { name: 'Thomas Kirchner', role: 'Privatperson', content: 'Die Grundreinigung hat unsere Wohnung komplett verwandelt. Alles blitzt und glänzt – absolut empfehlenswert!', rating: 5, location: 'Neuss' },
  { name: 'Angela Bauer', role: 'Office Managerin, TechStart AG', content: 'Seit wir Huwa beauftragen, spart unser Team viel Zeit. Die Reinigung läuft reibungslos, immer zu unserer Zufriedenheit.', rating: 5, location: 'Düsseldorf' },
  { name: 'Peter Schmidt', role: 'Bauträger, Schmidt Bau GmbH', content: 'Huwa hat unsere Baustelle perfekt gereinigt. Schnell, effizient und zu einem fairen Preis. Klare Empfehlung!', rating: 5, location: 'Duisburg' },
  { name: 'Karin Hoffmann', role: 'Privatperson', content: 'Der Winterdienst ist Gold wert. Jeden Morgen ist der Gehweg geräumt bevor ich zur Arbeit fahre. Super Service!', rating: 5, location: 'Essen' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const visible = [reviews[current], reviews[(current + 1) % reviews.length], reviews[(current + 2) % reviews.length]];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="badge bg-green-50 text-green-700 mb-3">Kundenstimmen</span>
          <h2 className="mb-3">Was unsere Kunden sagen</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-accent text-2xl">★★★★★</span>
            <span className="font-bold text-gray-800 text-lg">4.9 / 5</span>
            <span className="text-gray-500">· 127+ Google Bewertungen</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((r, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-accent text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">"{r.content}"</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.role} · {r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={() => setCurrent(c => (c - 1 + reviews.length) % reviews.length)} className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Zurück">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </button>
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-gray-300'}`} aria-label={`Bewertung ${i + 1}`} />
          ))}
          <button onClick={() => setCurrent(c => (c + 1) % reviews.length)} className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Weiter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'Hausverwaltung', role: 'Wohnanlage', content: 'Geschätzt werden vor allem die festen Absprachen, die schnelle Rückmeldung und die zuverlässige Ausführung im Objekt.', rating: 5, location: 'Koblenz' },
  { name: 'Gewerbekunde', role: 'Büro & Praxis', content: 'Kunden legen Wert darauf, dass Reinigungstermine planbar sind und Ansprechpartner direkt erreichbar bleiben.', rating: 5, location: 'Neuwied' },
  { name: 'Privatkunde', role: 'Einzelauftrag', content: 'Bei einmaligen Reinigungen zählt eine klare Einschätzung vorab und eine saubere Übergabe nach Abschluss der Arbeit.', rating: 5, location: 'Bendorf' },
  { name: 'Objektbetreuung', role: 'Hausmeisterdienst', content: 'Bei laufender Objektbetreuung sind kurze Wege, Dokumentation und verbindliche Kommunikation besonders wichtig.', rating: 5, location: 'Region' },
  { name: 'Gewerbeobjekt', role: 'Regelmäßige Reinigung', content: 'Wiederkehrende Einsätze funktionieren am besten mit festen Abläufen und klaren Zuständigkeiten.', rating: 5, location: 'Koblenz' },
  { name: 'Winterdienstkunde', role: 'Saisonaler Auftrag', content: 'Im Winterdienst kommt es auf Erreichbarkeit, verlässliche Planung und schnelle Reaktion bei Wetterwechsel an.', rating: 5, location: 'Neuwied' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-title', {
        y: 30, duration: 0.7,
        scrollTrigger: { trigger: '.testimonial-title', start: 'top 85%', once: true },
      });
      gsap.from('.testimonial-card', {
        y: 40, scale: 0.97, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visible = [
    reviews[current],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="testimonial-title text-center mb-16">
          <div className="section-label mx-auto w-fit">Kundenstimmen</div>
          <h2 className="mb-4">
            Was Kunden an{' '}
            <span className="gradient-text">der Zusammenarbeit schätzen</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-yellow-400 text-2xl tracking-tight">★★★★★</span>
            <span className="font-black text-dark text-xl">4.9</span>
            <span className="text-gray-400">Kundenfeedback aus der Praxis</span>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5 mb-10">
          {visible.map((r, i) => (
            <div key={`${current}-${i}`} className="testimonial-card card group p-7 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic text-[15px]">„{r.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-dark text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.role} · {r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200" aria-label="Zurück">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-200 rounded-full ${i === current ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-primary/40'}`}
                aria-label={`Bewertung ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200" aria-label="Weiter">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

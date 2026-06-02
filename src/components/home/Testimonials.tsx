'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  rating: number;
  location?: string | null;
}

interface Props {
  reviews: Review[];
}

const CERTS = [
  { icon: '🛡️', label: 'Betriebshaftpflicht', sub: 'Vollversichert' },
  { icon: '📋', label: 'DGUV Ausgebildet', sub: 'Zertifiziertes Personal' },
  { icon: '🏛️', label: 'Innungsmitglied', sub: 'Koblenz' },
  { icon: '🔒', label: 'DSGVO Konform', sub: 'Datenschutz gesichert' },
  { icon: '⭐', label: 'Seit 2023', sub: 'Inhabergeführt' },
];

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < n ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ reviews }: Props) {
  const [current, setCurrent] = useState(0);

  if (reviews.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit">Vertrauen & Qualität</div>
            <h2 className="mt-4 mb-3">Zertifiziert & <span className="gradient-text">vollversichert</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Professionelle Gebäudereinigung mit geprüften Standards – für Ihre Sicherheit und unsere Qualitätsgarantie.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {CERTS.map(c => (
              <div key={c.label} className="card p-5 text-center hover:border-primary/30 transition-all duration-200">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-bold text-dark text-sm mb-0.5">{c.label}</div>
                <div className="text-xs text-gray-400">{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">Bewerten Sie uns auf Google</p>
            <Link href="/kontakt" className="btn-primary inline-flex">Erfahrungen teilen</Link>
          </div>
        </div>
      </section>
    );
  }

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ].filter(Boolean);

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="section-label mx-auto w-fit">Kundenstimmen</div>
          <h2 className="mb-4">
            Was unsere Kunden{' '}
            <span className="gradient-text">über uns sagen</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {visible.map((r, i) => (
            <div key={`${current}-${i}`} className="card group p-7 hover:border-primary/30 transition-all duration-300">
              <StarRating n={r.rating} />
              <p className="text-gray-700 leading-relaxed my-4 italic text-[15px]">„{r.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-dark text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">
                    {[r.role, r.company, r.location].filter(Boolean).join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <div className="flex justify-center items-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200" aria-label="Zurück">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`transition-all duration-200 rounded-full ${i === current ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-primary/40'}`}
                  aria-label={`Bewertung ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200" aria-label="Weiter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

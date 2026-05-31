'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  { value: 'bueroeinigung', label: 'Büroreinigung', baseMin: 0.8, baseMax: 1.4 },
  { value: 'treppenhausreinigung', label: 'Treppenhausreinigung', baseMin: 0.6, baseMax: 1.0 },
  { value: 'gebaeudereinigung', label: 'Gebäudereinigung', baseMin: 0.9, baseMax: 1.6 },
  { value: 'grundreinigung', label: 'Grundreinigung', baseMin: 1.5, baseMax: 2.8 },
  { value: 'glasreinigung', label: 'Glasreinigung', baseMin: 3.0, baseMax: 6.0 },
  { value: 'unterhaltsreinigung', label: 'Unterhaltsreinigung', baseMin: 0.7, baseMax: 1.2 },
  { value: 'baureinigung', label: 'Baureinigung', baseMin: 1.8, baseMax: 3.5 },
];

const frequencies = [
  { value: 'einmalig', label: 'Einmalig', discount: 1.0 },
  { value: 'woechentlich', label: 'Wöchentlich', discount: 0.85 },
  { value: 'zweimal', label: 'Zweimal pro Woche', discount: 0.8 },
  { value: 'taeglich', label: 'Täglich', discount: 0.75 },
];

export default function PriceCalculator() {
  const [service, setService] = useState('bueroeinigung');
  const [area, setArea] = useState(100);
  const [frequency, setFrequency] = useState('woechentlich');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const s = services.find(x => x.value === service)!;
    const f = frequencies.find(x => x.value === frequency)!;
    setResult({
      min: Math.round(s.baseMin * area * f.discount),
      max: Math.round(s.baseMax * area * f.discount),
    });
  };

  return (
    <section className="section-padding bg-primary">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="badge bg-accent/20 text-accent mb-3">Preisrechner</span>
          <h2 className="text-white mb-3">Was kostet meine Reinigung?</h2>
          <p className="text-blue-200 max-w-xl mx-auto">
            Berechnen Sie eine erste Preisschätzung. Das genaue Angebot erhalten Sie nach kostenloser Besichtigung.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="label">Leistung</label>
              <select className="input-field" value={service} onChange={e => setService(e.target.value)}>
                {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Fläche: {area} m²</label>
              <input
                type="range" min={20} max={2000} step={10}
                value={area}
                onChange={e => setArea(Number(e.target.value))}
                className="w-full accent-primary mt-3"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>20 m²</span><span>2.000 m²</span></div>
            </div>
            <div>
              <label className="label">Häufigkeit</label>
              <select className="input-field" value={frequency} onChange={e => setFrequency(e.target.value)}>
                {frequencies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
          </div>

          <button onClick={calculate} className="w-full btn-primary justify-center py-4 text-base mb-6">
            Preis berechnen
          </button>

          {result && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 mb-2">Geschätzter Preis pro Reinigung:</p>
              <p className="text-4xl font-bold text-primary mb-1">
                {result.min}€ – {result.max}€
              </p>
              <p className="text-xs text-gray-500 mb-4">Alle Preise netto zzgl. MwSt. Richtwert ohne Verbindlichkeit.</p>
              <Link href="/angebot" className="btn-primary">Verbindliches Angebot anfragen</Link>
            </div>
          )}

          {!result && (
            <p className="text-center text-sm text-gray-500">
              ℹ️ Diese Berechnung dient als erste Orientierung. Das genaue Angebot erhalten Sie nach kostenloser Beratung.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

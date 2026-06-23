'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import { serviceCalculatorConfigs } from '@/lib/service-calculator-config';

const featuredServices = serviceCalculatorConfigs.filter(service =>
  ['unterhalt', 'buero', 'treppenhaus', 'glas', 'winter', 'garten'].includes(service.key)
);

export default function PriceCalculator() {
  const [serviceKey, setServiceKey] = useState(featuredServices[0]?.key ?? 'unterhalt');
  const selected = serviceCalculatorConfigs.find(service => service.key === serviceKey) ?? serviceCalculatorConfigs[0];

  return (
    <section className="section-padding bg-[#071f3b]">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white mb-5">
              <Calculator size={22} />
            </div>
            <h2 className="text-white mb-4">Preis erst sauber einschätzen, dann Angebot anfragen</h2>
            <p className="text-blue-100 leading-8">
              Der Rechner nutzt je Dienstleistung eigene Fragen und zeigt nur eine unverbindliche Pauschalspanne bis zur Objektprüfung.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-blue-100">
              {['Dienstleistungsspezifische Angaben', 'Keine erfundenen Pauschalpreise', 'Anfrage übernimmt die Rechnerdaten'].map(item => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 shadow-2xl">
            <label className="label">Welche Leistung möchten Sie einschätzen?</label>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {featuredServices.map(service => (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => setServiceKey(service.key)}
                  className={`text-left rounded-lg border p-4 transition-colors ${serviceKey === service.key ? 'border-primary bg-primary-50 text-primary' : 'border-gray-200 hover:border-primary-200 text-gray-700'}`}
                >
                  <span className="block text-sm font-semibold">{service.title}</span>
                  <span className="mt-1 block text-xs text-gray-500">{service.resultPeriod}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <strong className="text-sm text-slate-900">{selected.title}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600">{selected.intro}</p>
            </div>

            <Link href={`/preisrechner?serviceKey=${selected.key}`} className="btn-primary mt-6 w-full justify-center py-4">
              Richtwert berechnen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

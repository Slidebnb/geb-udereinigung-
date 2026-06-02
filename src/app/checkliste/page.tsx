'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  company: z.string().optional(),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }),
  }),
  newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const checklistItems = [
  { section: 'Gebäudehülle & Außenbereich', color: '#0C2340', items: ['Dach und Dachrinnen prüfen', 'Fassade auf Schäden kontrollieren', 'Außenanlagen und Wege'] },
  { section: 'Haustechnik & Heizung', color: '#1B3E62', items: ['Heizanlage warten lassen', 'Warmwasser & Rohrleitungen', 'Aufzug & Elektroanlagen'] },
  { section: 'Gemeinschaftsbereiche', color: '#0C2340', items: ['Treppenhaus & Eingänge', 'Keller & Abstellräume', 'Stellplätze & Tiefgarage'] },
  { section: 'Sicherheit & Brandschutz', color: '#1B3E62', items: ['Rauchmelder & Feuerlöscher', 'Fluchtwege freihalten', 'Versicherung & Protokolle aktuell'] },
];

const trustBadges = [
  { icon: '🏆', label: 'Erfahren & Zuverlässig', desc: 'Seit Jahren vertrauen uns über 500 Kunden' },
  { icon: '🎯', label: 'Spezialisiert', desc: 'Gebäudereinigung & Hausmeisterdienste' },
  { icon: '✅', label: 'Qualität die zählt', desc: 'DGUV-geschult, vollversichert' },
];

export default function ChecklistePage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/checkliste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || 'Fehler');
      }
      setSubmitted(true);
      window.open('/downloads/haustechnik-checkliste.html', '_blank');
    } catch {
      setError('Fehler beim Absenden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #EEF4FB 0%, #F8FAFC 50%, #EEF4FB 100%)' }}>
      {/* Top strip */}
      <div className="w-full py-3 text-center text-sm font-semibold text-white" style={{ background: 'linear-gradient(90deg, #0C2340 0%, #1B3E62 100%)' }}>
        ✓ Kostenlos &nbsp;·&nbsp; ✓ Sofort-Download &nbsp;·&nbsp; ✓ Kein Spam
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* ── Left: Main card ── */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Card top accent */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #4BB8F5 0%, #2DC94E 100%)' }} />

            <div className="p-8 md:p-10">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
                Kostenloser Download
              </span>

              {/* Heading */}
              <h1 className="text-2xl md:text-3xl font-black text-dark leading-tight mb-3">
                12-Punkte Haustechnik-Checkliste<br />
                <span style={{ color: '#0C2340' }}>für Hausverwaltungen</span>
              </h1>
              <p className="text-gray-500 text-sm mb-7">
                Was muss wann geprüft werden? Unsere Checkliste zeigt es – übersichtlich, praxisnah und sofort einsetzbar.
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-8">
                {[
                  'Alle 12 Prüfpunkte auf einen Blick',
                  'Praxisnah, verständlich & sofort umsetzbar',
                  'Für Verwaltungen & Eigentümergemeinschaften',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green/15 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA / Form */}
              {!submitted ? (
                <>
                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center gap-2.5 shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
                      Kostenlos herunterladen
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2 border-t border-slate-100">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Kurz Ihre Daten – dann geht's los</p>
                      <div>
                        <input
                          {...register('name')}
                          className="input-field"
                          placeholder="Ihr Name *"
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('email')}
                          type="email"
                          className="input-field"
                          placeholder="Ihre E-Mail-Adresse *"
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('company')}
                          className="input-field"
                          placeholder="Firma / WEG (optional)"
                        />
                      </div>
                      <div className="space-y-2.5 pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input type="checkbox" {...register('privacy')} className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" />
                          <span className="text-xs text-gray-500 leading-relaxed">
                            Ich stimme der{' '}
                            <Link href="/datenschutz" className="text-primary underline">Datenschutzerklärung</Link> zu. *
                          </span>
                        </label>
                        {errors.privacy && <p className="form-error">{errors.privacy.message}</p>}
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input type="checkbox" {...register('newsletter')} className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" />
                          <span className="text-xs text-gray-500">Newsletter erhalten (optional)</span>
                        </label>
                      </div>
                      {error && <p className="form-error text-center">{error}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
                      >
                        {isSubmitting ? 'Wird vorbereitet…' : '↓ Checkliste jetzt herunterladen'}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="text-center py-2">
                  <div className="w-14 h-14 rounded-full bg-green/15 border-2 border-green/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-black text-dark mb-1">Ihre Checkliste ist bereit!</h3>
                  <p className="text-gray-500 text-sm mb-5">Die Datei wurde in einem neuen Tab geöffnet.</p>
                  <button
                    type="button"
                    onClick={() => window.open('/downloads/haustechnik-checkliste.html', '_blank')}
                    className="w-full py-3.5 rounded-2xl text-white font-bold text-sm mb-3 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
                    Erneut öffnen (PDF)
                  </button>
                  <p className="text-xs text-gray-400">Tipp: Browser → Drucken → Als PDF speichern</p>
                </div>
              )}

              {/* Trust badges row */}
              <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-slate-100">
                {trustBadges.map((b) => (
                  <div key={b.label} className="text-center">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="text-xs font-bold text-dark leading-tight">{b.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Document preview ── */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Shadow layers for depth */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl opacity-20" style={{ background: '#0C2340' }} />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl opacity-10" style={{ background: '#0C2340' }} />

              {/* Preview card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                {/* Doc header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100" style={{ background: 'linear-gradient(90deg, #0C2340 0%, #1B3E62 100%)' }}>
                  <div className="flex items-center gap-2.5">
                    <svg width="28" height="25" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 2L6 16h6v18h18V16h6L21 2z" fill="#4BB8F5" opacity="0.9"/>
                      <path d="M21 2L30 11l8 5-7-7-10-7z" fill="#2DC94E"/>
                    </svg>
                    <div>
                      <div className="font-black text-white text-sm leading-none">HUWA</div>
                      <div className="text-[8px] text-blue-200/60 leading-none tracking-widest uppercase">Gebäudereinigung</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-xs font-bold">Haustechnik-Checkliste</div>
                    <div className="text-blue-200/60 text-[10px]">Mai 2025</div>
                  </div>
                </div>

                {/* Checklist preview content */}
                <div className="p-5 space-y-3">
                  {checklistItems.map((cat, catIdx) => (
                    <div key={cat.section} className="rounded-xl overflow-hidden border border-slate-100">
                      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: cat.color }}>
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider flex-1">{cat.section}</span>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {cat.items.map((item, idx) => (
                          <div key={item} className="flex items-center gap-3 px-4 py-2.5">
                            <span className="w-5 h-5 rounded flex items-center justify-center border-2 border-slate-200 text-[9px] font-black text-slate-400 flex-shrink-0">
                              {catIdx * 3 + idx + 1}
                            </span>
                            <span className="text-xs text-slate-600 font-medium flex-1">{item}</span>
                            <div className="w-5 h-5 rounded border-2 border-slate-200 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Doc footer */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="12" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 2L6 16h6v18h18V16h6L21 2z" fill="#4BB8F5"/>
                      <path d="M21 2L30 11l8 5-7-7-10-7z" fill="#2DC94E"/>
                    </svg>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Huwa Gebäudereinigung</span>
                  </div>
                  <span className="text-[9px] text-slate-300">www.huwa-gebaeudereinigung.de</span>
                </div>
              </div>
            </div>

            {/* Caption below preview */}
            <p className="text-center text-sm text-slate-400 mt-5 font-medium">
              Vorschau der Checkliste — druckfertig als PDF
            </p>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="max-w-3xl mx-auto mt-14 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
          <div>
            <div className="text-white font-bold text-base mb-1">Brauchen Sie persönliche Unterstützung?</div>
            <div className="text-slate-300 text-sm">Unser Team ist täglich für Sie erreichbar — Mo–Fr 07:00–18:00 Uhr</div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/kontakt" className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors">
              Kontakt
            </Link>
            <Link href="/angebot" className="btn-primary text-sm px-5 py-2.5">
              Angebot anfragen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

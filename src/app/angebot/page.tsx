'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

const schema = z.object({
  name: z.string().min(2, 'Pflichtfeld'),
  email: z.string().email('Ungültige E-Mail'),
  phone: z.string().min(6, 'Bitte Telefonnummer angeben'),
  company: z.string().optional(),
  service: z.string().min(1, 'Bitte wählen Sie eine Leistung'),
  area: z.string().optional(),
  frequency: z.string().optional(),
  message: z.string().optional(),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }) }),
});

type FormData = z.infer<typeof schema>;

const services = [
  'Gebäudereinigung', 'Büroreinigung', 'Treppenhausreinigung',
  'Glasreinigung', 'Grundreinigung', 'Unterhaltsreinigung',
  'Baureinigung', 'Hausmeisterdienste', 'Winterdienst', 'Gartenarbeiten', 'Mehrere Leistungen',
];

export default function AngebotPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, trigger, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedService = watch('service');

  const nextStep = async () => {
    const fields: (keyof FormData)[] = step === 1 ? ['service'] : step === 2 ? [] : ['name', 'email', 'phone', 'privacy'];
    const valid = await trigger(fields);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/angebot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Fehler beim Senden. Bitte rufen Sie uns an.');
    }
  };

  if (sent) {
    return (
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto max-w-lg text-center py-20">
          <div className="w-20 h-20 rounded-full bg-green/20 border border-green/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </div>
          <h1 className="text-white mb-4">Anfrage erfolgreich gesendet!</h1>
          <p className="text-slate-300 mb-8">Vielen Dank für Ihr Interesse. Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Angebot.</p>
          <a href="/" className="btn-primary">Zurück zur Startseite</a>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Angebot anfragen' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label mb-4">Angebot anfragen</div>
            <h1 className="text-white mb-4">Kostenloses Angebot für <span className="gradient-text">Ihr Objekt</span></h1>
            <p className="text-slate-300 text-lg mb-6">Beschreiben Sie kurz Ihr Objekt. Wir prüfen Aufwand, Reinigungsintervall und Besonderheiten – und melden uns persönlich mit einer realistischen Einschätzung.</p>
            <div className="flex flex-wrap gap-4">
              {['Antwort in 24 Stunden', 'Kostenlose Objektbesichtigung', 'Transparentes Festpreisangebot', 'Für Hausverwaltungen, Gewerbe & Wohnanlagen'].map(item => (
                <div key={item} className="flex items-center gap-2 text-slate-300/80 text-sm">
                  <svg className="w-4 h-4 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-10">
            {[
              { num: 1, label: 'Leistung' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Kontakt' },
            ].map(({ num, label }) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${num <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {num < step ? '✓' : num}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${num <= step ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
                </div>
                {num < 3 && <div className={`flex-1 h-1 mx-2 mb-5 transition-colors ${num < step ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
            {step === 1 && (
              <div>
                <h2 className="mb-2">Welche Leistung benötigen Sie?</h2>
                <p className="text-gray-500 text-sm mb-6">Wählen Sie die gewünschte Dienstleistung aus.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map(s => (
                    <label key={s} className={`relative flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors text-sm font-medium ${selectedService === s ? 'border-primary bg-primary-50 text-primary' : 'border-gray-200 hover:border-primary-200 text-gray-700'}`}>
                      <input type="radio" {...register('service')} value={s} className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
                {errors.service && <p className="form-error mt-2">{errors.service.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-2">Details zu Ihrem Objekt</h2>
                <p className="text-gray-500 text-sm mb-6">Damit wir ein genaues Angebot erstellen können.</p>
                <div className="space-y-5">
                  <div>
                    <label className="label">Fläche (ca. m²)</label>
                    <input {...register('area')} className="input-field" placeholder="z.B. 150 m²" />
                  </div>
                  <div>
                    <label className="label">Gewünschte Häufigkeit</label>
                    <select {...register('frequency')} className="input-field">
                      <option value="">Bitte wählen...</option>
                      <option value="einmalig">Einmalig</option>
                      <option value="woechentlich">Wöchentlich</option>
                      <option value="zweimal-woechentlich">2x wöchentlich</option>
                      <option value="taeglich">Täglich</option>
                      <option value="monatlich">Monatlich</option>
                      <option value="saisonal">Saisonal</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Zusätzliche Informationen (optional)</label>
                    <textarea {...register('message')} rows={4} className="input-field resize-none" placeholder="Besonderheiten, Wünsche, Fragen..." />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-2">Ihre Kontaktdaten</h2>
                <p className="text-gray-500 text-sm mb-6">Damit wir Ihr Angebot zusenden können.</p>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Name *</label>
                      <input {...register('name')} className="input-field" placeholder="Vor- und Nachname" />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label">Unternehmen (optional)</label>
                      <input {...register('company')} className="input-field" placeholder="Firma GmbH" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">E-Mail *</label>
                      <input {...register('email')} type="email" className="input-field" placeholder="name@beispiel.de" />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="label">Telefon *</label>
                      <input {...register('phone')} className="input-field" placeholder="z.B. 02601 123456" />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('privacy')} className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Ich stimme der <a href="/datenschutz" className="text-primary underline hover:no-underline">Datenschutzerklärung</a> zu. *
                      </span>
                    </label>
                    {errors.privacy && <p className="form-error mt-1">{(errors.privacy as any).message}</p>}
                  </div>
                {error && <p className="form-error text-center mt-4">{error}</p>}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-gray-100">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary">← Zurück</button>
              ) : <div />}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary">Weiter →</button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
                  {isSubmitting ? 'Wird gesendet...' : '✓ Angebot anfordern'}
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            🔒 Ihre Daten werden vertraulich behandelt. Kein Spam, kein Verkauf Ihrer Daten.
          </div>

          <div className="mt-8 border border-slate-200 rounded-2xl p-6 bg-slate-50">
            <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Oder direkt Kontakt aufnehmen</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 hover:border-primary hover:shadow-sm transition-all group">
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <div>
                  <div className="text-xs text-gray-400">E-Mail</div>
                  <div className="text-sm font-medium text-gray-800">{siteConfig.email}</div>
                </div>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 hover:border-primary hover:shadow-sm transition-all group">
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <div>
                  <div className="text-xs text-gray-400">Telefon</div>
                  <div className="text-sm font-medium text-gray-800">{siteConfig.phone}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/shared/Breadcrumb';

const schema = z.object({
  name: z.string().min(2, 'Pflichtfeld'),
  email: z.string().email('Ungültige E-Mail'),
  phone: z.string().min(6, 'Bitte Telefonnummer angeben'),
  company: z.string().optional(),
  service: z.string().min(1, 'Bitte wählen Sie eine Leistung'),
  area: z.string().optional(),
  frequency: z.string().optional(),
  message: z.string().optional(),
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
    const fields: (keyof FormData)[] = step === 1 ? ['service'] : step === 2 ? [] : ['name', 'email', 'phone'];
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
      <section className="section-padding" style={{ background: 'radial-gradient(ellipse at 50% 50%, #0A1F0E 0%, #050D1A 100%)' }}>
        <div className="container mx-auto max-w-lg text-center py-20">
          <div className="w-20 h-20 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </div>
          <h1 className="text-white mb-4">Anfrage erfolgreich gesendet!</h1>
          <p className="text-blue-200/60 mb-8">Vielen Dank für Ihr Interesse. Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Angebot.</p>
          <a href="/" className="btn-primary">Zurück zur Startseite</a>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, #0D2137 0%, #050D1A 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(75,184,245,0.07)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Angebot anfragen' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label-dark mb-4">Angebot anfragen</div>
            <h1 className="text-white mb-4">Kostenloses Angebot <span className="gradient-text">anfordern</span></h1>
            <p className="text-blue-200/70 text-lg">In 3 einfachen Schritten zu Ihrem persönlichen Angebot. Antwort garantiert innerhalb von 24 Stunden.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${s <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 transition-colors ${s < step ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
            {step === 1 && (
              <div>
                <h2 className="mb-2">Welche Leistung benötigen Sie?</h2>
                <p className="text-gray-500 text-sm mb-6">Wählen Sie die gewünschte Dienstleistung aus.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                      <input {...register('phone')} className="input-field" placeholder="+49 170 1234567" />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>
                  </div>
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
        </div>
      </section>
    </>
  );
}

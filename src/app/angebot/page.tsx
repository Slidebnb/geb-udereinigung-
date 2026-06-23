'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { serviceCalculatorConfigs } from '@/lib/service-calculator-config';

const CALCULATOR_TRANSFER_PREFIX = 'huwa:preisrechner:';

const schema = z.object({
  name: z.string().min(2, 'Pflichtfeld'),
  email: z.string().email('Ungültige E-Mail'),
  phone: z.string().min(6, 'Bitte Telefonnummer angeben'),
  company: z.string().optional(),
  service: z.string().min(1, 'Bitte wählen Sie eine Leistung'),
  area: z.string().optional(),
  frequency: z.string().optional(),
  estimatedMin: z.coerce.number().int().optional(),
  estimatedMax: z.coerce.number().int().optional(),
  message: z.string().optional(),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }) }),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;
type CalculatorTransfer = {
  serviceTitle?: string;
  estimate?: { min: number; max: number; period: string; summary?: string; snapshot?: string } | null;
  publicSnapshot?: string;
  area?: string;
  frequency?: string;
};

const services = [
  ...new Set([
    'Gebäudereinigung',
    ...serviceCalculatorConfigs.map(service => service.title),
    'Hausmeisterdienste',
    'Gartenarbeiten',
    'Mehrere Leistungen',
  ]),
];

export default function AngebotPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [context, setContext] = useState<{ city?: string; source?: string; calculatorPeriod?: string; calculatorSummary?: string; calculatorSnapshot?: string; calculatorService?: string }>({});

  const { register, handleSubmit, watch, trigger, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { website: '' },
  });

  const selectedService = watch('service');
  const selectedFrequency = watch('frequency');
  const predefinedFrequencies = ['einmalig', 'woechentlich', 'zweimal-woechentlich', 'taeglich', 'monatlich', 'saisonal'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const city = params.get('city');
    const source = params.get('source');
    const area = params.get('area');
    const frequency = params.get('frequency');
    const estimatedMin = params.get('estimatedMin');
    const estimatedMax = params.get('estimatedMax');
    const calculatorPeriod = params.get('calculatorPeriod');
    const calculatorSummary = params.get('calculatorSummary');
    const calculatorSnapshot = params.get('calculatorSnapshot');
    const calculatorTransferId = params.get('calculatorTransferId');
    let transfer: CalculatorTransfer | null = null;

    if (calculatorTransferId) {
      try {
        const raw = sessionStorage.getItem(`${CALCULATOR_TRANSFER_PREFIX}${calculatorTransferId}`);
        transfer = raw ? JSON.parse(raw) as CalculatorTransfer : null;
      } catch {
        transfer = null;
      }
    }

    if (service && services.includes(service)) {
      setValue('service', service, { shouldDirty: true, shouldValidate: true });
    } else if (transfer?.serviceTitle && services.includes(transfer.serviceTitle)) {
      setValue('service', transfer.serviceTitle, { shouldDirty: true, shouldValidate: true });
    }
    if (transfer?.area || area) {
      setValue('area', transfer?.area || area || '', { shouldDirty: true });
    }
    if (transfer?.frequency || frequency) {
      setValue('frequency', transfer?.frequency || frequency || '', { shouldDirty: true });
    }
    if (transfer?.estimate?.min || estimatedMin) {
      setValue('estimatedMin', Number(transfer?.estimate?.min ?? estimatedMin));
    }
    if (transfer?.estimate?.max || estimatedMax) {
      setValue('estimatedMax', Number(transfer?.estimate?.max ?? estimatedMax));
    }
    if (city) {
      setContext(prev => ({ ...prev, city }));
    }
    if (source) {
      setContext(prev => ({ ...prev, source }));
    }
    if (calculatorPeriod || calculatorSummary || calculatorSnapshot || transfer) {
      setContext(prev => ({
        ...prev,
        calculatorPeriod: transfer?.estimate?.period || calculatorPeriod || undefined,
        calculatorSummary: transfer?.estimate?.summary || calculatorSummary || undefined,
        calculatorSnapshot: transfer?.publicSnapshot || transfer?.estimate?.snapshot || calculatorSnapshot || undefined,
        calculatorService: transfer?.serviceTitle || service || undefined,
      }));
    }
  }, [setValue]);

  const nextStep = async () => {
    const fields: (keyof FormData)[] = step === 1 ? ['service'] : step === 2 ? [] : ['name', 'email', 'phone', 'privacy'];
    const valid = await trigger(fields);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setError('');
    const contextLines = [
      context.city ? `Ort/Region: ${context.city}` : '',
      context.source ? `Quelle: ${context.source}` : '',
      data.estimatedMin && data.estimatedMax ? `Preisrechner-Schätzung: ${data.estimatedMin}–${data.estimatedMax} EUR netto${context.calculatorPeriod ? ` pro ${context.calculatorPeriod}` : ''}` : '',
      context.calculatorSummary ? `Rechner-Grundlage: ${context.calculatorSummary}` : '',
      context.calculatorSnapshot ? `Aus Preisrechner übernommen: ${context.calculatorSnapshot}` : '',
    ].filter(Boolean);
    const payload = {
      ...data,
      message: [data.message, ...contextLines].filter(Boolean).join('\n\n'),
    };

    try {
      const res = await fetch('/api/angebot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Die Anfrage konnte gerade nicht gesendet werden. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.');
    }
  };

  if (sent) {
    return (
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto max-w-lg text-center py-20">
          <div className="w-20 h-20 rounded-full bg-green/20 border border-green/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </div>
          <h1 className="text-white mb-4">Anfrage ist angekommen!</h1>
          <p className="text-slate-300 mb-8">Vielen Dank. Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden persönlich mit den nächsten Schritten.</p>
          <div className="grid gap-3 text-left mb-8">
            {['Wir prüfen Leistung, Objekt und Intervall.', 'Bei Rückfragen melden wir uns telefonisch.', 'Sie erhalten eine realistische Einschätzung oder ein Festpreisangebot.'].map(item => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <svg className="w-5 h-5 text-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={`tel:${siteConfig.phone}`} className="btn-white">Direkt anrufen</a>
            <a
              href={whatsappUrl('Hallo, ich habe gerade eine Angebotsanfrage gesendet.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Per WhatsApp nachfassen
            </a>
          </div>
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
            <p className="text-slate-300 text-lg mb-6">In rund 60 Sekunden anfragen. Wir prüfen Aufwand, Reinigungsintervall und Besonderheiten – und melden uns persönlich mit einer realistischen Einschätzung.</p>
            <div className="flex flex-wrap gap-4">
              {['Antwort in 24 Stunden', 'Kostenlose Erstberatung', 'Transparentes Festpreisangebot', 'Für Hausverwaltungen, Gewerbe & Wohnanlagen'].map(item => (
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
          {/* Preisrechner Teaser */}
          <div className="mb-8 flex items-center gap-3 p-4 rounded-xl bg-primary/6 border border-primary/20">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
            <p className="text-sm text-gray-700">
              Erst eine Schätzung berechnen?{' '}
              <Link href="/preisrechner" className="text-primary font-semibold hover:underline">
                Zum Preisrechner →
              </Link>
              <span className="mx-2 text-gray-300">|</span>
              <Link href="/leistungsuebersicht-download" className="text-primary font-semibold hover:underline">
                Leistungsübersicht PDF
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-between mb-10">
            {[
              { n: 1, label: 'Leistung' },
              { n: 2, label: 'Objekt' },
              { n: 3, label: 'Kontakt' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${n <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {n < step ? '✓' : n}
                </div>
                <span className="ml-2 hidden sm:inline text-xs font-semibold text-gray-500">{label}</span>
                {n < 3 && <div className={`flex-1 h-1 mx-2 transition-colors ${n < step ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('website')} />
            <input type="hidden" {...register('estimatedMin')} />
            <input type="hidden" {...register('estimatedMax')} />
            {step === 1 && (
              <div>
                <h2 className="mb-2">Welche Leistung benötigen Sie?</h2>
                <p className="text-gray-500 text-sm mb-6">Wählen Sie die gewünschte Dienstleistung aus. Wenn Sie mehrere Leistungen benötigen, wählen Sie einfach “Mehrere Leistungen”.</p>
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
                <p className="text-gray-500 text-sm mb-6">Alles optional, aber hilfreich für eine schnelle und realistische Rückmeldung.</p>
                <div className="space-y-5">
                  {context.city && (
                    <div className="rounded-xl bg-primary/6 border border-primary/15 px-4 py-3 text-sm text-gray-700">
                      Anfrage für Region: <span className="font-semibold text-primary">{context.city}</span>
                    </div>
                  )}
                  {context.calculatorSnapshot && (
                    <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-4 text-sm text-slate-700">
                      <div className="font-semibold text-blue-900">Aus dem Preisrechner übernommen</div>
                      <p className="mt-2 leading-6">
                        {context.calculatorService ? `${context.calculatorService}: ` : ''}
                        {context.calculatorSnapshot}
                      </p>
                      {watch('estimatedMin') && watch('estimatedMax') ? (
                        <p className="mt-2 text-xs font-semibold text-blue-800">
                          Geschätzte Spanne: {watch('estimatedMin')} bis {watch('estimatedMax')} EUR netto{context.calculatorPeriod ? ` pro ${context.calculatorPeriod}` : ''}
                        </p>
                      ) : null}
                    </div>
                  )}
                  <div>
                    <label className="label">Fläche (ca. m²)</label>
                    <input {...register('area')} className="input-field" placeholder="z.B. 150 m²" />
                  </div>
                  <div>
                    <label className="label">Gewünschte Häufigkeit</label>
                    <select {...register('frequency')} className="input-field">
                      <option value="">Bitte wählen...</option>
                      {selectedFrequency && !predefinedFrequencies.includes(selectedFrequency) ? (
                        <option value={selectedFrequency}>{selectedFrequency}</option>
                      ) : null}
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
                <p className="text-gray-500 text-sm mb-6">Telefon bleibt wichtig, damit wir Rückfragen schnell klären können.</p>
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
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('privacy')} className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Ich stimme der <Link href="/datenschutz" className="text-primary underline hover:no-underline">Datenschutzerklärung</Link> zu. *
                      </span>
                    </label>
                    {errors.privacy && <p className="form-error mt-1">{(errors.privacy as any).message}</p>}
                  </div>
                {error && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                    <p className="form-error mb-3">{error}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <a href={`tel:${siteConfig.phone}`} className="btn-secondary justify-center">Anrufen</a>
                      <a
                        href={whatsappUrl('Hallo, ich möchte ein Angebot anfragen.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary justify-center"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}
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

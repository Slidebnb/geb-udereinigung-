'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';

const schema = z.object({
  name: z.string().min(2, 'Bitte Name / Firma angeben'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().min(6, 'Bitte Telefonnummer angeben'),
  objektAnzahl: z.string().min(1, 'Bitte Anzahl wählen'),
  gesamtflaeche: z.string().min(1, 'Bitte Fläche wählen'),
  flaechenarten: z.array(z.string()).min(1, 'Bitte mindestens eine Flächenart wählen'),
  adresse: z.string().min(5, 'Bitte Objekt-Adresse angeben'),
  besonderheiten: z.string().optional(),
  starttermin: z.string().min(1, 'Bitte Starttermin wählen'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }) }),
  website: z.string().max(0).optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

const flaechenOptions = [
  'Gehwege/Bürgersteig',
  'Einfahrten/Zufahrten',
  'Parkplätze',
  'Eingangsbereiche',
  'Treppen/Rampen',
];

const faqs = [
  {
    q: 'Wie früh sollte ich mich anmelden?',
    a: 'Am besten bis September 2026. Die verfügbaren Kapazitäten sind begrenzt, da unsere Winterdienstrouten nur eine bestimmte Anzahl von Objekten aufnehmen können. Wer früh bucht, hat Priorität bei der Routenplanung und profitiert von gesichertem Service auch in schneereichen Wintern.',
  },
  {
    q: 'Was ist im Saisonpreis enthalten?',
    a: 'Der Saisonpreis deckt alle Räum- und Streueinsätze von November bis März ab – inklusive Schneekehrung, Streuung mit zugelassenen Mitteln, lückenloser Einsatzdokumentation und Zugang zu unserem Wettermeldedienst. Sie zahlen einmal – wir räumen so oft wie nötig.',
  },
  {
    q: 'Welche Streumittel verwenden Sie?',
    a: 'Wir setzen je nach kommunaler Vorschrift und Untergrund abstumpfende Mittel (z. B. Splitt) oder auftauende Mittel (z. B. Taumittel) ein. Auf öffentlichen Gehwegen orientieren wir uns strikt an den örtlichen Vorgaben. Auf Privatflächen stimmen wir das Streumittel individuell mit Ihnen ab.',
  },
  {
    q: 'Bin ich haftungsrechtlich abgesichert?',
    a: 'Ja. Mit Abschluss eines Saisonvertrags übernehmen wir Ihre gesetzliche Räum- und Streupflicht vollständig. Alle Einsätze werden mit Datum, Uhrzeit und eingesetztem Streumittel dokumentiert. Dieses Protokoll dient als rechtssicherer Nachweis für die Erfüllung der Verkehrssicherungspflicht.',
  },
];

export default function WinterdienstAnmeldung2026Page() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { flaechenarten: [] },
  });

  const selectedFlaechenarten = watch('flaechenarten') ?? [];

  const toggleFlaeche = (option: string) => {
    const current = selectedFlaechenarten;
    if (current.includes(option)) {
      setValue('flaechenarten', current.filter((v) => v !== option), { shouldValidate: true });
    } else {
      setValue('flaechenarten', [...current, option], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/winterdienst-anmeldung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, season: '2026/2027' }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Fehler beim Senden. Bitte rufen Sie uns direkt an.');
    }
  };

  if (sent) {
    return (
      <section
        className="min-h-screen flex items-center justify-center section-padding"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto max-w-lg text-center py-20">
          <div className="w-24 h-24 rounded-full bg-green/20 border-2 border-green/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-white mb-4">Anmeldung erfolgreich!</h1>
          <p className="text-slate-300 text-lg mb-10">
            Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Saisonpreisangebot für den Winterdienst 2026/2027.
          </p>
          <Link href="/" className="btn-primary px-10 py-4">
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10">
          <Breadcrumb
            items={[
              { label: 'Winterdienst', href: '/leistungen/winterdienst' },
              { label: 'Anmeldung 2026/2027' },
            ]}
            dark
          />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Jetzt für Saison 2026/2027 anmelden</div>
            <h1 className="text-white mb-4 leading-tight">
              Winterdienst 2026/2027 –{' '}
              <span className="gradient-text">Ihre Objekte sind sicher</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6">
              Jetzt Saisonvertrag abschließen und die Räum- und Streupflicht in professionelle
              Hände geben. Früh anmelden – begrenzte Kapazität.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-5 py-2.5 text-amber-300 text-sm font-semibold">
              <span>⚡</span>
              <span>Sichern Sie sich jetzt Ihren Platz für die Wintersaison 2026/2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📋',
                title: 'Saisonvertrag',
                desc: 'Fester Pauschalpreis für die gesamte Wintersaison 2026/2027 – keine Überraschungen, egal wie oft wir ausrücken müssen.',
              },
              {
                icon: '📸',
                title: 'Lückenlose Dokumentation',
                desc: 'Jeder Einsatz wird mit Datum, Uhrzeit und Streumittel protokolliert – wichtig für Ihre Haftungsabsicherung.',
              },
              {
                icon: '⏰',
                title: 'Frühmorgendlicher Einsatz',
                desc: 'Wir räumen vor Beginn der gesetzlichen Streupflicht, damit Ihre Objekte pünktlich zum Arbeitsbeginn sicher sind.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formular */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-3">Anmeldeformular</div>
            <h2>
              Jetzt für den Winterdienst{' '}
              <span className="gradient-text">2026/2027 anmelden</span>
            </h2>
            <p className="text-slate-500 mt-3">
              Füllen Sie das Formular aus – wir melden uns innerhalb von 24 Stunden mit Ihrem
              persönlichen Saisonpreisangebot.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
            {/* Honeypot */}
            <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Kontaktdaten */}
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-800 text-base border-b border-gray-100 pb-3">
                Kontaktdaten
              </h3>
              <div>
                <label className="label">Name / Firma *</label>
                <input
                  {...register('name')}
                  className="input-field"
                  placeholder="Max Mustermann / Musterfirma GmbH"
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">E-Mail *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="input-field"
                    placeholder="name@beispiel.de"
                  />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="label">Telefon *</label>
                  <input
                    {...register('phone')}
                    className="input-field"
                    placeholder="+49 2601 123456"
                  />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Objekt-Details */}
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-800 text-base border-b border-gray-100 pb-3">
                Angaben zum Objekt
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Anzahl der Objekte *</label>
                  <select {...register('objektAnzahl')} className="input-field">
                    <option value="">Bitte wählen...</option>
                    <option value="1">1 Objekt</option>
                    <option value="2-5">2–5 Objekte</option>
                    <option value="mehr als 5">Mehr als 5 Objekte</option>
                  </select>
                  {errors.objektAnzahl && (
                    <p className="form-error">{errors.objektAnzahl.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">Gesamtfläche ca. *</label>
                  <select {...register('gesamtflaeche')} className="input-field">
                    <option value="">Bitte wählen...</option>
                    <option value="bis 200m²">Bis 200 m²</option>
                    <option value="200-500m²">200–500 m²</option>
                    <option value="500-1000m²">500–1.000 m²</option>
                    <option value="über 1000m²">Über 1.000 m²</option>
                  </select>
                  {errors.gesamtflaeche && (
                    <p className="form-error">{errors.gesamtflaeche.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Art der Flächen *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {flaechenOptions.map((option) => {
                    const selected = selectedFlaechenarten.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleFlaeche(option)}
                        className={`relative flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors text-sm font-medium text-left ${
                          selected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-primary/30 text-gray-700'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${
                            selected ? 'bg-primary border-primary' : 'border-gray-300'
                          }`}
                        >
                          {selected && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.flaechenarten && (
                  <p className="form-error mt-2">{errors.flaechenarten.message}</p>
                )}
              </div>

              <div>
                <label className="label">Standort / Objekt-Adresse *</label>
                <textarea
                  {...register('adresse')}
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Musterstraße 12, 56566 Neuwied"
                />
                {errors.adresse && <p className="form-error">{errors.adresse.message}</p>}
              </div>

              <div>
                <label className="label">Besonderheiten (optional)</label>
                <textarea
                  {...register('besonderheiten')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="z. B. enge Zufahrt, Steigung, besondere Zeiten..."
                />
              </div>

              <div>
                <label className="label">Wunsch-Starttermin *</label>
                <input
                  {...register('starttermin')}
                  type="date"
                  className="input-field"
                  min="2026-10-01"
                />
                {errors.starttermin && (
                  <p className="form-error">{errors.starttermin.message}</p>
                )}
              </div>
            </div>

            {/* Datenschutz */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('privacy')}
                  className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                />
                <span className="text-sm text-gray-600">
                  Ich stimme der{' '}
                  <Link href="/datenschutz" className="text-primary underline hover:no-underline">
                    Datenschutzerklärung
                  </Link>{' '}
                  zu. *
                </span>
              </label>
              {errors.privacy && (
                <p className="form-error mt-1">{(errors.privacy as { message?: string }).message}</p>
              )}
            </div>

            {error && <p className="form-error text-center">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-base disabled:opacity-50"
            >
              {isSubmitting ? 'Wird gesendet...' : '❄️ Jetzt für Winterdienst 2026/2027 anmelden'}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Ihre Daten werden vertraulich behandelt. Kein Spam, kein Verkauf Ihrer Daten.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-3">Häufige Fragen</div>
            <h2>
              Alles zum Winterdienst{' '}
              <span className="gradient-text">2026/2027</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.q} className="card p-5 group cursor-pointer">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{item.q}</span>
                  <svg
                    className="w-4 h-4 text-primary/50 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        data={{
          headline: 'Jetzt sichern für den',
          headline_gradient: 'Winter 2026/2027',
          subtitle:
            'Begrenzte Kapazitäten – sichern Sie sich jetzt Ihren Saisonvertrag für zuverlässigen Winterdienst.',
          benefits: ['Saisonvertrag', 'Lückenlose Dokumentation', 'Haftungsschutz', 'Fester Preis'],
        }}
      />
    </>
  );
}

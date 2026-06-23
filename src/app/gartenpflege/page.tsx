'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';

const leistungenOptions = [
  { id: 'rasenmaehen', label: 'Rasenmähen', icon: '🌿' },
  { id: 'heckenschnitt', label: 'Heckenschnitt', icon: '✂️' },
  { id: 'unkraut', label: 'Unkraut entfernen', icon: '🌱' },
  { id: 'laubentfernung', label: 'Laubentfernung', icon: '🍂' },
  { id: 'strauchschnitt', label: 'Strauchschnitt', icon: '🌳' },
  { id: 'beetpflege', label: 'Beetpflege', icon: '🌸' },
  { id: 'wegereinigung', label: 'Wegereinigung', icon: '🧹' },
  { id: 'bewaesserung', label: 'Bewässerung', icon: '💧' },
  { id: 'gruenschnitt', label: 'Grünschnitt-Entsorgung', icon: '♻️' },
];

const schema = z.object({
  name: z.string().min(2, 'Bitte Name / Firma angeben'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().min(6, 'Bitte Telefonnummer angeben'),
  adresse: z.string().min(5, 'Bitte Objekt-Adresse angeben'),
  flaeche: z.string().optional(),
  haeufigkeit: z.string().min(1, 'Bitte Häufigkeit wählen'),
  starttermin: z.string().optional(),
  anmerkungen: z.string().optional(),
  leistungen: z.array(z.string()).min(1, 'Bitte mindestens eine Leistung wählen'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu.' }) }),
});

type FormData = z.infer<typeof schema>;

const faqs = [
  {
    q: 'Welche Geräte bringen Sie mit?',
    a: 'Wir bringen eigene professionelle Ausrüstung mit – vom Aufsitzmäher über Heckenschere bis zur Laubblasmaschine. Sie müssen keine Geräte bereitstellen oder lagern. Für Sie entsteht keinerlei Aufwand.',
  },
  {
    q: 'Entsorgen Sie auch Grünschnitt?',
    a: 'Ja, auf Wunsch inklusive. Wir entsorgen Rasenschnitt, Laub, Strauchschnitt und Gartenabfälle fachgerecht. Die Grünschnitt-Entsorgung kann als separate Leistung dazugebucht werden.',
  },
  {
    q: 'Arbeiten Sie auch im Winter?',
    a: 'Winterdienst (Schneeräumung und Streudienst) bieten wir separat an. Die Gartenpflege führen wir von März bis November durch – abgestimmt auf die Wachstumssaison und Ihre Wünsche.',
  },
  {
    q: 'Wie schnell können Sie starten?',
    a: 'Nach einer kostenlosen Besichtigung und Auftragserteilung starten wir in der Regel innerhalb einer Woche. Bei dringendem Bedarf, z. B. vor Veranstaltungen oder nach langer Abwesenheit, bemühen wir uns um eine schnellere Lösung.',
  },
];

export default function GartenpflegePage() {
  const [selectedLeistungen, setSelectedLeistungen] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { leistungen: [] },
  });

  const toggleLeistung = (id: string) => {
    const updated = selectedLeistungen.includes(id)
      ? selectedLeistungen.filter((l) => l !== id)
      : [...selectedLeistungen, id];
    setSelectedLeistungen(updated);
    setValue('leistungen', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/gartenpflege-anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        style={{ background: 'linear-gradient(135deg, #0f3d1a 0%, #1a5c28 100%)' }}
      >
        <div className="container mx-auto max-w-lg text-center py-20">
          <div className="w-24 h-24 rounded-full bg-green/20 border-2 border-green/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-white mb-4">Anfrage erfolgreich!</h1>
          <p className="text-green-100 text-lg mb-10">
            Wir melden uns innerhalb von 24 Stunden mit Ihrem maßgeschneiderten Gartenpflege-Angebot.
          </p>
          <Link href="/" className="btn-primary px-10 py-4">
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    );
  }

  const selectedLabels = leistungenOptions
    .filter((l) => selectedLeistungen.includes(l.id))
    .map((l) => l.label);

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Gartenpflege' }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Frühjahr/Sommer 2025</div>
            <h1 className="text-white mb-4 leading-tight">
              Gartenpflege in{' '}
              <span className="gradient-text">Neuwied, Koblenz, Westerwald & Haiger</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Professionelle Grünpflege für Wohnanlagen, Gewerbeobjekte und private Gärten. Wählen
              Sie Ihre gewünschten Leistungen – wir erstellen ein maßgeschneidertes Angebot.
            </p>
          </div>
        </div>
      </section>

      {/* Leistungen auswählen */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-3">Leistungen wählen</div>
            <h2>
              Welche Leistungen{' '}
              <span className="gradient-text">benötigen Sie?</span>
            </h2>
            <p className="text-slate-500 mt-3">
              Wählen Sie alle gewünschten Leistungen aus. Sie können mehrere kombinieren.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {leistungenOptions.map((item) => {
              const selected = selectedLeistungen.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleLeistung(item.id)}
                  className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                    selected
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-gray-200 hover:border-primary/30 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {selected && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedLabels.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-primary mb-2">
                Ausgewählte Leistungen ({selectedLabels.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedLabels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Formular – erscheint ab 1 gewählter Leistung */}
      {selectedLeistungen.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <div className="section-label mx-auto w-fit mb-3">Anfrageformular</div>
              <h2>
                Angebot für Ihre{' '}
                <span className="gradient-text">Gartenpflege anfragen</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6">
              {/* Hidden: selected leistungen */}
              <input type="hidden" {...register('leistungen')} />

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

              <div>
                <label className="label">Objekt-Adresse *</label>
                <input
                  {...register('adresse')}
                  className="input-field"
                  placeholder="Musterstraße 12, 56566 Neuwied"
                />
                {errors.adresse && <p className="form-error">{errors.adresse.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Fläche ca. m² (optional)</label>
                  <input
                    {...register('flaeche')}
                    className="input-field"
                    placeholder="z. B. 300 m²"
                  />
                </div>
                <div>
                  <label className="label">Häufigkeit *</label>
                  <select {...register('haeufigkeit')} className="input-field">
                    <option value="">Bitte wählen...</option>
                    <option value="Einmalig">Einmalig</option>
                    <option value="Monatlich">Monatlich</option>
                    <option value="2x monatlich">2x monatlich</option>
                    <option value="Wöchentlich">Wöchentlich</option>
                  </select>
                  {errors.haeufigkeit && <p className="form-error">{errors.haeufigkeit.message}</p>}
                </div>
              </div>

              <div>
                <label className="label">Gewünschter Starttermin (optional)</label>
                <input {...register('starttermin')} type="date" className="input-field" />
              </div>

              <div>
                <label className="label">Anmerkungen (optional)</label>
                <textarea
                  {...register('anmerkungen')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Besondere Wünsche, Zugangsinformationen, Fragen..."
                />
              </div>

              {/* Ausgewählte Leistungen – Zusammenfassung */}
              <div className="bg-slate-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Ausgewählte Leistungen:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedLabels.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 bg-green/10 text-green text-xs font-medium px-3 py-1 rounded-full border border-green/20"
                    >
                      ✓ {label}
                    </span>
                  ))}
                </div>
              </div>

              {errors.leistungen && (
                <p className="form-error">{errors.leistungen.message}</p>
              )}

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
                {isSubmitting ? 'Wird gesendet...' : '🌿 Kostenloses Gartenpflege-Angebot anfragen'}
              </button>

              <p className="text-center text-xs text-gray-400">
                🔒 Ihre Daten werden vertraulich behandelt. Kein Spam, kein Verkauf Ihrer Daten.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Preistransparenz */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-3">Transparente Preise</div>
            <h2>
              Flexibel nach{' '}
              <span className="gradient-text">Ihrem Bedarf</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: '🌿',
                title: 'Einmalige Einsätze',
                desc: 'Für Frühjahrsputz, Sondereinsätze und Einmalanfragen – flexibel und ohne langfristige Bindung.',
              },
              {
                icon: '📅',
                title: 'Regelmäßige Pflege',
                desc: 'Monatliche Pauschale für zuverlässige Dauerbetreuung – planbare Kosten, kein Aufwand für Sie.',
              },
              {
                icon: '🏢',
                title: 'Gewerbeobjekte',
                desc: 'Rahmenverträge für Wohnanlagen und Firmengelände – mit festen Ansprechpartnern und Reporting.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 hover:border-green/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-green/8 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm">
            Alle Preise auf Anfrage – kostenlose Besichtigung und transparentes Festpreisangebot
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-3">Häufige Fragen</div>
            <h2>
              Alles zur{' '}
              <span className="gradient-text">Gartenpflege</span>
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

      {/* Interne Links */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="section-label mx-auto w-fit mb-3">Mehr erfahren</div>
            <h2>
              Weitere{' '}
              <span className="gradient-text">Dienstleistungen</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <Link
              href="/leistungen/gartenarbeiten"
              className="card p-6 hover:border-green/30 transition-all text-left group"
            >
              <div className="text-2xl mb-3">🌿</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors mb-1">
                Gartenarbeiten – Leistungsdetails
              </h3>
              <p className="text-slate-500 text-sm">
                Detaillierte Beschreibung aller Gartenarbeiten und Leistungsumfänge
              </p>
              <span className="text-primary text-sm font-medium mt-3 inline-block group-hover:underline">
                Mehr erfahren →
              </span>
            </Link>
            <Link
              href="/hausmeisterservice-neuwied"
              className="card p-6 hover:border-primary/30 transition-all text-left group"
            >
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors mb-1">
                Hausmeisterservice Neuwied
              </h3>
              <p className="text-slate-500 text-sm">
                Kombinieren Sie Gartenpflege mit unserem Hausmeister-Rundum-Service
              </p>
              <span className="text-primary text-sm font-medium mt-3 inline-block group-hover:underline">
                Kombiangebot ansehen →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        data={{
          headline: 'Ihr Garten in',
          headline_gradient: 'besten Händen',
          subtitle:
            'Wählen Sie Ihre Leistungen, senden Sie die Anfrage – wir melden uns innerhalb von 24 Stunden mit einem maßgeschneiderten Angebot.',
          benefits: ['Kostenlose Besichtigung', 'Festpreisangebot', 'Eigene Ausrüstung', 'Grünschnitt-Entsorgung'],
        }}
      />
    </>
  );
}

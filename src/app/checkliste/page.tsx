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

const categories = [
  { icon: '🏠', label: 'Gebäudehülle & Außenbereich', count: 3 },
  { icon: '🔧', label: 'Haustechnik & Heizung', count: 3 },
  { icon: '🚪', label: 'Gemeinschaftsbereiche', count: 3 },
  { icon: '🛡️', label: 'Sicherheit & Brandschutz', count: 3 },
];

const targetGroups = [
  'Hausverwaltungen',
  'Wohnungseigentümergemeinschaften (WEG)',
  'Privatvermieter',
  'Facility Manager',
];

export default function ChecklistePage() {
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
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
      >
        <div className="container mx-auto relative z-10 text-center">
          <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
            Kostenloser Download
          </span>
          <h1 className="text-white mb-4 max-w-3xl mx-auto leading-tight">
            Die 12-Punkte Checkliste für{' '}
            <span className="gradient-text">Hausverwaltungen</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Was muss wann geprüft werden? Damit nichts übersehen wird.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-green">
            <span>✓ Kostenlos</span>
            <span>✓ Sofort-Download</span>
            <span>✓ Druckfertig</span>
          </div>
        </div>
      </section>

      {/* 2-Column Layout */}
      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Preview / Description */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-dark mb-5">Was ist enthalten?</h2>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-xl flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark text-sm">{cat.label}</div>
                      <div className="text-xs text-gray-400">{cat.count} Prüfpunkte</div>
                    </div>
                    <div className="text-xs font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                      {cat.count} Punkte
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                  Ideal für
                </div>
                <div className="flex flex-wrap gap-2">
                  {targetGroups.map((g) => (
                    <span
                      key={g}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}
            >
              <div className="text-2xl mb-3">💡</div>
              <h3 className="text-white font-bold mb-2 text-base">
                Profitipp für Hausverwaltungen
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kombinieren Sie die Checkliste mit einem verlässlichen Hausmeisterservice –
                so werden alle Punkte regelmäßig abgehakt, ohne dass Sie selbst vor Ort sein
                müssen.
              </p>
              <Link
                href="/hausmeisterservice-neuwied"
                className="inline-block mt-4 text-primary font-semibold text-sm hover:underline"
              >
                Hausmeisterservice ansehen →
              </Link>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green/15 border border-green/30 flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-8 h-8 text-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Deine Checkliste ist fertig!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Die Checkliste wurde in einem neuen Tab geöffnet. Sie erhalten außerdem
                    eine Bestätigungs-E-Mail mit dem Link.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      window.open('/downloads/haustechnik-checkliste.html', '_blank')
                    }
                    className="btn-primary w-full justify-center py-4 text-base mb-3"
                  >
                    Checkliste herunterladen (PDF) →
                  </button>
                  <p className="text-xs text-gray-400 mb-6">
                    Tipp: Im Browser Datei → Drucken → Als PDF speichern
                  </p>
                  <div className="pt-5 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">
                      Haben Sie Fragen zur Haustechnik oder Reinigung? Wir helfen gerne.
                    </p>
                    <Link
                      href="/kontakt"
                      className="btn-outline inline-flex text-sm py-2.5"
                    >
                      Jetzt Kontakt aufnehmen
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-dark mb-6">
                    Jetzt kostenlos herunterladen
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="label">Name *</label>
                      <input
                        {...register('name')}
                        className="input-field"
                        placeholder="Ihr Name"
                      />
                      {errors.name && (
                        <p className="form-error">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">E-Mail *</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="input-field"
                        placeholder="ihre@email.de"
                      />
                      {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Firma / WEG (optional)</label>
                      <input
                        {...register('company')}
                        className="input-field"
                        placeholder="z.B. Hausverwaltung Muster GmbH"
                      />
                    </div>
                    <div className="space-y-3 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('privacy')}
                          className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600">
                          Ich stimme der{' '}
                          <Link
                            href="/datenschutz"
                            className="text-primary underline hover:no-underline"
                          >
                            Datenschutzerklärung
                          </Link>{' '}
                          zu. *
                        </span>
                      </label>
                      {errors.privacy && (
                        <p className="form-error">{errors.privacy.message}</p>
                      )}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('newsletter')}
                          className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600">
                          Ich möchte den Huwa-Newsletter erhalten (optional)
                        </span>
                      </label>
                    </div>
                    {error && <p className="form-error text-center">{error}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Wird vorbereitet…' : 'Checkliste herunterladen →'}
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Wir geben Ihre Daten nicht weiter. Kein Spam. Abmeldung jederzeit
                    möglich.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

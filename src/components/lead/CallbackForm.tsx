'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PhoneCall } from 'lucide-react';

type CallbackFormProps = {
  source: string;
  compact?: boolean;
  defaultService?: string;
};

const services = ['Gebaeudereinigung', 'Bueroreinigung', 'Treppenhausreinigung', 'Glasreinigung', 'Hausmeisterservice', 'Winterdienst', 'Gartenpflege', 'Noch offen'];

export default function CallbackForm({ source, compact = false, defaultService = '' }: CallbackFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        source,
        privacy: form.privacy === 'on',
      }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(result.error || 'Rueckruf konnte nicht gesendet werden.');
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
        <strong>Rueckrufwunsch ist angekommen.</strong>
        <p className="mt-2 leading-6">Wir melden uns persoenlich, sobald es im Tagesgeschaeft moeglich ist.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`rounded-2xl border border-primary/15 bg-white shadow-sm ${compact ? 'p-5' : 'p-6 md:p-7'}`}>
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><PhoneCall size={20} /></div>
        <div>
          <h2 className="!text-xl !tracking-normal">Sofort-Rueckruf anfordern</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Nur Telefon und Name eintragen. Wir klaeren den Rest persoenlich.</p>
        </div>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name *</label>
          <input name="name" required minLength={2} className="input-field" placeholder="Ihr Name" />
        </div>
        <div>
          <label className="label">Telefon *</label>
          <input name="phone" required minLength={6} className="input-field" placeholder="0151 ..." />
        </div>
        <div>
          <label className="label">Leistung</label>
          <select name="service" defaultValue={defaultService} className="input-field">
            <option value="">Bitte waehlen</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Rueckrufzeit</label>
          <select name="preferredTime" className="input-field">
            <option value="">Flexibel</option>
            <option value="Vormittags">Vormittags</option>
            <option value="Nachmittags">Nachmittags</option>
            <option value="Abends">Abends</option>
          </select>
        </div>
      </div>
      <label className="mt-4 flex gap-3 text-sm leading-5 text-slate-600">
        <input name="privacy" type="checkbox" required className="mt-1" />
        <span>Ich stimme der Verarbeitung gemaess <Link href="/datenschutz" className="text-primary underline">Datenschutzerklaerung</Link> zu.</span>
      </label>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <button disabled={loading} className="btn-primary mt-5 w-full justify-center rounded-lg disabled:opacity-50">
        {loading ? 'Wird gesendet...' : 'Rueckruf anfordern'}
      </button>
    </form>
  );
}

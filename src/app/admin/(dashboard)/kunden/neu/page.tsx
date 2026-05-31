'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NeuerKundePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    notes: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/kunden/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Fehler beim Anlegen des Kunden.');
      } else {
        router.push('/admin/kunden');
      }
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/kunden" className="text-gray-400 hover:text-gray-600 text-sm">← Kunden</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-800">Neuer Kunde</h1>
      </div>

      <div className="max-w-lg">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Max Mustermann"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="kunde@beispiel.de"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Passwort <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Mindestens 8 Zeichen"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Mindestens 8 Zeichen</p>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Objekt / Adresse
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="z.B. Mittelweg 24, 56564 Neuwied – Bürogebäude"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Anlegen …' : 'Kunden anlegen'}
              </button>
              <Link
                href="/admin/kunden"
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors"
              >
                Abbrechen
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

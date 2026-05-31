'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Vielen Dank! Sie haben den Newsletter abonniert.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Etwas ist schiefgelaufen.');
      }
    } catch {
      setStatus('error');
      setMessage('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <div className="bg-primary-800 rounded-2xl p-8 md:p-10 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-white text-2xl font-bold mb-2">Newsletter abonnieren</h3>
        <p className="text-blue-200 mb-6">
          Reinigungstipps, saisonale Angebote und Neuigkeiten – direkt in Ihr Postfach. Jederzeit abbestellbar.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre E-Mail-Adresse"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="E-Mail-Adresse"
          />
          <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center disabled:opacity-60">
            {status === 'loading' ? 'Wird gesendet…' : 'Abonnieren'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>{message}</p>
        )}
        <p className="text-xs text-blue-300 mt-4">
          Mit dem Abonnement stimmen Sie unserer Datenschutzerklärung zu.
        </p>
      </div>
    </div>
  );
}

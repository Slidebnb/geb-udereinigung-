'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) router.push('/admin');
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Ungültige E-Mail-Adresse oder Passwort.');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-accent text-2xl font-bold mx-auto mb-4">H</div>
          <h1 className="text-2xl font-bold text-gray-800">Admin-Bereich</h1>
          <p className="text-gray-500 text-sm mt-1">Huwa Gebäudereinigung</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@huwa-reinigung.de"
                required
              />
            </div>
            <div>
              <label className="label">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
              {loading ? 'Anmeldung...' : 'Anmelden'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          <a href="/" className="hover:text-gray-600">← Zur Webseite</a>
        </p>
      </div>
    </div>
  );
}

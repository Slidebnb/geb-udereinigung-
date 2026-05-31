'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/site';

export default function EinstellungenPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        const map: Record<string, string> = {};
        data.forEach((s: any) => { map[s.key] = s.value; });
        setSettings(map);
      }
    }).catch(() => {});
  }, []);

  const update = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  };

  const fields = [
    { key: 'site_title', label: 'Firmenname', placeholder: siteConfig.name },
    { key: 'phone', label: 'Telefonnummer', placeholder: '+49 170 1234567' },
    { key: 'contact_email', label: 'Kontakt-E-Mail', placeholder: 'info@huwa-reinigung.de' },
    { key: 'whatsapp', label: 'WhatsApp-Nummer (ohne +)', placeholder: '491701234567' },
    { key: 'address', label: 'Adresse', placeholder: 'Musterstraße 12, 40210 Düsseldorf' },
    { key: 'google_rating', label: 'Google-Bewertung', placeholder: '4.9' },
    { key: 'review_count', label: 'Anzahl Bewertungen', placeholder: '127' },
    { key: 'years_experience', label: 'Jahre Erfahrung', placeholder: '15' },
    { key: 'clients_count', label: 'Kundenanzahl', placeholder: '500+' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Einstellungen</h1>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4 mb-6">
          <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3">Allgemeine Einstellungen</h2>
          {fields.map(f => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              <input
                value={settings[f.key] || ''}
                onChange={e => update(f.key, e.target.value)}
                className="input-field"
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
            ✓ Einstellungen wurden gespeichert!
          </div>
        )}

        <button onClick={save} disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-50">
          {saving ? 'Speichern...' : '✓ Einstellungen speichern'}
        </button>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Admin-Zugangsdaten</h3>
          <p className="text-yellow-700 text-sm">
            Ihr Standard-Login: <strong>admin@huwa-reinigung.de</strong><br/>
            Zum Ändern des Passworts wenden Sie sich an Ihren Entwickler.
          </p>
        </div>
      </div>
    </div>
  );
}

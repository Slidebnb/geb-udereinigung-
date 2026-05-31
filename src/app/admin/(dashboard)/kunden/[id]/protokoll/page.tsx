'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LEISTUNGSARTEN = [
  'Büroreinigung',
  'Treppenhausreinigung',
  'Grundreinigung',
  'Unterhaltsreinigung',
  'Fensterreinigung',
  'Sanitärreinigung',
  'Teppichreinigung',
  'Hausmeisterdienst',
  'Winterdienst',
  'Sonderreinigung',
];

export default function ProtokollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    location: '',
    duration: '',
    staff: '',
    notes: '',
    status: 'abgeschlossen',
  });
  const [tasks, setTasks] = useState<string[]>(['']);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleTaskChange(index: number, value: string) {
    setTasks(prev => prev.map((t, i) => (i === index ? value : t)));
  }

  function addTask() {
    setTasks(prev => [...prev, '']);
  }

  function removeTask(index: number) {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanTasks = tasks.filter(t => t.trim() !== '');
    if (cleanTasks.length === 0) {
      setError('Bitte mindestens eine Aufgabe eintragen.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/kunden/${id}/protokoll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tasks: cleanTasks }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Fehler beim Speichern.');
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
        <h1 className="text-2xl font-bold text-gray-800">Protokoll erstellen</h1>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Datum <span className="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Leistungsart <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="">Bitte wählen …</option>
                  {LEISTUNGSARTEN.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                Standort / Objekt <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="z.B. Mittelweg 24, 56564 Neuwied"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Dauer
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="z.B. 2 Stunden"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="staff" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mitarbeiter
                </label>
                <input
                  id="staff"
                  name="staff"
                  type="text"
                  value={form.staff}
                  onChange={handleChange}
                  placeholder="z.B. 2 Mitarbeiter"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="abgeschlossen">Abgeschlossen</option>
                <option value="in Bearbeitung">In Bearbeitung</option>
                <option value="geplant">Geplant</option>
              </select>
            </div>

            {/* Tasks */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Aufgaben <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addTask}
                  className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  + Aufgabe hinzufügen
                </button>
              </div>
              <div className="space-y-2">
                {tasks.map((task, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={task}
                      onChange={e => handleTaskChange(i, e.target.value)}
                      placeholder={`Aufgabe ${i + 1}, z.B. Böden gewischt`}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {tasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTask(i)}
                        className="px-3 py-2.5 text-gray-400 hover:text-red-500 transition-colors text-sm"
                        title="Aufgabe entfernen"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Notizen
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="z.B. Nächster Termin: 15.07.2025 oder weitere Anmerkungen"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Tipp: &quot;Nächster Termin: TT.MM.JJJJ&quot; wird im Kunden-Portal als nächster Termin angezeigt.
              </p>
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
                {loading ? 'Speichern …' : 'Protokoll speichern'}
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

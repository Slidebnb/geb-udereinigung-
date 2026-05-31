'use client';

import { useEffect, useState } from 'react';

interface Protocol {
  id: string;
  date: string;
  type: string;
  location: string;
  duration: string | null;
  staff: string | null;
  notes: string | null;
  status: string;
  tasks: string;
}

export default function PortalProtokollePage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/portal/protokolle')
      .then(r => r.json())
      .then(data => {
        setProtocols(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const years = Array.from(
    new Set(protocols.map(p => new Date(p.date).getFullYear().toString()))
  ).sort((a, b) => Number(b) - Number(a));

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  const filtered = protocols.filter(p => {
    const d = new Date(p.date);
    if (filterYear && d.getFullYear().toString() !== filterYear) return false;
    if (filterMonth && (d.getMonth() + 1).toString() !== filterMonth) return false;
    return true;
  });

  function parseTasks(raw: string): string[] {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [raw];
    } catch {
      return raw ? [raw] : [];
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0C2340]">Meine Reinigungsprotokolle</h1>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#4BB8F5] hover:text-[#4BB8F5] transition-colors print:hidden"
        >
          <span>🖨️</span> Drucken
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6 print:hidden">
        <select
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4BB8F5] bg-white"
        >
          <option value="">Alle Jahre</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={filterMonth}
          onChange={e => setFilterMonth(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4BB8F5] bg-white"
        >
          <option value="">Alle Monate</option>
          {months.map((m, i) => (
            <option key={i + 1} value={(i + 1).toString()}>{m}</option>
          ))}
        </select>

        {(filterYear || filterMonth) && (
          <button
            onClick={() => { setFilterYear(''); setFilterMonth(''); }}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm">
          Protokolle werden geladen …
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm">
          Keine Protokolle gefunden.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_1.5fr_1.5fr_0.8fr_0.8fr_1.2fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div>Datum</div>
            <div>Leistung</div>
            <div>Standort</div>
            <div>Dauer</div>
            <div>Status</div>
            <div></div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map(p => {
              const tasks = parseTasks(p.tasks);
              const isOpen = openId === p.id;

              return (
                <div key={p.id}>
                  <div
                    className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr_0.8fr_0.8fr_1.2fr] gap-2 md:gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenId(isOpen ? null : p.id)}
                  >
                    <div className="text-sm text-gray-800 font-medium">
                      {new Date(p.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-700">{p.type}</div>
                    <div className="text-sm text-gray-600 truncate">{p.location}</div>
                    <div className="text-sm text-gray-600">{p.duration || '–'}</div>
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                        {p.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#4BB8F5] font-medium">
                        {isOpen ? '▲ Schliessen' : '▼ Details'}
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-6 pb-5 bg-blue-50/40 border-t border-blue-100">
                      <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Durchgeführte Aufgaben</div>
                          {tasks.length > 0 ? (
                            <ul className="space-y-1">
                              {tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-[#2DC94E] mt-0.5">✓</span>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400">Keine Aufgaben eingetragen.</p>
                          )}
                        </div>
                        <div className="space-y-3">
                          {p.staff && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Mitarbeiter</div>
                              <div className="text-sm text-gray-700">{p.staff}</div>
                            </div>
                          )}
                          {p.notes && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Notizen</div>
                              <div className="text-sm text-gray-700 whitespace-pre-wrap">{p.notes}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        {filtered.length} Protokoll{filtered.length !== 1 ? 'e' : ''} angezeigt
      </div>
    </div>
  );
}

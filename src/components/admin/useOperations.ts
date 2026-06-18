'use client';

import { useCallback, useEffect, useState } from 'react';

export type OperationsData = {
  customers: any[];
  objects: any[];
  calculations: any[];
  offers: any[];
  contracts: any[];
  documents: any[];
  deadlines: any[];
  materials: any[];
  equipment: any[];
  priceSettings: any[];
  templates: any[];
  communication: any[];
};

const empty: OperationsData = { customers: [], objects: [], calculations: [], offers: [], contracts: [], documents: [], deadlines: [], materials: [], equipment: [], priceSettings: [], templates: [], communication: [] };

export function useOperations() {
  const [data, setData] = useState<OperationsData>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/operations', { cache: 'no-store' });
      if (!response.ok) throw new Error('Betriebsdaten konnten nicht geladen werden.');
      setData(await response.json());
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const create = useCallback(async (payload: Record<string, unknown>) => {
    const response = await fetch('/api/admin/operations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Speichern fehlgeschlagen.');
    await load();
    return result;
  }, [load]);
  return { data, loading, error, load, create };
}

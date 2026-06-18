'use client';

import { useState } from 'react';
import { Download, FilePlus2, LockKeyhole } from 'lucide-react';
import { AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';
import { serviceCatalog } from '@/lib/operations-catalog';
import { formatEuro } from '@/lib/pricing-engine';

export default function DokumentePage() {
  const { data, loading, create } = useOperations();
  const [type, setType] = useState<'offer' | 'contract'>('offer');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { await create({ action: type, ...Object.fromEntries(new FormData(event.currentTarget)) }); event.currentTarget.reset(); setShowForm(false); setMessage(`${type === 'offer' ? 'Angebot' : 'Vertrag'} wurde als versionierter Entwurf angelegt.`); }
    catch (err) { setMessage(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.'); }
  }
  async function documentAction(action: 'newDocumentVersion' | 'finalizeDocument', id: string) {
    try { const result = await create({ action, kind: type, id }); setMessage(action === 'newDocumentVersion' ? `Version V${result.version} wurde angelegt.` : 'Dokument wurde final freigegeben.'); }
    catch (err) { setMessage(err instanceof Error ? err.message : 'Aktion fehlgeschlagen.'); }
  }
  return <>
    <AdminPageHeader title="Angebote & Verträge" description="Dokumente können unabhängig erstellt werden und behalten den Preis- und Datenstand jeder Version." action={<button className="admin-button" onClick={() => setShowForm(value => !value)}><FilePlus2 size={16} /> Dokument erstellen</button>} />
    <div className="admin-tabs"><button className={type === 'offer' ? 'active' : ''} onClick={() => setType('offer')}>Angebote</button><button className={type === 'contract' ? 'active' : ''} onClick={() => setType('contract')}>Verträge</button></div>
    {showForm ? <AdminPanel title={type === 'offer' ? 'Neues Angebot' : 'Neuer Vertrag'} description="Der erste PDF-Export trägt bis zur rechtlichen Freigabe sichtbar den Status Entwurf."><form className="admin-form" onSubmit={submit}><div className="admin-form-grid"><div className="admin-field"><label>Kunde *</label><select name="customerId" required><option value="">Bitte wählen</option>{data.customers.map(customer => <option value={customer.id} key={customer.id}>{customer.company || customer.name}</option>)}</select></div><div className="admin-field"><label>Objekt</label><select name="objectId"><option value="">Kein Objekt</option>{data.objects.map(object => <option value={object.id} key={object.id}>{object.name}</option>)}</select></div><div className="admin-field"><label>Kalkulation</label><select name="calculationId"><option value="">Ohne Verknüpfung</option>{data.calculations.map(item => <option value={item.id} key={item.id}>{item.calculationNumber} · {item.title}</option>)}</select></div><div className="admin-field"><label>Dienstleistung *</label><select name="serviceKey" required>{serviceCatalog.map(service => <option value={service.key} key={service.key}>{service.title}</option>)}</select></div><div className="admin-field"><label>Titel *</label><input name="title" required placeholder={type === 'offer' ? 'Angebot Unterhaltsreinigung' : 'Dienstleistungsvertrag Unterhaltsreinigung'} /></div><div className="admin-field"><label>{type === 'offer' ? 'Angebotssumme netto' : 'Monatspauschale netto'} *</label><input type="number" min="0.01" step="0.01" name="netTotal" required /></div>{type === 'offer' ? <div className="admin-field"><label>Gültig bis</label><input type="date" name="validUntil" /></div> : <><div className="admin-field"><label>Vertragsbeginn</label><input type="date" name="startsAt" /></div><div className="admin-field"><label>Vertragsende</label><input type="date" name="endsAt" /></div><div className="admin-field"><label>Kündigungsfrist in Monaten</label><input type="number" min="1" name="noticeMonths" defaultValue="1" /></div></>}</div><div className="admin-field"><label>Interne Notiz</label><textarea name="notes" /></div><button className="admin-button">Entwurf erstellen</button></form></AdminPanel> : null}
    {message ? <p className="my-5 text-sm text-emerald-700">{message}</p> : null}
    <div className="mt-6"><AdminPanel title={type === 'offer' ? 'Angebote' : 'Verträge'} action={<div className="flex items-center gap-2 text-[10px] text-amber-700"><LockKeyhole size={14} /> Freigabe nur nach Prüfung</div>}>{loading ? <EmptyState title="Dokumente werden geladen" text="Einen Moment bitte." /> : (type === 'offer' ? data.offers : data.contracts).length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nummer</th><th>Dokument</th><th>Kunde</th><th>Betrag netto</th><th>Version</th><th>Status</th><th>Aktionen</th></tr></thead><tbody>{(type === 'offer' ? data.offers : data.contracts).map(item => <tr key={item.id}><td>{item.offerNumber || item.contractNumber}</td><td>{item.title}</td><td>{item.customer.company || item.customer.name}</td><td>{formatEuro(item.netTotal ?? item.netMonthly)}</td><td>V{item.versions[0]?.version || 1}</td><td><AdminStatus tone={item.status === 'final' ? 'success' : 'warning'}>{item.status}</AdminStatus></td><td><div className="flex flex-wrap gap-2"><a href={`/api/admin/documents/${type === 'offer' ? 'angebot' : 'vertrag'}/${item.id}/pdf`} target="_blank" rel="noreferrer" className="admin-button admin-button-secondary"><Download size={14} /> PDF</a><button className="admin-button admin-button-secondary" onClick={() => documentAction('newDocumentVersion', item.id)}>Neue Version</button>{item.status !== 'final' ? <button className="admin-button admin-button-secondary" onClick={() => documentAction('finalizeDocument', item.id)}>Final freigeben</button> : null}</div></td></tr>)}</tbody></table></div> : <EmptyState title={`Noch keine ${type === 'offer' ? 'Angebote' : 'Verträge'}`} text="Erstellen Sie einen versionierten Dokumententwurf." />}</AdminPanel></div>
  </>;
}

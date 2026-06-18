'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, Users } from 'lucide-react';
import { AdminMetric, AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';

export default function KundenPage() {
  const { data, loading, error, create } = useOperations();
  const [tab, setTab] = useState<'customers' | 'objects'>('customers');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try { await create({ action: tab === 'customers' ? 'customer' : 'object', ...values }); event.currentTarget.reset(); setShowForm(false); }
    catch (err) { setMessage(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.'); }
  }
  return <>
    <AdminPageHeader title="Kunden & Objekte" description="Kundenstamm und digitale Objektakten bilden die gemeinsame Grundlage für Kalkulation, Verträge und Nachweise." action={<button onClick={() => setShowForm(value => !value)} className="admin-button"><Plus size={16} /> {tab === 'customers' ? 'Neuer Kunde' : 'Neues Objekt'}</button>} />
    <div className="admin-metrics"><AdminMetric label="Kunden" value={data.customers.length} detail="aktive und archivierte Datensätze" icon={<Users size={19} />} /><AdminMetric label="Objekte" value={data.objects.length} detail="digitale Objektakten" icon={<Building2 size={19} />} /></div>
    <div className="admin-tabs"><button className={tab === 'customers' ? 'active' : ''} onClick={() => { setTab('customers'); setShowForm(false); }}>Kunden</button><button className={tab === 'objects' ? 'active' : ''} onClick={() => { setTab('objects'); setShowForm(false); }}>Objekte</button></div>
    {showForm ? <AdminPanel title={tab === 'customers' ? 'Kunde anlegen' : 'Objekt anlegen'} description="Pflichtfelder sind bewusst auf das Nötigste begrenzt."><form className="admin-form" onSubmit={submit}><div className="admin-form-grid">
      {tab === 'customers' ? <>
        <Field name="name" label="Ansprechpartner / Name *" required /><Field name="company" label="Firma / WEG" /><Field name="email" label="E-Mail" type="email" /><Field name="phone" label="Telefon" /><Field name="street" label="Straße" /><Field name="zip" label="PLZ" /><Field name="city" label="Ort" /><Field name="billingAddress" label="Abweichende Rechnungsadresse" />
      </> : <>
        <div className="admin-field"><label>Kunde *</label><select name="customerId" required><option value="">Bitte wählen</option>{data.customers.map(customer => <option value={customer.id} key={customer.id}>{customer.company || customer.name}</option>)}</select></div><Field name="name" label="Objektname *" required /><Field name="objectType" label="Objektart" /><Field name="street" label="Straße *" required /><Field name="zip" label="PLZ *" required /><Field name="city" label="Ort *" required /><Field name="areaSqm" label="Gesamtfläche in m²" type="number" /><Field name="floors" label="Etagen" type="number" /><Field name="accessDetails" label="Zugänge" /><Field name="keyDetails" label="Schlüssel / Codes" /><Field name="serviceWindow" label="Leistungszeitfenster" /><Field name="specialFeatures" label="Besonderheiten" />
      </>}
      </div>{message ? <p className="text-sm text-red-600">{message}</p> : null}<div><button className="admin-button" type="submit">Speichern</button></div></form></AdminPanel> : null}
    <div className="mt-5"><AdminPanel title={tab === 'customers' ? 'Kundenstamm' : 'Objektakten'}>{loading ? <EmptyState title="Daten werden geladen" text="Einen Moment bitte." /> : error ? <EmptyState title="Laden fehlgeschlagen" text={error} /> : tab === 'customers' ? (data.customers.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Kundennummer</th><th>Kunde</th><th>Kontakt</th><th>Objekte</th><th>Status</th></tr></thead><tbody>{data.customers.map(customer => <tr key={customer.id}><td>{customer.customerNumber}</td><td><strong>{customer.company || customer.name}</strong><br/><span className="text-[10px] text-slate-400">{customer.company ? customer.name : ''}</span></td><td>{customer.email || customer.phone || 'Nicht hinterlegt'}</td><td>{customer._count.objects}</td><td><AdminStatus tone={customer.status === 'aktiv' ? 'success' : 'neutral'}>{customer.status}</AdminStatus></td></tr>)}</tbody></table></div> : <EmptyState title="Noch keine CRM-Kunden" text="Bestehende Portal-Kunden werden beim Backfill übernommen." />) : (data.objects.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Objektnummer</th><th>Objekt</th><th>Kunde</th><th>Ort</th><th>Dokumente</th><th></th></tr></thead><tbody>{data.objects.map(object => <tr key={object.id}><td>{object.objectNumber}</td><td><Link href={`/admin/kunden/objekte/${object.id}`}>{object.name}</Link></td><td>{object.customer.company || object.customer.name}</td><td>{object.zip} {object.city}</td><td>{object._count.documents}</td><td><Link href={`/admin/kunden/objekte/${object.id}`} className="admin-button admin-button-secondary">Objektakte</Link></td></tr>)}</tbody></table></div> : <EmptyState title="Noch keine Objekte" text="Legen Sie die erste digitale Objektakte an." />)}</AdminPanel></div>
  </>;
}

function Field({ name, label, type = 'text', required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return <div className="admin-field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} required={required} /></div>;
}

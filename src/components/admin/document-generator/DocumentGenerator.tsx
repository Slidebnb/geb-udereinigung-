'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Download, FileCheck2, Layers3, Save, Sparkles } from 'lucide-react';
import { AdminStatus } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';
import { buildDocument } from '@/lib/document-generator/document-builder';
import { documentTypes, frequencyOptions, objectFeatureOptions, objectTypeOptions } from '@/lib/document-generator/document-types';
import { serviceModules } from '@/lib/document-generator/service-modules';
import type { DocumentTypeKey, FrequencyKey, GeneratorSelection, ObjectTypeKey } from '@/lib/document-generator/types';
import { DocumentPreview } from './DocumentPreview';

const steps = ['Grundlage', 'Leistungen', 'Details', 'Vorschau', 'Speichern'];

function defaultOptions(serviceKey: string) {
  return serviceModules.find(module => module.key === serviceKey)?.options.filter(option => option.defaultSelected).map(option => option.key) || [];
}

export default function DocumentGenerator() {
  const { data, loading, create } = useOperations();
  const [step, setStep] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [objectId, setObjectId] = useState('');
  const [documentType, setDocumentType] = useState<DocumentTypeKey>('leistungsverzeichnis');
  const [title, setTitle] = useState('');
  const [serviceKeys, setServiceKeys] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [frequency, setFrequency] = useState<FrequencyKey>('woechentlich');
  const [objectType, setObjectType] = useState<ObjectTypeKey>('gewerbeobjekt');
  const [features, setFeatures] = useState<string[]>([]);
  const [executionTimes, setExecutionTimes] = useState('');
  const [notes, setNotes] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedDocument, setSavedDocument] = useState<{ id: string; documentNumber: string } | null>(null);

  const customer = data.customers.find(item => item.id === customerId);
  const objects = useMemo(() => data.objects.filter(item => !customerId || item.customerId === customerId), [data.objects, customerId]);
  const object = data.objects.find(item => item.id === objectId);
  const selection: GeneratorSelection = useMemo(() => ({
    documentType,
    title: title.trim() || `${documentTypes.find(item => item.key === documentType)?.title || 'Dokument'}${object ? ` - ${object.name}` : ''}`,
    customerName: customer?.company || customer?.name || 'Auftraggeber noch nicht gewählt',
    objectName: object?.name || 'Objekt noch nicht gewählt',
    objectAddress: object ? `${object.street}, ${object.zip} ${object.city}` : 'Objektanschrift noch nicht gewählt',
    objectType,
    frequency,
    serviceKeys,
    selectedOptions,
    features,
    executionTimes,
    notes,
  }), [customer, documentType, executionTimes, features, frequency, notes, object, objectType, selectedOptions, serviceKeys, title]);

  const generated = useMemo(() => {
    try { return buildDocument(selection); } catch { return { title: selection.title, body: 'Wählen Sie mindestens einen Leistungsbereich und die gewünschten Leistungsbausteine aus.', serviceTitles: [] }; }
  }, [selection]);
  const previewBody = editedBody || generated.body;

  function chooseCustomer(value: string) {
    setCustomerId(value);
    setObjectId('');
    setEditedBody('');
    setSavedDocument(null);
  }

  function toggleService(serviceKey: string) {
    setServiceKeys(current => current.includes(serviceKey) ? current.filter(key => key !== serviceKey) : [...current, serviceKey]);
    setSelectedOptions(current => current[serviceKey] ? current : { ...current, [serviceKey]: defaultOptions(serviceKey) });
    setEditedBody('');
    setSavedDocument(null);
  }

  function toggleOption(serviceKey: string, optionKey: string) {
    setSelectedOptions(current => {
      const values = current[serviceKey] || [];
      return { ...current, [serviceKey]: values.includes(optionKey) ? values.filter(key => key !== optionKey) : [...values, optionKey] };
    });
    setEditedBody('');
    setSavedDocument(null);
  }

  function toggleFeature(feature: string) {
    setFeatures(current => current.includes(feature) ? current.filter(value => value !== feature) : [...current, feature]);
    setEditedBody('');
  }

  function canContinue() {
    if (step === 0) return Boolean(customerId && objectId && documentType);
    if (step === 1) return serviceKeys.length > 0 && serviceKeys.every(key => (selectedOptions[key] || []).length > 0);
    return true;
  }

  async function saveDocument() {
    setSaving(true);
    setMessage('');
    try {
      const result = await create({ action: 'modularDocument', customerId, objectId, selection, content: previewBody });
      setSavedDocument({ id: result.id, documentNumber: result.documentNumber });
      setStep(4);
      setMessage(`${result.documentNumber} wurde als unveränderlicher Entwurf in der Objektakte gespeichert.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Das Dokument konnte nicht gespeichert werden.');
    } finally { setSaving(false); }
  }

  return (
    <div className="generator-shell">
      <div className="generator-steps" aria-label="Dokumenterstellung">
        {steps.map((label, index) => <button type="button" key={label} className={index === step ? 'active' : index < step ? 'complete' : ''} onClick={() => index <= step && setStep(index)}><span>{index < step ? <Check size={15} /> : index + 1}</span><strong>{label}</strong></button>)}
      </div>

      <div className="generator-workspace">
        <section className="generator-builder">
          {loading ? <div className="generator-loading">Betriebsdaten werden geladen ...</div> : null}

          {step === 0 ? <div className="generator-step-content">
            <div className="generator-section-heading"><Layers3 size={19} /><div><h2>Dokumentgrundlage</h2><p>Auftraggeber, Objekt und Dokumentart bestimmen den Datenrahmen.</p></div></div>
            <div className="admin-form-grid">
              <div className="admin-field"><label>Auftraggeber *</label><select value={customerId} onChange={event => chooseCustomer(event.target.value)}><option value="">Kunde auswählen</option>{data.customers.map(item => <option key={item.id} value={item.id}>{item.company || item.name} · {item.customerNumber}</option>)}</select></div>
              <div className="admin-field"><label>Objekt *</label><select value={objectId} onChange={event => { setObjectId(event.target.value); setEditedBody(''); const selected = data.objects.find(item => item.id === event.target.value); if (selected?.objectType && objectTypeOptions.some(option => option.key === selected.objectType)) setObjectType(selected.objectType as ObjectTypeKey); }} disabled={!customerId}><option value="">Objekt auswählen</option>{objects.map(item => <option key={item.id} value={item.id}>{item.name} · {item.objectNumber}</option>)}</select></div>
              <div className="admin-field"><label>Dokumentart *</label><select value={documentType} onChange={event => { setDocumentType(event.target.value as DocumentTypeKey); setEditedBody(''); }}>{documentTypes.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}</select></div>
              <div className="admin-field"><label>Dokumenttitel</label><input value={title} onChange={event => setTitle(event.target.value)} placeholder="Wird aus Dokumentart und Objekt gebildet" /></div>
            </div>
            <div className="generator-type-description"><FileCheck2 size={18} /><div><strong>{documentTypes.find(item => item.key === documentType)?.title}</strong><p>{documentTypes.find(item => item.key === documentType)?.description}</p></div></div>
          </div> : null}

          {step === 1 ? <div className="generator-step-content">
            <div className="generator-section-heading"><Layers3 size={19} /><div><h2>Leistungsbereiche kombinieren</h2><p>Wählen Sie beliebig viele Module. Im Dokument erscheinen ausschließlich aktivierte Bausteine.</p></div></div>
            <div className="generator-module-grid">{serviceModules.map(module => {
              const active = serviceKeys.includes(module.key);
              return <button type="button" key={module.key} data-service-key={module.key} aria-pressed={active} className={active ? 'active' : ''} onClick={() => toggleService(module.key)}><span className="generator-module-check">{active ? <Check size={14} /> : null}</span><strong>{module.title}</strong><small>{module.description}</small></button>;
            })}</div>
            <div className="generator-option-list">{serviceKeys.map(serviceKey => {
              const serviceModule = serviceModules.find(item => item.key === serviceKey)!;
              return <section key={serviceKey}><header><div><strong>{serviceModule.title}</strong><span>{(selectedOptions[serviceKey] || []).length} von {serviceModule.options.length} ausgewählt</span></div><ChevronDown size={17} /></header><div>{serviceModule.options.map(option => <label key={option.key}><input type="checkbox" checked={(selectedOptions[serviceKey] || []).includes(option.key)} onChange={() => toggleOption(serviceKey, option.key)} /><span><strong>{option.label}</strong><small>{option.documentText}</small></span>{option.additional ? <em>Zusatzleistung</em> : null}</label>)}</div></section>;
            })}</div>
          </div> : null}

          {step === 2 ? <div className="generator-step-content">
            <div className="generator-section-heading"><Sparkles size={19} /><div><h2>Objekt- und Ausführungsdetails</h2><p>Diese Angaben werden in allen kombinierten Leistungsbereichen einheitlich verwendet.</p></div></div>
            <div className="admin-form-grid">
              <div className="admin-field"><label>Turnus *</label><select value={frequency} onChange={event => { setFrequency(event.target.value as FrequencyKey); setEditedBody(''); }}>{frequencyOptions.map(option => <option value={option.key} key={option.key}>{option.label}</option>)}</select></div>
              <div className="admin-field"><label>Objektart *</label><select value={objectType} onChange={event => { setObjectType(event.target.value as ObjectTypeKey); setEditedBody(''); }}>{objectTypeOptions.map(option => <option value={option.key} key={option.key}>{option.label}</option>)}</select></div>
              <div className="admin-field"><label>Ausführungszeiten</label><input value={executionTimes} onChange={event => { setExecutionTimes(event.target.value); setEditedBody(''); }} placeholder="z. B. Montag bis Freitag, ab 18:00 Uhr" /></div>
              <div className="admin-field"><label>Interne Zuordnung</label><input value={object?.objectNumber || ''} disabled /></div>
            </div>
            <div><h3 className="generator-field-title">Besonderheiten</h3><div className="generator-feature-grid">{objectFeatureOptions.map(feature => <label key={feature} className={features.includes(feature) ? 'active' : ''}><input type="checkbox" checked={features.includes(feature)} onChange={() => toggleFeature(feature)} /><span>{feature}</span></label>)}</div></div>
            <div className="admin-field"><label>Sonderleistungen und Ergänzungen</label><textarea value={notes} onChange={event => { setNotes(event.target.value); setEditedBody(''); }} placeholder="Nur konkrete objektbezogene Ergänzungen eintragen. Keine internen Preis- oder Margenangaben." /></div>
          </div> : null}

          {step === 3 ? <div className="generator-step-content">
            <div className="generator-section-heading"><FileCheck2 size={19} /><div><h2>Inhalt fachlich prüfen</h2><p>Die Vorschau enthält nur Ihre Auswahl. Über „Text bearbeiten“ können Sie den Entwurf vor dem Speichern anpassen.</p></div></div>
            <div className="generator-review-list"><div><span>Auftraggeber</span><strong>{selection.customerName}</strong></div><div><span>Objekt</span><strong>{selection.objectName}</strong></div><div><span>Dokumentart</span><strong>{documentTypes.find(item => item.key === documentType)?.title}</strong></div><div><span>Leistungsbereiche</span><strong>{generated.serviceTitles.join(', ')}</strong></div><div><span>Turnus</span><strong>{frequencyOptions.find(item => item.key === frequency)?.label}</strong></div></div>
            {documentType === 'vertrag' ? <div className="generator-legal-note">Vertragsentwürfe müssen vor einer finalen Verwendung rechtlich und kaufmännisch geprüft werden. Der Generator erteilt keine automatische Rechtsfreigabe.</div> : null}
          </div> : null}

          {step === 4 ? <div className="generator-step-content generator-success">
            <div className="generator-success-icon"><Check size={26} /></div><h2>{savedDocument ? 'Dokument gespeichert' : 'Bereit zum Speichern'}</h2><p>{savedDocument ? message : 'Speichern Sie den geprüften Entwurf in der Objektakte. Erst danach steht der geschützte PDF-Export bereit.'}</p>
            {savedDocument ? <><AdminStatus tone="success">{savedDocument.documentNumber} · Entwurf</AdminStatus><a className="admin-button" href={`/api/admin/documents/objekt/${savedDocument.id}/pdf`} target="_blank" rel="noreferrer"><Download size={16} /> PDF öffnen</a></> : <button type="button" className="admin-button" disabled={saving} onClick={saveDocument}><Save size={16} /> {saving ? 'Speichert ...' : 'Entwurf speichern'}</button>}
          </div> : null}

          {message && step !== 4 ? <p className="generator-message">{message}</p> : null}
          <footer className="generator-navigation">
            <button type="button" className="admin-button admin-button-secondary" disabled={step === 0} onClick={() => setStep(value => Math.max(0, value - 1))}><ArrowLeft size={16} /> Zurück</button>
            {step < 4 ? <button type="button" className="admin-button" disabled={!canContinue()} onClick={() => setStep(value => Math.min(4, value + 1))}>Weiter <ArrowRight size={16} /></button> : null}
          </footer>
        </section>

        <DocumentPreview body={previewBody} editing={editing} onEditingChange={value => { setEditing(value); if (value && !editedBody) setEditedBody(generated.body); }} onBodyChange={setEditedBody} onReset={() => { setEditedBody(''); setEditing(false); }} />
      </div>
    </div>
  );
}

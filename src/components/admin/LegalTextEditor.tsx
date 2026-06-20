'use client';

import { useState } from 'react';
import { Eye, Save } from 'lucide-react';
import LegalContent from '@/components/shared/LegalContent';
import { defaultLegalTexts, legalTextDefinitions } from '@/lib/legal-content';

type LegalKey=(typeof legalTextDefinitions)[number]['key'];

export default function LegalTextEditor({ values, onChange, onSave }: { values:Record<string,string>; onChange:(key:LegalKey,value:string)=>void; onSave:(key:LegalKey,value:string)=>Promise<void> }) {
  const [active,setActive]=useState<LegalKey>('legal_page_agb');
  const [saving,setSaving]=useState(false);
  const definition=legalTextDefinitions.find(item=>item.key===active)!;
  const value=values[active]||defaultLegalTexts[active];
  async function save(){setSaving(true);await onSave(active,value);setSaving(false);}
  return <div className="legal-editor">
    <div className="legal-editor-tabs">{legalTextDefinitions.map(item=><button type="button" key={item.key} className={active===item.key?'active':''} onClick={()=>setActive(item.key)}>{item.label}</button>)}</div>
    <div className="legal-editor-grid">
      <section className="legal-editor-input"><div className="legal-editor-heading"><div><h3>{definition.title} bearbeiten</h3><p>Überschriften beginnen mit <code>##</code>, Unterüberschriften mit <code>###</code>, Listenpunkte mit <code>-</code>.</p></div><button className="admin-button" onClick={save} disabled={saving}><Save size={15}/>{saving?'Speichert':'Veröffentlichen'}</button></div><textarea value={value} onChange={event=>onChange(active,event.target.value)} spellCheck="true" /></section>
      <aside className="legal-editor-preview"><header><Eye size={16}/><strong>Dokumentvorschau</strong></header><div className="legal-paper"><div className="legal-paper-brand"><img src="/brand/huwa-logo.png" alt="HUWA"/></div><h1>{definition.title}</h1><LegalContent content={value} compact/></div></aside>
    </div>
  </div>;
}

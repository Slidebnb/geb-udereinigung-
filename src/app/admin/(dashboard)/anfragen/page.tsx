'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Euro, Inbox, Mail, Phone, Search, Trash2 } from 'lucide-react';
import { AdminMetric, AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';

type ContactRequest = { id:string; name:string; email:string; phone?:string|null; subject?:string|null; message:string; status:string; mailSent:boolean; createdAt:string };
type QuoteRequest = { id:string; name:string; email:string; phone?:string|null; company?:string|null; service:string; area?:string|null; frequency?:string|null; estimatedMin?:number|null; estimatedMax?:number|null; message?:string|null; status:string; mailSent:boolean; createdAt:string };
type RequestItem = (ContactRequest & { kind:'contact' }) | (QuoteRequest & { kind:'quote' });

const statuses = [
  { key:'neu', label:'Neu' },
  { key:'in_bearbeitung', label:'In Bearbeitung' },
  { key:'kontaktiert', label:'Kontaktiert' },
  { key:'erledigt', label:'Erledigt' },
] as const;

function normalizedStatus(status:string) {
  if (status === 'gelesen') return 'in_bearbeitung';
  if (status === 'bearbeitet') return 'erledigt';
  return status;
}

function tone(status:string): 'danger'|'warning'|'info'|'success' {
  const tones:Record<string,'danger'|'warning'|'info'|'success'>={neu:'danger',in_bearbeitung:'warning',kontaktiert:'info',erledigt:'success'};
  return tones[normalizedStatus(status)]||'info';
}

export default function AnfragenPage() {
  const [items,setItems]=useState<RequestItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [message,setMessage]=useState('');
  const [search,setSearch]=useState('');
  const [type,setType]=useState<'all'|'contact'|'quote'>('all');
  const [status,setStatus]=useState('offen');

  const load=useCallback(async()=>{
    setLoading(true);
    const response=await fetch('/api/admin/requests');
    const data=await response.json();
    if(response.ok){
      setItems([
        ...data.contacts.map((item:ContactRequest)=>({...item,kind:'contact' as const})),
        ...data.quotes.map((item:QuoteRequest)=>({...item,kind:'quote' as const})),
      ].sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()));
    } else setMessage(data.error||'Anfragen konnten nicht geladen werden.');
    setLoading(false);
  },[]);
  useEffect(()=>{load();},[load]);

  const filtered=useMemo(()=>items.filter(item=>{
    const current=normalizedStatus(item.status);
    const haystack=[item.name,item.email,item.phone,item.kind==='quote'?item.company:'',item.kind==='quote'?item.service:item.subject,item.message].filter(Boolean).join(' ').toLowerCase();
    return (type==='all'||item.kind===type) && (status==='alle'||(status==='offen'?current!=='erledigt':current===status)) && haystack.includes(search.trim().toLowerCase());
  }),[items,search,status,type]);
  const openCount=items.filter(item=>normalizedStatus(item.status)!=='erledigt').length;
  const newCount=items.filter(item=>normalizedStatus(item.status)==='neu').length;
  const quoteCount=items.filter(item=>item.kind==='quote'&&normalizedStatus(item.status)!=='erledigt').length;

  async function changeStatus(item:RequestItem,next:string){
    const previous=item.status;
    setItems(current=>current.map(entry=>entry.id===item.id&&entry.kind===item.kind?{...entry,status:next}:entry));
    const response=await fetch('/api/admin/requests',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:item.id,type:item.kind,status:next})});
    if(!response.ok){setItems(current=>current.map(entry=>entry.id===item.id&&entry.kind===item.kind?{...entry,status:previous}:entry));setMessage('Status konnte nicht gespeichert werden.');}
    else setMessage(`Status für ${item.name} wurde aktualisiert.`);
  }
  async function remove(item:RequestItem){
    if(!window.confirm(`Anfrage von ${item.name} endgültig löschen?`))return;
    const response=await fetch('/api/admin/requests',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:item.id,type:item.kind})});
    if(response.ok){setItems(current=>current.filter(entry=>!(entry.id===item.id&&entry.kind===item.kind)));setMessage('Anfrage wurde gelöscht.');}
    else setMessage('Anfrage konnte nicht gelöscht werden.');
  }

  return <>
    <AdminPageHeader title="Anfragen" description="Neue Kontakte prüfen, nachverfolgen und bis zum Abschluss bearbeiten." />
    <div className="admin-metrics">
      <AdminMetric label="Neue Anfragen" value={newCount} detail="noch nicht bearbeitet" icon={<Inbox size={19}/>} />
      <AdminMetric label="Offene Vorgänge" value={openCount} detail="Bearbeitung oder Rückmeldung offen" icon={<Clock3 size={19}/>} />
      <AdminMetric label="Angebotsanfragen" value={quoteCount} detail="offene qualifizierte Leads" icon={<Euro size={19}/>} />
      <AdminMetric label="Erledigt" value={items.length-openCount} detail="abgeschlossene Vorgänge" icon={<CheckCircle2 size={19}/>} />
    </div>
    <AdminPanel title="Arbeitsliste" description="Tipp: Neue Anfragen innerhalb von 24 Stunden prüfen, Kontaktversuch dokumentieren und erst nach Abschluss auf Erledigt setzen.">
      <div className="request-toolbar">
        <label className="request-search"><Search size={16}/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Name, Firma, E-Mail oder Leistung suchen" /></label>
        <select aria-label="Anfragetyp" value={type} onChange={event=>setType(event.target.value as typeof type)}><option value="all">Alle Anfragearten</option><option value="contact">Kontaktanfragen</option><option value="quote">Angebotsanfragen</option></select>
        <select aria-label="Statusfilter" value={status} onChange={event=>setStatus(event.target.value)}><option value="offen">Alle offenen</option><option value="alle">Alle Status</option>{statuses.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select>
      </div>
      {message?<div className="request-message" role="status">{message}</div>:null}
      {loading?<EmptyState title="Anfragen werden geladen" text="Einen Moment bitte."/>:filtered.length?<div className="request-list">{filtered.map(item=><RequestCard key={`${item.kind}-${item.id}`} item={item} onStatus={changeStatus} onDelete={remove}/>)}</div>:<EmptyState title="Keine passenden Anfragen" text="Ändern Sie Suche oder Filter."/>}
    </AdminPanel>
  </>;
}

function RequestCard({item,onStatus,onDelete}:{item:RequestItem;onStatus:(item:RequestItem,status:string)=>void;onDelete:(item:RequestItem)=>void}){
  const current=normalizedStatus(item.status);
  const mailSubject=item.kind==='quote'?`Ihre Anfrage zur ${item.service}`:(item.subject||'Ihre Anfrage bei Huwa');
  return <article className="request-card">
    <div className="request-card-main">
      <div className="request-card-heading"><div className="request-avatar">{item.name.charAt(0).toUpperCase()}</div><div className="min-w-0"><h3>{item.name}</h3><p>{item.kind==='quote'?(item.company||'Angebotsanfrage'):(item.subject||'Kontaktanfrage')}</p></div><AdminStatus tone={tone(current)}>{statuses.find(entry=>entry.key===current)?.label||current}</AdminStatus></div>
      {item.kind==='quote'?<div className="request-facts"><span><small>Leistung</small>{item.service}</span><span><small>Fläche</small>{item.area||'Nicht angegeben'}</span><span><small>Turnus</small>{item.frequency||'Nicht angegeben'}</span>{item.estimatedMin?<span><small>Preisschätzung</small>{item.estimatedMin} - {item.estimatedMax} EUR</span>:null}</div>:null}
      {item.message?<p className="request-body">{item.message}</p>:null}
      <div className="request-meta"><span>{new Date(item.createdAt).toLocaleString('de-DE')}</span><span>{item.mailSent?'Benachrichtigung versendet':'Interne Mail-Benachrichtigung fehlte'}</span></div>
      <div className="request-next"><strong>Nächster Schritt</strong><span>{current==='neu'?'Kontaktdaten prüfen und ersten Rückruf oder eine Antwort auslösen.':current==='in_bearbeitung'?'Bedarf klären, Objekttermin abstimmen und Ergebnis dokumentieren.':current==='kontaktiert'?'Rückmeldung nachhalten und Angebot oder Abschluss vorbereiten.':'Vorgang ist abgeschlossen und kann bei Bedarf gelöscht werden.'}</span></div>
    </div>
    <aside className="request-card-actions">
      <label>Status<select value={current} onChange={event=>onStatus(item,event.target.value)}>{statuses.map(status=><option key={status.key} value={status.key}>{status.label}</option>)}</select></label>
      <a className="admin-button" href={`mailto:${item.email}?subject=${encodeURIComponent(mailSubject)}`}><Mail size={15}/> E-Mail</a>
      {item.phone?<a className="admin-button admin-button-secondary" href={`tel:${item.phone}`}><Phone size={15}/> Anrufen</a>:null}
      <button className="admin-button admin-button-danger" onClick={()=>onDelete(item)}><Trash2 size={15}/> Löschen</button>
    </aside>
  </article>;
}

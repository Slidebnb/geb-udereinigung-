'use client';

import { Edit3, FileText, RefreshCw } from 'lucide-react';

export function DocumentPreview({ body, editing, onEditingChange, onBodyChange, onReset }: {
  body: string;
  editing: boolean;
  onEditingChange: (value: boolean) => void;
  onBodyChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <section className="generator-preview-panel">
      <div className="generator-preview-toolbar">
        <div><strong>Dokumentvorschau</strong><span>A4-Entwurf · Inhalte vor Export prüfen</span></div>
        <div className="flex items-center gap-2">
          {editing ? <button type="button" className="admin-icon-button" onClick={onReset} title="Automatisch neu erzeugen"><RefreshCw size={16} /></button> : null}
          <button type="button" className={`admin-button admin-button-secondary ${editing ? 'text-blue-700' : ''}`} onClick={() => onEditingChange(!editing)}><Edit3 size={15} /> {editing ? 'Vorschau' : 'Text bearbeiten'}</button>
        </div>
      </div>
      <div className="generator-preview-stage">
        {editing ? (
          <textarea className="generator-editor" value={body} onChange={event => onBodyChange(event.target.value)} aria-label="Dokumenttext bearbeiten" />
        ) : (
          <article className="generator-paper">
            <header>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/brand/huwa-logo.png" alt="Huwa" /><div><FileText size={18} /><span>ENTWURF</span></div></header>
            <div className="generator-paper-content">
              {body.split('\n').map((line, index) => {
                const isTitle = index < 2;
                const isSection = /^\d+\.\s[A-ZÄÖÜ]/.test(line);
                const isCheck = line.startsWith('[ ] ');
                if (!line) return <div className="h-3" key={index} />;
                if (isTitle) return index === 0 ? <p className="document-kicker" key={index}>{line}</p> : <h2 key={index}>{line}</h2>;
                if (isSection) return <h3 key={index}>{line}</h3>;
                if (isCheck) return <p className="document-check" key={index}><span />{line.slice(4)}</p>;
                return <p key={index}>{line}</p>;
              })}
            </div>
            <footer>Modularer Vertrags- & Leistungsdokumenten-Generator · Entwurf</footer>
          </article>
        )}
      </div>
    </section>
  );
}

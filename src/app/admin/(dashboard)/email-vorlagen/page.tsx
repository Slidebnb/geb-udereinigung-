'use client';

import { useEffect, useMemo, useState } from 'react';

type TemplateCategory =
  | 'Hausverwaltung'
  | 'WEG'
  | 'Büro'
  | 'Praxis'
  | 'Kanzlei'
  | 'Gewerbe'
  | 'Autohaus'
  | 'Fitness'
  | 'Winterdienst'
  | 'Gartenpflege'
  | 'Hausmeisterservice'
  | 'Nachfassen';

type EmailTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  subject: string;
  body: string;
};

type PlaceholderState = {
  firma: string;
  ansprechpartner: string;
  stadt: string;
  leistung: string;
  telefon: string;
  email: string;
};

const SETTINGS_KEY = 'sales_email_templates_v1';

const DEFAULT_PLACEHOLDERS: PlaceholderState = {
  firma: 'Musterfirma GmbH',
  ansprechpartner: 'Max Mustermann',
  stadt: 'Koblenz',
  leistung: 'Gebäudereinigung',
  telefon: '02601 9131820',
  email: 'info@huwa-gebaeudedienste.de',
};

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'hausverwaltung-erstkontakt',
    name: 'Erstkontakt Hausverwaltung',
    category: 'Hausverwaltung',
    subject: 'Gebäudereinigung für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Gebäudereinigung, Treppenhausreinigung, Hausmeisterservice, Gartenpflege und Winterdienst in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Hausverwaltungen mit festen Ansprechpartnern, klaren Abläufen und zuverlässiger Ausführung vor Ort.

Gerne stellen wir uns Ihnen kurz vor und prüfen, ob wir Sie bei bestehenden oder neuen Objekten sinnvoll unterstützen können.

Falls Interesse besteht, senden wir Ihnen gerne weitere Informationen oder vereinbaren ein kurzes Gespräch.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'weg-erstkontakt',
    name: 'Erstkontakt WEG / Eigentümergemeinschaft',
    category: 'WEG',
    subject: 'Betreuung von WEG-Objekten in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Dienstleister für die Betreuung von WEG-Objekten in {{stadt}} vorstellen.

Unsere Leistungen umfassen unter anderem:
- Treppenhausreinigung
- Unterhaltsreinigung
- Hausmeisterservice
- Gartenpflege
- Winterdienst

Wir arbeiten mit klaren Absprachen, festen Ansprechpartnern und zuverlässiger Ausführung.

Wenn Sie aktuell Unterstützung für einzelne Leistungen oder die laufende Objektbetreuung suchen, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'buero-erstkontakt',
    name: 'Erstkontakt Büroreinigung',
    category: 'Büro',
    subject: 'Zuverlässige Büroreinigung in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Büro- und Unterhaltsreinigung in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen mit festen Abläufen, planbarer Qualität und persönlichem Ansprechpartner.

Ob regelmäßige Büroreinigung, Sanitärpflege oder ergänzende Hausmeisterleistungen: Gerne prüfen wir, ob wir {{firma}} sinnvoll unterstützen können.

Bei Interesse senden wir Ihnen gerne weitere Informationen oder vereinbaren ein kurzes Kennenlernen.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'praxis-erstkontakt',
    name: 'Erstkontakt Praxisreinigung',
    category: 'Praxis',
    subject: 'Professionelle Praxisreinigung in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als Dienstleister für zuverlässige Praxis- und Unterhaltsreinigung in {{stadt}} vorstellen.

Gerade in sensiblen Bereichen sind strukturierte Abläufe, Diskretion und verlässliche Ausführung entscheidend.

HUWA Gebäudedienste unterstützt Praxen mit regelmäßiger Reinigung und persönlichem Ansprechpartner.

Wenn Sie aktuell nach einer zuverlässigen Lösung suchen oder sich unverbindlich informieren möchten, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'kanzlei-erstkontakt',
    name: 'Erstkontakt Kanzlei',
    category: 'Kanzlei',
    subject: 'Zuverlässige Reinigung für Kanzlei- und Büroräume',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Büro- und Unterhaltsreinigung in {{stadt}} vorstellen.

Gerade in Kanzleien sind Verlässlichkeit, Diskretion und ein gepflegter Gesamteindruck besonders wichtig.

HUWA Gebäudedienste unterstützt Unternehmen mit festen Ansprechpartnern und klaren Abläufen.

Wenn Sie Interesse an einem unverbindlichen Austausch haben, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'gewerbe-erstkontakt',
    name: 'Erstkontakt Gewerbeobjekt',
    category: 'Gewerbe',
    subject: 'Gebäudereinigung und Hausmeisterservice in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Dienstleister für {{leistung}} in {{stadt}} vorstellen.

HUWA Gebäudedienste betreut Gewerbeobjekte mit zuverlässiger Reinigung, festen Ansprechpartnern und ergänzenden Leistungen wie Hausmeisterservice, Gartenpflege und Winterdienst.

Wenn {{firma}} aktuell Unterstützung in diesem Bereich sucht, senden wir Ihnen gerne weitere Informationen.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'autohaus-erstkontakt',
    name: 'Erstkontakt Autohaus',
    category: 'Autohaus',
    subject: 'Reinigung und Objektpflege für Ihr Autohaus',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für die Reinigung und Pflege von Gewerbeobjekten in {{stadt}} vorstellen.

Gerade in Autohäusern ist ein gepflegter Eindruck für Kunden besonders wichtig. HUWA Gebäudedienste unterstützt dabei mit zuverlässiger Reinigung, Glasflächenpflege und ergänzender Objektbetreuung.

Wenn Sie Interesse an einem kurzen Austausch haben, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'fitness-erstkontakt',
    name: 'Erstkontakt Fitnessstudio',
    category: 'Fitness',
    subject: 'Reinigungslösung für Fitness- und Trainingsflächen',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für die laufende Reinigung von Trainings-, Sanitär- und Eingangsbereichen in {{stadt}} vorstellen.

HUWA Gebäudedienste arbeitet mit festen Abläufen, verlässlichen Ansprechpartnern und regelmäßiger Ausführung.

Wenn {{firma}} aktuell nach einer stabilen Reinigungslösung sucht, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'winterdienst-erstkontakt',
    name: 'Erstkontakt Winterdienst',
    category: 'Winterdienst',
    subject: 'Winterdienst für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Winterdienst in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen, Hausverwaltungen und Eigentümergemeinschaften mit planbarer Betreuung in der Wintersaison.

Wenn Sie aktuell Unterstützung für Räum- und Streudienste benötigen, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'gartenpflege-erstkontakt',
    name: 'Erstkontakt Gartenpflege',
    category: 'Gartenpflege',
    subject: 'Gartenpflege und Außenanlagen in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Gartenpflege und die Betreuung von Außenanlagen in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen, Hausverwaltungen und Eigentümergemeinschaften bei Rasenpflege, Heckenrückschnitt, Objektpflege und saisonalen Arbeiten.

Wenn Sie aktuell Unterstützung suchen, senden wir Ihnen gerne weitere Informationen.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'hausmeisterservice-erstkontakt',
    name: 'Erstkontakt Hausmeisterservice',
    category: 'Hausmeisterservice',
    subject: 'Hausmeisterservice für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Hausmeisterservice in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt mit laufender Objektkontrolle, Kleinpflege, Außenanlagenbetreuung und ergänzenden Reinigungsleistungen.

Wenn Sie aktuell einen verlässlichen Partner für einzelne Leistungen oder die laufende Objektbetreuung suchen, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'nachfassen-7-tage',
    name: 'Nachfassen nach 7 Tagen',
    category: 'Nachfassen',
    subject: 'Kurze Rückfrage zu meiner Nachricht',
    body: `Guten Tag {{ansprechpartner}},

ich wollte mich kurz zu meiner letzten Nachricht bei Ihnen melden.

Vielleicht ist meine Vorstellung im Tagesgeschäft untergegangen. Falls das Thema {{leistung}} für {{firma}} in {{stadt}} grundsätzlich interessant ist, freue ich mich über eine kurze Rückmeldung.

Gerne sende ich Ihnen weitere Informationen oder vereinbare ein kurzes Gespräch.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
];

const CATEGORIES: Array<'Alle' | TemplateCategory> = [
  'Alle',
  'Hausverwaltung',
  'WEG',
  'Büro',
  'Praxis',
  'Kanzlei',
  'Gewerbe',
  'Autohaus',
  'Fitness',
  'Winterdienst',
  'Gartenpflege',
  'Hausmeisterservice',
  'Nachfassen',
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function replacePlaceholders(text: string, placeholders: PlaceholderState) {
  return text.replace(/{{\s*(firma|ansprechpartner|stadt|leistung|telefon|email)\s*}}/g, (_, key: keyof PlaceholderState) => placeholders[key] || '');
}

function parseTemplates(value?: string | null) {
  if (!value) return DEFAULT_TEMPLATES;

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return DEFAULT_TEMPLATES;

    const cleaned = parsed.filter((item): item is EmailTemplate => {
      return Boolean(item?.id && item?.name && item?.category && item?.subject && item?.body);
    });

    return cleaned.length > 0 ? cleaned : DEFAULT_TEMPLATES;
  } catch {
    return DEFAULT_TEMPLATES;
  }
}

export default function EmailVorlagenPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULT_TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_TEMPLATES[0].id);
  const [category, setCategory] = useState<'Alle' | TemplateCategory>('Alle');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [placeholders, setPlaceholders] = useState<PlaceholderState>(DEFAULT_PLACEHOLDERS);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((rows: Array<{ key: string; value: string }>) => {
        const row = rows.find(item => item.key === SETTINGS_KEY);
        const nextTemplates = parseTemplates(row?.value);
        setTemplates(nextTemplates);
        setSelectedId(current => current || nextTemplates[0]?.id || '');
      })
      .catch(() => {
        setTemplates(DEFAULT_TEMPLATES);
        setSelectedId(DEFAULT_TEMPLATES[0].id);
      });
  }, []);

  const filteredTemplates = useMemo(() => {
    const q = search.trim().toLowerCase();

    return templates.filter(template => {
      if (category !== 'Alle' && template.category !== category) return false;
      if (!q) return true;

      const haystack = `${template.name} ${template.category} ${template.subject} ${template.body}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [category, search, templates]);

  useEffect(() => {
    if (!filteredTemplates.some(template => template.id === selectedId)) {
      setSelectedId(filteredTemplates[0]?.id || templates[0]?.id || '');
    }
  }, [filteredTemplates, selectedId, templates]);

  const selectedTemplate = templates.find(template => template.id === selectedId) || templates[0];

  const previewSubject = selectedTemplate ? replacePlaceholders(selectedTemplate.subject, placeholders) : '';
  const previewBody = selectedTemplate ? replacePlaceholders(selectedTemplate.body, placeholders) : '';

  const updateTemplate = (patch: Partial<EmailTemplate>) => {
    if (!selectedTemplate) return;
    setTemplates(prev => prev.map(template => template.id === selectedTemplate.id ? { ...template, ...patch } : template));
  };

  const saveTemplates = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [SETTINGS_KEY]: JSON.stringify(templates) }),
      });

      if (!res.ok) throw new Error();
      setMessage({ type: 'ok', text: 'Vorlagen gespeichert.' });
    } catch {
      setMessage({ type: 'err', text: 'Fehler beim Speichern der Vorlagen.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3500);
    }
  };

  const copyTemplate = async () => {
    if (!selectedTemplate) return;

    const combined = `Betreff: ${previewSubject}\n\n${previewBody}`;

    try {
      await navigator.clipboard.writeText(combined);
      setMessage({ type: 'ok', text: 'Vorlage in die Zwischenablage kopiert.' });
    } catch {
      setMessage({ type: 'err', text: 'Kopieren fehlgeschlagen.' });
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const addTemplate = () => {
    const next: EmailTemplate = {
      id: uid(),
      name: 'Neue Vorlage',
      category: 'Gewerbe',
      subject: 'Vorstellung von HUWA Gebäudedienste in {{stadt}}',
      body: `Guten Tag {{ansprechpartner}},\n\nwir möchten uns Ihnen als regionaler Dienstleister für {{leistung}} in {{stadt}} vorstellen.\n\nMit freundlichen Grüßen\nHUWA Gebäudedienste\n{{telefon}}\n{{email}}`,
    };

    setTemplates(prev => [next, ...prev]);
    setSelectedId(next.id);
    setMessage({ type: 'ok', text: 'Neue Vorlage angelegt.' });
    setTimeout(() => setMessage(null), 2500);
  };

  const duplicateTemplate = () => {
    if (!selectedTemplate) return;

    const next = {
      ...selectedTemplate,
      id: uid(),
      name: `${selectedTemplate.name} Kopie`,
    };

    setTemplates(prev => [next, ...prev]);
    setSelectedId(next.id);
    setMessage({ type: 'ok', text: 'Vorlage dupliziert.' });
    setTimeout(() => setMessage(null), 2500);
  };

  const removeTemplate = () => {
    if (!selectedTemplate) return;
    if (templates.length === 1) {
      setMessage({ type: 'err', text: 'Mindestens eine Vorlage muss bestehen bleiben.' });
      setTimeout(() => setMessage(null), 2500);
      return;
    }

    const nextTemplates = templates.filter(template => template.id !== selectedTemplate.id);
    setTemplates(nextTemplates);
    setSelectedId(nextTemplates[0]?.id || '');
    setMessage({ type: 'ok', text: 'Vorlage gelöscht.' });
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Vertriebshilfe</p>
          <h1 className="text-2xl font-bold text-slate-800">E-Mail-Vorlagen</h1>
          <p className="text-slate-500 text-sm mt-1">
            Vorlagen für Erstvorstellung, Nachfassen und branchenspezifische Akquise direkt im Adminbereich.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={addTemplate} className="btn-outline text-sm py-2 px-4">+ Neue Vorlage</button>
          <button onClick={duplicateTemplate} disabled={!selectedTemplate} className="btn-outline text-sm py-2 px-4 disabled:opacity-50">Duplizieren</button>
          <button onClick={copyTemplate} disabled={!selectedTemplate} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Vorlage kopieren</button>
          <button onClick={saveTemplates} disabled={saving} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">
            {saving ? 'Speichert…' : 'Speichern'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${message.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid xl:grid-cols-[320px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 h-fit xl:sticky xl:top-6">
          <div className="space-y-3 mb-4">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field"
              placeholder="Vorlagen durchsuchen…"
            />
            <select value={category} onChange={e => setCategory(e.target.value as 'Alle' | TemplateCategory)} className="input-field">
              {CATEGORIES.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
            {filteredTemplates.length} Vorlagen
          </div>

          <div className="space-y-2 max-h-[65vh] overflow-auto pr-1">
            {filteredTemplates.map(template => {
              const active = template.id === selectedId;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${active ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/30 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-semibold text-slate-800 text-sm truncate">{template.name}</div>
                    <span className="text-[11px] rounded-full bg-slate-100 text-slate-500 px-2 py-0.5 shrink-0">{template.category}</span>
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2">{template.subject}</div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Vorlage bearbeiten</h2>
              <button onClick={removeTemplate} disabled={!selectedTemplate} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
                Vorlage löschen
              </button>
            </div>

            {selectedTemplate ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Interner Name</label>
                    <input
                      className="input-field"
                      value={selectedTemplate.name}
                      onChange={e => updateTemplate({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Kategorie</label>
                    <select
                      className="input-field"
                      value={selectedTemplate.category}
                      onChange={e => updateTemplate({ category: e.target.value as TemplateCategory })}
                    >
                      {CATEGORIES.filter(item => item !== 'Alle').map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Betreff</label>
                  <input
                    className="input-field"
                    value={selectedTemplate.subject}
                    onChange={e => updateTemplate({ subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">E-Mail-Text</label>
                  <textarea
                    rows={16}
                    className="input-field resize-y min-h-[320px]"
                    value={selectedTemplate.body}
                    onChange={e => updateTemplate({ body: e.target.value })}
                  />
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 p-3">
                  Unterstützte Platzhalter: {{firma}}, {{ansprechpartner}}, {{stadt}}, {{leistung}}, {{telefon}}, {{email}}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">Keine Vorlage ausgewählt.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Platzhalter & Vorschau</h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-5">
              {Object.entries(placeholders).map(([key, value]) => (
                <div key={key}>
                  <label className="label">{key}</label>
                  <input
                    className="input-field"
                    value={value}
                    onChange={e => setPlaceholders(prev => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Betreff</div>
              <div className="text-base font-semibold text-slate-800 mb-4">{previewSubject}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Textvorschau</div>
              <div className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{previewBody}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

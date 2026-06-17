'use client';

import { useEffect, useMemo, useState } from 'react';

type TemplateCategory =
  | 'Hausverwaltung'
  | 'WEG'
  | 'Büro'
  | 'Praxis'
  | 'Zahnarzt'
  | 'Kanzlei'
  | 'Gewerbe'
  | 'Autohaus'
  | 'Fitness'
  | 'Hotel'
  | 'Einzelhandel'
  | 'Kindergarten'
  | 'Schule'
  | 'Winterdienst'
  | 'Gartenpflege'
  | 'Hausmeisterservice'
  | 'Nachfassen'
  | 'Termin';

type TemplatePurpose = 'Erstkontakt' | 'Nachfassen' | 'Termin';

type EmailTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  purpose: TemplatePurpose;
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
const PLACEHOLDER_TOKENS = ['{{firma}}', '{{ansprechpartner}}', '{{stadt}}', '{{leistung}}', '{{telefon}}', '{{email}}'];

const DEFAULT_PLACEHOLDERS: PlaceholderState = {
  firma: 'Musterfirma GmbH',
  ansprechpartner: 'Max Mustermann',
  stadt: 'Koblenz',
  leistung: 'Gebäudereinigung',
  telefon: '02601 9131820',
  email: 'info@huwa-gebaeudedienste.de',
};

const PLACEHOLDER_PRESETS: Array<{ label: string; values: Partial<PlaceholderState> }> = [
  {
    label: 'Hausverwaltung Neuwied',
    values: {
      firma: 'Hausverwaltung Muster GmbH',
      ansprechpartner: 'Herr Beispiel',
      stadt: 'Neuwied',
      leistung: 'Treppenhausreinigung und Hausmeisterservice',
    },
  },
  {
    label: 'Büro Koblenz',
    values: {
      firma: 'Beispiel Büroservice GmbH',
      ansprechpartner: 'Frau Muster',
      stadt: 'Koblenz',
      leistung: 'Büro- und Unterhaltsreinigung',
    },
  },
  {
    label: 'Winterdienst Bendorf',
    values: {
      firma: 'Objektservice Beispiel',
      ansprechpartner: 'Herr Winter',
      stadt: 'Bendorf',
      leistung: 'Winterdienst',
    },
  },
];

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: 'hausverwaltung-erstkontakt',
    name: 'Erstkontakt Hausverwaltung',
    category: 'Hausverwaltung',
    purpose: 'Erstkontakt',
    subject: 'Gebäudereinigung und Objektbetreuung für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

ich möchte Ihnen HUWA Gebäudedienste kurz als regionalen Ansprechpartner für die Betreuung von Wohn- und Gewerbeobjekten in {{stadt}} vorstellen.

Wir unterstützen Hausverwaltungen unter anderem bei:
- Treppenhausreinigung
- Unterhaltsreinigung
- Hausmeisterservice
- Gartenpflege
- Winterdienst

Wichtig ist uns keine große Versprechung, sondern verlässliche Ausführung, feste Ansprechpartner und klare Absprachen.

Falls das Thema für {{firma}} grundsätzlich interessant ist, freue ich mich über eine kurze Rückmeldung. Gerne sende ich Ihnen weitere Informationen oder vereinbare ein kurzes Kennenlernen.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'weg-erstkontakt',
    name: 'Erstkontakt WEG / Eigentümergemeinschaft',
    category: 'WEG',
    purpose: 'Erstkontakt',
    subject: 'Zuverlässige Betreuung von WEG-Objekten in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Dienstleister für die laufende Betreuung von WEG-Objekten in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Eigentümergemeinschaften und Verwaltungen mit planbaren Leistungen wie Treppenhausreinigung, Unterhaltsreinigung, Hausmeisterservice, Gartenpflege und Winterdienst.

Unser Fokus liegt auf einer sauberen Ausführung, festen Ansprechpartnern und einer Zusammenarbeit, die im Alltag entlastet.

Falls {{firma}} aktuell Unterstützung in diesem Bereich sucht, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'buero-erstkontakt',
    name: 'Erstkontakt Büroreinigung',
    category: 'Büro',
    purpose: 'Erstkontakt',
    subject: 'Zuverlässige Büroreinigung in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Büro- und Unterhaltsreinigung in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen mit festen Abläufen, persönlichem Ansprechpartner und einer Ausführung, auf die man sich verlassen kann.

Ob regelmäßige Büroreinigung, Sanitärpflege oder ergänzende Hausmeisterleistungen: Gerne prüfen wir, ob wir {{firma}} sinnvoll unterstützen können.

Wenn das Thema für Sie grundsätzlich interessant ist, freue ich mich über eine kurze Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'praxis-erstkontakt',
    name: 'Erstkontakt Praxisreinigung',
    category: 'Praxis',
    purpose: 'Erstkontakt',
    subject: 'Professionelle Praxisreinigung in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Dienstleister für zuverlässige Praxis- und Unterhaltsreinigung in {{stadt}} vorstellen.

Gerade in sensiblen Bereichen sind strukturierte Abläufe, Diskretion und verlässliche Ausführung entscheidend. Genau darauf legen wir bei HUWA Gebäudedienste besonderen Wert.

Wenn Sie aktuell nach einer stabilen Lösung suchen oder sich unverbindlich informieren möchten, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'zahnarzt-erstkontakt',
    name: 'Erstkontakt Zahnarztpraxis',
    category: 'Zahnarzt',
    purpose: 'Erstkontakt',
    subject: 'Reinigungslösung für Ihre Zahnarztpraxis in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

ich möchte Ihnen HUWA Gebäudedienste kurz als regionalen Ansprechpartner für die zuverlässige Reinigung von Praxis- und Empfangsbereichen in {{stadt}} vorstellen.

Gerade in Zahnarztpraxen sind ein gepflegter Eindruck, planbare Abläufe und diskrete Ausführung besonders wichtig. Wir arbeiten mit festen Ansprechpartnern und klaren Absprachen.

Falls das Thema für {{firma}} aktuell interessant ist, freue ich mich über eine kurze Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'kanzlei-erstkontakt',
    name: 'Erstkontakt Kanzlei',
    category: 'Kanzlei',
    purpose: 'Erstkontakt',
    subject: 'Zuverlässige Reinigung für Kanzlei- und Büroräume in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Büro- und Unterhaltsreinigung in {{stadt}} vorstellen.

Gerade in Kanzleien sind Verlässlichkeit, Diskretion und ein gepflegter Gesamteindruck besonders wichtig. HUWA Gebäudedienste unterstützt Unternehmen mit festen Ansprechpartnern und sauber abgestimmten Abläufen.

Falls das Thema für {{firma}} grundsätzlich relevant ist, freue ich mich über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'gewerbe-erstkontakt',
    name: 'Erstkontakt Gewerbeobjekt',
    category: 'Gewerbe',
    purpose: 'Erstkontakt',
    subject: '{{leistung}} für Ihr Objekt in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Dienstleister für {{leistung}} in {{stadt}} vorstellen.

HUWA Gebäudedienste betreut Gewerbeobjekte mit zuverlässiger Reinigung, festen Ansprechpartnern und ergänzenden Leistungen wie Hausmeisterservice, Gartenpflege und Winterdienst.

Wenn {{firma}} aktuell Unterstützung in diesem Bereich sucht, senden wir Ihnen gerne weitere Informationen oder stellen uns kurz persönlich vor.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'autohaus-erstkontakt',
    name: 'Erstkontakt Autohaus',
    category: 'Autohaus',
    purpose: 'Erstkontakt',
    subject: 'Reinigung und Objektpflege für Ihr Autohaus in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für die Reinigung und Pflege von Gewerbeobjekten in {{stadt}} vorstellen.

Gerade in Autohäusern ist ein gepflegter Eindruck für Kunden besonders wichtig. HUWA Gebäudedienste unterstützt dabei mit verlässlicher Reinigung, Glasflächenpflege und ergänzender Objektbetreuung.

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
    purpose: 'Erstkontakt',
    subject: 'Reinigungslösung für Fitness- und Trainingsflächen in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für die laufende Reinigung von Trainings-, Sanitär- und Eingangsbereichen in {{stadt}} vorstellen.

HUWA Gebäudedienste arbeitet mit festen Abläufen, verlässlichen Ansprechpartnern und regelmäßiger Ausführung – genau das ist im laufenden Studioalltag entscheidend.

Wenn {{firma}} aktuell nach einer stabilen Reinigungslösung sucht, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'hotel-erstkontakt',
    name: 'Erstkontakt Hotel / Pension',
    category: 'Hotel',
    purpose: 'Erstkontakt',
    subject: 'Reinigung und Objektpflege für Beherbergungsbetriebe in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Reinigungs- und Pflegeleistungen in {{stadt}} vorstellen.

Gerade bei Hotels, Pensionen und Gästehäusern sind ein gepflegter erster Eindruck, verlässliche Abläufe und saubere Gemeinschaftsbereiche entscheidend. HUWA Gebäudedienste unterstützt dabei mit festen Ansprechpartnern und planbarer Ausführung.

Wenn das Thema für {{firma}} aktuell relevant ist, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'einzelhandel-erstkontakt',
    name: 'Erstkontakt Einzelhandel',
    category: 'Einzelhandel',
    purpose: 'Erstkontakt',
    subject: 'Saubere Verkaufsflächen und Eingangsbereiche in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für die zuverlässige Reinigung von Verkaufs-, Sanitär- und Eingangsbereichen in {{stadt}} vorstellen.

Ein gepflegter Eindruck ist für Kundenwahrnehmung und Alltag im Geschäft entscheidend. HUWA Gebäudedienste unterstützt Einzelhandelsstandorte mit regelmäßiger Reinigung und ergänzender Objektpflege.

Wenn {{firma}} aktuell nach einer verlässlichen Lösung sucht, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'kindergarten-erstkontakt',
    name: 'Erstkontakt Kindergarten',
    category: 'Kindergarten',
    purpose: 'Erstkontakt',
    subject: 'Zuverlässige Reinigung für Kindergarten- und Betreuungsräume',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Reinigungsleistungen in Kindergärten und Betreuungseinrichtungen in {{stadt}} vorstellen.

Gerade in sensiblen Bereichen sind planbare Abläufe, verlässliche Ausführung und ein gepflegtes Umfeld besonders wichtig. HUWA Gebäudedienste unterstützt Einrichtungen mit regelmäßiger Reinigung und persönlichem Ansprechpartner.

Wenn Sie aktuell nach Unterstützung suchen, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'schule-erstkontakt',
    name: 'Erstkontakt Schule / Bildungseinrichtung',
    category: 'Schule',
    purpose: 'Erstkontakt',
    subject: 'Reinigungs- und Objektpflege für Bildungseinrichtungen in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Reinigungs- und Objektpflegeleistungen in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Bildungseinrichtungen mit regelmäßiger Reinigung, festen Ansprechpartnern und planbarer Ausführung. Unser Fokus liegt auf einer Zusammenarbeit, die organisatorisch entlastet und zuverlässig läuft.

Wenn das Thema für {{firma}} aktuell relevant ist, freuen wir uns über Ihre Rückmeldung.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'winterdienst-erstkontakt',
    name: 'Erstkontakt Winterdienst',
    category: 'Winterdienst',
    purpose: 'Erstkontakt',
    subject: 'Winterdienst für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Winterdienst in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen, Hausverwaltungen und Eigentümergemeinschaften mit planbarer Betreuung in der Wintersaison – mit klaren Absprachen und verlässlicher Ausführung.

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
    purpose: 'Erstkontakt',
    subject: 'Gartenpflege und Außenanlagen in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Gartenpflege und die Betreuung von Außenanlagen in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt Unternehmen, Hausverwaltungen und Eigentümergemeinschaften bei Rasenpflege, Heckenrückschnitt, Objektpflege und saisonalen Arbeiten – sauber abgestimmt und verlässlich ausgeführt.

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
    purpose: 'Erstkontakt',
    subject: 'Hausmeisterservice für Ihre Objekte in {{stadt}}',
    body: `Guten Tag {{ansprechpartner}},

wir möchten uns Ihnen als regionaler Ansprechpartner für Hausmeisterservice in {{stadt}} vorstellen.

HUWA Gebäudedienste unterstützt mit laufender Objektkontrolle, Kleinpflege, Außenanlagenbetreuung und ergänzenden Reinigungsleistungen. Unser Fokus liegt auf klaren Abläufen und einer Zusammenarbeit, die im Alltag wirklich entlastet.

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
    purpose: 'Nachfassen',
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
  {
    id: 'nachfassen-14-tage',
    name: 'Nachfassen nach 14 Tagen',
    category: 'Nachfassen',
    purpose: 'Nachfassen',
    subject: 'Noch einmal kurz nachgefragt',
    body: `Guten Tag {{ansprechpartner}},

ich wollte mich noch einmal kurz zu meiner letzten Nachricht melden.

Vielleicht passt das Thema aktuell nicht oder ist intern noch offen. Falls {{leistung}} für {{firma}} in {{stadt}} künftig relevant sein sollte, freuen wir uns über Ihre Rückmeldung.

Gerne bleiben wir unverbindlich in Kontakt.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'angebotserinnerung',
    name: 'Angebotsnachverfolgung',
    category: 'Nachfassen',
    purpose: 'Nachfassen',
    subject: 'Kurze Rückfrage zu unserem Angebot',
    body: `Guten Tag {{ansprechpartner}},

ich wollte kurz nachfragen, ob Sie unser Angebot bereits prüfen konnten.

Falls noch Rückfragen offen sind oder Anpassungen gewünscht werden, geben Sie uns gerne Bescheid. Wir schauen uns das direkt an.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'terminvereinbarung',
    name: 'Terminvereinbarung / Kennenlernen',
    category: 'Termin',
    purpose: 'Termin',
    subject: 'Vorschlag für ein kurzes Kennenlernen',
    body: `Guten Tag {{ansprechpartner}},

vielen Dank für Ihre Rückmeldung.

Gerne würden wir ein kurzes Kennenlernen oder Telefonat vereinbaren, um Ihren Bedarf und mögliche Leistungen für {{firma}} in {{stadt}} besser einzuordnen.

Nennen Sie uns gerne ein passendes Zeitfenster, alternativ schlagen wir Ihnen 2–3 Termine vor.

Mit freundlichen Grüßen
HUWA Gebäudedienste
{{telefon}}
{{email}}`,
  },
  {
    id: 'danke-fuer-das-gespraech',
    name: 'Danke für das Gespräch',
    category: 'Termin',
    purpose: 'Termin',
    subject: 'Vielen Dank für das Gespräch',
    body: `Guten Tag {{ansprechpartner}},

vielen Dank für das angenehme Gespräch.

Wie besprochen stehen wir Ihnen gerne für {{leistung}} in {{stadt}} zur Verfügung. Falls Sie noch Unterlagen, Informationen oder ein konkretes Angebot wünschen, melden Sie sich jederzeit gerne.

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
  'Zahnarzt',
  'Kanzlei',
  'Gewerbe',
  'Autohaus',
  'Fitness',
  'Hotel',
  'Einzelhandel',
  'Kindergarten',
  'Schule',
  'Winterdienst',
  'Gartenpflege',
  'Hausmeisterservice',
  'Nachfassen',
  'Termin',
];

const PURPOSES: Array<'Alle' | TemplatePurpose> = ['Alle', 'Erstkontakt', 'Nachfassen', 'Termin'];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function inferPurpose(category: TemplateCategory): TemplatePurpose {
  if (category === 'Nachfassen') return 'Nachfassen';
  if (category === 'Termin') return 'Termin';
  return 'Erstkontakt';
}

function replacePlaceholders(text: string, placeholders: PlaceholderState) {
  return text.replace(/{{\s*(firma|ansprechpartner|stadt|leistung|telefon|email)\s*}}/g, (_, key: keyof PlaceholderState) => placeholders[key] || '');
}

function parseTemplates(value?: string | null) {
  if (!value) return DEFAULT_TEMPLATES;

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return DEFAULT_TEMPLATES;

    const cleaned = parsed
      .filter(item => Boolean(item?.id && item?.name && item?.category && item?.subject && item?.body))
      .map((item): EmailTemplate => ({
        id: String(item.id),
        name: String(item.name),
        category: item.category as TemplateCategory,
        purpose: (item.purpose as TemplatePurpose) || inferPurpose(item.category as TemplateCategory),
        subject: String(item.subject),
        body: String(item.body),
      }));

    return cleaned.length > 0 ? cleaned : DEFAULT_TEMPLATES;
  } catch {
    return DEFAULT_TEMPLATES;
  }
}

export default function EmailVorlagenPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULT_TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_TEMPLATES[0].id);
  const [category, setCategory] = useState<'Alle' | TemplateCategory>('Alle');
  const [purpose, setPurpose] = useState<'Alle' | TemplatePurpose>('Alle');
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

  const stats = useMemo(() => ({
    total: templates.length,
    firstTouch: templates.filter(item => item.purpose === 'Erstkontakt').length,
    followUps: templates.filter(item => item.purpose === 'Nachfassen').length,
    meetings: templates.filter(item => item.purpose === 'Termin').length,
  }), [templates]);

  const filteredTemplates = useMemo(() => {
    const q = search.trim().toLowerCase();

    return templates.filter(template => {
      if (category !== 'Alle' && template.category !== category) return false;
      if (purpose !== 'Alle' && template.purpose !== purpose) return false;
      if (!q) return true;

      const haystack = `${template.name} ${template.category} ${template.purpose} ${template.subject} ${template.body}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [category, purpose, search, templates]);

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

  const flashMessage = (type: 'ok' | 'err', text: string, timeout = 3200) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), timeout);
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
      flashMessage('ok', 'Vorlagen gespeichert.');
    } catch {
      flashMessage('err', 'Fehler beim Speichern der Vorlagen.');
    } finally {
      setSaving(false);
    }
  };

  const copyText = async (text: string, successText: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flashMessage('ok', successText);
    } catch {
      flashMessage('err', 'Kopieren fehlgeschlagen.');
    }
  };

  const copyTemplate = async () => {
    if (!selectedTemplate) return;
    await copyText(`Betreff: ${previewSubject}\n\n${previewBody}`, 'Vorlage in die Zwischenablage kopiert.');
  };

  const addTemplate = () => {
    const next: EmailTemplate = {
      id: uid(),
      name: 'Neue Vorlage',
      category: 'Gewerbe',
      purpose: 'Erstkontakt',
      subject: 'Vorstellung von HUWA Gebäudedienste in {{stadt}}',
      body: `Guten Tag {{ansprechpartner}},\n\nwir möchten uns Ihnen als regionaler Dienstleister für {{leistung}} in {{stadt}} vorstellen.\n\nMit freundlichen Grüßen\nHUWA Gebäudedienste\n{{telefon}}\n{{email}}`,
    };

    setTemplates(prev => [next, ...prev]);
    setSelectedId(next.id);
    flashMessage('ok', 'Neue Vorlage angelegt.', 2400);
  };

  const duplicateTemplate = () => {
    if (!selectedTemplate) return;

    const next: EmailTemplate = {
      ...selectedTemplate,
      id: uid(),
      name: `${selectedTemplate.name} Kopie`,
    };

    setTemplates(prev => [next, ...prev]);
    setSelectedId(next.id);
    flashMessage('ok', 'Vorlage dupliziert.', 2400);
  };

  const removeTemplate = () => {
    if (!selectedTemplate) return;
    if (templates.length === 1) {
      flashMessage('err', 'Mindestens eine Vorlage muss bestehen bleiben.', 2400);
      return;
    }

    const nextTemplates = templates.filter(template => template.id !== selectedTemplate.id);
    setTemplates(nextTemplates);
    setSelectedId(nextTemplates[0]?.id || '');
    flashMessage('ok', 'Vorlage gelöscht.', 2400);
  };

  const resetDefaults = () => {
    if (!confirm('Die gesamte Vorlagenbibliothek auf den Standard zurücksetzen? Eigene Änderungen werden dabei überschrieben.')) return;
    setTemplates(DEFAULT_TEMPLATES);
    setSelectedId(DEFAULT_TEMPLATES[0].id);
    setCategory('Alle');
    setPurpose('Alle');
    setSearch('');
    flashMessage('ok', 'Standardbibliothek wiederhergestellt.', 2600);
  };

  return (
    <div className="max-w-7xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Vertriebshilfe</p>
          <h1 className="text-2xl font-bold text-slate-800">E-Mail-Vorlagen</h1>
          <p className="text-slate-500 text-sm mt-1">
            Starke Vorlagen für Erstvorstellung, Nachfassen und Terminvereinbarung – direkt im HUWA-Adminbereich.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={addTemplate} className="btn-outline text-sm py-2 px-4">+ Neue Vorlage</button>
          <button onClick={duplicateTemplate} disabled={!selectedTemplate} className="btn-outline text-sm py-2 px-4 disabled:opacity-50">Duplizieren</button>
          <button onClick={copyTemplate} disabled={!selectedTemplate} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Alles kopieren</button>
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

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Vorlagen gesamt', value: stats.total, hint: 'Bibliothek' },
          { label: 'Erstkontakt', value: stats.firstTouch, hint: 'direkte Vorstellung' },
          { label: 'Nachfassen', value: stats.followUps, hint: 'dranbleiben ohne Druck' },
          { label: 'Termin & Gespräch', value: stats.meetings, hint: 'Rückmeldung nutzen' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{card.label}</div>
            <div className="text-3xl font-black text-slate-800 mt-2">{card.value}</div>
            <div className="text-xs text-slate-400 mt-1">{card.hint}</div>
          </div>
        ))}
      </div>

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
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map(item => (
                <button
                  key={item}
                  onClick={() => setPurpose(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${purpose === item ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200 hover:border-primary/30 hover:text-slate-700'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {filteredTemplates.length} Vorlagen
            </div>
            <button onClick={resetDefaults} className="text-xs text-slate-400 hover:text-slate-600">
              Standard laden
            </button>
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] rounded-full bg-blue-50 text-blue-600 px-2 py-0.5">{template.purpose}</span>
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
              <div>
                <h2 className="text-lg font-bold text-slate-800">Vorlage bearbeiten</h2>
                <p className="text-sm text-slate-500 mt-1">Starker erster Wurf statt halber Texte. Passe Betreff und Argumentation direkt an deine Zielgruppe an.</p>
              </div>
              <button onClick={removeTemplate} disabled={!selectedTemplate} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
                Vorlage löschen
              </button>
            </div>

            {selectedTemplate ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
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
                  <div>
                    <label className="label">Typ</label>
                    <select
                      className="input-field"
                      value={selectedTemplate.purpose}
                      onChange={e => updateTemplate({ purpose: e.target.value as TemplatePurpose })}
                    >
                      {PURPOSES.filter(item => item !== 'Alle').map(item => (
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
                    className="input-field resize-y min-h-[340px]"
                    value={selectedTemplate.body}
                    onChange={e => updateTemplate({ body: e.target.value })}
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 p-4">
                    <div className="font-semibold text-slate-700 mb-2">Unterstützte Platzhalter</div>
                    <div className="leading-6">{PLACEHOLDER_TOKENS.join(', ')}</div>
                  </div>
                  <div className="text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 p-4">
                    <div className="font-semibold text-slate-700 mb-2">Akquise-Regeln für bessere Wirkung</div>
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li>nicht zu lang schreiben – schnell auf den Punkt kommen</li>
                      <li>nicht billig oder anbiedernd klingen</li>
                      <li>konkreten Nutzen statt Floskeln nennen</li>
                      <li>Rückmeldung oder kurzes Kennenlernen als nächstes Ziel</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">Keine Vorlage ausgewählt.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Platzhalter & Vorschau</h2>
              <div className="flex gap-2 flex-wrap">
                {PLACEHOLDER_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setPlaceholders(prev => ({ ...prev, ...preset.values }))}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-primary/30 hover:text-slate-800"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

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

            <div className="flex gap-2 flex-wrap mb-4">
              <button onClick={() => copyText(previewSubject, 'Betreff kopiert.')} className="btn-outline text-sm py-2 px-4">Betreff kopieren</button>
              <button onClick={() => copyText(previewBody, 'Text kopiert.')} className="btn-outline text-sm py-2 px-4">Text kopieren</button>
              <button onClick={copyTemplate} className="btn-primary text-sm py-2 px-4">Betreff + Text kopieren</button>
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

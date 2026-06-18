import type { ServiceKey } from '@/lib/operations-catalog';

export type CalculatorValue = string | number | boolean;
export type CalculatorAnswers = Record<string, CalculatorValue>;

export type CalculatorField = {
  key: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  group: 0 | 1 | 2;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  options?: Array<{ value: string | number; label: string }>;
};

export type ServiceCalculatorConfig = {
  key: ServiceKey;
  title: string;
  resultLabel: string;
  resultPeriod: 'Monat' | 'Auftrag' | 'Saison';
  groups: [string, string, string];
  fields: CalculatorField[];
  defaults: CalculatorAnswers;
};

const frequency = [
  { value: 1, label: 'Einmal pro Monat' },
  { value: 2.17, label: 'Alle zwei Wochen' },
  { value: 4.33, label: 'Einmal pro Woche' },
  { value: 8.66, label: 'Zweimal pro Woche' },
  { value: 13, label: 'Dreimal pro Woche' },
  { value: 21.65, label: 'Montag bis Freitag' },
];

const dirt = [
  { value: 'low', label: 'Leicht' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Stark' },
];

export const serviceCalculatorConfigs: ServiceCalculatorConfig[] = [
  {
    key: 'buero', title: 'Büroreinigung', resultLabel: 'Geschätzte Monatspauschale netto', resultPeriod: 'Monat',
    groups: ['Bürofläche', 'Ausstattung', 'Nutzung'],
    defaults: { area: 300, visitsPerMonth: 4.33, workstations: 20, sanitaryRooms: 2, kitchens: 1, furnishing: 'normal', dirt: 'normal' },
    fields: [
      { key: 'area', label: 'Zu reinigende Bürofläche', type: 'number', group: 0, unit: 'm²', min: 20, max: 50000 },
      { key: 'visitsPerMonth', label: 'Reinigungsintervall', type: 'select', group: 0, options: frequency },
      { key: 'workstations', label: 'Arbeitsplätze', type: 'number', group: 1, unit: 'Stück', min: 0, max: 5000 },
      { key: 'sanitaryRooms', label: 'Sanitärräume', type: 'number', group: 1, unit: 'Räume', min: 0, max: 500 },
      { key: 'kitchens', label: 'Küchen / Teeküchen', type: 'number', group: 1, unit: 'Räume', min: 0, max: 100 },
      { key: 'furnishing', label: 'Möblierungsgrad', type: 'select', group: 2, options: [{ value: 'light', label: 'Offen / wenig möbliert' }, { value: 'normal', label: 'Normal möbliert' }, { value: 'dense', label: 'Dicht möbliert' }] },
      { key: 'dirt', label: 'Übliche Verschmutzung', type: 'select', group: 2, options: dirt },
    ],
  },
  {
    key: 'unterhalt', title: 'Unterhaltsreinigung', resultLabel: 'Geschätzte Monatspauschale netto', resultPeriod: 'Monat',
    groups: ['Grunddaten', 'Funktionsbereiche', 'Beanspruchung'],
    defaults: { area: 500, visitsPerMonth: 4.33, sanitaryRooms: 3, wastePoints: 15, publicTraffic: 'normal', dirt: 'normal' },
    fields: [
      { key: 'area', label: 'Regelmäßig zu reinigende Fläche', type: 'number', group: 0, unit: 'm²', min: 20, max: 100000 },
      { key: 'visitsPerMonth', label: 'Reinigungsintervall', type: 'select', group: 0, options: frequency },
      { key: 'sanitaryRooms', label: 'Sanitärräume', type: 'number', group: 1, unit: 'Räume', min: 0, max: 1000 },
      { key: 'wastePoints', label: 'Papierkörbe / Abfallstellen', type: 'number', group: 1, unit: 'Stück', min: 0, max: 5000 },
      { key: 'publicTraffic', label: 'Publikumsverkehr', type: 'select', group: 2, options: [{ value: 'low', label: 'Gering' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'Hoch' }] },
      { key: 'dirt', label: 'Verschmutzung', type: 'select', group: 2, options: dirt },
    ],
  },
  {
    key: 'treppenhaus', title: 'Treppenhausreinigung', resultLabel: 'Geschätzte Monatspauschale netto', resultPeriod: 'Monat',
    groups: ['Gebäude', 'Nebenflächen', 'Aufwand'],
    defaults: { floors: 4, entrances: 1, visitsPerMonth: 4.33, elevators: 0, cellarArea: 0, glassDoors: 1, dirt: 'normal' },
    fields: [
      { key: 'floors', label: 'Etagen je Eingang', type: 'number', group: 0, unit: 'Etagen', min: 1, max: 40 },
      { key: 'entrances', label: 'Separate Hauseingänge', type: 'number', group: 0, unit: 'Eingänge', min: 1, max: 30 },
      { key: 'visitsPerMonth', label: 'Reinigungsintervall', type: 'select', group: 0, options: frequency },
      { key: 'elevators', label: 'Aufzüge', type: 'number', group: 1, unit: 'Stück', min: 0, max: 20 },
      { key: 'cellarArea', label: 'Keller- und Gemeinschaftsfläche', type: 'number', group: 1, unit: 'm²', min: 0, max: 10000 },
      { key: 'glassDoors', label: 'Glastüren / große Glasflächen', type: 'number', group: 1, unit: 'Stück', min: 0, max: 100 },
      { key: 'dirt', label: 'Verschmutzung / Nutzung', type: 'select', group: 2, options: dirt },
    ],
  },
  {
    key: 'glas', title: 'Glasreinigung', resultLabel: 'Geschätzter Auftragspreis netto', resultPeriod: 'Auftrag',
    groups: ['Glasflächen', 'Ausführung', 'Zugang'],
    defaults: { glassArea: 100, sides: 2, frames: 'yes', windowType: 'standard', access: 'ground', dirt: 'normal' },
    fields: [
      { key: 'glassArea', label: 'Glasfläche einer Seite', type: 'number', group: 0, unit: 'm²', min: 5, max: 50000, help: 'Breite × Höhe aller Scheiben, nur eine Seite.' },
      { key: 'sides', label: 'Zu reinigende Seiten', type: 'select', group: 0, options: [{ value: 1, label: 'Nur eine Seite' }, { value: 2, label: 'Innen und außen' }] },
      { key: 'frames', label: 'Rahmen und Falze', type: 'select', group: 1, options: [{ value: 'no', label: 'Ohne Rahmen' }, { value: 'yes', label: 'Mit Rahmen' }, { value: 'intensive', label: 'Rahmen intensiv' }] },
      { key: 'windowType', label: 'Fensterart', type: 'select', group: 1, options: [{ value: 'large', label: 'Große, zusammenhängende Flächen' }, { value: 'standard', label: 'Standardfenster' }, { value: 'small', label: 'Viele kleine Scheiben / Sprossen' }] },
      { key: 'access', label: 'Erreichbarkeit', type: 'select', group: 2, options: [{ value: 'ground', label: 'Ebenerdig / frei zugänglich' }, { value: 'ladder', label: 'Leiter erforderlich' }, { value: 'lift', label: 'Hubsteiger / Spezialzugang' }] },
      { key: 'dirt', label: 'Verschmutzung', type: 'select', group: 2, options: dirt },
    ],
  },
  {
    key: 'grund', title: 'Grundreinigung', resultLabel: 'Geschätzter Auftragspreis netto', resultPeriod: 'Auftrag',
    groups: ['Fläche', 'Boden', 'Ausführung'],
    defaults: { area: 150, floorType: 'pvc', coatingRemoval: 'no', dirt: 'normal', machineAccess: 'yes', rooms: 5 },
    fields: [
      { key: 'area', label: 'Grundzureinigende Fläche', type: 'number', group: 0, unit: 'm²', min: 10, max: 50000 },
      { key: 'rooms', label: 'Anzahl Räume / Teilflächen', type: 'number', group: 0, unit: 'Räume', min: 1, max: 500 },
      { key: 'floorType', label: 'Überwiegender Bodenbelag', type: 'select', group: 1, options: [{ value: 'pvc', label: 'PVC / Linoleum' }, { value: 'stone', label: 'Natur- oder Kunststein' }, { value: 'tile', label: 'Fliesen' }, { value: 'carpet', label: 'Teppichboden' }] },
      { key: 'coatingRemoval', label: 'Alte Beschichtung entfernen', type: 'select', group: 1, options: [{ value: 'no', label: 'Nein' }, { value: 'yes', label: 'Ja' }] },
      { key: 'dirt', label: 'Verschmutzung', type: 'select', group: 2, options: dirt },
      { key: 'machineAccess', label: 'Maschineneinsatz möglich', type: 'select', group: 2, options: [{ value: 'yes', label: 'Ja, gut zugänglich' }, { value: 'limited', label: 'Nur eingeschränkt' }, { value: 'no', label: 'Überwiegend Handarbeit' }] },
    ],
  },
  {
    key: 'bau', title: 'Baureinigung', resultLabel: 'Geschätzter Auftragspreis netto', resultPeriod: 'Auftrag',
    groups: ['Baufläche', 'Bauphase', 'Zusatzaufwand'],
    defaults: { area: 300, phase: 'final', dirt: 'normal', glassArea: 0, wasteHours: 0, floors: 1 },
    fields: [
      { key: 'area', label: 'Zu reinigende Baufläche', type: 'number', group: 0, unit: 'm²', min: 20, max: 100000 },
      { key: 'floors', label: 'Etagen / Ebenen', type: 'number', group: 0, unit: 'Etagen', min: 1, max: 50 },
      { key: 'phase', label: 'Reinigungsphase', type: 'select', group: 1, options: [{ value: 'rough', label: 'Baugrobreinigung' }, { value: 'intermediate', label: 'Bauzwischenreinigung' }, { value: 'final', label: 'Baufein-/Endreinigung' }] },
      { key: 'dirt', label: 'Bauschmutz', type: 'select', group: 1, options: dirt },
      { key: 'glassArea', label: 'Zusätzliche Glasfläche', type: 'number', group: 2, unit: 'm²', min: 0, max: 20000 },
      { key: 'wasteHours', label: 'Geschätzter Entsorgungsaufwand', type: 'number', group: 2, unit: 'Std.', min: 0, max: 500 },
    ],
  },
  {
    key: 'hausmeister', title: 'Hausmeisterservice', resultLabel: 'Geschätzte Monatspauschale netto', resultPeriod: 'Monat',
    groups: ['Objekt', 'Kontrollen', 'Leistungsumfang'],
    defaults: { units: 12, visitsPerMonth: 4.33, hoursPerVisit: 1.5, technicalPoints: 4, exteriorArea: 300, smallRepairs: 'no' },
    fields: [
      { key: 'units', label: 'Wohn- oder Gewerbeeinheiten', type: 'number', group: 0, unit: 'Einheiten', min: 1, max: 1000 },
      { key: 'visitsPerMonth', label: 'Kontrollintervall', type: 'select', group: 0, options: frequency },
      { key: 'hoursPerVisit', label: 'Vereinbarte Basiszeit je Begehung', type: 'number', group: 1, unit: 'Std.', min: 0.5, max: 24, step: 0.25 },
      { key: 'technicalPoints', label: 'Technische Prüfpunkte', type: 'number', group: 1, unit: 'Punkte', min: 0, max: 100 },
      { key: 'exteriorArea', label: 'Zu kontrollierende Außenfläche', type: 'number', group: 2, unit: 'm²', min: 0, max: 100000 },
      { key: 'smallRepairs', label: 'Kleinreparaturen eingeplant', type: 'select', group: 2, options: [{ value: 'no', label: 'Nein, separat beauftragen' }, { value: 'yes', label: 'Ja, Zeitbudget berücksichtigen' }] },
    ],
  },
  {
    key: 'winter', title: 'Winterdienst', resultLabel: 'Geschätzte Saisonpauschale netto', resultPeriod: 'Saison',
    groups: ['Räumfläche', 'Saisonannahme', 'Einsatzrisiko'],
    defaults: { area: 500, expectedEvents: 20, standbyHours: 8, surface: 'walkway', access: 'normal', gritLevel: 'normal' },
    fields: [
      { key: 'area', label: 'Zu räumende und streuende Fläche', type: 'number', group: 0, unit: 'm²', min: 20, max: 100000 },
      { key: 'surface', label: 'Flächenart', type: 'select', group: 0, options: [{ value: 'walkway', label: 'Gehwege / Eingänge' }, { value: 'parking', label: 'Park- und Hofflächen' }, { value: 'mixed', label: 'Gemischte Flächen' }] },
      { key: 'expectedEvents', label: 'Kalkulierte Einsätze je Saison', type: 'number', group: 1, unit: 'Einsätze', min: 1, max: 100, help: 'Vertraglich festgelegte Kalkulationsannahme, später mit Ist-Einsätzen vergleichen.' },
      { key: 'standbyHours', label: 'Bereitschafts-/Kontrollzeit Saison', type: 'number', group: 1, unit: 'Std.', min: 0, max: 500 },
      { key: 'access', label: 'Maschinelle Zugänglichkeit', type: 'select', group: 2, options: [{ value: 'easy', label: 'Gut maschinell zugänglich' }, { value: 'normal', label: 'Teilweise Handarbeit' }, { value: 'manual', label: 'Überwiegend Handarbeit' }] },
      { key: 'gritLevel', label: 'Streumittelbedarf', type: 'select', group: 2, options: [{ value: 'low', label: 'Gering' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'Erhöht' }] },
    ],
  },
  {
    key: 'garten', title: 'Gartenpflege', resultLabel: 'Geschätzte Monatspauschale netto', resultPeriod: 'Monat',
    groups: ['Grünflächen', 'Pflegeumfang', 'Saisonaufwand'],
    defaults: { lawnArea: 500, hedgeLength: 30, hedgeHeight: 'medium', bedArea: 50, visitsPerMonth: 2.17, leafArea: 0, disposal: 'yes' },
    fields: [
      { key: 'lawnArea', label: 'Rasenfläche', type: 'number', group: 0, unit: 'm²', min: 0, max: 100000 },
      { key: 'bedArea', label: 'Beet- und Pflanzflächen', type: 'number', group: 0, unit: 'm²', min: 0, max: 50000 },
      { key: 'hedgeLength', label: 'Heckenlänge', type: 'number', group: 1, unit: 'lfm', min: 0, max: 10000 },
      { key: 'hedgeHeight', label: 'Heckenhöhe', type: 'select', group: 1, options: [{ value: 'low', label: 'Bis 1,2 m' }, { value: 'medium', label: '1,2 bis 2 m' }, { value: 'high', label: 'Über 2 m' }] },
      { key: 'visitsPerMonth', label: 'Pflegeintervall in der Saison', type: 'select', group: 2, options: frequency.slice(0, 4) },
      { key: 'leafArea', label: 'Laubfläche im Herbst', type: 'number', group: 2, unit: 'm²', min: 0, max: 100000 },
      { key: 'disposal', label: 'Grünschnitt abfahren', type: 'select', group: 2, options: [{ value: 'no', label: 'Nein' }, { value: 'yes', label: 'Ja' }] },
    ],
  },
];

export function getCalculatorConfig(serviceKey: ServiceKey) {
  return serviceCalculatorConfigs.find(item => item.key === serviceKey) ?? serviceCalculatorConfigs[0];
}

export function normalizeCalculatorAnswers(serviceKey: ServiceKey, input: CalculatorAnswers) {
  const config = getCalculatorConfig(serviceKey);
  const result: CalculatorAnswers = { ...config.defaults };
  for (const field of config.fields) {
    const raw = input[field.key];
    if (field.type === 'number') {
      const value = Number(raw);
      if (!Number.isFinite(value)) throw new Error(`${field.label} ist ungültig.`);
      if (field.min !== undefined && value < field.min) throw new Error(`${field.label} muss mindestens ${field.min} betragen.`);
      if (field.max !== undefined && value > field.max) throw new Error(`${field.label} darf höchstens ${field.max} betragen.`);
      result[field.key] = value;
    } else if (field.type === 'select') {
      if (!field.options?.some(option => String(option.value) === String(raw))) throw new Error(`${field.label} ist ungültig.`);
      result[field.key] = raw;
    } else {
      result[field.key] = Boolean(raw);
    }
  }
  return result;
}

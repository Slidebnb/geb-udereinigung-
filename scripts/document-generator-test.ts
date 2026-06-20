import assert from 'node:assert/strict';
import { buildDocument, validateGeneratorSelection } from '../src/lib/document-generator/document-builder';
import type { GeneratorSelection } from '../src/lib/document-generator/types';

const selection: GeneratorSelection = {
  documentType: 'leistungsverzeichnis',
  title: 'Leistungsverzeichnis Musterobjekt',
  customerName: 'Musterverwaltung GmbH',
  objectName: 'Wohnanlage Rheinblick',
  objectAddress: 'Musterstraße 10, 56564 Neuwied',
  objectType: 'mehrfamilienhaus',
  frequency: 'woechentlich',
  serviceKeys: ['gebaeudereinigung', 'hausmeisterdienst', 'gartenpflege'],
  selectedOptions: {
    gebaeudereinigung: ['boden', 'sanitaer'],
    hausmeisterdienst: ['sichtkontrolle', 'muelltonnen'],
    gartenpflege: ['rasen'],
  },
  features: ['Treppenhaus', 'Grünflächen'],
  executionTimes: 'Montag bis Freitag nach Abstimmung',
  notes: 'Grünschnittentsorgung nur nach Einzelbeauftragung.',
};

const result = buildDocument(selection);
assert.deepEqual(result.serviceTitles, ['Gebäudereinigung', 'Hausmeisterdienst', 'Gartenpflege']);
assert.match(result.body, /Bodenflächen reinigen/);
assert.match(result.body, /Mülltonnenservice/);
assert.match(result.body, /Rasenpflege/);
assert.doesNotMatch(result.body, /Flächendesinfektion/);
assert.doesNotMatch(result.body, /Hecken- und Strauchschnitt/);
assert.match(result.body, /Treppenhaus/);
assert.match(result.body, /Grünflächen/);
assert.equal((result.body.match(/Pflichten des Auftragnehmers/gi) || []).length, 1);
assert.equal((result.body.match(/Turnus und Ausführungszeiten/gi) || []).length, 1);

assert.throws(() => validateGeneratorSelection({ ...selection, selectedOptions: { ...selection.selectedOptions, gartenpflege: ['nicht-erlaubt'] } }), /Ungültiger Leistungsbaustein/);
assert.throws(() => validateGeneratorSelection({ ...selection, serviceKeys: [] }), /Mindestens ein Leistungsbereich/);

console.log('Document generator tests passed.');

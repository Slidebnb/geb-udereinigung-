import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const checklists: Record<string, { title: string; intro: string; groups: { title: string; items: string[] }[] }> = {
  haustechnik: { title: '12-Punkte Haustechnik-Checkliste', intro: 'Regelmäßige Sichtprüfung für Hausverwaltungen, WEGs und Eigentümer.', groups: [
    { title: 'Gebäudehülle und Außenbereich', items: ['Dach, Fassade und Entwässerung auf sichtbare Schäden prüfen', 'Wege, Beleuchtung und Zugänge kontrollieren', 'Außenanlagen auf Gefahrenstellen prüfen'] },
    { title: 'Technik und Gemeinschaftsbereiche', items: ['Heizung und Technikräume auf Störungen prüfen', 'Keller, Treppenhaus und Fluchtwege kontrollieren', 'Türschließer, Fenster und Beleuchtung testen'] },
    { title: 'Sicherheit und Dokumentation', items: ['Brandschutzeinrichtungen sichtbar und zugänglich halten', 'Rauchwarnmelder und Beschilderung kontrollieren', 'Schäden fotografieren und Zuständigkeit festlegen', 'Termine und erledigte Maßnahmen dokumentieren'] },
  ] },
  objektuebergabe: { title: 'Checkliste für eine saubere Objektübergabe', intro: 'Damit Zugänge, Zustände und offene Punkte vollständig festgehalten werden.', groups: [
    { title: 'Stammdaten', items: ['Ansprechpartner und Erreichbarkeit bestätigen', 'Objektbereiche und Flächen abgleichen', 'Leistungszeiten und Sperrzeiten festlegen'] },
    { title: 'Zugänge und Zustand', items: ['Schlüssel, Codes und Alarmanlage dokumentieren', 'Vorschäden fotografisch festhalten', 'Wasser-, Strom- und Materialstellen zeigen'] },
    { title: 'Startfreigabe', items: ['Leistungsverzeichnis gemeinsam prüfen', 'Meldeweg für Sonderfälle vereinbaren', 'Objektstart und erste Qualitätskontrolle terminieren'] },
  ] },
  qualitaetskontrolle: { title: 'Qualitätskontrolle Gebäudereinigung', intro: 'Ein klarer Prüfbogen für wiederkehrende Reinigungsleistungen.', groups: [
    { title: 'Prüfung', items: ['Böden und Randbereiche', 'Oberflächen und Kontaktpunkte', 'Sanitärbereiche und Verbrauchsmaterial', 'Glasflächen und Türen', 'Abfallbehälter und Geruch'] },
    { title: 'Bewertung', items: ['Abweichung und betroffenen Bereich notieren', 'Foto und Sofortmaßnahme dokumentieren', 'Verantwortliche Person und Nachkontrolle festlegen'] },
  ] },
  winterdienst: { title: 'Winterdienst-Dokumentationscheckliste', intro: 'Einsätze nachvollziehbar dokumentieren und Gefahrenstellen im Blick behalten.', groups: [
    { title: 'Vor dem Einsatz', items: ['Wetterlage und Warnungen dokumentieren', 'Route und Prioritätsflächen prüfen', 'Fahrzeug, Geräte und Streumittel kontrollieren'] },
    { title: 'Einsatznachweis', items: ['Ankunfts- und Endzeit festhalten', 'Geräumte und gestreute Flächen benennen', 'Art und Menge des Streumittels erfassen', 'Wetter und Temperatur dokumentieren', 'Besonderheiten oder Hindernisse fotografieren'] },
  ] },
  gartenpflege: { title: 'Saisoncheckliste Gartenpflege', intro: 'Pflegearbeiten von März bis November strukturiert planen.', groups: [
    { title: 'Frühjahr', items: ['Flächen und Gehölze kontrollieren', 'Erstschnitt und Beetpflege planen', 'Bewässerung und Geräte prüfen'] },
    { title: 'Sommer', items: ['Mähintervalle an Wachstum anpassen', 'Hecken- und Artenschutzzeiten beachten', 'Unkraut, Bewässerung und Verkehrssicherheit prüfen'] },
    { title: 'Herbst', items: ['Laubmanagement abstimmen', 'Letzten Schnitt und Rückschnitt planen', 'Flächen und Geräte winterfest vorbereiten'] },
  ] },
  lv_treppenhausreinigung: { title: 'Leistungsverzeichnis Treppenhausreinigung', intro: 'Vorlage fuer Hausverwaltungen, WEGs und Vermieter zur klaren Leistungsbeschreibung.', groups: [
    { title: 'Objektangaben', items: ['Objektadresse, Ansprechpartner und Zugangsdaten erfassen', 'Anzahl Eingaenge, Etagen, Aufzuege und Nebenflaechen festhalten', 'Leistungszeiten und Sperrzeiten abstimmen'] },
    { title: 'Regelleistungen', items: ['Treppenlaeufe, Podeste und Eingangsbereiche reinigen', 'Handlaeufe, Gelaender und Griffbereiche reinigen', 'Keller, Gemeinschaftsflaechen und Aufzug nach Vereinbarung aufnehmen'] },
    { title: 'Intervall und Nachweis', items: ['Reinigungsintervall eindeutig festlegen', 'Sonderleistungen separat benennen', 'Qualitaetskontrolle und Ansprechpartner dokumentieren'] },
  ] },
  winterdienst_dokumentation: { title: 'Winterdienst-Dokumentation', intro: 'Einsatznachweis fuer Raeum- und Streudienst in der Saison 2026/2027.', groups: [
    { title: 'Einsatzdaten', items: ['Datum, Uhrzeit, Wetter und Temperatur dokumentieren', 'Kontrollfahrt, Raeumung oder Streueinsatz markieren', 'Beteiligte Person oder Team festhalten'] },
    { title: 'Flaechen und Material', items: ['Gehwege, Zufahrten, Eingaenge und Parkflaechen benennen', 'Streumittelart und ungefaehre Menge erfassen', 'Nicht erreichbare Bereiche oder Hindernisse dokumentieren'] },
    { title: 'Nachweis', items: ['Fotos bei Besonderheiten erstellen', 'Folgeeinsatz oder Nachkontrolle notieren', 'Unterschrift oder Freigabe einholen'] },
  ] },
  objektuebergabe_checkliste: { title: 'Objektuebergabe Checkliste', intro: 'Objektstart sauber vorbereiten: Zustaende, Zugaenge und offene Punkte erfassen.', groups: [
    { title: 'Stammdaten', items: ['Ansprechpartner, Telefonnummern und E-Mail-Adressen bestaetigen', 'Objektbereiche, Flaechen und Sonderbereiche abgleichen', 'Reinigungs- oder Betreuungsstart festlegen'] },
    { title: 'Zugang und Zustand', items: ['Schluessel, Transponder, Codes und Alarmhinweise dokumentieren', 'Vorschaeden und sichtbare Maengel fotografieren', 'Wasser, Strom, Lagerort und Entsorgungspunkte zeigen'] },
    { title: 'Freigabe', items: ['Leistungsverzeichnis gemeinsam pruefen', 'Offene Punkte mit Verantwortlichkeit notieren', 'Erste Qualitaetskontrolle terminieren'] },
  ] },
  reinigungsplan_buero: { title: 'Reinigungsplan Buero', intro: 'Raeume, Aufgaben und Intervalle fuer eine klare Bueroreinigung festlegen.', groups: [
    { title: 'Raeume und Bereiche', items: ['Arbeitsplaetze, Flure und Besprechungsraeume erfassen', 'Sanitaerbereiche und Teekuechen gesondert aufnehmen', 'Abfallstellen und Verbrauchsmaterial festlegen'] },
    { title: 'Intervalle', items: ['Taegliche, woechentliche und monatliche Aufgaben trennen', 'Reinigungszeiten ausserhalb des Betriebs abstimmen', 'Periodische Sonderarbeiten separat markieren'] },
    { title: 'Qualitaet', items: ['Meldeweg fuer Rueckfragen festlegen', 'Kontrollpunkte fuer Sichtpruefung definieren', 'Anpassungen im laufenden Betrieb dokumentieren'] },
  ] },
};

export async function createChecklistPdf(key: string) {
  const content = checklists[key];
  if (!content) throw new Error('Checkliste nicht gefunden.');
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const logo = await pdf.embedPng(await readFile(path.join(process.cwd(), 'public', 'brand', 'huwa-logo.png')));
  const page = pdf.addPage([595.28, 841.89]);
  const { height } = page.getSize();
  page.drawRectangle({ x: 0, y: height - 112, width: 595.28, height: 112, color: rgb(0.03,0.13,0.24) });
  page.drawImage(logo, { x: 50, y: height - 101, width: 80, height: 74.5 });
  let y = height - 150;
  page.drawText(content.title, { x: 50, y, size: 20, font: bold, color: rgb(.05,.12,.22) }); y -= 28;
  page.drawText(content.intro, { x: 50, y, size: 9.5, font: regular, color: rgb(.35,.4,.48) }); y -= 34;
  for (const group of content.groups) {
    page.drawText(group.title, { x: 50, y, size: 12, font: bold, color: rgb(.08,.34,.72) }); y -= 22;
    for (const item of group.items) {
      page.drawRectangle({ x: 52, y: y - 2, width: 11, height: 11, borderWidth: 1, borderColor: rgb(.55,.62,.72) });
      page.drawText(item, { x: 74, y, size: 9.5, font: regular, color: rgb(.12,.17,.25) });
      page.drawLine({ start: { x: 74, y: y - 9 }, end: { x: 545, y: y - 9 }, thickness: .35, color: rgb(.88,.9,.93) }); y -= 27;
    }
    y -= 12;
  }
  page.drawText('Objekt: ________________________________   Datum: __________________', { x: 50, y: 72, size: 9, font: regular });
  page.drawText('Verantwortlich: _________________________   Unterschrift: _____________', { x: 50, y: 52, size: 9, font: regular });
  page.drawText('Huwa Gebäudereinigung & Hausmeisterdienste | huwa-gebaeudedienste.de', { x: 50, y: 24, size: 7.5, font: regular, color: rgb(.45,.5,.57) });
  return pdf.save();
}

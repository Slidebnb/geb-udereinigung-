export const serviceCatalog = [
  { key: 'buero', title: 'Büroreinigung', unit: 'm²', performance: 180, wage: 15, material: 7, setup: 20 },
  { key: 'unterhalt', title: 'Unterhaltsreinigung', unit: 'm²', performance: 160, wage: 15, material: 8, setup: 20 },
  { key: 'treppenhaus', title: 'Treppenhausreinigung', unit: 'm²', performance: 125, wage: 15, material: 7, setup: 15 },
  { key: 'glas', title: 'Glasreinigung', unit: 'm²', performance: 22, wage: 15.46, material: 10, setup: 30 },
  { key: 'grund', title: 'Grundreinigung', unit: 'm²', performance: 10, wage: 15, material: 14, setup: 45 },
  { key: 'bau', title: 'Baureinigung', unit: 'm²', performance: 14, wage: 15, material: 12, setup: 45 },
  { key: 'hausmeister', title: 'Hausmeisterservice', unit: 'Std.', performance: 1, wage: 15.46, material: 5, setup: 15 },
  { key: 'winter', title: 'Winterdienst', unit: 'm²', performance: 550, wage: 18.4, material: 18, setup: 30 },
  { key: 'garten', title: 'Gartenpflege', unit: 'Std.', performance: 1, wage: 15.46, material: 10, setup: 20 },
] as const;

export type ServiceKey = (typeof serviceCatalog)[number]['key'];

export const objectDocumentTypes = [
  { key: 'leistungsverzeichnis', title: 'Leistungsverzeichnis' },
  { key: 'objekt-checkliste', title: 'Objekt-Checkliste' },
  { key: 'sop', title: 'Arbeitsanweisung / SOP' },
  { key: 'zusatzleistungskatalog', title: 'Preis- und Zusatzleistungskatalog' },
  { key: 'objektstart', title: 'Objektstart-Protokoll' },
  { key: 'uebergabe', title: 'Übergabeprotokoll' },
  { key: 'qualitaetskontrolle', title: 'Qualitätskontrollbogen' },
  { key: 'leistungsnachweis', title: 'Leistungsnachweis' },
  { key: 'sonderauftrag', title: 'Sonderauftrag-Formular' },
  { key: 'winterdokumentation', title: 'Winterdienst-Dokumentation' },
] as const;

export const publicDownloadCatalog = [
  {
    key: 'haustechnik',
    title: '12-Punkte Haustechnik-Checkliste',
    description: 'Für Hausverwaltungen, WEGs und Eigentümer.',
    href: '/downloads/haustechnik-checkliste.html',
  },
  {
    key: 'objektuebergabe',
    title: 'Checkliste für eine saubere Objektübergabe',
    description: 'Zustände, Schlüssel, Zugänge und offene Punkte vollständig erfassen.',
    href: '/downloads/objektuebergabe-checkliste.html',
  },
  {
    key: 'qualitaetskontrolle',
    title: 'Qualitätskontrolle Gebäudereinigung',
    description: 'Ein praktischer Prüfbogen für wiederkehrende Reinigungsleistungen.',
    href: '/downloads/qualitaetskontrolle-checkliste.html',
  },
  {
    key: 'winterdienst',
    title: 'Winterdienst-Dokumentationscheckliste',
    description: 'Einsatz, Wetter, Flächen und Streumittel nachvollziehbar dokumentieren.',
    href: '/downloads/winterdienst-checkliste.html',
  },
  {
    key: 'gartenpflege',
    title: 'Saisoncheckliste Gartenpflege',
    description: 'Die wichtigsten Pflegearbeiten von März bis November planen.',
    href: '/downloads/gartenpflege-checkliste.html',
  },
] as const;

export const communicationTemplates = [
  ['angebot', 'Angebot versenden', 'Ihr Angebot von Huwa Gebäudedienste', 'Guten Tag {{name}},\n\nanbei erhalten Sie unser Angebot für {{objekt}}. Für Rückfragen sind wir gerne erreichbar.'],
  ['termin', 'Termin abstimmen', 'Terminabstimmung für {{objekt}}', 'Guten Tag {{name}},\n\nwir möchten den nächsten Termin für {{objekt}} mit Ihnen abstimmen.'],
  ['objektstart', 'Objektstart bestätigen', 'Start der Betreuung für {{objekt}}', 'Guten Tag {{name}},\n\nder Objektstart ist für {{datum}} vorgesehen. Die vereinbarten Zugänge und Ansprechpartner finden Sie im Protokoll.'],
  ['reklamation', 'Reklamation bestätigen', 'Ihre Rückmeldung zu {{objekt}}', 'Guten Tag {{name}},\n\nvielen Dank für Ihre Rückmeldung. Wir prüfen den Vorgang und melden uns kurzfristig mit dem Ergebnis.'],
  ['zusatzleistung', 'Zusatzleistung anbieten', 'Zusatzleistung für {{objekt}}', 'Guten Tag {{name}},\n\nfür die besprochene Zusatzleistung erhalten Sie anbei unsere transparente Kalkulation.'],
  ['qualitaet', 'Qualitätskontrolle senden', 'Qualitätskontrolle {{objekt}}', 'Guten Tag {{name}},\n\nanbei erhalten Sie den aktuellen Qualitätskontrollbogen für Ihr Objekt.'],
  ['verlaengerung', 'Verlängerung abstimmen', 'Vertragsverlängerung {{objekt}}', 'Guten Tag {{name}},\n\nder aktuelle Vertrag erreicht in Kürze seine Verlängerungsfrist. Gerne stimmen wir die weitere Betreuung mit Ihnen ab.'],
  ['kuendigung', 'Kündigung bestätigen', 'Bestätigung Ihrer Kündigung', 'Guten Tag {{name}},\n\nwir bestätigen den Eingang Ihrer Kündigung. Das bestätigte Vertragsende entnehmen Sie bitte dem beigefügten Schreiben.'],
] as const;

export function defaultTemplateContent(category: string, serviceTitle: string) {
  if (category === 'vertrag') {
    return `DIENSTLEISTUNGSVERTRAG - ENTWURF

1. Vertragsparteien
Auftragnehmer und Auftraggeber ergeben sich aus dem Dokumentkopf.

2. Vertragsgegenstand
Der Auftragnehmer erbringt am vereinbarten Objekt Leistungen der ${serviceTitle}. Art, Umfang und Häufigkeit ergeben sich aus dem beigefügten Leistungsverzeichnis.

3. Vergütung
Die vereinbarte Nettovergütung zuzüglich gesetzlicher Umsatzsteuer ist im Preisblatt ausgewiesen. Zusatzleistungen werden nur nach Beauftragung berechnet.

4. Mitwirkung des Auftraggebers
Der Auftraggeber gewährleistet Zugang, erforderliche Informationen sowie nutzbare Wasser- und Stromanschlüsse, soweit für die Leistung notwendig.

5. Qualität und Beanstandungen
Beanstandungen werden nachvollziehbar dokumentiert und innerhalb einer angemessenen Frist geprüft und bearbeitet.

6. Laufzeit und Kündigung
Beginn, Laufzeit, Verlängerung und Kündigungsfrist ergeben sich aus den individuellen Vertragsdaten.

7. Haftung, Datenschutz und Schlussbestimmungen
Es gelten die freigegebenen Vertragsbedingungen und Anlagen. Dieser Text ist bis zur fachlichen Prüfung ausschließlich ein Arbeitsentwurf.`;
  }

  if (category === 'leistungsverzeichnis') {
    return `LEISTUNGSVERZEICHNIS - ${serviceTitle.toUpperCase()}

Objektbereiche und Intervalle werden objektbezogen ergänzt.

- Vorbereitung und Absicherung des Arbeitsbereichs
- Fachgerechte Ausführung der vereinbarten Hauptleistung
- Sichtkontrolle und Dokumentation
- Meldung von Schäden, Gefahrenstellen oder Zusatzbedarf
- Ordnungsgemäßer Abschluss und Verschluss des Objekts`;
  }

  if (category === 'sop') {
    return `STANDARD-ARBEITSANWEISUNG - ${serviceTitle.toUpperCase()}

1. Objekt- und Sicherheitshinweise vor Beginn prüfen.
2. Persönliche Schutzausrüstung und geeignetes Material verwenden.
3. Leistungen in der festgelegten Reihenfolge ausführen.
4. Qualitätskontrolle durchführen und Abweichungen dokumentieren.
5. Material, Geräte, Schlüssel und Objekt ordnungsgemäß übergeben.`;
  }

  return `${category.toUpperCase()} - ${serviceTitle.toUpperCase()}\n\nDiese Vorlage wird mit den Daten des ausgewählten Kunden und Objekts vervollständigt.`;
}

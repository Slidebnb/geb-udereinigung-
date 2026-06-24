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
  {
    key: 'lv_treppenhausreinigung',
    title: 'Leistungsverzeichnis Treppenhausreinigung',
    description: 'Leistungsumfang, Intervalle und Nebenflaechen fuer Hausverwaltungen und WEGs sauber festhalten.',
    href: '/leistungsverzeichnis-treppenhausreinigung-vorlage',
  },
  {
    key: 'winterdienst_dokumentation',
    title: 'Winterdienst-Dokumentation',
    description: 'Einsatz, Wetter, Flaechen, Streumittel und Besonderheiten nachvollziehbar dokumentieren.',
    href: '/winterdienst-dokumentation-vorlage',
  },
  {
    key: 'objektuebergabe_checkliste',
    title: 'Objektuebergabe-Checkliste',
    description: 'Zugaenge, Schluessel, Ansprechpartner, Zustaende und offene Punkte beim Objektstart erfassen.',
    href: '/objektuebergabe-checkliste-pdf',
  },
  {
    key: 'reinigungsplan_buero',
    title: 'Reinigungsplan Buero',
    description: 'Raeume, Aufgaben, Intervalle und Qualitaetskontrollen fuer die Bueroreinigung planen.',
    href: '/reinigungsplan-buero-vorlage',
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
    return `DIENSTLEISTUNGSVERTRAG

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
Es gelten die vereinbarten Vertragsbedingungen und Anlagen.`;
  }

  if (category === 'leistungsverzeichnis') {
    return `LEISTUNGSVERZEICHNIS - ${serviceTitle.toUpperCase()}

OBJEKT UND AUSFÜHRUNGSZEIT
Objektbereiche, Mengen, Intervalle und Ausführungsfenster werden objektbezogen im Dokumentkopf und in der Objektakte festgelegt.

REGELLEISTUNGEN
${serviceTasks(serviceTitle).map((task, index) => `${index + 1}. ${task}`).join('\n')}

QUALITÄTSSTANDARD
- Sichtflächen sind frei von losem Schmutz, Griffspuren und vermeidbaren Rückständen.
- Schäden, nicht erreichbare Bereiche und außergewöhnliche Verschmutzungen werden dokumentiert.
- Leistungen werden im vereinbarten Intervall mit Leistungsnachweis ausgeführt.

NICHT AUTOMATISCH ENTHALTEN
Sonderverschmutzungen, Gefahrstoffe, nicht vereinbarte Entsorgung, Spezialzugänge und zusätzliche Flächen bedürfen einer gesonderten Beauftragung.`;
  }

  if (category === 'sop') {
    return `STANDARD-ARBEITSANWEISUNG - ${serviceTitle.toUpperCase()}

1. Vor Arbeitsbeginn Objektakte, Zugang, Gefährdungen und vereinbarten Leistungsumfang prüfen.
2. Persönliche Schutzausrüstung, farbcodierte Materialien und geeignete Maschinen bereitstellen.
3. Arbeitsbereich sichern und Reinigungsmittel nach Herstellerangabe dosieren.
4. Leistung in der objektbezogen festgelegten Reihenfolge ausführen.
${serviceTasks(serviceTitle).slice(0, 5).map((task, index) => `${index + 5}. ${task}`).join('\n')}
10. Sichtkontrolle durchführen; Abweichungen, Schäden und Zusatzbedarf dokumentieren.
11. Geräte reinigen, Materialbestand prüfen, Schlüssel und Objekt ordnungsgemäß übergeben.`;
  }

  if (category === 'objekt-checkliste') {
    return `OBJEKT-CHECKLISTE - ${serviceTitle.toUpperCase()}

[ ] Zugang, Schlüssel und Alarmhinweise geprüft
[ ] Arbeits- und Gefahrenbereiche kontrolliert
[ ] Material und Geräte vollständig und einsatzbereit
${serviceTasks(serviceTitle).map(task => `[ ] ${task}`).join('\n')}
[ ] Schäden oder Abweichungen fotografisch dokumentiert
[ ] Qualitätskontrolle abgeschlossen
[ ] Fenster, Türen, Licht und Alarmzustand ordnungsgemäß übergeben

BEMERKUNGEN
____________________________________________________________________
____________________________________________________________________`;
  }

  if (category === 'zusatzleistungskatalog') {
    return `ZUSATZLEISTUNGSKATALOG - ${serviceTitle.toUpperCase()}

Zusatzleistungen werden erst nach dokumentierter Beauftragung ausgeführt und auf Basis einer freigegebenen Kalkulation angeboten.

- Zusätzliche oder nicht vereinbarte Flächen
- Erhöhter Aufwand durch außergewöhnliche Verschmutzung
- Sondertermine außerhalb des vereinbarten Leistungsfensters
- Verbrauchsmaterial und Entsorgung außerhalb des Vertragsumfangs
- Spezialmaschinen, Hubsteiger, Gerüste oder zusätzliche Sicherung
- Dokumentierte Sonderaufträge und Wiederherstellungsarbeiten

PREISBILDUNG
Es werden keine pauschalen Blindpreise hinterlegt. Menge, Zeit, Material, Gerät, Fahrt und Risiko werden je Zusatzauftrag kalkuliert.`;
  }

  if (category === 'angebot') {
    return `ANGEBOT - ${serviceTitle.toUpperCase()}

Wir bieten die im beigefügten Leistungsverzeichnis beschriebenen Arbeiten am genannten Objekt an. Mengen, Intervalle, Ausführungszeiten und ausgeschlossene Leistungen sind Bestandteil des Angebots.

PREIS UND GÜLTIGKEIT
Netto-, Umsatzsteuer- und Bruttobetrag ergeben sich aus dem Preisblock. Zusatzleistungen werden nur nach gesonderter Beauftragung ausgeführt.

VORAUSSETZUNGEN
Der Preis setzt die im Objekttermin festgestellten Bedingungen sowie nutzbare Zugänge, Wasser- und Stromanschlüsse voraus. Änderungen des Leistungsumfangs werden vor Ausführung abgestimmt.`;
  }

  if (category === 'objektstart') return `OBJEKTSTART-PROTOKOLL

STARTDATUM UND BETEILIGTE
Datum: ____________________  Ansprechpartner Kunde: ____________________
Verantwortlich Huwa: ____________________

[ ] Objekt gemeinsam begangen
[ ] Leistungsbereiche und Intervalle bestätigt
[ ] Zugänge, Schlüssel, Codes und Alarmablauf übergeben
[ ] Wasser-, Strom-, Lager- und Entsorgungsstellen gezeigt
[ ] Gefahrenstellen und sensible Bereiche dokumentiert
[ ] Material- und Maschinenstandort festgelegt
[ ] Fotodokumentation angelegt
[ ] Erster Qualitätskontrolltermin vereinbart

OFFENE PUNKTE
____________________________________________________________________`;

  if (category === 'uebergabe') return `ÜBERGABEPROTOKOLL

[ ] Vereinbarte Bereiche vollständig besichtigt
[ ] Leistungsstand und sichtbare Mängel dokumentiert
[ ] Schlüssel, Transponder und Zugangsmittel gezählt
[ ] Material, Geräte und Lagerfläche übergeben
[ ] Zählerstände oder technische Zustände festgehalten
[ ] Offene Restarbeiten mit Termin und Verantwortlichem erfasst

FESTSTELLUNGEN / MÄNGEL
____________________________________________________________________

ÜBERGABE DURCH / AN
____________________________________________________________________`;

  if (category === 'qualitaetskontrolle') return `QUALITÄTSKONTROLLBOGEN

Bewertung: 1 = einwandfrei, 2 = geringe Abweichung, 3 = Nacharbeit erforderlich

Eingang / Verkehrsflächen: ____  Bemerkung: __________________________
Bodenflächen: ________________  Bemerkung: __________________________
Oberflächen / Mobiliar: ______  Bemerkung: __________________________
Sanitärbereiche: _____________  Bemerkung: __________________________
Abfall / Verbrauchsmaterial: _  Bemerkung: __________________________
Objektspezifische Leistung: __  Bemerkung: __________________________

[ ] Keine Nacharbeit  [ ] Nacharbeit bis __________  [ ] Kundenrückmeldung erforderlich`;

  if (category === 'leistungsnachweis') return `LEISTUNGSNACHWEIS

Leistungsdatum: ____________________  Beginn: __________  Ende: __________
Ausführende Person(en): ______________________________________________

[ ] Vereinbarte Regelleistungen vollständig ausgeführt
[ ] Periodische Leistungen ausgeführt und bezeichnet
[ ] Zusatzauftrag ausgeführt und dokumentiert
[ ] Abweichung / Zugangshindernis vorhanden
[ ] Schaden oder besonderer Zustand gemeldet

BEMERKUNGEN UND ABWEICHUNGEN
____________________________________________________________________`;

  if (category === 'sonderauftrag') return `SONDERAUFTRAG

BEAUFTRAGTE LEISTUNG
____________________________________________________________________

Menge / Fläche: ____________________  Ausführung bis: __________________
Kalkulationsnummer: _______________  Angebotssumme netto: _____________

[ ] Leistungsumfang vor Ort geprüft
[ ] Preis und Ausführung freigegeben
[ ] Material / Gerät disponiert
[ ] Abschluss und Abnahme dokumentiert

Freigabe Auftraggeber: ____________________  Datum: ____________________`;

  if (category === 'winterdokumentation') return `WINTERDIENST-EINSATZNACHWEIS

Datum: __________  Kontrollbeginn: ______  Einsatzbeginn: ______  Ende: ______
Wetter / Temperatur: __________________________________________________

[ ] Vereinbarte Flächen kontrolliert
[ ] Schnee geräumt
[ ] Glätte beseitigt / Streumittel ausgebracht
[ ] Gefahrenstelle oder Hindernis dokumentiert
[ ] Folgekontrolle erforderlich

Streumittel und Menge: _________________________________________________
Flächen / Einsatzbeschreibung: ________________________________________
Fotodokumentation: [ ] ja  [ ] nein`;

  return `${category.toUpperCase()} - ${serviceTitle.toUpperCase()}\n\nDiese Vorlage wird mit den Daten des ausgewählten Kunden und Objekts vervollständigt.`;
}

function serviceTasks(serviceTitle: string) {
  const title = serviceTitle.toLowerCase();
  if (title.includes('büro')) return ['Abfallbehälter leeren und Abfall zur Sammelstelle bringen', 'Freie Arbeits- und Ablageflächen nebelfeucht reinigen', 'Böden saugen beziehungsweise materialgerecht feucht wischen', 'Sanitärräume einschließlich Kontaktflächen hygienisch reinigen', 'Teeküchen, Spülen und frei zugängliche Oberflächen reinigen', 'Türen, Lichtschalter und Griffbereiche nach Intervall reinigen'];
  if (title.includes('unterhalt')) return ['Lose Verschmutzungen entfernen und Abfallbehälter leeren', 'Bodenflächen entsprechend Belagsart saugen oder wischen', 'Sanitärkeramik, Armaturen und Kontaktflächen reinigen', 'Frei zugängliche Oberflächen und Mobiliar nach Leistungsplan reinigen', 'Verbrauchsmaterial nach vereinbarter Zuständigkeit auffüllen', 'Periodische Arbeiten gemäß Objektintervall dokumentieren'];
  if (title.includes('treppen')) return ['Eingang, Podeste und Treppenläufe kehren oder saugen', 'Stufen, Podeste und Sockel materialgerecht feucht wischen', 'Handläufe, Geländer und Griffbereiche reinigen', 'Aufzugskabinen und Bedienelemente nach Vereinbarung reinigen', 'Keller- und Gemeinschaftsflächen gemäß Intervall bearbeiten', 'Glastüren und Eingangselemente von Griffspuren befreien'];
  if (title.includes('glas')) return ['Glasflächen auf vereinbarter Seite streifenfrei reinigen', 'Rahmen und Falze nur im vereinbarten Umfang reinigen', 'Fensterbänke und angrenzende Bereiche schützen und nachreinigen', 'Zugänge, Leiter- oder Hubtechnik vor Einsatz prüfen', 'Aufkleber, Silikon, Farbe oder Bauschmutz nur nach Freigabe entfernen', 'Glas-, Rahmen- und Dichtungsschäden dokumentieren'];
  if (title.includes('grund')) return ['Bodenbelag und Reinigungsverfahren vor Beginn prüfen', 'Lose Verschmutzung entfernen und Fläche vorbereiten', 'Grundreiniger fachgerecht dosieren und Einwirkzeit beachten', 'Belag maschinell oder manuell bearbeiten und Schmutzflotte aufnehmen', 'Fläche neutralisieren, nachspülen und vollständig trocknen lassen', 'Beschichtung oder Pflegefilm nur bei ausdrücklicher Beauftragung aufbringen'];
  if (title.includes('bau')) return ['Grobschmutz nach vereinbarter Trennung aufnehmen', 'Staub auf horizontalen und vertikalen Flächen entfernen', 'Bodenflächen materialgerecht baufein reinigen', 'Sanitär-, Küchen- und Einbauelemente von Bauschmutz befreien', 'Glasflächen nur im vereinbarten Umfang bearbeiten', 'Mängel, Restarbeiten und nicht entfernbare Rückstände dokumentieren'];
  if (title.includes('hausmeister')) return ['Objektbegehung und Sichtkontrolle definierter Prüfpunkte durchführen', 'Beleuchtung, Türen, Zugänge und Gemeinschaftseinrichtungen kontrollieren', 'Störungen und Schäden dokumentieren und an Ansprechpartner melden', 'Kleine vereinbarte Handgriffe innerhalb des Zeitbudgets ausführen', 'Fremdfirmen- oder Zählertermine nur nach Einzelauftrag begleiten', 'Außenanlagen und Verkehrssicherheit im vereinbarten Bereich prüfen'];
  if (title.includes('winter')) return ['Wetter- und Einsatzlage vor Beginn dokumentieren', 'Vereinbarte Verkehrsflächen innerhalb der Einsatzfrist räumen', 'Streumittel bedarfsgerecht und flächenbezogen ausbringen', 'Gefahrenstellen, nicht erreichbare Bereiche und Hindernisse dokumentieren', 'Einsatzzeit, Wetter, Personal und Materialverbrauch nachweisen', 'Kontroll- oder Folgeeinsatz gemäß Vertragsregelung durchführen'];
  return ['Rasenflächen im vereinbarten Intervall mähen und Kanten nacharbeiten', 'Hecken und Gehölze im zulässigen Zeitraum fachgerecht schneiden', 'Beetflächen pflegen und unerwünschten Aufwuchs entfernen', 'Laub und organische Rückstände nach Leistungsplan aufnehmen', 'Grünschnitt nur bei vereinbarter Entsorgung abfahren', 'Schäden, Schädlingsbefall und zusätzlichen Pflegebedarf dokumentieren'];
}

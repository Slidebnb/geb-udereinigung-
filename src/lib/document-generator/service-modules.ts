import type { ServiceModule } from './types';

export const serviceModules: ServiceModule[] = [
  {
    key: 'gebaeudereinigung', title: 'Gebäudereinigung', description: 'Übergreifende Reinigung von Innenbereichen und Gemeinschaftsflächen', options: [
      { key: 'boden', label: 'Bodenflächen reinigen', documentText: 'Bodenflächen werden belagsgerecht gesaugt, gekehrt oder feucht gewischt.', defaultSelected: true },
      { key: 'oberflaechen', label: 'Oberflächen reinigen', documentText: 'Frei zugängliche Oberflächen und Kontaktflächen werden materialgerecht gereinigt.', defaultSelected: true },
      { key: 'sanitaer', label: 'Sanitärreinigung', documentText: 'Sanitäreinrichtungen, Armaturen und Kontaktflächen werden hygienisch gereinigt.', defaultSelected: true },
      { key: 'abfall', label: 'Abfallentsorgung', documentText: 'Abfallbehälter werden geleert und die Abfälle zur vorgesehenen Sammelstelle gebracht.' },
      { key: 'desinfektion', label: 'Flächendesinfektion', documentText: 'Vereinbarte Flächen werden nach Freigabe mit geeigneten Mitteln desinfiziert.', additional: true },
    ],
  },
  {
    key: 'hausmeisterdienst', title: 'Hausmeisterdienst', description: 'Kontrollen, Kleinleistungen und Betreuung der Immobilie', options: [
      { key: 'sichtkontrolle', label: 'Objekt- und Sichtkontrolle', documentText: 'Definierte Gebäudebereiche werden auf erkennbare Schäden, Störungen und Gefahrenstellen kontrolliert.', defaultSelected: true },
      { key: 'beleuchtung', label: 'Beleuchtung kontrollieren', documentText: 'Die zugängliche Allgemeinbeleuchtung wird kontrolliert; defekte Leuchtmittel werden gemeldet.' },
      { key: 'kleinreparaturen', label: 'Vereinbarte Kleinreparaturen', documentText: 'Freigegebene Kleinreparaturen werden innerhalb des vereinbarten Zeit- und Materialrahmens ausgeführt.' },
      { key: 'zaehler', label: 'Zähler- und Fremdfirmentermine', documentText: 'Vereinbarte Zähler- oder Fremdfirmentermine werden begleitet und dokumentiert.', additional: true },
      { key: 'muelltonnen', label: 'Mülltonnenservice', documentText: 'Müllbehälter werden zu den vereinbarten Terminen bereitgestellt und zurückgebracht.', additional: true },
    ],
  },
  {
    key: 'gartenpflege', title: 'Gartenpflege', description: 'Pflege von Grünflächen, Gehölzen und Außenanlagen', options: [
      { key: 'rasen', label: 'Rasenpflege', documentText: 'Rasenflächen werden im vereinbarten Intervall gemäht; zugängliche Kanten werden nachgearbeitet.', defaultSelected: true },
      { key: 'hecken', label: 'Hecken- und Strauchschnitt', documentText: 'Hecken und Sträucher werden im zulässigen Zeitraum fachgerecht zurückgeschnitten.' },
      { key: 'beete', label: 'Beetpflege', documentText: 'Beetflächen werden gepflegt und unerwünschter Aufwuchs wird entfernt.' },
      { key: 'laub', label: 'Laubaufnahme', documentText: 'Laub und organische Rückstände werden auf den vereinbarten Flächen aufgenommen.' },
      { key: 'gruenschnitt', label: 'Grünschnitt entsorgen', documentText: 'Anfallender Grünschnitt wird nach gesonderter Vereinbarung abtransportiert und entsorgt.', additional: true },
    ],
  },
  {
    key: 'winterdienst', title: 'Winterdienst', description: 'Kontrolle, Räumung und Streuung vereinbarter Verkehrsflächen', options: [
      { key: 'kontrolle', label: 'Wetter- und Flächenkontrolle', documentText: 'Wetterlage und vereinbarte Verkehrsflächen werden innerhalb der festgelegten Bereitschaftszeiten kontrolliert.', defaultSelected: true },
      { key: 'raeumen', label: 'Schneeräumung', documentText: 'Schnee wird auf den vereinbarten Wegen und Zugängen innerhalb der Einsatzfristen geräumt.', defaultSelected: true },
      { key: 'streuen', label: 'Streudienst', documentText: 'Bei Glätte werden zugelassene Streumittel bedarfsgerecht auf den vereinbarten Flächen ausgebracht.', defaultSelected: true },
      { key: 'folgekontrolle', label: 'Folgekontrolle', documentText: 'Erforderliche Folgekontrollen und Nachstreuungen werden entsprechend der Wetterlage durchgeführt.', additional: true },
      { key: 'einsatznachweis', label: 'Einsatzdokumentation', documentText: 'Kontrollzeit, Einsatzzeit, Wetterlage, Flächen und Materialverbrauch werden dokumentiert.' },
    ],
  },
  {
    key: 'entruempelung', title: 'Entrümpelung', description: 'Räumung, Sortierung und dokumentierte Übergabe', options: [
      { key: 'raeumung', label: 'Räumung vereinbarter Bereiche', documentText: 'Die ausdrücklich bezeichneten Räume und Flächen werden von den freigegebenen Gegenständen geräumt.', defaultSelected: true },
      { key: 'sortierung', label: 'Materialtrennung', documentText: 'Räumgut wird nach den vereinbarten Stoffgruppen getrennt und bereitgestellt.' },
      { key: 'entsorgung', label: 'Fachgerechte Entsorgung', documentText: 'Freigegebenes Räumgut wird über geeignete und zulässige Entsorgungswege abgeführt.' },
      { key: 'besenrein', label: 'Besenreine Übergabe', documentText: 'Die geräumten Bereiche werden nach Abschluss besenrein übergeben.' },
      { key: 'nachweis', label: 'Entsorgungsnachweise', documentText: 'Vereinbarte Entsorgungs- oder Wiegenachweise werden dem Auftraggeber bereitgestellt.', additional: true },
    ],
  },
  {
    key: 'fensterreinigung', title: 'Fensterreinigung', description: 'Glas-, Rahmen- und Falzreinigung nach Zugänglichkeit', options: [
      { key: 'glas-innen', label: 'Glasflächen innen', documentText: 'Zugängliche Glasflächen werden auf der Innenseite streifenfrei gereinigt.', defaultSelected: true },
      { key: 'glas-aussen', label: 'Glasflächen außen', documentText: 'Zugängliche Glasflächen werden auf der Außenseite streifenfrei gereinigt.', defaultSelected: true },
      { key: 'rahmen', label: 'Rahmenreinigung', documentText: 'Fensterrahmen werden im vereinbarten Umfang materialgerecht gereinigt.' },
      { key: 'falze', label: 'Falzreinigung', documentText: 'Falze und zugängliche Beschlagbereiche werden im vereinbarten Umfang gereinigt.', additional: true },
      { key: 'hubtechnik', label: 'Arbeiten mit Hubtechnik', documentText: 'Nicht bodennah erreichbare Glasflächen werden nur mit vereinbarter Zugangstechnik bearbeitet.', additional: true },
    ],
  },
  {
    key: 'bueroeinigung', title: 'Büroreinigung', description: 'Arbeitsplätze, Besprechungsräume, Teeküchen und Sanitärbereiche', options: [
      { key: 'arbeitsbereiche', label: 'Büro- und Besprechungsräume', documentText: 'Büro- und Besprechungsflächen werden im freigeräumten Zustand gereinigt.', defaultSelected: true },
      { key: 'boden', label: 'Bodenpflege', documentText: 'Bodenflächen werden entsprechend der Belagsart gesaugt oder feucht gewischt.', defaultSelected: true },
      { key: 'teekueche', label: 'Teeküchen', documentText: 'Spülen und frei zugängliche Oberflächen in Teeküchen werden gereinigt.' },
      { key: 'sanitaer', label: 'Sanitärbereiche', documentText: 'Sanitärbereiche werden hygienisch gereinigt und vereinbarte Verbrauchsmittel aufgefüllt.' },
      { key: 'arbeitsplatz', label: 'Arbeitsplatzreinigung', documentText: 'Freigeräumte Schreibtischflächen und vereinbarte Kontaktpunkte werden gereinigt.', additional: true },
    ],
  },
  {
    key: 'treppenhausreinigung', title: 'Treppenhausreinigung', description: 'Eingänge, Treppen, Podeste und Gemeinschaftsflächen', options: [
      { key: 'treppen', label: 'Treppen und Podeste', documentText: 'Treppenläufe, Stufen und Podeste werden gekehrt oder gesaugt und materialgerecht gewischt.', defaultSelected: true },
      { key: 'handlaeufe', label: 'Handläufe und Geländer', documentText: 'Handläufe, Geländer und gut erreichbare Griffbereiche werden gereinigt.', defaultSelected: true },
      { key: 'eingang', label: 'Eingangsbereich', documentText: 'Eingangsbereich, Fußmatten und zugängliche Glaselemente werden gereinigt.' },
      { key: 'aufzug', label: 'Aufzug', documentText: 'Aufzugskabine, Türen und Bedienelemente werden im vereinbarten Umfang gereinigt.' },
      { key: 'keller', label: 'Keller- und Gemeinschaftsflächen', documentText: 'Vereinbarte Keller- und Gemeinschaftsflächen werden nach festgelegtem Intervall bearbeitet.', additional: true },
    ],
  },
  {
    key: 'bauendreinigung', title: 'Bauendreinigung', description: 'Baugrob-, Bauzwischen- und Baufeinreinigung', options: [
      { key: 'grobreinigung', label: 'Baugrobreinigung', documentText: 'Grobschmutz und freigegebene Verpackungsreste werden aufgenommen und bereitgestellt.', defaultSelected: true },
      { key: 'zwischenreinigung', label: 'Bauzwischenreinigung', documentText: 'Arbeitsbereiche werden während der Bauphase nach abgestimmtem Umfang zwischenreinigt.' },
      { key: 'feinreinigung', label: 'Baufeinreinigung', documentText: 'Staub und lose baubedingte Rückstände werden von zugänglichen Flächen entfernt.', defaultSelected: true },
      { key: 'hartnaeckig', label: 'Haftende Rückstände', documentText: 'Haftende Rückstände werden nur nach Materialprüfung und ausdrücklicher Freigabe bearbeitet.', additional: true },
      { key: 'maengel', label: 'Mängeldokumentation', documentText: 'Nicht entfernbare Rückstände, Schäden und Restarbeiten werden dokumentiert.' },
    ],
  },
  {
    key: 'objektbetreuung', title: 'Objektbetreuung', description: 'Koordination, Begehungen und laufende Objektkommunikation', options: [
      { key: 'begehung', label: 'Regelmäßige Objektbegehung', documentText: 'Das Objekt wird nach den vereinbarten Prüfpunkten begangen und der Zustand dokumentiert.', defaultSelected: true },
      { key: 'meldungen', label: 'Mängel- und Störungsmeldung', documentText: 'Erkennbare Mängel und Störungen werden an den benannten Ansprechpartner gemeldet.', defaultSelected: true },
      { key: 'koordination', label: 'Dienstleister koordinieren', documentText: 'Abgestimmte Termine externer Dienstleister werden organisatorisch begleitet.' },
      { key: 'schluessel', label: 'Schlüsselverwaltung', documentText: 'Überlassene Schlüssel und Zugangsmittel werden nachweisbar verwahrt und verwendet.', additional: true },
      { key: 'fotodokumentation', label: 'Fotodokumentation', documentText: 'Vereinbarte Zustände und Auffälligkeiten werden fotografisch dokumentiert.', additional: true },
    ],
  },
  {
    key: 'sonderreinigung', title: 'Sonderreinigung', description: 'Objektbezogene Einzelmaßnahmen außerhalb der Regelleistung', options: [
      { key: 'vorpruefung', label: 'Verfahrens- und Materialprüfung', documentText: 'Untergrund, Materialverträglichkeit und Verfahren werden vor Beginn an einer geeigneten Stelle geprüft.', defaultSelected: true },
      { key: 'intensiv', label: 'Intensivreinigung', documentText: 'Die freigegebenen Flächen werden mit dem vereinbarten Sonderverfahren intensiv gereinigt.', defaultSelected: true },
      { key: 'maschinen', label: 'Maschinelle Bearbeitung', documentText: 'Geeignete Flächen werden mit der vereinbarten Maschinen- und Padtechnik bearbeitet.' },
      { key: 'schutz', label: 'Schutz- oder Pflegebehandlung', documentText: 'Eine Schutz- oder Pflegebehandlung wird nur bei ausdrücklicher Beauftragung aufgebracht.', additional: true },
      { key: 'abnahme', label: 'Dokumentierte Abnahme', documentText: 'Arbeitsergebnis und erkennbare Einschränkungen werden gemeinsam dokumentiert.', additional: true },
    ],
  },
];

export const serviceModuleMap = new Map(serviceModules.map(module => [module.key, module]));

import { siteConfig } from '@/lib/site';

export const legalTextDefinitions = [
  { key: 'legal_page_agb', label: 'AGB', title: 'Allgemeine Geschäftsbedingungen' },
  { key: 'legal_page_datenschutz', label: 'Datenschutz', title: 'Datenschutzerklärung' },
  { key: 'legal_page_impressum', label: 'Impressum', title: 'Impressum' },
] as const;

export const defaultLegalTexts: Record<(typeof legalTextDefinitions)[number]['key'], string> = {
  legal_page_agb: `## § 1 Geltungsbereich
Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Reinigungs- und Hausmeisterdienstleistungen zwischen ${siteConfig.legalName} (nachfolgend "Auftragnehmer") und ihren Kunden (nachfolgend "Auftraggeber"). Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn der Auftragnehmer ihnen ausdrücklich schriftlich zustimmt.

## § 2 Vertragsschluss
Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Leistungserbringung zustande. Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.

## § 3 Leistungsumfang
Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot beziehungsweise der Auftragsbestätigung und dem zugehörigen Leistungsverzeichnis. Zusätzliche Leistungen, die über den vereinbarten Umfang hinausgehen, werden gesondert berechnet.

## § 4 Pflichten des Auftraggebers
Der Auftraggeber stellt sicher, dass die zu reinigenden Räume und Flächen zugänglich sind. Erforderliche Anschlüsse für Wasser und Strom werden kostenfrei zur Verfügung gestellt. Der Auftraggeber weist auf besondere Gefahren oder empfindliche Materialien hin.

## § 5 Preise und Zahlungsbedingungen
Es gelten die im Angebot genannten Preise zuzüglich der gesetzlichen Umsatzsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei regelmäßigen Leistungen erfolgt die Abrechnung monatlich. Bei Zahlungsverzug werden Verzugszinsen in gesetzlicher Höhe berechnet.

## § 6 Ausführung der Leistungen
Die Leistungen werden fachgerecht und sorgfältig durch geschultes Personal erbracht. Der Auftragnehmer ist berechtigt, sich zur Erfüllung seiner Verpflichtungen geeigneter Subunternehmer zu bedienen. Termine werden nach Möglichkeit eingehalten; bei höherer Gewalt verschieben sich die Fristen entsprechend.

## § 7 Gewährleistung und Mängelrügen
Beanstandungen der erbrachten Leistungen sind unverzüglich, spätestens jedoch innerhalb von 7 Tagen nach Leistungserbringung, schriftlich anzuzeigen. Der Auftragnehmer ist berechtigt und verpflichtet, berechtigte Mängel innerhalb angemessener Frist nachzubessern.

## § 8 Haftung
Der Auftragnehmer haftet für Schäden, die durch ihn oder seine Erfüllungsgehilfen vorsätzlich oder grob fahrlässig verursacht werden. Für leichte Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Der Auftragnehmer unterhält eine Betriebshaftpflichtversicherung.

## § 9 Vertragslaufzeit und Kündigung
Verträge über regelmäßige Leistungen werden auf unbestimmte Zeit geschlossen, sofern nichts anderes vereinbart ist. Sie können von beiden Parteien mit einer Frist von vier Wochen zum Monatsende gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Schriftform.

## § 10 Abwerbeverbot
Der Auftraggeber verpflichtet sich, während der Vertragslaufzeit und für die Dauer von zwölf Monaten nach Vertragsende keine Mitarbeiter des Auftragnehmers abzuwerben oder zu beschäftigen.

## § 11 Schlussbestimmungen
Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.`,

  legal_page_datenschutz: `## 1. Datenschutz auf einen Blick
### Allgemeine Hinweise
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

## 2. Verantwortliche Stelle
Verantwortlich für die Datenverarbeitung auf dieser Website ist:
${siteConfig.legalName}
${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}
Telefon: ${siteConfig.phone}
E-Mail: ${siteConfig.email}

## 3. Ihre Rechte
Sie haben jederzeit das Recht:
- Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)
- die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)
- die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)
- die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)
- der Verarbeitung zu widersprechen (Art. 21 DSGVO)
- Ihre Daten in einem übertragbaren Format zu erhalten (Art. 20 DSGVO)
- sich bei einer Aufsichtsbehörde zu beschweren

## 4. Datenerfassung auf dieser Website
### Kontakt- und Angebotsformular
Wenn Sie uns über unser Kontakt- oder Angebotsformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für Anschlussfragen bei uns gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO beziehungsweise Art. 6 Abs. 1 lit. f DSGVO.

### Server-Log-Dateien
Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dazu gehören Browsertyp und -version, Betriebssystem, Referrer URL, Hostname, Uhrzeit der Serveranfrage und IP-Adresse.

### Newsletter
Wenn Sie unseren Newsletter abonnieren, verwenden wir die angegebene E-Mail-Adresse ausschließlich zum Versand des Newsletters. Sie können den Newsletter jederzeit abbestellen.

## 5. Cookies
Unsere Website verwendet Cookies. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Optionale Cookies werden nur mit Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO gesetzt.

## 6. SSL- beziehungsweise TLS-Verschlüsselung
Diese Seite nutzt zum Schutz der Übertragung vertraulicher Inhalte eine SSL- beziehungsweise TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an "https://" und dem Schloss-Symbol in der Adresszeile.

## 7. Speicherdauer
Soweit keine speziellere Speicherdauer genannt wurde, verbleiben personenbezogene Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt oder Sie eine berechtigte Löschung verlangen.`,

  legal_page_impressum: `## Angaben gemäß § 5 DDG
${siteConfig.legalName}
Inhaber: Familie Huwa
${siteConfig.address.street}
${siteConfig.address.zip} ${siteConfig.address.city}
Deutschland

## Kontakt
Telefon: ${siteConfig.phone}
E-Mail: ${siteConfig.email}

## Berufsbezeichnung und berufsrechtliche Regelungen
Berufsbezeichnung: Gebäudereiniger-Handwerk
Zuständige Kammer: Handwerkskammer Koblenz
Verliehen in: Bundesrepublik Deutschland

## Steuerangaben
Steuernummer: 32/074/56310

## Redaktionell verantwortlich
Familie Huwa
${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}

## EU-Streitschlichtung
Informationen zur Online-Streitbeilegung der Europäischen Kommission finden Sie unter https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.

## Verbraucherstreitbeilegung
Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

## Haftung für Inhalte
Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

## Urheberrecht
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors beziehungsweise Erstellers.`,
};

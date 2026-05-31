export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    category: 'Allgemein',
    question: 'In welchen Regionen sind Sie tätig?',
    answer:
      'Wir sind im Raum Neuwied, Koblenz und Bendorf sowie in den umliegenden Gemeinden tätig – unter anderem in Andernach, Mayen, Lahnstein, Bad Neuenahr-Ahrweiler und Boppard. Sprechen Sie uns gern an, wenn Ihr Standort nicht aufgeführt ist.',
  },
  {
    category: 'Allgemein',
    question: 'Wie fordere ich ein kostenloses Angebot an?',
    answer:
      'Am einfachsten über unser Angebotsformular, telefonisch oder per WhatsApp. Wir besichtigen Ihr Objekt bei Bedarf kostenlos und unverbindlich und erstellen anschließend ein transparentes Festpreisangebot.',
  },
  {
    category: 'Allgemein',
    question: 'Ist die Erstberatung wirklich kostenlos?',
    answer:
      'Ja. Beratung, Objektbegehung und Angebotserstellung sind für Sie vollständig kostenlos und unverbindlich.',
  },
  {
    category: 'Preise & Verträge',
    question: 'Wie setzen sich die Reinigungskosten zusammen?',
    answer:
      'Die Kosten richten sich nach Fläche, Verschmutzungsgrad, Reinigungsintervall und gewünschten Leistungen. Sie erhalten von uns immer ein klares Festpreisangebot ohne versteckte Kosten.',
  },
  {
    category: 'Preise & Verträge',
    question: 'Gibt es eine Mindestvertragslaufzeit?',
    answer:
      'Für regelmäßige Reinigungen vereinbaren wir flexible Laufzeiten. Einmalige Reinigungen sind selbstverständlich ohne Vertragsbindung möglich.',
  },
  {
    category: 'Preise & Verträge',
    question: 'Wie erfolgt die Abrechnung?',
    answer:
      'Bei regelmäßigen Leistungen rechnen wir in der Regel monatlich per Rechnung ab. Einmalige Aufträge werden nach Fertigstellung abgerechnet.',
  },
  {
    category: 'Leistungen',
    question: 'Bringen Sie eigene Reinigungsmittel und Geräte mit?',
    answer:
      'Ja, wir stellen alle benötigten Reinigungsmittel, Maschinen und Materialien. Auf Wunsch verwenden wir auch Ihre vorhandenen Produkte.',
  },
  {
    category: 'Leistungen',
    question: 'Verwenden Sie umweltfreundliche Reinigungsmittel?',
    answer:
      'Wir setzen vorrangig auf umweltschonende und materialverträgliche Reinigungsmittel. Auf Wunsch reinigen wir Ihr Objekt vollständig mit ökologischen Produkten.',
  },
  {
    category: 'Leistungen',
    question: 'Können Sie auch außerhalb der Geschäftszeiten reinigen?',
    answer:
      'Ja. Wir richten uns nach Ihren Abläufen und reinigen auf Wunsch früh morgens, abends, nachts oder am Wochenende.',
  },
  {
    category: 'Leistungen',
    question: 'Übernehmen Sie auch einmalige Reinigungen?',
    answer:
      'Selbstverständlich. Neben regelmäßigen Verträgen führen wir auch einmalige Grund-, Bau- oder Sonderreinigungen durch.',
  },
  {
    category: 'Mitarbeiter & Qualität',
    question: 'Sind Ihre Mitarbeiter versichert?',
    answer:
      'Alle unsere Mitarbeiterinnen und Mitarbeiter sind sozialversichert und über unsere Betriebshaftpflichtversicherung abgesichert.',
  },
  {
    category: 'Mitarbeiter & Qualität',
    question: 'Bekomme ich immer dasselbe Reinigungspersonal?',
    answer:
      'Ja, für regelmäßige Aufträge setzen wir feste Teams ein, die Ihr Objekt und Ihre Wünsche kennen.',
  },
  {
    category: 'Mitarbeiter & Qualität',
    question: 'Wie stellen Sie eine gleichbleibende Qualität sicher?',
    answer:
      'Unsere Objektleiter führen regelmäßige Qualitätskontrollen durch und dokumentieren die Ergebnisse. So bleibt das vereinbarte Sauberkeitsniveau dauerhaft erhalten.',
  },
  {
    category: 'Mitarbeiter & Qualität',
    question: 'Wie wird der Datenschutz in meinem Büro gewährleistet?',
    answer:
      'Unsere Mitarbeiter sind zur Verschwiegenheit verpflichtet. Unterlagen, Daten und persönliche Gegenstände bleiben unangetastet.',
  },
  {
    category: 'Termine & Organisation',
    question: 'Wie schnell können Sie mit der Reinigung beginnen?',
    answer:
      'Nach Auftragserteilung können wir in der Regel kurzfristig starten. Bei dringenden Anliegen finden wir oft eine schnelle Lösung – sprechen Sie uns an.',
  },
];

export function getFaqCategories(): string[] {
  return Array.from(new Set(faqs.map((f) => f.category)));
}

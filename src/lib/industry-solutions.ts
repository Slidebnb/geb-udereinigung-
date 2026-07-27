export type IndustryFeature = { title: string; description: string };
export type IndustryFaq = { question: string; answer: string };
export type IndustryLink = { href: string; label: string };

export type IndustrySolution = {
  slug: string;
  title: string;
  shortTitle: string;
  serviceKey: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  challenge: string;
  features: IndustryFeature[];
  process: { title: string; description: string }[];
  benefits: string[];
  faqs: IndustryFaq[];
  relatedLinks: IndustryLink[];
  ctaHref: string;
  image: string;
};

const commonLinks: IndustryLink[] = [
  { href: '/angebot', label: 'Individuelles Angebot anfragen' },
  { href: '/preisrechner', label: 'Preis unverbindlich schätzen' },
  { href: '/leistungsuebersicht-download', label: 'Leistungsübersicht als PDF' },
];

export const industrySolutions: IndustrySolution[] = [
  {
    slug: 'arztpraxis',
    title: 'Praxisreinigung für Arztpraxen und Zahnarztpraxen',
    shortTitle: 'Arztpraxis',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Praxisreinigung für Arztpraxen | Huwa Gebäudedienste',
    metaDescription: 'Zuverlässige Praxisreinigung für Arzt- und Zahnarztpraxen in Neuwied, Koblenz und der Region. Hygieneplan, diskrete Abläufe und Qualitätskontrolle.',
    hero: 'Saubere, diskrete und planbare Praxisreinigung, damit sich Ihr Team auf Patienten und Behandlung konzentrieren kann.',
    challenge: 'In einer Praxis müssen Reinigungszeiten, sensible Bereiche, Kontaktflächen und der laufende Betrieb sorgfältig zusammenpassen. Deshalb braucht es einen klaren Leistungsplan und feste Ansprechpartner.',
    features: [
      { title: 'Behandlungs- und Empfangsbereiche', description: 'Oberflächen, Böden, Türen und frei zugängliche Kontaktbereiche nach dem vereinbarten Reinigungsplan pflegen.' },
      { title: 'Sanitär- und Sozialräume', description: 'Sanitärbereiche, Teeküchen und Pausenräume hygienisch und materialgerecht reinigen.' },
      { title: 'Diskrete Abläufe', description: 'Reinigung außerhalb Ihrer Kernzeiten und mit klaren Regeln für Zugänge, Unterlagen und sensible Räume.' },
      { title: 'Dokumentierte Qualität', description: 'Leistungsverzeichnis, Objekt-Checkliste und regelmäßige Qualitätskontrollen schaffen Nachvollziehbarkeit.' },
    ],
    process: [
      { title: 'Praxisbegehung', description: 'Wir erfassen Räume, Nutzungszeiten, Zugänge und besondere Hygieneanforderungen.' },
      { title: 'Reinigungsplan', description: 'Sie erhalten einen abgestimmten Leistungsumfang mit Intervallen und Zuständigkeiten.' },
      { title: 'Betreuung', description: 'Das vereinbarte Team arbeitet nach dem Plan und dokumentiert Abweichungen oder Zusatzbedarf.' },
      { title: 'Qualitätsgespräch', description: 'Rückmeldungen werden aufgenommen und der Ablauf bei Bedarf angepasst.' },
    ],
    benefits: ['Planbare Reinigung ohne unnötige Störung des Praxisbetriebs', 'Klare Zuständigkeiten und feste Ansprechpartner', 'Materialgerechte Reinigung sensibler Oberflächen', 'Nachvollziehbare Qualitätskontrollen'],
    faqs: [
      { question: 'Reinigt Huwa auch Zahnarztpraxen?', answer: 'Ja. Wir stimmen den Leistungsumfang für Empfang, Behandlungsräume, Sanitär- und Sozialbereiche objektbezogen ab.' },
      { question: 'Wann findet die Praxisreinigung statt?', answer: 'Die Reinigung kann vor oder nach den Kernzeiten Ihrer Praxis erfolgen. Die geeigneten Zeitfenster werden vor Angebotsabgabe abgestimmt.' },
      { question: 'Erstellt Huwa einen Hygiene- und Reinigungsplan?', answer: 'Wir erstellen eine klare Leistungsbeschreibung mit Reinigungsintervallen und Zuständigkeiten. Fachliche Hygienevorgaben Ihrer Praxis werden dabei berücksichtigt.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/unterhaltsreinigung', label: 'Unterhaltsreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=arztpraxis',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'bank',
    title: 'Bankreinigung für Filialen, Beratungsräume und SB-Bereiche',
    shortTitle: 'Banken',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Bankreinigung für Filialen und SB-Bereiche | Huwa',
    metaDescription: 'Professionelle Bankreinigung für Filialen, Beratungsräume und SB-Zonen in Neuwied, Koblenz und Umgebung. Diskret, planbar und qualitätsgesichert.',
    hero: 'Gepflegte Filialen und diskrete Reinigungsabläufe für Banken, Beratungsstellen und SB-Bereiche.',
    challenge: 'Banken verbinden Kundenverkehr, sensible Unterlagen, Technikbereiche und hohe Anforderungen an Diskretion. Die Reinigung muss zuverlässig erfolgen, ohne den Betrieb zu behindern.',
    features: [
      { title: 'Kundenbereiche', description: 'Eingänge, Böden, Wartezonen, Türen und frei zugängliche Oberflächen gepflegt halten.' },
      { title: 'Beratungsräume', description: 'Diskrete Reinigung nach abgestimmten Zeitfenstern, ohne Unterlagen oder Arbeitsmaterialien zu verändern.' },
      { title: 'SB- und Kontaktflächen', description: 'Griffbereiche, Automatenumfeld und stark frequentierte Flächen nach Leistungsplan reinigen.' },
      { title: 'Filialübergreifende Standards', description: 'Einheitliche Leistungsverzeichnisse und Checklisten für mehrere Standorte ermöglichen klare Kontrolle.' },
    ],
    process: [
      { title: 'Standortaufnahme', description: 'Filiale, Kundenbereiche, Zugänge und Zeitfenster werden aufgenommen.' },
      { title: 'Standard definieren', description: 'Wir übersetzen Ihre Anforderungen in einen verständlichen Leistungsplan.' },
      { title: 'Regelbetrieb', description: 'Die Reinigung erfolgt nach abgestimmtem Turnus und mit klarer Ansprechpartnerstruktur.' },
      { title: 'Kontrolle', description: 'Qualitätsrückmeldungen und Besonderheiten werden dokumentiert und bearbeitet.' },
    ],
    benefits: ['Diskrete Abläufe für Kunden- und Beratungsbereiche', 'Einheitliche Standards bei mehreren Filialen', 'Planbare Reinigungszeiten', 'Klare Dokumentation für Verwaltung und Objektleitung'],
    faqs: [
      { question: 'Kann die Reinigung außerhalb der Öffnungszeiten erfolgen?', answer: 'Ja. Wir stimmen die Reinigung auf Ihre Öffnungszeiten, Sicherheitsabläufe und Zugangsregelungen ab.' },
      { question: 'Wie werden sensible Unterlagen berücksichtigt?', answer: 'Unterlagen und Arbeitsmaterialien werden nicht verändert. Zugangs- und Verschwiegenheitsregeln werden vor dem Start eindeutig festgelegt.' },
      { question: 'Betreut Huwa auch mehrere Bankfilialen?', answer: 'Mehrere Standorte können über abgestimmte Leistungsverzeichnisse, Ansprechpartner und Kontrollintervalle organisiert werden.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/unterhaltsreinigung', label: 'Unterhaltsreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=bank',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'fitnessstudio',
    title: 'Studioreinigung für Fitnessstudios und Sportanlagen',
    shortTitle: 'Fitnessstudios',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Studioreinigung für Fitnessstudios | Huwa Gebäudedienste',
    metaDescription: 'Studioreinigung für Fitnessstudios und Sportanlagen in Neuwied, Koblenz und der Region. Geräteumfeld, Böden, Sanitärbereiche und feste Abläufe.',
    hero: 'Saubere Trainingsflächen, gepflegte Gerätebereiche und planbare Hygieneabläufe für Fitnessstudios.',
    challenge: 'Viele Nutzer, Schweiß, Kontaktflächen und lange Öffnungszeiten machen Fitnessstudios besonders anspruchsvoll. Entscheidend sind passende Intervalle und eine klare Trennung der Aufgaben.',
    features: [
      { title: 'Trainings- und Gerätebereiche', description: 'Böden, frei zugängliche Ablagen und vereinbarte Kontaktbereiche gründlich reinigen.' },
      { title: 'Sanitär, Duschen und Umkleiden', description: 'Sanitär- und Umkleidebereiche nach festem Hygiene- und Intervallplan pflegen.' },
      { title: 'Spiegel und Glasflächen', description: 'Spiegel, Türen und sichtbare Glasflächen streifenfrei und materialgerecht reinigen.' },
      { title: 'Reinigung nach Betrieb', description: 'Zeitfenster werden so geplant, dass Training und Kundenverkehr möglichst wenig gestört werden.' },
    ],
    process: [
      { title: 'Studioanalyse', description: 'Wir erfassen Trainingszonen, Sanitärbereiche, Betriebszeiten und Nutzungsspitzen.' },
      { title: 'Intervallplan', description: 'Tages-, Wochen- und periodische Leistungen werden nachvollziehbar zugeordnet.' },
      { title: 'Ausführung', description: 'Das Team arbeitet nach den vereinbarten Bereichen und dokumentiert Abweichungen.' },
      { title: 'Feedback', description: 'Rückmeldungen aus der Studioleitung fließen in die Betreuung ein.' },
    ],
    benefits: ['Reinigung passend zu langen Öffnungszeiten', 'Besondere Berücksichtigung von Kontakt- und Sanitärbereichen', 'Klare Aufgaben für laufende und periodische Reinigung', 'Persönlicher Ansprechpartner für die Studioleitung'],
    faqs: [
      { question: 'Reinigt Huwa auch Umkleiden und Duschen?', answer: 'Ja. Umkleiden, Duschen, Sanitärbereiche und Trainingsflächen können in den individuellen Leistungsplan aufgenommen werden.' },
      { question: 'Wie oft sollten Fitnessstudios gereinigt werden?', answer: 'Das hängt von Besucherzahl, Öffnungszeiten und Flächen ab. Wir planen Intervalle objektbezogen und unterscheiden laufende und periodische Leistungen.' },
      { question: 'Werden Geräte direkt gereinigt?', answer: 'Das Geräteumfeld und ausdrücklich vereinbarte Flächen können gereinigt werden. Herstellerhinweise und die Abgrenzung zur Betreiberpflicht werden vorher geklärt.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/unterhaltsreinigung', label: 'Unterhaltsreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=fitnessstudio',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'gastronomie',
    title: 'Gastronomiereinigung für Restaurants, Cafés und Küchenbereiche',
    shortTitle: 'Gastronomie',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Gastronomiereinigung für Restaurants und Cafés | Huwa',
    metaDescription: 'Reinigung für Restaurants, Cafés und gastronomische Betriebe in Neuwied, Koblenz und Umgebung. Gastraum, Sanitär, Küche und abgestimmte Zeitfenster.',
    hero: 'Gepflegte Gasträume und zuverlässige Reinigungsabläufe für Restaurants, Cafés und gastronomische Betriebe.',
    challenge: 'Gastronomie bedeutet wechselnde Stoßzeiten, Lebensmittelbereiche, hohe Bodenbelastung und schnelle Wiederherstellung. Die Reinigung muss zum Betrieb und zum vereinbarten Verantwortungsbereich passen.',
    features: [
      { title: 'Gastraum und Eingangsbereich', description: 'Böden, Tische im vereinbarten Umfang, Türen, Fenster und sichtbare Oberflächen pflegen.' },
      { title: 'Sanitärbereiche', description: 'Sanitäranlagen, Kontaktflächen und Verbrauchsmaterial nach festem Intervall reinigen.' },
      { title: 'Küchennahe Bereiche', description: 'Böden und frei zugängliche Flächen im vereinbarten Umfang reinigen; Spezial- und Produktionsreinigung separat abstimmen.' },
      { title: 'Sonder- und Grundreinigung', description: 'Periodische Grundreinigung, Glasreinigung oder saisonale Zusatzarbeiten planbar ergänzen.' },
    ],
    process: [
      { title: 'Betriebsablauf verstehen', description: 'Öffnungszeiten, Lieferzeiten, Stoßzeiten und sensible Bereiche werden aufgenommen.' },
      { title: 'Umfang abgrenzen', description: 'Leistungsbeschreibung und Verantwortungsgrenzen werden verständlich dokumentiert.' },
      { title: 'Reinigung durchführen', description: 'Die vereinbarten Aufgaben erfolgen in passenden Zeitfenstern und Intervallen.' },
      { title: 'Qualität abstimmen', description: 'Besonderheiten und Änderungswünsche werden über den Ansprechpartner bearbeitet.' },
    ],
    benefits: ['Zeitfenster passend zum gastronomischen Betrieb', 'Klare Abgrenzung zwischen laufender und spezieller Küchenreinigung', 'Gepflegte Gasträume und Sanitärbereiche', 'Zusatzleistungen planbar ergänzbar'],
    faqs: [
      { question: 'Kann die Reinigung nachts oder früh morgens erfolgen?', answer: 'Ja. Wir stimmen geeignete Zeitfenster auf Öffnungszeiten und Betriebsabläufe ab.' },
      { question: 'Reinigt Huwa auch Küchen und Abzugshauben?', answer: 'Küchennahe Böden und frei zugängliche Bereiche können vereinbart werden. Spezialreinigung von Anlagen oder Abzugshauben wird separat geprüft und angeboten.' },
      { question: 'Sind Grundreinigungen möglich?', answer: 'Ja. Grundreinigung, Glasreinigung und weitere periodische Leistungen können zusätzlich in den Objektplan aufgenommen werden.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/grundreinigung', label: 'Grundreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=gastronomie',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'hotel',
    title: 'Hotelreinigung für Zimmer, Lobby und Gemeinschaftsbereiche',
    shortTitle: 'Hotels',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Hotelreinigung für Hotels und Pensionen | Huwa',
    metaDescription: 'Hotelreinigung für Zimmer, Lobby, Flure und Gemeinschaftsbereiche in Neuwied, Koblenz und Umgebung. Planbare Abläufe und persönliche Betreuung.',
    hero: 'Saubere Zimmer, gepflegte öffentliche Bereiche und flexible Abläufe für Hotels und Pensionen.',
    challenge: 'Hotels müssen zwischen Check-out, Check-in, Veranstaltungen und laufendem Betrieb zuverlässig gereinigt werden. Dafür braucht es klare Prioritäten, zeitliche Flexibilität und dokumentierte Übergaben.',
    features: [
      { title: 'Zimmer und Flure', description: 'Die vereinbarten Zimmer-, Flur- und Etagenbereiche nach dem abgestimmten Ablauf pflegen.' },
      { title: 'Lobby und Empfang', description: 'Eingang, Lobby, Wartezonen, Aufzüge und sichtbare Kontaktflächen repräsentativ halten.' },
      { title: 'Sanitär und Gemeinschaftsbereiche', description: 'Sanitärbereiche, Frühstücks- oder Aufenthaltsräume im vereinbarten Umfang reinigen.' },
      { title: 'Flexible Übergaben', description: 'Prioritäten und offene Punkte können über eine Objekt-Checkliste nachvollziehbar übergeben werden.' },
    ],
    process: [
      { title: 'Hotelbegehung', description: 'Zimmerstruktur, öffentliche Bereiche, Abläufe und gewünschte Zeitfenster erfassen.' },
      { title: 'Prioritäten festlegen', description: 'Reinigungsplan und Übergabepunkte für den täglichen Betrieb definieren.' },
      { title: 'Ausführung', description: 'Das Team arbeitet nach dem abgestimmten Plan und meldet Abweichungen.' },
      { title: 'Qualitätskontrolle', description: 'Rückmeldungen und regelmäßige Kontrollen sichern die vereinbarte Ausführung.' },
    ],
    benefits: ['Planbare Unterstützung bei wechselnder Auslastung', 'Klare Zimmer- und Bereichslisten', 'Gepflegte Gäste- und Gemeinschaftsbereiche', 'Persönliche Abstimmung mit der Hotelleitung'],
    faqs: [
      { question: 'Kann die Reinigung an Check-in und Check-out angepasst werden?', answer: 'Ja. Zeitfenster und Prioritäten werden passend zu Ihrem Belegungs- und Betriebsablauf abgestimmt.' },
      { question: 'Reinigt Huwa auch öffentliche Hotelbereiche?', answer: 'Lobby, Flure, Aufzüge, Sanitär- und Gemeinschaftsbereiche können entsprechend dem Leistungsverzeichnis betreut werden.' },
      { question: 'Sind kurzfristige Zusatzleistungen möglich?', answer: 'Zusatzleistungen werden nach Kapazität und klarer Beauftragung geprüft, kalkuliert und terminiert.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/glasreinigung', label: 'Glasreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'kanzlei',
    title: 'Kanzleireinigung für Anwaltskanzleien und Steuerberater',
    shortTitle: 'Kanzleien',
    serviceKey: 'bueroeinigung',
    metaTitle: 'Kanzleireinigung für Anwälte und Steuerberater | Huwa',
    metaDescription: 'Diskrete Kanzleireinigung für Anwaltskanzleien und Steuerberater in Neuwied, Koblenz und der Region. Saubere Büros, Sanitärbereiche und feste Abläufe.',
    hero: 'Diskrete und zuverlässige Reinigung für Kanzleien, in denen Vertrauen, Ordnung und ungestörte Arbeitsabläufe zählen.',
    challenge: 'Kanzleien arbeiten mit vertraulichen Unterlagen, Mandantenterminen und hohen Ansprüchen an den ersten Eindruck. Reinigungszeiten und Verschwiegenheit müssen deshalb klar geregelt sein.',
    features: [
      { title: 'Büros und Besprechungsräume', description: 'Böden, frei zugängliche Oberflächen, Türen und Kontaktbereiche nach Leistungsplan pflegen.' },
      { title: 'Mandantenbereiche', description: 'Empfang, Wartezone und Besprechungsräume für einen professionellen Eindruck reinigen.' },
      { title: 'Diskretion', description: 'Unterlagen und Arbeitsplätze bleiben unangetastet; Zugangs- und Zeitregeln werden vor Start festgelegt.' },
      { title: 'Sanitär und Küche', description: 'Sanitärbereiche, Teeküche und Pausenräume zuverlässig und materialgerecht reinigen.' },
    ],
    process: [
      { title: 'Anforderungen erfassen', description: 'Räume, Mandantenverkehr, Zugänge und geeignete Reinigungszeiten besprechen.' },
      { title: 'Leistungen definieren', description: 'Ein verständliches Leistungsverzeichnis grenzt Regelleistungen und Zusatzaufgaben ab.' },
      { title: 'Diskrete Betreuung', description: 'Die Reinigung erfolgt nach dem vereinbarten Ablauf und mit persönlichem Ansprechpartner.' },
      { title: 'Rückmeldung', description: 'Beanstandungen oder Änderungen werden direkt aufgenommen und bearbeitet.' },
    ],
    benefits: ['Diskrete Reinigung außerhalb Ihrer Kernzeiten', 'Professioneller Eindruck für Mandanten', 'Klare Regeln für Unterlagen und Zugänge', 'Planbare Betreuung durch feste Abläufe'],
    faqs: [
      { question: 'Wie schützt Huwa vertrauliche Unterlagen?', answer: 'Unterlagen werden nicht verändert oder bewegt. Zugänge, Arbeitsbereiche und Verschwiegenheitsregeln werden vor Beginn abgestimmt.' },
      { question: 'Ist die Reinigung auch abends möglich?', answer: 'Ja. Wir prüfen Zeitfenster außerhalb Ihrer Mandantentermine und des laufenden Kanzleibetriebs.' },
      { question: 'Kann die Büroreinigung für mehrere Kanzleistandorte organisiert werden?', answer: 'Ja. Mehrere Objekte lassen sich über separate Leistungspläne und gemeinsame Ansprechpartner koordinieren.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/bueroeinigung', label: 'Büroreinigung ansehen' }],
    ctaHref: '/angebot?service=bueroeinigung&industry=kanzlei',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'kindergarten',
    title: 'Kindergartenreinigung für Kitas und Betreuungseinrichtungen',
    shortTitle: 'Kindergärten und Kitas',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Kindergartenreinigung und Kitareinigung | Huwa',
    metaDescription: 'Kitareinigung für Kindergärten und Betreuungseinrichtungen in Neuwied, Koblenz und Umgebung. Bodenpflege, Sanitär, Gruppenräume und klare Hygieneabläufe.',
    hero: 'Gründliche und planbare Reinigung für Kitas, Kindergärten und Betreuungseinrichtungen.',
    challenge: 'Kinderbereiche werden intensiv genutzt. Böden, Sanitärbereiche, Kontaktflächen und Gruppenräume benötigen einen klaren Reinigungsrhythmus, der mit dem pädagogischen Alltag vereinbar ist.',
    features: [
      { title: 'Gruppen- und Aufenthaltsräume', description: 'Böden, frei zugängliche Oberflächen und Kontaktbereiche nach dem vereinbarten Plan reinigen.' },
      { title: 'Sanitärbereiche', description: 'Kinder-Sanitärbereiche und Kontaktflächen hygienisch und materialgerecht pflegen.' },
      { title: 'Küche und Essbereiche', description: 'Teeküchen, Essbereiche und Böden im vereinbarten Verantwortungsumfang reinigen.' },
      { title: 'Sensible Abläufe', description: 'Reinigungszeiten, Zugänge und kindersichere Aufbewahrung werden vor dem Start abgestimmt.' },
    ],
    process: [
      { title: 'Einrichtung begehen', description: 'Gruppenräume, Schlafbereiche, Sanitär, Außen- und Zugangsflächen aufnehmen.' },
      { title: 'Plan abstimmen', description: 'Aufgaben, Intervalle und Zeitfenster mit Leitung oder Träger festlegen.' },
      { title: 'Regelmäßig reinigen', description: 'Das Team arbeitet nach Checkliste und meldet Besonderheiten nachvollziehbar.' },
      { title: 'Qualität besprechen', description: 'Rückmeldungen der Einrichtung werden aufgenommen und in den Ablauf eingearbeitet.' },
    ],
    benefits: ['Reinigungszeiten passend zum Kita-Alltag', 'Besondere Aufmerksamkeit für Böden und Sanitär', 'Klare Checklisten und Verantwortlichkeiten', 'Nachvollziehbare Abstimmung mit der Einrichtungsleitung'],
    faqs: [
      { question: 'Wann kann eine Kita gereinigt werden?', answer: 'In der Regel außerhalb der Betreuungszeiten. Die konkreten Zeitfenster werden auf den Tagesablauf der Einrichtung abgestimmt.' },
      { question: 'Werden Spielzeug und persönliche Materialien gereinigt?', answer: 'Nur ausdrücklich vereinbarte und zugängliche Bereiche. Verantwortlichkeiten und Materialgrenzen werden im Leistungsplan festgehalten.' },
      { question: 'Kann die Reinigung regelmäßig dokumentiert werden?', answer: 'Ja. Checklisten, Leistungsnachweise und Qualitätskontrollen können objektbezogen eingesetzt werden.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/unterhaltsreinigung', label: 'Unterhaltsreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=kindergarten',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'lager-hallen',
    title: 'Reinigung für Lagerflächen, Hallen und Logistikobjekte',
    shortTitle: 'Lagerflächen und Hallen',
    serviceKey: 'gebaeudereinigung',
    metaTitle: 'Lagerhallen-Reinigung und Hallenreinigung | Huwa',
    metaDescription: 'Reinigung für Lagerflächen, Hallen und Logistikobjekte in Neuwied, Koblenz und Umgebung. Böden, Verkehrswege, Sanitär und planbare Sonderleistungen.',
    hero: 'Saubere Verkehrswege, gepflegte Sozialbereiche und planbare Reinigung für Lager, Hallen und Logistikobjekte.',
    challenge: 'Große Flächen, laufender Warenverkehr, hohe Staubbelastung und Maschinenverkehr erfordern eine klare Abgrenzung der Bereiche und geeignete Reinigungszeiten.',
    features: [
      { title: 'Boden- und Verkehrsflächen', description: 'Böden, Wege und definierte Arbeitsbereiche kehren, saugen oder maschinell reinigen.' },
      { title: 'Sozial- und Sanitärbereiche', description: 'Umkleiden, Pausenräume, Sanitär und Teeküchen regelmäßig pflegen.' },
      { title: 'Staub- und Schmutzmanagement', description: 'Reinigungsintervalle an Nutzung, Warenverkehr und Verschmutzungsquellen anpassen.' },
      { title: 'Sonder- und Grundreinigung', description: 'Periodische Hallenreinigung, Glasreinigung oder Zusatzflächen nach Begehung anbieten.' },
    ],
    process: [
      { title: 'Sicherheitsbegehung', description: 'Flächen, Verkehrswege, Gefahrenstellen und Arbeitszeiten aufnehmen.' },
      { title: 'Leistungsgrenzen festlegen', description: 'Bereiche, Maschinen, Höhen und nicht enthaltene Sonderarbeiten klar dokumentieren.' },
      { title: 'Reinigung koordinieren', description: 'Die Arbeiten erfolgen in vereinbarten Zeitfenstern und nach Sicherheitsabstimmung.' },
      { title: 'Kontrolle und Meldung', description: 'Abweichungen, Schäden oder nicht zugängliche Bereiche werden festgehalten.' },
    ],
    benefits: ['Leistungsumfang passend zur Hallennutzung', 'Klare Abgrenzung von Verkehrs- und Arbeitsbereichen', 'Bessere Planbarkeit bei großen Flächen', 'Sonderleistungen nachvollziehbar beauftragbar'],
    faqs: [
      { question: 'Kann Huwa auch große Hallenflächen reinigen?', answer: 'Ja. Nach einer Objektbegehung prüfen wir Fläche, Bodenbelag, Zugänge, Maschinenbedarf und den sinnvollen Turnus.' },
      { question: 'Werden Verkehrswege während des Betriebs gereinigt?', answer: 'Das hängt von Sicherheits- und Betriebsabläufen ab. Reinigungszeiten und Absicherung werden vorab abgestimmt.' },
      { question: 'Sind Maschinenreinigung und Gefahrstoffe enthalten?', answer: 'Nur ausdrücklich vereinbarte Bereiche und Verfahren. Gefahrstoffe, Spezialmaschinen und besondere Sicherung werden separat geprüft.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/gebaeudereinigung', label: 'Gebäudereinigung ansehen' }],
    ctaHref: '/angebot?service=gebaeudereinigung&industry=lager-hallen',
    image: 'https://images.unsplash.com/photo-1586528116493-da8b20f4c7e1?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'markt-filialbetriebe',
    title: 'Reinigung für Märkte, Filialen und Handelsbetriebe',
    shortTitle: 'Märkte und Filialbetriebe',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Filialreinigung und Marktreinigung | Huwa Gebäudedienste',
    metaDescription: 'Reinigung für Märkte, Filialen und Handelsbetriebe in Neuwied, Koblenz und der Region. Kundenflächen, Sanitär, Eingänge und einheitliche Standards.',
    hero: 'Gepflegte Verkaufsflächen, saubere Eingänge und einheitliche Standards für Märkte und Filialnetze.',
    challenge: 'Handelsbetriebe haben Publikumsverkehr, feste Öffnungszeiten und häufig mehrere Standorte. Die Reinigung muss sichtbar zuverlässig sein und dennoch den Verkauf möglichst wenig stören.',
    features: [
      { title: 'Verkaufs- und Kundenflächen', description: 'Böden, Eingänge, Kontaktflächen und frei zugängliche Bereiche nach Leistungsplan pflegen.' },
      { title: 'Sanitär- und Sozialräume', description: 'Sanitär, Pausenräume und vereinbarte Nebenflächen regelmäßig reinigen.' },
      { title: 'Filialstandards', description: 'Einheitliche Checklisten und Leistungsbeschreibungen für mehrere Märkte oder Filialen verwenden.' },
      { title: 'Saisonale Zusatzarbeiten', description: 'Glasreinigung, Grundreinigung und Außenpflege passend zu Bedarf und Standort ergänzen.' },
    ],
    process: [
      { title: 'Standortprofil', description: 'Flächen, Öffnungszeiten, Publikumsverkehr und Besonderheiten je Standort erfassen.' },
      { title: 'Standardisieren', description: 'Ein einheitlicher Kernplan wird um standortspezifische Aufgaben ergänzt.' },
      { title: 'Durchführen', description: 'Die Reinigung erfolgt nach abgestimmtem Turnus und Zeitfenster.' },
      { title: 'Auswerten', description: 'Rückmeldungen, Abweichungen und Zusatzbedarf werden nachvollziehbar bearbeitet.' },
    ],
    benefits: ['Einheitlicher Auftritt über mehrere Standorte', 'Reinigung passend zu Öffnungszeiten', 'Klare Leistungs- und Kontrolllisten', 'Ein Ansprechpartner für die Abstimmung'],
    faqs: [
      { question: 'Kann Huwa mehrere Filialen betreuen?', answer: 'Ja. Mehrere Standorte können über zentrale Standards, einzelne Objektakten und abgestimmte Ansprechpartner organisiert werden.' },
      { question: 'Wann werden Verkaufsflächen gereinigt?', answer: 'Die Zeitfenster werden auf Öffnungszeiten, Warenanlieferung und Kundenverkehr abgestimmt.' },
      { question: 'Sind Glas- und Außenflächen ebenfalls möglich?', answer: 'Ja. Glasreinigung, Eingangsbereiche und Außenflächen können als eigene Leistungsbausteine ergänzt werden.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/glasreinigung', label: 'Glasreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=markt-filialbetriebe',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'treppenhaus',
    title: 'Treppenhausreinigung für Wohnanlagen und Mehrfamilienhäuser',
    shortTitle: 'Treppenhäuser',
    serviceKey: 'treppenhausreinigung',
    metaTitle: 'Treppenhausreinigung für Wohnanlagen und WEGs | Huwa',
    metaDescription: 'Treppenhausreinigung für Wohnanlagen, WEGs und Vermieter in Neuwied, Koblenz und Umgebung. Treppen, Flure, Eingänge und feste Reinigungsintervalle.',
    hero: 'Saubere Treppenhäuser, klare Intervalle und weniger Abstimmungsaufwand für Hausverwaltungen und Eigentümer.',
    challenge: 'Treppenhäuser werden täglich genutzt und sollen für Mieter, Besucher und Eigentümer dauerhaft gepflegt wirken. Ein klarer Plan verhindert Unklarheiten über Etagen, Eingänge und Nebenflächen.',
    features: [
      { title: 'Treppen und Podeste', description: 'Stufen, Podeste, Sockel und Flure materialgerecht reinigen.' },
      { title: 'Eingänge und Kontaktflächen', description: 'Türen, Handläufe, Geländer, Briefkastenanlagen und Eingangsbereiche nach Plan pflegen.' },
      { title: 'Aufzüge und Nebenflächen', description: 'Aufzüge, Kellerzugänge und Gemeinschaftsflächen im vereinbarten Umfang einbeziehen.' },
      { title: 'Leistungsnachweis', description: 'Intervalle, Zusatzleistungen und Qualitätskontrollen nachvollziehbar dokumentieren.' },
    ],
    process: [
      { title: 'Objekt ansehen', description: 'Etagen, Eingänge, Aufzüge und Nebenflächen werden aufgenommen.' },
      { title: 'Pauschale abstimmen', description: 'Leistungsverzeichnis und Reinigungsintervall bilden die Grundlage des Angebots.' },
      { title: 'Regelmäßig reinigen', description: 'Das Team arbeitet nach festem Plan und meldet Besonderheiten.' },
      { title: 'Qualität prüfen', description: 'Rückmeldungen und Kontrollen helfen, den Standard dauerhaft zu halten.' },
    ],
    benefits: ['Feste Reinigungsintervalle', 'Entlastung für Verwaltung und Mieter', 'Klare Leistungen je Objekt', 'Saisonale Ergänzung durch Gartenpflege oder Winterdienst'],
    faqs: [
      { question: 'Welche Bereiche gehören zur Treppenhausreinigung?', answer: 'Typisch sind Treppen, Podeste, Flure, Handläufe, Eingänge und vereinbarte Nebenflächen. Der genaue Umfang wird je Objekt festgelegt.' },
      { question: 'Kann Winterdienst ergänzt werden?', answer: 'Ja. Winterdienst, Gartenpflege und weitere Objektleistungen können separat oder kombiniert angefragt werden.' },
      { question: 'Wie wird ein Angebot erstellt?', answer: 'Nach Angaben zu Eingängen, Etagen, Intervall und Nebenflächen erstellen wir eine unverbindliche Objektkalkulation.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/treppenhausreinigung', label: 'Treppenhausreinigung ansehen' }, { href: '/treppenhausreinigung-kosten', label: 'Kostenfaktoren ansehen' }],
    ctaHref: '/angebot?service=treppenhausreinigung&industry=treppenhaus',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'pflegeeinrichtung',
    title: 'Reinigung für Pflegeeinrichtungen und Seniorenheime',
    shortTitle: 'Pflegeeinrichtungen',
    serviceKey: 'unterhaltsreinigung',
    metaTitle: 'Reinigung für Pflegeeinrichtungen und Seniorenheime | Huwa',
    metaDescription: 'Planbare Reinigung für Pflegeeinrichtungen und Seniorenheime in Neuwied, Koblenz und der Region. Bewohnerbereiche, Sanitär, Gemeinschaftsflächen und Dokumentation.',
    hero: 'Verlässliche Reinigungsabläufe für Pflegeeinrichtungen, Bewohnerbereiche und Gemeinschaftsflächen.',
    challenge: 'Pflegeeinrichtungen verbinden sensible Bewohnerbereiche, hohe Hygieneanforderungen, Besucher und laufende Pflegeabläufe. Reinigung muss daher diskret, abgestimmt und nachvollziehbar organisiert werden.',
    features: [
      { title: 'Bewohner- und Gemeinschaftsbereiche', description: 'Böden, frei zugängliche Oberflächen, Flure und Aufenthaltsbereiche nach Plan pflegen.' },
      { title: 'Sanitärbereiche', description: 'Sanitärbereiche und Kontaktflächen nach den objektbezogen vereinbarten Abläufen reinigen.' },
      { title: 'Diskrete Zusammenarbeit', description: 'Arbeitszeiten, Bewohnerbedürfnisse und Zugänge mit der Einrichtungsleitung abstimmen.' },
      { title: 'Dokumentation', description: 'Leistungsbeschreibungen, Checklisten und Qualitätskontrollen für nachvollziehbare Abläufe einsetzen.' },
    ],
    process: [
      { title: 'Einrichtungsaufnahme', description: 'Bereiche, Betriebsabläufe, Zugänge und besondere Rücksichtnahmen erfassen.' },
      { title: 'Ablauf festlegen', description: 'Leistungsverzeichnis, Intervalle und Zuständigkeiten mit der Leitung abstimmen.' },
      { title: 'Betreuung', description: 'Das Team arbeitet diskret nach Plan und meldet Abweichungen oder Hindernisse.' },
      { title: 'Qualität besprechen', description: 'Kontrollen und Rückmeldungen werden in die laufende Betreuung aufgenommen.' },
    ],
    benefits: ['Rücksichtsvoller Ablauf im laufenden Einrichtungsbetrieb', 'Klare Absprachen mit der Leitung', 'Nachvollziehbare Leistungs- und Kontrolllisten', 'Ergänzbar um Glas-, Grund- und Außenpflege'],
    faqs: [
      { question: 'Reinigt Huwa auch Bewohnerzimmer?', answer: 'Bewohnerzimmer und sensible Bereiche können nach vorheriger Abstimmung und klarer Leistungsbeschreibung einbezogen werden.' },
      { question: 'Ersetzt die Reinigung einen Hygieneplan der Einrichtung?', answer: 'Nein. Die Reinigung unterstützt die objektbezogenen Vorgaben der Einrichtung; fachliche Hygiene- und Pflegeverantwortung bleibt bei der Einrichtung.' },
      { question: 'Wie werden Bewohner und Besucher berücksichtigt?', answer: 'Zeitfenster, Zugang und Vorgehensweise werden so abgestimmt, dass der Einrichtungsbetrieb möglichst wenig gestört wird.' },
    ],
    relatedLinks: [...commonLinks, { href: '/leistungen/unterhaltsreinigung', label: 'Unterhaltsreinigung ansehen' }, { href: '/leistungen/grundreinigung', label: 'Grundreinigung ansehen' }],
    ctaHref: '/angebot?service=unterhaltsreinigung&industry=pflegeeinrichtung',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
  },
];

export function getIndustrySolution(slug: string) {
  return industrySolutions.find((solution) => solution.slug === slug) ?? null;
}

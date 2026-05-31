export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  intro: string;
  benefits: string[];
  features: ServiceFeature[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  priceFrom?: string;
  calculatorKey?: string;
  image: string;
}

export const services: ServiceData[] = [
  {
    slug: 'gebaeudereinigung',
    title: 'Gebäudereinigung',
    shortTitle: 'Gebäudereinigung',
    icon: 'building',
    tagline: 'Professionelle Gebäudereinigung für saubere Objekte rund um die Uhr',
    metaTitle: 'Gebäudereinigung Düsseldorf & NRW | Huwa Gebäudereinigung',
    metaDescription:
      'Professionelle Gebäudereinigung in Düsseldorf, Köln & ganz NRW. Zuverlässig, gründlich und nach Maß. Jetzt kostenloses Angebot für Ihre Gebäudereinigung anfordern!',
    heroDescription:
      'Von Wohnanlagen über Bürogebäude bis hin zu Industriehallen – wir sorgen für nachhaltige Sauberkeit in Ihrem gesamten Objekt. Geschultes Personal, geprüfte Reinigungsmittel und ein durchdachtes Hygienekonzept.',
    intro:
      'Die Gebäudereinigung ist das Herzstück unseres Leistungsspektrums. Seit über 15 Jahren reinigen wir Gebäude jeder Größe – vom kleinen Mehrfamilienhaus bis zum großen Gewerbekomplex. Dabei legen wir Wert auf Zuverlässigkeit, Termintreue und ein gleichbleibend hohes Qualitätsniveau. Unsere fest eingeplanten Reinigungsteams kennen Ihr Objekt und sorgen für ein Sauberkeitsniveau, das Mieter, Mitarbeiter und Besucher gleichermaßen überzeugt.',
    benefits: [
      'Festes, geschultes Reinigungsteam für Ihr Objekt',
      'Individuelle Reinigungspläne nach Ihren Anforderungen',
      'Umweltfreundliche und materialschonende Reinigungsmittel',
      'Transparente Qualitätskontrollen und Reinigungsnachweise',
      'Flexible Reinigungszeiten – auch abends und am Wochenende',
      'Vollständig versichert und tariflich abgesichert',
    ],
    features: [
      {
        title: 'Innen- und Außenreinigung',
        description:
          'Wir reinigen sämtliche Innenbereiche sowie Fassaden, Eingänge, Tiefgaragen und Außenanlagen Ihres Gebäudes.',
      },
      {
        title: 'Hygienekonzept',
        description:
          'Durchdachte Hygiene- und Desinfektionsmaßnahmen sorgen für ein gesundes Raumklima in stark frequentierten Bereichen.',
      },
      {
        title: 'Qualitätssicherung',
        description:
          'Regelmäßige Kontrollen durch unsere Objektleiter garantieren ein dauerhaft hohes Reinigungsniveau.',
      },
    ],
    process: [
      { step: '01', title: 'Objektbegehung', description: 'Wir besichtigen Ihr Gebäude und ermitteln den genauen Reinigungsbedarf.' },
      { step: '02', title: 'Angebot & Plan', description: 'Sie erhalten ein transparentes Festpreisangebot mit individuellem Reinigungsplan.' },
      { step: '03', title: 'Reinigung', description: 'Unser festes Team setzt den Plan zuverlässig und termingerecht um.' },
      { step: '04', title: 'Kontrolle', description: 'Regelmäßige Qualitätskontrollen sichern das vereinbarte Sauberkeitsniveau.' },
    ],
    faqs: [
      { question: 'Wie oft sollte ein Gebäude gereinigt werden?', answer: 'Das hängt von Nutzung und Frequenz ab. Bürogebäude reinigen wir meist täglich bis wöchentlich, Treppenhäuser ein- bis zweimal pro Woche. Wir erstellen einen passenden Plan für Ihr Objekt.' },
      { question: 'Sind die Reinigungskräfte versichert?', answer: 'Ja. Alle unsere Mitarbeiterinnen und Mitarbeiter sind sozialversichert und über unsere Betriebshaftpflicht abgesichert.' },
      { question: 'Können Sie auch außerhalb der Geschäftszeiten reinigen?', answer: 'Selbstverständlich. Wir richten uns nach Ihren Abläufen und reinigen auf Wunsch früh morgens, abends oder am Wochenende.' },
    ],
    priceFrom: 'ab 25 €/Std.',
    calculatorKey: 'gebaeudereinigung',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'bueroeinigung',
    title: 'Büroreinigung',
    shortTitle: 'Büroreinigung',
    icon: 'office',
    tagline: 'Saubere Büros für produktive und gesunde Arbeitsplätze',
    metaTitle: 'Büroreinigung Düsseldorf & NRW | Huwa Gebäudereinigung',
    metaDescription:
      'Zuverlässige Büroreinigung in Düsseldorf, Köln & NRW. Hygienische Arbeitsplätze, flexible Zeiten, faire Preise. Jetzt kostenloses Angebot für Ihre Büroreinigung anfordern!',
    heroDescription:
      'Ein sauberes Büro steigert die Produktivität, schützt die Gesundheit Ihrer Mitarbeiter und hinterlässt bei Kunden einen professionellen Eindruck. Wir reinigen diskret außerhalb Ihrer Arbeitszeiten.',
    intro:
      'Büroreinigung bedeutet mehr als Staubwischen. Wir kümmern uns um Arbeitsplätze, Besprechungsräume, Küchen, Sanitäranlagen und Empfangsbereiche – damit Ihre Mitarbeiter sich wohlfühlen und Ihre Gäste einen gepflegten Eindruck gewinnen. Unsere Reinigungskräfte arbeiten zuverlässig, diskret und nach einem festen Hygieneplan.',
    benefits: [
      'Reinigung außerhalb Ihrer Arbeitszeiten – ohne Störung',
      'Desinfektion von Kontaktflächen und Sanitärbereichen',
      'Auffüllen von Verbrauchsmaterial (Seife, Papier, etc.)',
      'Pflege von Böden, Teppichen und Glasflächen',
      'Diskrete und vertrauenswürdige Mitarbeiter',
      'Individuelle Intervalle: täglich, mehrmals oder wöchentlich',
    ],
    features: [
      { title: 'Arbeitsplatzreinigung', description: 'Schreibtische, Technik und Oberflächen werden hygienisch gereinigt – ohne Ihre Unterlagen zu verschieben.' },
      { title: 'Sanitär & Küche', description: 'Gründliche Reinigung und Desinfektion von Teeküchen, WC-Anlagen und Pausenräumen.' },
      { title: 'Materialservice', description: 'Auf Wunsch übernehmen wir die Nachbestellung und das Auffüllen von Hygieneartikeln.' },
    ],
    process: [
      { step: '01', title: 'Bedarfsanalyse', description: 'Wir erfassen Größe, Raumaufteilung und gewünschte Intervalle Ihres Büros.' },
      { step: '02', title: 'Angebot', description: 'Sie erhalten ein klares Festpreisangebot ohne versteckte Kosten.' },
      { step: '03', title: 'Reinigung', description: 'Diskrete Reinigung außerhalb der Geschäftszeiten durch festes Personal.' },
      { step: '04', title: 'Feedback', description: 'Regelmäßige Abstimmung sorgt dafür, dass alles perfekt läuft.' },
    ],
    faqs: [
      { question: 'Wird mein Büro während oder nach den Arbeitszeiten gereinigt?', answer: 'In der Regel reinigen wir früh morgens oder abends, damit der Arbeitsbetrieb nicht gestört wird. Auf Wunsch ist auch eine Tagesreinigung möglich.' },
      { question: 'Bringen Sie eigene Reinigungsmittel und Geräte mit?', answer: 'Ja, wir stellen alle benötigten Materialien und Geräte. Auf Wunsch nutzen wir auch Ihre vorhandenen Produkte.' },
      { question: 'Wie wird der Datenschutz gewährleistet?', answer: 'Unsere Mitarbeiter sind zur Verschwiegenheit verpflichtet. Unterlagen und Daten bleiben unangetastet.' },
    ],
    priceFrom: 'ab 22 €/Std.',
    calculatorKey: 'bueroeinigung',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'treppenhausreinigung',
    title: 'Treppenhausreinigung',
    shortTitle: 'Treppenhausreinigung',
    icon: 'stairs',
    tagline: 'Gepflegte Treppenhäuser für einen einladenden ersten Eindruck',
    metaTitle: 'Treppenhausreinigung Düsseldorf & NRW | Huwa Gebäudereinigung',
    metaDescription:
      'Regelmäßige Treppenhausreinigung in Düsseldorf, Köln & NRW. Zuverlässig nach Reinigungsplan, faire Pauschalpreise. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Das Treppenhaus ist die Visitenkarte jedes Wohnhauses. Wir sorgen mit einem festen Reinigungsplan für dauerhaft saubere Treppen, Flure, Geländer und Eingangsbereiche.',
    intro:
      'Ein gepflegtes Treppenhaus wertet jede Immobilie auf und vermeidet Streit unter Mietern über den Putzplan. Wir übernehmen die Treppenhausreinigung für Hausverwaltungen, Eigentümergemeinschaften und private Vermieter – zuverlässig, regelmäßig und zu fairen Pauschalpreisen.',
    benefits: [
      'Feste Reinigungsintervalle nach Ihrem Wunsch',
      'Reinigung von Treppen, Geländern, Fluren und Eingang',
      'Pflege von Aufzügen und Briefkastenanlagen',
      'Faire Pauschalpreise pro Etage oder Objekt',
      'Entlastung für Mieter und Hausverwaltung',
      'Saisonale Zusatzleistungen wie Laubentfernung möglich',
    ],
    features: [
      { title: 'Treppen & Flure', description: 'Feuchtreinigung aller Stufen, Podeste und Flurbereiche inklusive Fußleisten.' },
      { title: 'Geländer & Türen', description: 'Abwischen von Handläufen, Geländern, Türen und Lichtschaltern.' },
      { title: 'Eingangsbereich', description: 'Reinigung von Hauseingang, Fußmatten, Briefkästen und Glasflächen.' },
    ],
    process: [
      { step: '01', title: 'Begehung', description: 'Wir erfassen Etagenzahl und Zustand Ihres Treppenhauses.' },
      { step: '02', title: 'Pauschalangebot', description: 'Sie erhalten einen festen Monatspreis ohne Überraschungen.' },
      { step: '03', title: 'Reinigung', description: 'Regelmäßige Reinigung nach festem Plan.' },
      { step: '04', title: 'Dokumentation', description: 'Auf Wunsch dokumentieren wir jeden Reinigungstermin.' },
    ],
    faqs: [
      { question: 'Wie oft wird das Treppenhaus gereinigt?', answer: 'Üblich sind ein- bis zweimal wöchentlich. Wir passen das Intervall an die Nutzung und Ihre Wünsche an.' },
      { question: 'Was kostet die Treppenhausreinigung?', answer: 'Wir rechnen meist als monatliche Pauschale pro Etage ab. So haben Sie volle Kostentransparenz.' },
      { question: 'Reinigen Sie auch die Fenster im Treppenhaus?', answer: 'Ja, auf Wunsch reinigen wir auch die Treppenhausfenster und Glasflächen in vereinbarten Intervallen.' },
    ],
    priceFrom: 'ab 35 €/Monat',
    calculatorKey: 'treppenhausreinigung',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'glasreinigung',
    title: 'Glasreinigung',
    shortTitle: 'Glasreinigung',
    icon: 'glass',
    tagline: 'Streifenfreie Fenster und glänzende Glasfassaden',
    metaTitle: 'Glasreinigung & Fensterreinigung Düsseldorf | Huwa Gebäudereinigung',
    metaDescription:
      'Professionelle Glas- und Fensterreinigung in Düsseldorf, Köln & NRW. Streifenfreie Ergebnisse, auch in der Höhe. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Klare Sicht und strahlender Glanz: Wir reinigen Fenster, Glasfassaden, Wintergärten und Schaufenster streifenfrei – mit modernster Technik auch in schwer erreichbaren Höhen.',
    intro:
      'Saubere Fenster lassen mehr Licht herein und hinterlassen einen gepflegten Eindruck. Mit professioneller Ausrüstung, Osmose-Technik und langjähriger Erfahrung reinigen wir Glasflächen jeder Art – vom Wohnungsfenster bis zur mehrstöckigen Glasfassade.',
    benefits: [
      'Streifenfreie Reinigung mit reinem Osmose-Wasser',
      'Reinigung von Rahmen, Falzen und Fensterbänken inklusive',
      'Sichere Höhenreinigung mit Teleskoptechnik',
      'Schaufenster- und Glasfassadenreinigung für Gewerbe',
      'Regelmäßige Intervalle oder einmalige Einsätze',
      'Schonende Behandlung empfindlicher Glasflächen',
    ],
    features: [
      { title: 'Fensterreinigung', description: 'Innen und außen inklusive Rahmen, Falzen und Fensterbänken.' },
      { title: 'Glasfassaden', description: 'Reinigung großer Glasflächen mit Osmose- und Teleskoptechnik – sicher und gründlich.' },
      { title: 'Schaufenster', description: 'Regelmäßige Reinigung Ihrer Schaufenster für einen perfekten Auftritt.' },
    ],
    process: [
      { step: '01', title: 'Aufmaß', description: 'Wir ermitteln Anzahl, Größe und Erreichbarkeit der Glasflächen.' },
      { step: '02', title: 'Angebot', description: 'Transparentes Angebot pro Fenster oder Quadratmeter.' },
      { step: '03', title: 'Reinigung', description: 'Streifenfreie Reinigung mit professioneller Technik.' },
      { step: '04', title: 'Kontrolle', description: 'Abschließende Sichtkontrolle für ein perfektes Ergebnis.' },
    ],
    faqs: [
      { question: 'Wie reinigen Sie Fenster in großer Höhe?', answer: 'Wir nutzen Teleskopstangen mit Osmose-Technik und – falls nötig – Hubarbeitsbühnen. So reinigen wir auch hohe Fassaden sicher.' },
      { question: 'Warum sind die Fenster streifenfrei?', answer: 'Wir arbeiten mit entmineralisiertem Osmose-Wasser, das ohne Rückstände trocknet – das Ergebnis ist streifenfrei und glänzend.' },
      { question: 'Wie oft sollte man Fenster reinigen lassen?', answer: 'Für Gewerbe empfehlen wir monatlich bis quartalsweise, für Privathaushalte je nach Bedarf zwei- bis viermal jährlich.' },
    ],
    priceFrom: 'ab 3,50 €/Fenster',
    calculatorKey: 'glasreinigung',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'grundreinigung',
    title: 'Grundreinigung',
    shortTitle: 'Grundreinigung',
    icon: 'sparkle',
    tagline: 'Intensive Tiefenreinigung für strahlende Sauberkeit',
    metaTitle: 'Grundreinigung Düsseldorf & NRW | Huwa Gebäudereinigung',
    metaDescription:
      'Professionelle Grundreinigung in Düsseldorf, Köln & NRW. Intensive Tiefenreinigung für Böden, Sanitär & mehr. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Wenn die normale Unterhaltsreinigung nicht mehr ausreicht, sorgt unsere Grundreinigung für strahlende Sauberkeit bis in die letzte Ecke – ideal nach Renovierungen, vor Einzügen oder zur Saison.',
    intro:
      'Die Grundreinigung entfernt hartnäckige Verschmutzungen, alte Pflegefilme und Ablagerungen, die sich über die Zeit angesammelt haben. Wir bringen Böden, Sanitärbereiche und Oberflächen wieder auf Hochglanz – mit professionellen Maschinen und speziellen Reinigungsmitteln.',
    benefits: [
      'Intensive Tiefenreinigung aller Oberflächen',
      'Entfernung alter Pflegefilme und Beläge',
      'Maschinelle Bodenreinigung und Neuversiegelung',
      'Grundreinigung von Sanitäranlagen und Fugen',
      'Ideal nach Bau, Renovierung oder Mieterwechsel',
      'Auf Wunsch mit anschließender Pflegebeschichtung',
    ],
    features: [
      { title: 'Bodengrundreinigung', description: 'Maschinelle Reinigung und optionale Neuversiegelung von PVC, Linoleum, Stein und Fliesen.' },
      { title: 'Sanitärgrundreinigung', description: 'Entkalkung, Desinfektion und Tiefenreinigung von Fliesen, Fugen und Armaturen.' },
      { title: 'Oberflächen', description: 'Gründliche Reinigung von Wänden, Heizkörpern, Türen und schwer erreichbaren Bereichen.' },
    ],
    process: [
      { step: '01', title: 'Besichtigung', description: 'Wir beurteilen den Verschmutzungsgrad und die Bodenbeläge.' },
      { step: '02', title: 'Angebot', description: 'Festpreisangebot inklusive Maschinen und Material.' },
      { step: '03', title: 'Grundreinigung', description: 'Intensive maschinelle und manuelle Reinigung.' },
      { step: '04', title: 'Pflege', description: 'Optionale Versiegelung für langanhaltenden Schutz.' },
    ],
    faqs: [
      { question: 'Worin unterscheidet sich die Grundreinigung von der Unterhaltsreinigung?', answer: 'Die Grundreinigung ist eine intensive Tiefenreinigung, die in größeren Abständen erfolgt und auch hartnäckige Altverschmutzungen entfernt. Die Unterhaltsreinigung hält den sauberen Zustand regelmäßig.' },
      { question: 'Wie lange dauert eine Grundreinigung?', answer: 'Das hängt von Fläche und Verschmutzung ab. Wir nennen Ihnen im Angebot einen klaren Zeitrahmen.' },
      { question: 'Können Sie Böden auch neu versiegeln?', answer: 'Ja, nach der Grundreinigung tragen wir auf Wunsch eine schützende Pflegebeschichtung auf.' },
    ],
    priceFrom: 'ab 4 €/m²',
    calculatorKey: 'grundreinigung',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'unterhaltsreinigung',
    title: 'Unterhaltsreinigung',
    shortTitle: 'Unterhaltsreinigung',
    icon: 'broom',
    tagline: 'Regelmäßige Pflege für dauerhaft saubere Räume',
    metaTitle: 'Unterhaltsreinigung Düsseldorf & NRW | Huwa Gebäudereinigung',
    metaDescription:
      'Zuverlässige Unterhaltsreinigung in Düsseldorf, Köln & NRW. Regelmäßige Pflege nach festem Plan zu fairen Preisen. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Die Unterhaltsreinigung hält Ihre Räume dauerhaft sauber und gepflegt. Mit einem festen Reinigungsplan und einem eingespielten Team sorgen wir für gleichbleibend hohe Hygiene.',
    intro:
      'Die regelmäßige Unterhaltsreinigung ist die Basis für dauerhafte Sauberkeit. Wir reinigen wiederkehrend nach einem abgestimmten Plan – ob täglich, mehrmals pro Woche oder wöchentlich. So bleiben Böden, Oberflächen und Sanitärbereiche stets in einwandfreiem Zustand.',
    benefits: [
      'Individueller Reinigungsplan nach Ihren Anforderungen',
      'Festes Team, das Ihr Objekt kennt',
      'Flexible Intervalle vom täglichen bis wöchentlichen Einsatz',
      'Gleichbleibend hohes Hygieneniveau',
      'Transparente Leistungsverzeichnisse',
      'Schnelle Reaktion bei Sonderwünschen',
    ],
    features: [
      { title: 'Bodenpflege', description: 'Regelmäßige Feucht- und Trockenreinigung aller Bodenbeläge.' },
      { title: 'Sanitärreinigung', description: 'Hygienische Reinigung und Desinfektion von WC-Anlagen und Waschräumen.' },
      { title: 'Oberflächen & Müll', description: 'Abstauben, Oberflächenreinigung und Leerung der Abfallbehälter.' },
    ],
    process: [
      { step: '01', title: 'Leistungsverzeichnis', description: 'Wir definieren gemeinsam die regelmäßigen Reinigungsleistungen.' },
      { step: '02', title: 'Angebot', description: 'Klare monatliche Pauschale für planbare Kosten.' },
      { step: '03', title: 'Reinigung', description: 'Regelmäßige Reinigung durch Ihr festes Team.' },
      { step: '04', title: 'Qualitätskontrolle', description: 'Laufende Kontrollen sichern die vereinbarte Qualität.' },
    ],
    faqs: [
      { question: 'Welche Intervalle sind möglich?', answer: 'Von täglich über mehrmals wöchentlich bis wöchentlich – ganz nach Ihrem Bedarf.' },
      { question: 'Bekomme ich immer dasselbe Reinigungspersonal?', answer: 'Ja, wir setzen feste Teams ein, die Ihr Objekt und Ihre Wünsche kennen.' },
      { question: 'Kann ich Leistungen anpassen?', answer: 'Selbstverständlich. Das Leistungsverzeichnis lässt sich jederzeit an veränderte Anforderungen anpassen.' },
    ],
    priceFrom: 'ab 22 €/Std.',
    calculatorKey: 'unterhaltsreinigung',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'baureinigung',
    title: 'Baureinigung',
    shortTitle: 'Baureinigung',
    icon: 'hardhat',
    tagline: 'Saubere Übergabe nach Bau und Renovierung',
    metaTitle: 'Baureinigung & Bauendreinigung Düsseldorf | Huwa Gebäudereinigung',
    metaDescription:
      'Professionelle Baureinigung & Bauendreinigung in Düsseldorf, Köln & NRW. Besenrein bis bezugsfertig. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Nach dem Bau folgt der Feinschliff: Wir übernehmen Bauzwischen- und Bauendreinigung, damit Ihr Objekt termingerecht und bezugsfertig übergeben werden kann.',
    intro:
      'Baureinigung erfordert Erfahrung, robuste Technik und Termintreue. Wir entfernen Bauschmutz, Mörtelreste, Staub und Klebereste – von der besenreinen Zwischenreinigung bis zur bezugsfertigen Endreinigung. So stellen wir sicher, dass Ihr Neubau oder sanierter Bestand glänzend übergeben wird.',
    benefits: [
      'Bauzwischen- und Bauendreinigung aus einer Hand',
      'Entfernung von Bauschmutz, Staub und Kleberesten',
      'Reinigung von Fenstern, Böden und Sanitär nach dem Bau',
      'Termintreue auch bei engen Bauzeitplänen',
      'Entsorgung von Verpackungsmaterial möglich',
      'Erfahrenes Team mit robuster Technik',
    ],
    features: [
      { title: 'Bauzwischenreinigung', description: 'Besenreine Reinigung während der Bauphase für sicheres Weiterarbeiten.' },
      { title: 'Bauendreinigung', description: 'Bezugsfertige Feinreinigung aller Oberflächen, Fenster und Böden.' },
      { title: 'Bauschlussreinigung', description: 'Letzte Detailreinigung vor der Übergabe an Bauherr oder Mieter.' },
    ],
    process: [
      { step: '01', title: 'Baustellentermin', description: 'Wir besichtigen die Baustelle und stimmen den Zeitplan ab.' },
      { step: '02', title: 'Angebot', description: 'Festpreis nach Quadratmetern und Verschmutzungsgrad.' },
      { step: '03', title: 'Reinigung', description: 'Termingerechte Bau- und Endreinigung durch erfahrenes Team.' },
      { step: '04', title: 'Übergabe', description: 'Bezugsfertige Übergabe nach abschließender Kontrolle.' },
    ],
    faqs: [
      { question: 'Was umfasst die Bauendreinigung?', answer: 'Die Entfernung von feinem Baustaub, Kleberesten, Farbspritzern sowie die Reinigung von Fenstern, Böden und Sanitäranlagen bis zur Bezugsfertigkeit.' },
      { question: 'Können Sie kurzfristig reinigen?', answer: 'Ja, wir richten uns nach Ihrem Bauzeitplan und sind auch kurzfristig einsatzbereit.' },
      { question: 'Entsorgen Sie auch Bauabfälle?', answer: 'Verpackungsmaterial und Reinigungsabfälle entsorgen wir auf Wunsch fachgerecht mit.' },
    ],
    priceFrom: 'ab 4,50 €/m²',
    calculatorKey: 'baureinigung',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'hausmeisterdienste',
    title: 'Hausmeisterdienste',
    shortTitle: 'Hausmeisterdienste',
    icon: 'tools',
    tagline: 'Rundum-Betreuung für Ihre Immobilie',
    metaTitle: 'Hausmeisterdienste Düsseldorf & NRW | Huwa Hausmeisterservice',
    metaDescription:
      'Zuverlässige Hausmeisterdienste in Düsseldorf, Köln & NRW. Wartung, Pflege & kleine Reparaturen aus einer Hand. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Unsere Hausmeisterdienste halten Ihre Immobilie in Schuss: von kleinen Reparaturen über die Pflege der Außenanlagen bis zur Überwachung technischer Anlagen – zuverlässig und aus einer Hand.',
    intro:
      'Ein guter Hausmeisterservice entlastet Eigentümer und Hausverwaltungen spürbar. Wir übernehmen die laufende Betreuung Ihrer Immobilie: kleine Reparaturen, Kontrolle der Haustechnik, Pflege der Außenanlagen, Müllmanagement und vieles mehr. So bleibt Ihr Objekt dauerhaft gepflegt und funktionstüchtig.',
    benefits: [
      'Fester Ansprechpartner für Ihre Immobilie',
      'Kleine Reparaturen und Instandhaltung',
      'Kontrolle und Wartung technischer Anlagen',
      'Pflege von Grünflächen und Außenanlagen',
      'Müllmanagement und Tonnenservice',
      'Schnelle Reaktion bei Störungen',
    ],
    features: [
      { title: 'Instandhaltung', description: 'Kleine Reparaturen, Wartungsarbeiten und regelmäßige Funktionskontrollen.' },
      { title: 'Außenanlagen', description: 'Pflege von Grünflächen, Wegen und Stellplätzen rund ums Jahr.' },
      { title: 'Objektkontrolle', description: 'Regelmäßige Begehungen und Überwachung der Haustechnik.' },
    ],
    process: [
      { step: '01', title: 'Bedarfsklärung', description: 'Wir besprechen, welche Aufgaben Ihr Objekt benötigt.' },
      { step: '02', title: 'Servicevertrag', description: 'Individueller Leistungsumfang zu fairen Konditionen.' },
      { step: '03', title: 'Betreuung', description: 'Regelmäßige Betreuung durch Ihren festen Hausmeister.' },
      { step: '04', title: 'Reporting', description: 'Transparente Dokumentation aller durchgeführten Arbeiten.' },
    ],
    faqs: [
      { question: 'Welche Aufgaben übernimmt der Hausmeisterservice?', answer: 'Kleine Reparaturen, Kontrolle der Haustechnik, Pflege der Außenanlagen, Müllmanagement, Winterdienst und vieles mehr – ganz nach Ihrem Bedarf.' },
      { question: 'Gibt es einen festen Ansprechpartner?', answer: 'Ja, Sie haben einen persönlichen Ansprechpartner, der Ihr Objekt kennt.' },
      { question: 'Sind auch Notfalleinsätze möglich?', answer: 'Bei Störungen reagieren wir schnell und kümmern uns um eine zügige Lösung.' },
    ],
    priceFrom: 'ab 28 €/Std.',
    calculatorKey: 'hausmeisterdienste',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'winterdienst',
    title: 'Winterdienst',
    shortTitle: 'Winterdienst',
    icon: 'snow',
    tagline: 'Sichere Wege bei Schnee und Eis',
    metaTitle: 'Winterdienst Düsseldorf & NRW | Huwa Räum- und Streudienst',
    metaDescription:
      'Zuverlässiger Winterdienst in Düsseldorf, Köln & NRW. Räum- und Streudienst zur Erfüllung Ihrer Verkehrssicherungspflicht. Jetzt Angebot anfordern!',
    heroDescription:
      'Schnee und Eis bedeuten Verantwortung. Wir übernehmen Ihren Räum- und Streudienst – pünktlich, dokumentiert und rechtssicher zur Erfüllung Ihrer Verkehrssicherungspflicht.',
    intro:
      'Als Eigentümer oder Hausverwaltung tragen Sie die Verkehrssicherungspflicht für geräumte und gestreute Wege. Unser Winterdienst nimmt Ihnen diese Verantwortung ab: Wir räumen Schnee und streuen rechtzeitig vor Beginn der Räum- und Streuzeiten – wetterüberwacht und vollständig dokumentiert.',
    benefits: [
      'Erfüllung Ihrer Verkehrssicherungspflicht',
      'Räumen und Streuen vor Beginn der Streupflichtzeiten',
      'Wetterüberwachung für rechtzeitigen Einsatz',
      'Umweltfreundliche Streumittel auf Wunsch',
      'Lückenlose Dokumentation jedes Einsatzes',
      'Saisonverträge mit kalkulierbaren Kosten',
    ],
    features: [
      { title: 'Schneeräumung', description: 'Räumen von Gehwegen, Zufahrten, Parkplätzen und Eingängen.' },
      { title: 'Streudienst', description: 'Abstumpfendes oder auftauendes Streugut je nach Vorschrift und Wunsch.' },
      { title: 'Dokumentation', description: 'Jeder Einsatz wird dokumentiert – wichtig für die Haftung.' },
    ],
    process: [
      { step: '01', title: 'Flächenaufnahme', description: 'Wir erfassen die zu betreuenden Flächen und Pflichten.' },
      { step: '02', title: 'Saisonvertrag', description: 'Fester Saisonpreis für die Wintermonate.' },
      { step: '03', title: 'Einsatz', description: 'Wetterabhängiger Räum- und Streueinsatz, oft vor Tagesbeginn.' },
      { step: '04', title: 'Nachweis', description: 'Dokumentation jedes Einsatzes für Ihre Rechtssicherheit.' },
    ],
    faqs: [
      { question: 'Ab wann wird geräumt?', answer: 'Wir räumen und streuen rechtzeitig vor Beginn der gesetzlichen Räum- und Streuzeiten, in der Regel ab dem frühen Morgen.' },
      { question: 'Übernehmen Sie die Haftung?', answer: 'Mit der Beauftragung übernehmen wir die Durchführung der Verkehrssicherungspflicht und dokumentieren jeden Einsatz.' },
      { question: 'Welche Streumittel verwenden Sie?', answer: 'Je nach kommunaler Vorschrift und Ihrem Wunsch nutzen wir abstumpfende oder auftauende Streumittel, auf Wunsch umweltfreundlich.' },
    ],
    priceFrom: 'auf Anfrage',
    calculatorKey: 'winterdienst',
    image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'gartenarbeiten',
    title: 'Gartenarbeiten',
    shortTitle: 'Gartenarbeiten',
    icon: 'leaf',
    tagline: 'Gepflegte Grünanlagen das ganze Jahr',
    metaTitle: 'Gartenarbeiten & Grünpflege Düsseldorf | Huwa Hausmeisterservice',
    metaDescription:
      'Professionelle Gartenarbeiten & Grünpflege in Düsseldorf, Köln & NRW. Rasen, Hecken, Laub & mehr. Jetzt kostenloses Angebot anfordern!',
    heroDescription:
      'Gepflegte Außenanlagen werten jede Immobilie auf. Wir übernehmen die regelmäßige Grünpflege: Rasenmähen, Heckenschnitt, Laubentfernung und mehr – das ganze Jahr.',
    intro:
      'Ein gepflegter Garten und saubere Außenanlagen hinterlassen einen positiven Eindruck und steigern den Wert Ihrer Immobilie. Wir kümmern uns um die regelmäßige Grünpflege – vom Rasenmähen über den Heckenschnitt bis zur Laubentfernung im Herbst.',
    benefits: [
      'Regelmäßige Rasen- und Grünflächenpflege',
      'Hecken- und Strauchschnitt nach Saison',
      'Laubentfernung im Herbst',
      'Pflege von Beeten und Wegen',
      'Entsorgung des Grünschnitts inklusive',
      'Ganzjährige Betreuung Ihrer Außenanlagen',
    ],
    features: [
      { title: 'Rasenpflege', description: 'Regelmäßiges Mähen, Vertikutieren und Düngen für einen gesunden Rasen.' },
      { title: 'Gehölzschnitt', description: 'Fachgerechter Schnitt von Hecken, Sträuchern und Bäumen.' },
      { title: 'Laub & Sauberkeit', description: 'Laubentfernung und Reinigung von Wegen und Stellplätzen.' },
    ],
    process: [
      { step: '01', title: 'Gartenbegehung', description: 'Wir besichtigen Ihre Außenanlagen und besprechen die Pflege.' },
      { step: '02', title: 'Pflegeplan', description: 'Individueller Pflegeplan mit festen Terminen.' },
      { step: '03', title: 'Pflege', description: 'Regelmäßige Gartenarbeiten durch unser Team.' },
      { step: '04', title: 'Saisonarbeiten', description: 'Zusätzliche Einsätze wie Laubentfernung nach Bedarf.' },
    ],
    faqs: [
      { question: 'Übernehmen Sie auch die Entsorgung des Grünschnitts?', answer: 'Ja, die fachgerechte Entsorgung von Grünschnitt und Laub ist auf Wunsch inklusive.' },
      { question: 'Wie oft wird der Rasen gemäht?', answer: 'In der Wachstumsphase meist alle ein bis zwei Wochen, außerhalb der Saison seltener – ganz nach Bedarf.' },
      { question: 'Bieten Sie auch einmalige Einsätze an?', answer: 'Ja, neben der regelmäßigen Pflege übernehmen wir auch einmalige Arbeiten wie einen Frühjahrs- oder Herbstputz.' },
    ],
    priceFrom: 'ab 30 €/Std.',
    calculatorKey: 'gartenarbeiten',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  },
];

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

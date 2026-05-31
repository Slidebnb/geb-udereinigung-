import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  description: 'Allgemeine Geschäftsbedingungen der Huwa Gebäudereinigung & Hausmeisterdienste GmbH für Reinigungs- und Hausmeisterdienstleistungen.',
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.url}/agb` },
};

const sections = [
  {
    title: '§ 1 Geltungsbereich',
    body: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Reinigungs- und Hausmeisterdienstleistungen zwischen der Huwa Gebäudereinigung & Hausmeisterdienste GmbH (nachfolgend „Auftragnehmer") und ihren Kunden (nachfolgend „Auftraggeber"). Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn der Auftragnehmer ihnen ausdrücklich schriftlich zustimmt.',
  },
  {
    title: '§ 2 Vertragsschluss',
    body: 'Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Leistungserbringung zustande. Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.',
  },
  {
    title: '§ 3 Leistungsumfang',
    body: 'Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung und dem zugehörigen Leistungsverzeichnis. Zusätzliche Leistungen, die über den vereinbarten Umfang hinausgehen, werden gesondert berechnet.',
  },
  {
    title: '§ 4 Pflichten des Auftraggebers',
    body: 'Der Auftraggeber stellt sicher, dass die zu reinigenden Räume und Flächen zugänglich sind. Erforderliche Anschlüsse für Wasser und Strom werden kostenfrei zur Verfügung gestellt. Der Auftraggeber weist auf besondere Gefahren oder empfindliche Materialien hin.',
  },
  {
    title: '§ 5 Preise und Zahlungsbedingungen',
    body: 'Es gelten die im Angebot genannten Preise zzgl. der gesetzlichen Umsatzsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei regelmäßigen Leistungen erfolgt die Abrechnung monatlich. Bei Zahlungsverzug werden Verzugszinsen in gesetzlicher Höhe berechnet.',
  },
  {
    title: '§ 6 Ausführung der Leistungen',
    body: 'Die Leistungen werden fachgerecht und sorgfältig durch geschultes Personal erbracht. Der Auftragnehmer ist berechtigt, sich zur Erfüllung seiner Verpflichtungen geeigneter Subunternehmer zu bedienen. Termine werden nach Möglichkeit eingehalten; bei höherer Gewalt verschieben sich die Fristen entsprechend.',
  },
  {
    title: '§ 7 Gewährleistung und Mängelrügen',
    body: 'Beanstandungen der erbrachten Leistungen sind unverzüglich, spätestens jedoch innerhalb von 7 Tagen nach Leistungserbringung, schriftlich anzuzeigen. Der Auftragnehmer ist berechtigt und verpflichtet, berechtigte Mängel innerhalb angemessener Frist nachzubessern.',
  },
  {
    title: '§ 8 Haftung',
    body: 'Der Auftragnehmer haftet für Schäden, die durch ihn oder seine Erfüllungsgehilfen vorsätzlich oder grob fahrlässig verursacht werden. Für leichte Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Der Auftragnehmer unterhält eine Betriebshaftpflichtversicherung.',
  },
  {
    title: '§ 9 Vertragslaufzeit und Kündigung',
    body: 'Verträge über regelmäßige Leistungen werden auf unbestimmte Zeit geschlossen, sofern nichts anderes vereinbart ist. Sie können von beiden Parteien mit einer Frist von vier Wochen zum Monatsende gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Schriftform.',
  },
  {
    title: '§ 10 Abwerbeverbot',
    body: 'Der Auftraggeber verpflichtet sich, während der Vertragslaufzeit und für die Dauer von zwölf Monaten nach Vertragsende keine Mitarbeiter des Auftragnehmers abzuwerben oder zu beschäftigen.',
  },
  {
    title: '§ 11 Schlussbestimmungen',
    body: 'Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
  },
];

export default function AgbPage() {
  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'AGB' }]} />
          <h1 className="mt-4">Allgemeine Geschäftsbedingungen</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-primary mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
          <p className="text-sm text-gray-400 pt-4">
            Stand: {new Date().getFullYear()}. Diese AGB sind eine Mustervorlage und sollten vor Verwendung rechtlich geprüft werden.
          </p>
        </div>
      </section>
    </>
  );
}

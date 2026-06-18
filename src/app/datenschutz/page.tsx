import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der Huwa Gebäudereinigung & Hausmeisterdienste GmbH gemäß DSGVO. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/datenschutz` },
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Datenschutz' }]} />
          <h1 className="mt-4">Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl prose-content space-y-6 text-gray-600">
          <div>
            <h2 className="text-primary mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-primary mt-4 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              {siteConfig.legalName}<br />
              {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}<br />
              Telefon: {siteConfig.phone}<br />
              E-Mail: {siteConfig.email}
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">3. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
              <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
              <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
              <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
              <li>der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
              <li>Ihre Daten in einem übertragbaren Format zu erhalten (Art. 20 DSGVO)</li>
              <li>sich bei einer Aufsichtsbehörde zu beschweren</li>
            </ul>
          </div>

          <div>
            <h2 className="text-primary mb-2">4. Datenerfassung auf dieser Website</h2>
            <h3 className="text-primary mt-4 mb-2">Kontakt- und Angebotsformular</h3>
            <p>
              Wenn Sie uns über unser Kontakt- oder Angebotsformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. lit. f DSGVO (berechtigtes Interesse).
            </p>
            <h3 className="text-primary mt-4 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <h3 className="text-primary mt-4 mb-2">Newsletter</h3>
            <p>
              Wenn Sie unseren Newsletter abonnieren, verwenden wir die von Ihnen angegebene E-Mail-Adresse ausschließlich zum Versand des Newsletters. Sie können den Newsletter jederzeit abbestellen.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">5. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Optionale Cookies werden nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) gesetzt, die Sie über unseren Cookie-Banner erteilen und jederzeit widerrufen können.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">6. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://" und dem Schloss-Symbol in der Adresszeile Ihres Browsers.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">7. Speicherdauer</h2>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt oder Sie eine berechtigte Löschung verlangen.
            </p>
          </div>

          <p className="text-sm text-gray-400 pt-4">
            Hinweis: Diese Datenschutzerklärung ist eine Mustervorlage und sollte vor Veröffentlichung an die konkreten Gegebenheiten angepasst und rechtlich geprüft werden.
          </p>
        </div>
      </section>
    </>
  );
}

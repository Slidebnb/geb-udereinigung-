import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Impressum | Huwa Gebäudereinigung',
  description: 'Impressum und Anbieterkennzeichnung der Huwa Gebäudereinigung & Hausmeisterdienste.',
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.url}/impressum` },
};

export default function ImpressumPage() {
  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Impressum' }]} />
          <h1 className="mt-4">Impressum</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl prose-content space-y-6">
          <div>
            <h2 className="text-primary mb-2">Angaben gemäß § 5 DDG</h2>
            <p className="text-gray-600">
              {siteConfig.legalName}<br />
              Inhaber: Familie Huwa<br />
              {siteConfig.address.street}<br />
              {siteConfig.address.zip} {siteConfig.address.city}<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Kontakt</h2>
            <p className="text-gray-600">
              Telefon: <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline">{siteConfig.phone}</a><br />
              E-Mail: <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p className="text-gray-600">
              Berufsbezeichnung: Gebäudereiniger-Handwerk<br />
              Zuständige Kammer: Handwerkskammer Koblenz<br />
              Verliehen in: Bundesrepublik Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Umsatzsteuer-ID</h2>
            <p className="text-gray-600">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              32/074/56310
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Redaktionell verantwortlich</h2>
            <p className="text-gray-600">
              Familie Huwa<br />
              {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">EU-Streitschlichtung</h2>
            <p className="text-gray-600">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                https://ec.europa.eu/consumers/odr/
              </a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Verbraucherstreitbeilegung</h2>
            <p className="text-gray-600">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Haftung für Inhalte</h2>
            <p className="text-gray-600">
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <div>
            <h2 className="text-primary mb-2">Urheberrecht</h2>
            <p className="text-gray-600">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

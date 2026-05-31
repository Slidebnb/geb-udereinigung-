import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import FaqAccordion from '@/components/features/FaqAccordion';
import CTABanner from '@/components/home/CTABanner';
import { faqs, getFaqCategories } from '@/lib/faqs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) | Huwa Gebäudereinigung',
  description:
    'Antworten auf die häufigsten Fragen zu unseren Reinigungs- und Hausmeisterdiensten: Preise, Verträge, Ablauf, Qualität und mehr. Jetzt informieren!',
  alternates: { canonical: `${siteConfig.url}/faq` },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function FaqPage() {
  const categories = getFaqCategories();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'FAQ' }]} />
          <h1 className="mt-4 mb-2">Häufig gestellte Fragen</h1>
          <p className="text-gray-600 max-w-2xl">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um unsere Reinigungs- und Hausmeisterdienste. Ihre Frage ist nicht dabei? Kontaktieren Sie uns gerne.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-6">{category}</h2>
              <FaqAccordion items={faqs.filter((f) => f.category === category)} />
            </div>
          ))}

          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <h2 className="mb-3">Noch Fragen offen?</h2>
            <p className="text-gray-600 mb-6">Unser Team beantwortet Ihre Fragen gerne persönlich.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="btn-primary">Kontakt aufnehmen</Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-secondary">{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

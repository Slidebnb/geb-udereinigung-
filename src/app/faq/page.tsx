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

      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'FAQ' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label mb-4">FAQ</div>
            <h1 className="text-white mb-4">Häufig gestellte <span className="gradient-text">Fragen</span></h1>
            <p className="text-slate-300 text-lg">Hier finden Sie Antworten zu unseren Reinigungs- und Hausmeisterdiensten. Ihre Frage ist nicht dabei? Kontaktieren Sie uns gerne.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-3xl space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-6 text-dark">{category}</h2>
              <FaqAccordion items={faqs.filter((f) => f.category === category)} />
            </div>
          ))}

          <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-white mb-3">Noch Fragen offen?</h2>
            <p className="text-slate-300/80 mb-6">Unser Team beantwortet Ihre Fragen gerne persönlich.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="btn-primary">Kontakt aufnehmen</Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-white">{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

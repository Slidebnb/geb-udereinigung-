import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('gebaeudereinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/gebaeudereinigung` },
};

export default function GebaeudereinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Gebäudereinigung für Bürogebäude, Wohnhäuser und Gewerbeimmobilien in Neuwied und Rheinland-Pfalz.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Gebäudereinigung',
  };
  return (
    <ServicePage
      icon="🏢"
      title={s.title}
      subtitle={s.heroDescription}
      description={s.intro}
      benefits={s.benefits}
      features={s.features.map(f => ({ title: f.title, desc: f.description }))}
      faq={s.faqs.map(f => ({ q: f.question, a: f.answer }))}
      breadcrumb={s.shortTitle}
      schema={schema}
    />
  );
}

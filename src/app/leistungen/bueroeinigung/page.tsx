import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('bueroeinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/bueroeinigung` },
};

export default function BueroeinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Büroreinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Büroreinigung für saubere, hygienische Arbeitsplätze in Neuwied und Rheinland-Pfalz.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Büroreinigung',
  };
  return (
    <ServicePage
      icon="💼"
      title={s.title}
      subtitle={s.heroDescription}
      description={s.intro}
      benefits={s.benefits}
      features={s.features.map(f => ({ title: f.title, desc: f.description }))}
      faq={s.faqs.map(f => ({ q: f.question, a: f.answer }))}
      breadcrumb={s.shortTitle}
      schema={schema}
      cityLinks={[
        { href: '/bueroeinigung-neuwied', label: 'Büroreinigung Neuwied' },
        { href: '/bueroeinigung-koblenz', label: 'Büroreinigung Koblenz' },
        { href: '/bueroeinigung-bendorf', label: 'Büroreinigung Bendorf' },
      ]}
    />
  );
}

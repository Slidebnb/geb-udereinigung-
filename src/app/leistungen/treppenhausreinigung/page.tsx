import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('treppenhausreinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/treppenhausreinigung` },
};

export default function TreppenhausreinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Treppenhausreinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Treppenhausreinigung für Mehrfamilienhäuser und Bürogebäude in Neuwied.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Treppenhausreinigung',
  };
  return (
    <ServicePage
      icon="🏗️"
      title={s.title}
      subtitle={s.heroDescription}
      description={s.intro}
      benefits={s.benefits}
      features={s.features.map(f => ({ title: f.title, desc: f.description }))}
      faq={s.faqs.map(f => ({ q: f.question, a: f.answer }))}
      breadcrumb={s.shortTitle}
      schema={schema}
      cityLinks={[
        { href: '/treppenhausreinigung-neuwied', label: 'Treppenhausreinigung Neuwied' },
        { href: '/treppenhausreinigung-koblenz', label: 'Treppenhausreinigung Koblenz' },
        { href: '/treppenhausreinigung-bendorf', label: 'Treppenhausreinigung Bendorf' },
      ]}
    />
  );
}
